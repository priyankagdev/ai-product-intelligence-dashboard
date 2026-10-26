import { useLocation } from "react-router-dom";
import { isDemoMode } from "../config";
import AppIcon from "./AppIcon";
import Breadcrumbs from "./Breadcrumbs";
import DateRangeFilter from "./DateRangeFilter";
import NotificationsMenu from "./NotificationsMenu";
import UserMenu from "./UserMenu";

type HeaderProps = {
    onMenuClick: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
    const { pathname } = useLocation();
    const showDateRange = pathname === "/dashboard";

    return (
        <header className="sticky top-0 z-30 -mx-4 -mt-4 mb-4 border-b border-border bg-page/90 px-4 py-2 backdrop-blur md:-mx-8 md:-mt-8 md:mb-8 md:px-8 md:py-3">
            <div className="flex items-center gap-2 md:gap-3">
                <button
                    type="button"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm transition-colors hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                >
                    <AppIcon name="menu" className="h-5 w-5" />
                </button>

                <Breadcrumbs />

                <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3">
                    {isDemoMode && (
                        <span
                            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted xl:inline-flex"
                            title="All figures are simulated demo data."
                        >
                            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-400" />
                            Demo data
                        </span>
                    )}
                    {/* On small screens this filter moves into the Dashboard heading row */}
                    {showDateRange && (
                        <div className="hidden md:block">
                            <DateRangeFilter />
                        </div>
                    )}
                    <NotificationsMenu />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}

export default Header;
