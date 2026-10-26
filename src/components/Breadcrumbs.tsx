import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "../navigation";

function Breadcrumbs() {
    const { pathname } = useLocation();
    const currentLabel =
        navigationItems.find((item) => item.path === pathname)?.label ?? "Page not found";

    return (
        <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-2 text-sm">
                <li className="hidden sm:block">
                    <Link
                        to="/dashboard"
                        className="rounded text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                        Home
                    </Link>
                </li>
                <li aria-hidden="true" className="hidden text-muted sm:block">
                    /
                </li>
                <li
                    aria-current="page"
                    className="truncate font-semibold text-primary"
                >
                    {currentLabel}
                </li>
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
