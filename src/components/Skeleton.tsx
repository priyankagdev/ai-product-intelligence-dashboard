type SkeletonProps = {
    className?: string;
};

function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={`animate-pulse rounded-lg bg-border/70 ${className}`}
        />
    );
}

export default Skeleton;
