type ErrorStateProps = {
    message: string;
    onRetry: () => void;
};

function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 sm:p-6"
        >
            <p className="font-semibold text-red-700">{message}</p>
            <p className="mt-1 text-sm text-red-600">
                Something went wrong while loading this data. Please try again.
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
                Try again
            </button>
        </div>
    );
}

export default ErrorState;
