import { Link } from "react-router-dom";
import { isDemoMode } from "../config";
import AppIcon from "./AppIcon";
import Popover from "./Popover";

// The app has no authentication, so this is a fixed profile for the demo.
const userName = "Priyanka Gupta";
const userInitials = "PG";

function UserMenu() {
    return (
        <Popover
            label="User menu"
            buttonClassName="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-card pl-1 pr-1.5 md:h-10 md:gap-2 md:pl-1.5 md:pr-2 text-primary shadow-sm transition-colors hover:bg-page"
            panelClassName="sm:w-64"
            trigger={
                <>
                    <span
                        aria-hidden="true"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sidebar text-xs font-semibold text-white"
                    >
                        {userInitials}
                    </span>
                    <span className="hidden text-sm font-medium lg:inline">{userName}</span>
                    <AppIcon name="chevron" className="h-4 w-4 text-muted" />
                </>
            }
        >
            {(close) => (
                <>
                    <div className="border-b border-border px-4 py-3">
                        <p className="text-sm font-semibold">{userName}</p>
                        <p className="text-xs text-muted">Demo workspace</p>
                    </div>

                    <Link
                        to="/settings"
                        onClick={close}
                        className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                    >
                        Settings
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                            Soon
                        </span>
                    </Link>

                    <p className="border-t border-border px-4 py-3 text-xs leading-5 text-muted">
                        {isDemoMode
                            ? "All figures are simulated demo data."
                            : "Data is loaded from the local API."}{" "}
                        Sign-in is not part of this release.
                    </p>
                </>
            )}
        </Popover>
    );
}

export default UserMenu;
