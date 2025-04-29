import useGetMerkl from "../../clients/api/queries/getMerkl/useGetMerkl";
export interface GetMerklRewardApyInput {
    tokenAddress: string;
    liquidityType: "LEND" | "BORROW";
}

export interface GetMerklRewardApyOutput {
    merklApy: number;
    dailyRewards: number;
}

export interface EnclapsMerklWrapperProps {
    children?: React.ReactNode;
}

const EnclapsMerklWrapper = ({children}: EnclapsMerklWrapperProps) => {
    const _ = useGetMerkl();

    return children;
};

export default EnclapsMerklWrapper;