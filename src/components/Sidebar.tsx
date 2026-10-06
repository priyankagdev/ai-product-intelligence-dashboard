import { NavLink } from "react-router-dom";

const navigationItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "AI Models", path: "/models" },
    { label: "Prompts", path: "/prompts" },
    { label: "Analytics", path: "/analytics" },
    { label: "Users", path: "/users" },
    { label: "Settings", path: "/settings" },
];

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
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
                className={`fixed inset-y-0 left-0 z-50 w-60 min-h-screen border-r border-[#D9E2EC] bg-[#EEF3F8] p-6
                    transform transition-transform duration-300
                    md:static md:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Mobile close button */}
                <div className="flex items-center justify-between md:block">
                    <h2 className="text-xl font-semibold md:mb-8">
                        AI Product
                    </h2>

                    <button
                        type="button"
                        className="rounded-lg border border-gray-300 p-2 md:hidden"
                        onClick={onClose}
                        aria-label="Close navigation"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 md:mt-0">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `block rounded-lg px-4 py-3 ${
                                            isActive
                                                ? "bg-[#D5E1EE] text-gray-900 font-semibold"
                                                : "text-gray-600 hover:bg-[#DDE7F1]"
                                        }`
                                    }
                                >
                                    {item.label}
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