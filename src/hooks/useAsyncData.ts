import { useCallback, useEffect, useState } from "react";

type AsyncState<T> = {
    data: T | null;
    // True while loading with nothing to show yet.
    loading: boolean;
    // True while re-fetching with the previous data still on screen.
    refreshing: boolean;
    error: string | null;
    updatedAt: Date | null;
};

// `load` must be a stable reference (for example a module-level function).
export function useAsyncData<T>(load: () => Promise<T>, errorMessage: string) {
    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: true,
        refreshing: false,
        error: null,
        updatedAt: null,
    });

    useEffect(() => {
        let cancelled = false;

        load()
            .then((data) => {
                if (!cancelled) {
                    setState({
                        data,
                        loading: false,
                        refreshing: false,
                        error: null,
                        updatedAt: new Date(),
                    });
                }
            })
            .catch((error: unknown) => {
                console.error(errorMessage, error);
                if (!cancelled) {
                    setState({
                        data: null,
                        loading: false,
                        refreshing: false,
                        error: errorMessage,
                        updatedAt: null,
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [load, errorMessage, attempt]);

    const reload = useCallback(() => {
        setState((previous) => ({
            ...previous,
            loading: previous.data === null,
            refreshing: previous.data !== null,
            error: null,
        }));
        setAttempt((current) => current + 1);
    }, []);

    return { ...state, reload };
}
