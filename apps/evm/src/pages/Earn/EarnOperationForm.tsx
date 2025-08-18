import { Tabs, type ModalProps, type TabContent } from "components";
import AssetAccessor from "containers/AssetAccessor";
import { useTranslation } from "libs/translations";
import type { VToken } from "types";
import SupplyForm from "pages/Market/Market/OperationForm/SupplyForm";
import WithdrawForm from "pages/Market/Market/OperationForm/WithdrawForm";

export interface EarnOperationFormProps {
  vToken: VToken;
  poolComptrollerAddress: string;
  initialActiveTabIndex?: number;
  onSubmitSuccess?: ModalProps["handleClose"];
}

export const EarnOperationForm: React.FC<EarnOperationFormProps> = ({
  onSubmitSuccess,
  vToken,
  poolComptrollerAddress,
  initialActiveTabIndex = 0,
}) => {
  const { t } = useTranslation();

  const tabsContent: TabContent[] = [
    {
      title: t("operationForm.supplyTabTitle"),
      content: (
        <AssetAccessor
          vToken={vToken}
          poolComptrollerAddress={poolComptrollerAddress}
          action="supply"
        >
          {({ asset, pool }) => (
            <div className="space-y-3">
              <SupplyForm
                asset={asset}
                pool={pool}
                onSubmitSuccess={onSubmitSuccess}
                hideCollateralToggle
                hideAccountData
              />
            </div>
          )}
        </AssetAccessor>
      ),
    },
    {
      title: t("operationForm.withdrawTabTitle"),
      content: (
        <AssetAccessor
          vToken={vToken}
          poolComptrollerAddress={poolComptrollerAddress}
          action="withdraw"
        >
          {({ asset, pool }) => (
            <div className="space-y-3">
              <WithdrawForm
                asset={asset}
                pool={pool}
                onSubmitSuccess={onSubmitSuccess}
                hideAccountData
              />
            </div>
          )}
        </AssetAccessor>
      ),
    },
  ];

  return (
    <Tabs
      className="space-y-3"
      tabsContent={tabsContent}
      initialActiveTabIndex={initialActiveTabIndex}
      tokenAddress={vToken.underlyingToken.address}
    />
  );
};

export default EarnOperationForm;
