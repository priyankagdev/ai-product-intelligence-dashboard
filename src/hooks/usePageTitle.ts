import { useEffect } from "react";

const APP_NAME = "AI Product Intelligence";

export function usePageTitle(title: string) {
    useEffect(() => {
        document.title = `${title} · ${APP_NAME}`;
    }, [title]);
}
