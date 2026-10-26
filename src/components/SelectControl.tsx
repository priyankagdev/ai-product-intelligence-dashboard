import type { ChangeEvent, ReactNode } from "react";
import AppIcon from "./AppIcon";

type SelectControlProps = {
    ariaLabel: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    // Border, background, text size and focus styles; horizontal padding is handled here.
    className: string;
    children: ReactNode;
};

// A native select with its own chevron, so the arrow sits at the same distance
// from the right edge in every browser and the text never runs underneath it.
function SelectControl({ ariaLabel, value, onChange, className, children }: SelectControlProps) {
    return (
        <div className="relative min-w-0">
            <select
                aria-label={ariaLabel}
                value={value}
                onChange={onChange}
                className={`${className} cursor-pointer appearance-none truncate pl-3 pr-9 sm:pl-4 sm:pr-10`}
            >
                {children}
            </select>
            <AppIcon
                name="chevron"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 sm:right-4 -translate-y-1/2 text-muted"
            />
        </div>
    );
}

export default SelectControl;
