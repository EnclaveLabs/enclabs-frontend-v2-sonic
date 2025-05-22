import {
  getMerklDistributionsInput,
  getMerklDistributionsOutput,
} from "../../libs/merkl";
import { MerklDistribution } from "../../types";
import BigNumber from "bignumber.js";

const calculApyFromApr = ({ apr }: { apr: number }): number => {
  const aprDecimal = (apr ?? 1) / 100;
  const apyDecimal = (1 + aprDecimal / 365) ** 365 - 1;
  return apyDecimal * 100;
};

const getMerklDistributions = ({
  merkl,
  asset,
}: getMerklDistributionsInput): getMerklDistributionsOutput => {
  const tokenAddress = asset.vToken.address;
  const merklBorrowInfos = merkl?.data?.find((m) => m.action === "BORROW");
  const merklSupplyInfos = merkl?.data?.find((m) => m.action === "LEND");
  let supplyDistribution: MerklDistribution | undefined;
  let borrowDistribution: MerklDistribution | undefined;

  const borrowMatch = merklBorrowInfos?.tokens.find((mToken) => {
    return (
      merklBorrowInfos.status === "LIVE" && // remove this to test code
      mToken.address.toLowerCase() === tokenAddress.toLowerCase()
    );
  });

  const supplyMatch = merklSupplyInfos?.tokens.find((mToken) => {
    return (
      merklSupplyInfos.status === "LIVE" && // remove this to test code
      mToken.address.toLowerCase() === tokenAddress.toLowerCase()
    );
  });

  if (!!borrowMatch && !!merklBorrowInfos) {
    const merklBorrowApy = calculApyFromApr({ apr: merklBorrowInfos.apr }); // Replace with 1 to test code

    borrowDistribution = {
      type: "merkl",
      token: asset.vToken.underlyingToken,
      apyPercentage: new BigNumber(merklBorrowApy),
      dailyDistributedTokens: new BigNumber(merklBorrowInfos.dailyRewards),
    };
  }

  if (!!supplyMatch && !!merklSupplyInfos) {
    const merklSuppplyApy = calculApyFromApr({
      apr: merklSupplyInfos.apr, // Replace with 1 to test code
    });

    supplyDistribution = {
      type: "merkl",
      token: asset.vToken.underlyingToken,
      apyPercentage: new BigNumber(merklSuppplyApy),
      dailyDistributedTokens: new BigNumber(merklSupplyInfos.dailyRewards),
    };
  }

  return {
    supplyDistribution,
    borrowDistribution,
  };
};

export default getMerklDistributions;
