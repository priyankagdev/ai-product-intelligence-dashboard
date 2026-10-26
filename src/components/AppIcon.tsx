import type { ReactNode } from "react";

export type DashboardKpiIcon = "requests" | "tokens" | "cost";

export type AppIconName =
    | "dashboard"
    | "models"
    | "prompts"
    | "analytics"
    | "users"
    | "settings"
    | "search"
    | "bell"
    | "refresh"
    | "calendar"
    | "chevron"
    | "menu"
    | "brainCircuit"
    | DashboardKpiIcon;

type AppIconProps = {
    name: AppIconName;
    className?: string;
};

const iconContents: Record<AppIconName, ReactNode> = {
    dashboard: (
        <>
            <rect x="3" y="3" width="8" height="8" rx="1.5" />
            <rect x="13" y="3" width="8" height="5" rx="1.5" />
            <rect x="13" y="10" width="8" height="11" rx="1.5" />
            <rect x="3" y="13" width="8" height="8" rx="1.5" />
        </>
    ),
    models: (
        <>
            <rect x="5" y="5" width="14" height="14" rx="2" />
            <path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" />
            <circle cx="12" cy="12" r="2" />
        </>
    ),
    prompts: (
        <>
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
            <path d="M8 10h8M8 14h5" />
        </>
    ),
    analytics: (
        <>
            <path d="M3 3v18h18" />
            <path d="m7 14 4-4 4 3 6-7" />
        </>
    ),
    users: (
        <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
        </>
    ),
    settings: (
        <>
            <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
            <path d="m19.4 15 .1.1a1.8 1.8 0 1 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 1 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 1 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 1 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 1 1 3.6 0v.2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 1 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z" />
        </>
    ),
    search: (
        <>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
        </>
    ),
    bell: (
        <>
            <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9Z" />
            <path d="M10 20a2 2 0 0 0 4 0" />
        </>
    ),
    refresh: (
        <>
            <path d="M20 11a8 8 0 0 0-14.5-4.2M4 4v4h4" />
            <path d="M4 13a8 8 0 0 0 14.5 4.2M20 20v-4h-4" />
        </>
    ),
    calendar: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4m8-4v4" />
        </>
    ),
    chevron: (
        <path d="m6 9 6 6 6-6" />
    ),
    menu: (
        <path d="M4 7h16M4 12h16M4 17h16" />
    ),
    // "brain-circuit" from Lucide (ISC license)
    brainCircuit: (
        <>
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M9 13a4.5 4.5 0 0 0 3-4" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M6 18a4 4 0 0 1-1.967-.516" />
            <path d="M12 13h4" />
            <path d="M12 18h6a2 2 0 0 1 2 2v1" />
            <path d="M12 8h8" />
            <path d="M16 8V5a2 2 0 0 1 2-2" />
            <circle cx="16" cy="13" r=".5" />
            <circle cx="18" cy="3" r=".5" />
            <circle cx="20" cy="21" r=".5" />
            <circle cx="20" cy="8" r=".5" />
        </>
    ),
    requests: (
        <path d="M2 12h4l3-8 4 16 3-8h6" />
    ),
    tokens: (
        <>
            <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
            <path d="m3 12 9 4.5 9-4.5" />
            <path d="m3 16.5 9 4.5 9-4.5" />
        </>
    ),
    cost: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M16 8.5c-.7-.7-1.7-1-3-1-1.7 0-3 .9-3 2.2s1.1 1.9 3 2.3 3 1 3 2.3-1.3 2.2-3 2.2c-1.3 0-2.3-.4-3-1" />
            <path d="M13 5.5v13" />
        </>
    ),
};

function AppIcon({ name, className }: AppIconProps) {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {iconContents[name]}
        </svg>
    );
}

export default AppIcon;
