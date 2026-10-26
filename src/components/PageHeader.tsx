import type { ReactNode } from "react";
import { usePageTitle } from "../hooks/usePageTitle";

type PageHeaderProps = {
    title: string;
    description: string;
    actions?: ReactNode;
};

function PageHeader({ title, description, actions }: PageHeaderProps) {
    usePageTitle(title);

    return (
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    {title}
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
                    {description}
                </p>
            </div>

            {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
    );
}

export default PageHeader;
