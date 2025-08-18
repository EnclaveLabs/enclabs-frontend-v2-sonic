import { Modal } from "components/Modal";
import { TokenIcon } from "components/TokenIcon";
import EarnOperationForm from "./EarnOperationForm";
import { formatPercentageToReadableValue } from "utilities";
import type { Asset, Pool } from "types";

export interface EarnSupplyWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset?: Asset;
  pool?: Pool;
}

export const EarnSupplyWithdrawModal: React.FC<
  EarnSupplyWithdrawModalProps
> = ({ isOpen, onClose, asset, pool }) => (
  <Modal isOpen={isOpen} handleClose={onClose}>
    {asset && pool ? (
      <EarnOperationForm
        vToken={asset.vToken}
        poolComptrollerAddress={pool.comptrollerAddress}
        initialActiveTabIndex={0}
      />
    ) : (
      <></>
    )}
  </Modal>
);

export default EarnSupplyWithdrawModal;
