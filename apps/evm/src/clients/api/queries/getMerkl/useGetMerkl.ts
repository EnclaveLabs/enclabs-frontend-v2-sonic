import { useQuery } from "@tanstack/react-query";
import FunctionKey from "constants/functionKey";
import { MerklApi } from "@merkl/api";
import { getMerkl } from "./index";

export const merkl = MerklApi("https://api.merkl.xyz").v4;
export const useGetMerkl = () => {
  return useQuery({
    queryKey: [FunctionKey.GET_ENCLABS_MERKL],
    queryFn: () => getMerkl,
  });
};
