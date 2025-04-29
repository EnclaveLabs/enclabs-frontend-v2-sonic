import {GetMerklRewardApyInput, GetMerklRewardApyOutput} from "../../libs/merkl";
import useGetMerkl from "../../clients/api/queries/getMerkl/useGetMerkl";

const getMerklRewardApy = ({
                                    tokenAddress,
                                    liquidityType,
                                }: GetMerklRewardApyInput): GetMerklRewardApyOutput => {
    const {data: merkl} = useGetMerkl();

    const opportunity = merkl?.data?.find((opportunity) => {
        const tokenMatch = opportunity.tokens.some((token) => {
            return token.address.toLowerCase() === tokenAddress.toLowerCase();
        });
        /* If campain is live, token is present and liquidity match */
        return (
            // opportunity.status === "LIVE" &&
            opportunity.action === liquidityType &&
            tokenMatch
        );
    });

    if (!opportunity) {
        return {
            merklApy: 0,
            dailyRewards: 0
        };
    } else {
        opportunity.apr = 1; //TMP TEST
    }

    const apr = opportunity.apr ?? 1;
    const aprDecimal = apr / 100;
    const apyDecimal = (1 + aprDecimal / 365) ** 365 - 1;
    const merklApy = apyDecimal * 100; // Convertir en %

    return {
        merklApy,
        dailyRewards: opportunity.dailyRewards,
    };
};

export default getMerklRewardApy;
