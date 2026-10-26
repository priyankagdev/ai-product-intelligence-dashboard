type SegmentedControlOption<T extends string | number> = {
    value: T;
    label: string;
};

type SegmentedControlProps<T extends string | number> = {
    ariaLabel: string;
    options: SegmentedControlOption<T>[];
    value: T;
    onChange: (value: T) => void;
};

function SegmentedControl<T extends string | number>({
    ariaLabel,
    options,
    value,
    onChange,
}: SegmentedControlProps<T>) {
    return (
        <div
            role="group"
            aria-label={ariaLabel}
            className="inline-flex rounded-lg border border-border bg-card p-1 shadow-sm"
        >
            {options.map((option) => {
                const isActive = option.value === value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onChange(option.value)}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                            isActive
                                ? "bg-accent text-white shadow-sm"
                                : "text-muted hover:bg-page hover:text-primary"
                        }`}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}

export default SegmentedControl;
