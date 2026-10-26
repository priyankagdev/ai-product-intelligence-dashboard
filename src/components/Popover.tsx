import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type PopoverProps = {
    // Accessible name for both the trigger button and the panel.
    label: string;
    trigger: ReactNode;
    buttonClassName?: string;
    panelClassName?: string;
    children: ReactNode | ((close: () => void) => ReactNode);
};

function Popover({
    label,
    trigger,
    buttonClassName = "",
    panelClassName = "",
    children,
}: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelId = useId();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handlePointerDown(event: PointerEvent) {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
                buttonRef.current?.focus();
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const close = () => setIsOpen(false);

    return (
        <div ref={containerRef} className="sm:relative">
            <button
                ref={buttonRef}
                type="button"
                aria-label={label}
                aria-expanded={isOpen}
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => setIsOpen((open) => !open)}
                className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${buttonClassName}`}
            >
                {trigger}
            </button>

            {isOpen && (
                <div
                    id={panelId}
                    role="region"
                    aria-label={label}
                    className={`absolute inset-x-4 top-full z-10 mt-2 rounded-xl sm:inset-x-auto sm:right-0 border border-border bg-card text-primary shadow-lg ${panelClassName}`}
                >
                    {typeof children === "function" ? children(close) : children}
                </div>
            )}
        </div>
    );
}

export default Popover;
