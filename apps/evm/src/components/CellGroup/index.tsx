import { cn } from "utilities";
import { InfoIcon } from "../InfoIcon";

export interface Cell {
  label: string;
  value: string | number | React.ReactNode;
  tooltip?: string;
  color?: string;
}

export type CellGroupVariant = "primary" | "secondary";

export interface CellGroupProps {
  cells: Cell[];
  variant?: CellGroupVariant;
  smallValues?: boolean;
  isOnMarketPage?: boolean;
  className?: string;
}

export const CellGroup: React.FC<CellGroupProps> = ({
  cells,
  variant = "primary",
  smallValues = false,
  isOnMarketPage = false,
  className,
  ...containerProps
}) => {
  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "gap-2 bg-transparent p-0",
          variant === "secondary"
            ? "flex overflow-y-auto scrollbar-hidden"
            : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 xl:shadow-none"
        )}
        {...containerProps}
      >
        {cells.map(({ label, value, tooltip, color }) => (
          <div
            className={cn(
              "flex flex-col gap-y-1 whitespace-nowrap justify-center shadow-lg",
              isOnMarketPage ? "shadow-none" : "",
              variant === "secondary"
                ? "px-4 md:px-6 first-of-type:pl-0 last-of-type:pr-0 border-r border-r-lightGrey last-of-type:border-r-0"
                : "bg-cards rounded-xl p-3"
            )}
            key={`cell-group-item-${label}`}
          >
            <div className="flex items-center">
              <span className={cn("text-primary", smallValues && "text-sm")}>
                {label}
              </span>

              {!!tooltip && <InfoIcon tooltip={tooltip} className="ml-2" />}
            </div>

            <p
              className={cn(smallValues ? "text-lg" : "text-xl")}
              style={
                color
                  ? {
                      color,
                    }
                  : undefined
              }
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CellGroup;
