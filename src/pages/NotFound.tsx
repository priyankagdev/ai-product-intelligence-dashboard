import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

function NotFound() {
    usePageTitle("Page not found");

    return (
        <section className="mx-auto mt-4 max-w-xl rounded-xl border border-border bg-card p-6 text-center shadow-sm sm:mt-10 sm:p-10">
            <p className="text-5xl font-bold tracking-tight text-accent">404</p>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-primary">
                Page not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
                The page you are looking for does not exist or has moved.
            </p>

            <Link
                to="/dashboard"
                className="mt-8 inline-flex items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
                Back to Dashboard
            </Link>
        </section>
    );
}

export default NotFound;
