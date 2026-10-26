import type { AppIconName } from "./components/AppIcon";

export type NavigationItem = {
    label: string;
    path: string;
    icon: AppIconName;
    comingSoon?: boolean;
};

export const navigationItems: NavigationItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "AI Models", path: "/models", icon: "models" },
    { label: "Prompts", path: "/prompts", icon: "prompts", comingSoon: true },
    { label: "Analytics", path: "/analytics", icon: "analytics", comingSoon: true },
    { label: "Users", path: "/users", icon: "users", comingSoon: true },
    { label: "Settings", path: "/settings", icon: "settings", comingSoon: true },
];
