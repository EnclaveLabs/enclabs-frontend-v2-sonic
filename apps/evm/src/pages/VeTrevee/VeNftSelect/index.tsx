import { forwardRef } from "react";

import { Select, type SelectOption, type SelectProps } from "components";
import { venfts } from "../../../libs/venfts/infos/commonVeNFTs/sonicMainnet";
import { cn } from "../../../utilities";

export const getOptionsFromAvailableVeNFTs = (veNftList: typeof venfts) =>
  veNftList.map((venft) => {
    const option: SelectOption<string> = {
      label: (
        <div className="flex items-center">
          <img
            src={venft.asset}
            alt={venft.symbol}
            className="w-5 max-w-none flex-none"
          />

          <span className={cn("flex ml-2 grow items-center gap-x-1")}>
            <span>{venft.symbol}</span>
          </span>
        </div>
      ),
      value: venft.symbol,
    };

    return option;
  });

const defaultOptions = getOptionsFromAvailableVeNFTs(venfts);

type SelectPropsOptionalOptions = Pick<Partial<SelectProps>, "options"> &
  Omit<SelectProps, "options">;
export type ChainSelectProps = SelectPropsOptionalOptions;

export const VeNftSelect = forwardRef<
  React.ElementRef<typeof Select>,
  ChainSelectProps
>(({ value, options = defaultOptions, ...props }, ref) => (
  <Select value={value} options={options} ref={ref} size="large" {...props} />
));
