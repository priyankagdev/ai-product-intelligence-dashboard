import { Link } from "react-router-dom";
import AppIcon, { type AppIconName } from "./AppIcon";
import { usePageTitle } from "../hooks/usePageTitle";

type ComingSoonProps = {
    title: string;
    description: string;
    icon: AppIconName;
    plannedFeatures: string[];
};

function ComingSoon({ title, description, icon, plannedFeatures }: ComingSoonProps) {
    usePageTitle(`${title} (Coming soon)`);

    return (
        <section
            aria-labelledby="coming-soon-title"
            className="mx-auto mt-4 max-w-xl rounded-xl border border-border bg-card p-6 text-center shadow-sm sm:mt-10 sm:p-10"
        >
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#0D9488] via-[#2DD4BF] to-[#99F6E4] text-[#172B35] shadow-sm">
                <AppIcon name={icon} className="h-7 w-7" />
            </span>

            <p className="mt-5 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                Coming soon
            </p>

            <h1
                id="coming-soon-title"
                className="mt-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl"
            >
                {title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
                {description}
            </p>

            <div className="mt-6 border-t border-border pt-6 text-left">
                <h2 className="text-sm font-semibold text-primary">
                    Planned for a future release
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                    {plannedFeatures.map((feature) => (
                        <li key={feature} className="flex gap-3">
                            <span
                                aria-hidden="true"
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <Link
                to="/dashboard"
                className="mt-8 inline-flex items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
                Back to Dashboard
            </Link>
        </section>
    );
}

export default ComingSoon;
