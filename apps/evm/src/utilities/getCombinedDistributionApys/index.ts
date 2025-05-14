import BigNumber from "bignumber.js";

import type { Asset, AssetDistribution } from "types";
import getMerklDistributions from "../getMerklRewardsApy";
import { Merkl } from "../../libs/merkl";

interface AggregatePercentagesInput {
  distributions: AssetDistribution[];
}

const aggregatePercentages = ({ distributions }: AggregatePercentagesInput) =>
  distributions.reduce<{
    apyRewardsPercentage: BigNumber;
    apyPrimePercentage?: BigNumber;
    apyPrimeSimulationPercentage?: BigNumber;
    apyMerklPercentage?: BigNumber;
  }>(
    (acc, distribution) => {
      if (distribution.type === "rewardDistributor") {
        return {
          ...acc,
          apyRewardsPercentage: acc.apyRewardsPercentage.plus(
            distribution.apyPercentage
          ),
        };
      }

      if (distribution.type === "prime") {
        return {
          ...acc,
          apyPrimePercentage: (acc.apyPrimePercentage || new BigNumber(0)).plus(
            distribution.apyPercentage
          ),
        };
      }

      if (distribution.type === "primeSimulation") {
        return {
          ...acc,
          apyPrimeSimulationPercentage: (
            acc.apyPrimeSimulationPercentage || new BigNumber(0)
          ).plus(distribution.apyPercentage),
        };
      }

      if (distribution.type === "merkl") {
        return {
          ...acc,
          apyMerklPercentage: (acc.apyMerklPercentage || new BigNumber(0)).plus(
            distribution.apyPercentage
          ),
        };
      }

      return acc;
    },
    {
      apyRewardsPercentage: new BigNumber(0),
    }
  );

export interface GetCombinedDistributionApysInput {
  asset: Asset;
  merkl?: Merkl;
}

const getCombinedDistributionApys = ({
  asset,
  merkl,
}: GetCombinedDistributionApysInput) => {
  if (merkl) {
    const { supplyDistribution, borrowDistribution } = getMerklDistributions({
      asset,
      merkl,
    });

    if (
      !!supplyDistribution &&
      !asset.supplyDistributions.find((d) => d.type === "merkl")
    ) {
      asset.supplyDistributions.push(supplyDistribution);
    }

    if (
      !!borrowDistribution &&
      !asset.borrowDistributions.find((d) => d.type === "merkl")
    ) {
      asset.borrowDistributions.push(borrowDistribution);
    }
  }

  const supply = aggregatePercentages({
    distributions: asset.supplyDistributions,
  });
  const borrow = aggregatePercentages({
    distributions: asset.borrowDistributions,
  });

  return {
    supplyApyRewardsPercentage: supply.apyRewardsPercentage,
    borrowApyRewardsPercentage: borrow.apyRewardsPercentage,
    supplyApyPrimePercentage: supply.apyPrimePercentage,
    borrowApyPrimePercentage: borrow.apyPrimePercentage,
    supplyApyPrimeSimulationPercentage: supply.apyPrimeSimulationPercentage,
    borrowApyPrimeSimulationPercentage: borrow.apyPrimeSimulationPercentage,
    supplyMerklApyRewardsPercentage: supply.apyMerklPercentage,
    borrowMerklApyRewardsPercentage: borrow.apyMerklPercentage,
    totalSupplyApyPercentage: supply.apyRewardsPercentage
      .plus(supply.apyPrimePercentage || 0)
      .plus(supply.apyMerklPercentage || 0),
    totalBorrowApyPercentage: borrow.apyRewardsPercentage
      .plus(borrow.apyPrimePercentage || 0)
      .plus(borrow.apyMerklPercentage || 0),
  };
};

export default getCombinedDistributionApys;
