import { useState } from "react";
import AppIcon from "./AppIcon";
import Popover from "./Popover";

// Sample notifications for the demo; there is no notification backend.
const notifications = [
    { id: "budget", title: "Daily spend reached 80% of the demo budget", time: "2h ago" },
    { id: "latency", title: "Latency spike on Gemini Pro has resolved", time: "5h ago" },
    { id: "report", title: "Your weekly usage report is ready", time: "Yesterday" },
];

function NotificationsMenu() {
    const [hasUnread, setHasUnread] = useState(true);
    const unreadCount = hasUnread ? notifications.length : 0;

    return (
        <Popover
            label={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : "Notifications"}
            buttonClassName="relative inline-flex h-9 w-9 items-center md:h-10 md:w-10 justify-center rounded-lg border border-border bg-card text-primary shadow-sm transition-colors hover:bg-page"
            panelClassName="sm:w-80"
            trigger={
                <>
                    <AppIcon name="bell" className="h-5 w-5" />
                    {hasUnread && (
                        <span
                            aria-hidden="true"
                            className="absolute right-1.5 top-1.5 h-2 w-2 md:right-2 md:top-2 rounded-full bg-accent ring-2 ring-card"
                        />
                    )}
                </>
            }
        >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold">Notifications</h2>
                <button
                    type="button"
                    disabled={!hasUnread}
                    onClick={() => setHasUnread(false)}
                    className="rounded text-xs font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-default disabled:text-muted disabled:no-underline"
                >
                    Mark all as read
                </button>
            </div>

            <ul>
                {notifications.map((notification) => (
                    <li
                        key={notification.id}
                        className="border-b border-border px-4 py-3 last:border-b-0"
                    >
                        <p className={`text-sm ${hasUnread ? "font-medium" : "text-muted"}`}>
                            {notification.title}
                        </p>
                        <p className="mt-1 text-xs text-muted">{notification.time}</p>
                    </li>
                ))}
            </ul>

            <p className="border-t border-border px-4 py-2 text-xs text-muted">
                Sample notifications for the demo.
            </p>
        </Popover>
    );
}

export default NotificationsMenu;
