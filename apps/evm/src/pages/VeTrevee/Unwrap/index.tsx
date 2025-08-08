import { TreveeWraping } from "../../../types";
import UnwrapForm from "./UnwrapForm";

interface VeTreveeUnwrapInput {
  treveeWraping: TreveeWraping;
}

export const VeTreveUnwrap: React.FC<VeTreveeUnwrapInput> = ({
  treveeWraping,
}) => {
  return (
    !!treveeWraping.manager?.address && (
      <UnwrapForm treveeWraping={treveeWraping} />
    )
  );
};
