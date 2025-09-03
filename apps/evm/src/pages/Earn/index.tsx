import { Button, Card } from "components";
import { Page } from "components";
import { useGetChainMetadata } from "hooks/useGetChainMetadata";
import { useAccountAddress } from "libs/wallet";
import { useGetPool } from "clients/api";
import BigNumber from "bignumber.js";
import {
  cn,
  formatCentsToReadableValue,
  formatPercentageToReadableValue,
  formatTokensToReadableValue,
  isAssetPaused
} from "utilities";
import { TokenIcon } from "components/TokenIcon";
import { getTokenType } from "components/Tag";
import { tokenTypeInfo } from "constants/tokenType";
import { Points } from "components/Points";
import EarnSupplyWithdrawModal from "./EarnSupplyWithdrawModal";
import { useState } from "react";
import { Apy } from "containers/MarketTable/Apy";

const Earn: React.FC = () => {
  const { accountAddress } = useAccountAddress();
  const { corePoolComptrollerContractAddress } = useGetChainMetadata();

  const { data: getPoolData, isLoading: isGetPoolLoading } = useGetPool({
    accountAddress,
    poolComptrollerAddress: corePoolComptrollerContractAddress,
  });

  const pool = getPoolData?.pool;

  const assets = pool?.assets ?? [];

  const totalLendingsCents = assets.reduce(
    (acc, a) => acc.plus(a.supplyBalanceCents || 0),
    new BigNumber(0)
  );
  const userTotalLendingsCents = assets.reduce(
    (acc, a) => acc.plus(a.userSupplyBalanceCents || 0),
    new BigNumber(0)
  );

  const [selectedVTokenAddress, setSelectedVTokenAddress] = useState<
    string | undefined
  >();
  const selectedAsset = assets.find(
    (a) => a.vToken.address === selectedVTokenAddress
  );

  return (
    <Page>
      <div className="text-center py-3 md:py-4">
        <h1 className="text-3xl md:text-4xl font-bold">Lending</h1>
        <p className="text-grey mt-2">Earn yield in just one click.</p>
        {assets.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-cards rounded-xl px-4 py-2">
              <span className="text-lightBlack">Total lendings</span>
              <span className="font-semibold">
                {formatCentsToReadableValue({ value: totalLendingsCents })}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-cards rounded-xl px-4 py-2">
              <span className="text-lightBlack">Your lendings</span>
              <span className="font-semibold">
                {formatCentsToReadableValue({ value: userTotalLendingsCents })}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {assets
          .slice()
          .sort((a, b) => b.supplyBalanceCents.comparedTo(a.supplyBalanceCents))
          .map((asset) => {
            const tagType = getTokenType(asset.vToken.underlyingToken.address);
            const info = tokenTypeInfo[tagType];
            const isPaused = isAssetPaused({
                          disabledTokenActions: asset.disabledTokenActions,
                        });

            return (
              <Card
                key={asset.vToken.address}
                className={`${info.shadowClassName} p-6 rounded-2xl`}
              >
                <div className="flex items-center justify-center mb-3">
                  <TokenIcon
                    token={asset.vToken.underlyingToken}
                    className="w-20 h-20"
                  />
                </div>
                <div className="text-center mb-5">
              
                  <p className="text-sm text-lightBlack">
                    {formatTokensToReadableValue({
                      value: asset.userSupplyBalanceTokens,
                      token: asset.vToken.underlyingToken,
                    })}
                  </p>
                  <p className="text-xl font-semibold">
                    {formatCentsToReadableValue({
                      value: asset.userSupplyBalanceCents,
                    })}
                  </p>
                </div>

                <div className="bg-background rounded-xl p-4 space-y-3 mb-4 min-h-[140px]">
                  <div className="flex items-center justify-between">
                    <p className="text-lightBlack">APR</p>
                    <Apy className={cn('font-semi-bold', isPaused && 'text-grey')} classNameBottomValue='text-black' asset={asset} column={'supplyApy'} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lightBlack">Total supply</p>
                    <span className="font-semibold">
                      {formatCentsToReadableValue({
                        value: asset.supplyBalanceCents,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lightBlack">Points</p>
                    <Points address={asset.vToken.address} displayMultiplier={true} />
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setSelectedVTokenAddress(asset.vToken.address)}
                >
                  Start earning
                </Button>
              </Card>
            );
          })}
      </div>

      <EarnSupplyWithdrawModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedVTokenAddress(undefined)}
        asset={selectedAsset}
        pool={pool}
      />
    </Page>
  );
};

export default Earn;
