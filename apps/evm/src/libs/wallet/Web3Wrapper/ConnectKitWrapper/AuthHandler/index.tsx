import { watchAccount } from '@wagmi/core';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useAccount, useAccountEffect, useDisconnect, useSwitchChain } from 'wagmi';

import { routes } from 'constants/routing';
import { useNavigate } from 'hooks/useNavigate';
import { getUnsafeChainIdFromSearchParams } from 'libs/wallet';
import { chains, defaultChain } from 'libs/wallet/chains';
import { CHAIN_ID_SEARCH_PARAM } from 'libs/wallet/constants';
import { useUpdateUrlChainId } from 'libs/wallet/hooks/useUpdateUrlChainId';
import config from '../../config';

// Chaînes supportées
const SUPPORTED_CHAIN_IDS = [9745, 146] as const;
type SupportedChainId = typeof SUPPORTED_CHAIN_IDS[number];

/**
 * Vérifie si un chainId est supporté
 */
const isSupportedChainId = (chainId: number | undefined): chainId is SupportedChainId => {
  return chainId !== undefined && SUPPORTED_CHAIN_IDS.includes(chainId as SupportedChainId);
};

/**
 * AuthHandler - Gère la synchronisation entre l'URL, le wallet et les chaînes supportées
 * 
 * Logique de priorité :
 * 1. Query param chainId valide (9745 ou 146) → utilise cette chaîne
 * 2. Chaîne du wallet connecté si supportée → utilise cette chaîne
 * 3. Chaîne par défaut (146) → fallback final
 * 
 * Cas d'usage :
 * - monapp.xyz?chainId=9745 → Utilise Plasma (9745)
 * - monapp.xyz?chainId=146 → Utilise Sonic (146)
 * - monapp.xyz?chainId=42 → Invalide, fallback sur wallet ou 146
 * - monapp.xyz → Pas de param, fallback sur wallet ou 146
 */
export const AuthHandler: React.FC = () => {
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { updateUrlChainId } = useUpdateUrlChainId();
  const { navigate } = useNavigate();
  const { chain: connectedChain, isConnected, status } = useAccount();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Refs pour éviter les re-renders inutiles et les boucles infinies
  const initialLocationRef = useRef(location);
  const isProcessingRef = useRef(false);
  const hasInitialSyncRef = useRef(false);

  /**
   * Détermine le chainId à utiliser selon la priorité
   */
  const resolveChainId = (
    urlChainId: number | undefined,
    walletChainId: number | undefined
  ): SupportedChainId => {
    // Priorité 1 : Query param valide
    if (isSupportedChainId(urlChainId)) {
      return urlChainId;
    }

    // Priorité 2 : Chaîne du wallet si supportée
    if (isSupportedChainId(walletChainId)) {
      return walletChainId;
    }

    // Priorité 3 : Chaîne par défaut
    return defaultChain.id as SupportedChainId;
  };

  /**
   * Synchronise l'URL et le wallet avec le chainId résolu
   */
  const syncChainId = async (
    targetChainId: SupportedChainId,
    currentUrlChainId: number | undefined,
    currentWalletChainId: number | undefined
  ) => {
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    try {
      // Étape 1 : Mettre à jour l'URL si nécessaire
      if (currentUrlChainId !== targetChainId) {
        await updateUrlChainId({ chainId: targetChainId });
      }

      // Étape 2 : Switcher le wallet si nécessaire
      if (isConnected && currentWalletChainId !== targetChainId) {
        if (switchChain) {
          try {
            switchChain({ chainId: targetChainId });
          } catch (error) {
            // Si le switch échoue et que le wallet est sur une chaîne non supportée, on déconnecte
            if (!isSupportedChainId(currentWalletChainId)) {
              disconnect();
            }
          }
        } else {
          // Si switchChain n'est pas disponible et que le wallet est sur une chaîne non supportée
          if (!isSupportedChainId(currentWalletChainId)) {
            disconnect();
          }
        }
      }

      // Étape 3 : Déconnecter si le wallet est sur une chaîne non supportée après toutes les tentatives
      if (
        isConnected &&
        currentWalletChainId !== undefined &&
        !isSupportedChainId(currentWalletChainId) &&
        currentWalletChainId !== targetChainId
      ) {
        disconnect();
      }
    } finally {
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 500);
    }
  };

  /**
   * Gère la connexion du wallet
   */
  useAccountEffect({
    onConnect(data) {
      // Redirection vers account page si on arrive sur le dashboard
      if (
        initialLocationRef.current.pathname === routes.dashboard.path &&
        window.history.length <= 2
      ) {
        const chainIdForRedirect = data.chain?.id || defaultChain.id;
        navigate(
          {
            pathname: routes.account.path,
            search: `?${CHAIN_ID_SEARCH_PARAM}=${chainIdForRedirect}`,
          },
          { replace: true }
        );
      }
    },
    onDisconnect() {
      hasInitialSyncRef.current = false;
    },
  });

  /**
   * Synchronisation initiale et réaction aux changements d'URL
   */
  useEffect(() => {
    // Attendre que le wallet soit prêt (ou qu'il soit clairement déconnecté)
    if (status === 'connecting' || status === 'reconnecting') {
      return;
    }

    const performSync = async () => {
      const { chainId: urlChainId } = getUnsafeChainIdFromSearchParams({ searchParams });
      const walletChainId = connectedChain?.id;

      // Résoudre le chainId à utiliser
      const targetChainId = resolveChainId(urlChainId, walletChainId);

      // Synchroniser URL et wallet
      await syncChainId(targetChainId, urlChainId, walletChainId);

      hasInitialSyncRef.current = true;
    };

    performSync();
  }, [searchParams, connectedChain?.id, isConnected, status, updateUrlChainId, switchChain, disconnect, navigate]);

  /**
   * Détecte les changements de chaîne initiés depuis le wallet
   */
  useEffect(() => {
    const unwatch = watchAccount(config, {
      onChange: async ({ chain: walletChain }) => {
        // Ignorer si pas encore initialisé
        if (!hasInitialSyncRef.current) {
          return;
        }

        // Ignorer pendant le processing
        if (isProcessingRef.current) {
          return;
        }

        if (!walletChain) {
          disconnect();
          return;
        }

        const walletChainId = walletChain.id;
        const { chainId: urlChainId } = getUnsafeChainIdFromSearchParams({ searchParams });

        // Si l'utilisateur change manuellement vers une chaîne non supportée
        if (!isSupportedChainId(walletChainId)) {
          disconnect();
          return;
        }

        // Si l'utilisateur change vers une chaîne supportée différente de l'URL
        if (walletChainId !== urlChainId) {
          isProcessingRef.current = true;
          await updateUrlChainId({ chainId: walletChainId });
          setTimeout(() => {
            isProcessingRef.current = false;
          }, 500);
        }
      },
    });

    return unwatch;
  }, [searchParams, updateUrlChainId, disconnect]);

  return null;
};