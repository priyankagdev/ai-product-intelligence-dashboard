import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AppIcon from "./AppIcon";
import { navigationItems } from "../navigation";

// One set of interaction states shared by every control in the sidebar.
const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-hover-text";
const hoverState = "hover:bg-sidebar-hover hover:text-sidebar-hover-text";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    className="fixed inset-0 z-40 bg-black/30 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-white/10 bg-sidebar p-6 text-white
                    transform transition-[transform,visibility] duration-300
                    md:visible md:sticky md:top-0 md:h-screen md:shrink-0 md:translate-x-0
                    ${isOpen ? "visible translate-x-0" : "invisible -translate-x-full"}`}
            >
                {/* Brand and mobile close button */}
                <div className="flex items-center justify-between md:mb-8 md:block">
                    <div className="flex items-center gap-3">
                        <AppIcon
                            name="brainCircuit"
                            className="h-8 w-8 shrink-0 text-[#2DD4BF]"
                        />
                        <div>
                            <p className="text-xl font-semibold">AI Product</p>
                            <p className="text-xs text-white/60">Intelligence Dashboard</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={`rounded-lg border border-white/20 p-2 text-white/75 transition-colors ${hoverState} ${focusRing} md:hidden`}
                        onClick={onClose}
                        aria-label="Close navigation"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav aria-label="Main navigation" className="mt-6 md:mt-0">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg border-l-2 px-4 py-3 transition-colors ${focusRing} ${
                                            isActive
                                                ? "border-accent bg-white/10 font-semibold text-white hover:bg-white/15"
                                                : `border-transparent text-white/75 ${hoverState}`
                                        }`
                                    }
                                >
                                    <AppIcon name={item.icon} className="h-5 w-5 shrink-0" />
                                    <span>{item.label}</span>
                                    {item.comingSoon && (
                                        <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide opacity-80">
                                            Soon
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
