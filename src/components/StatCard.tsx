type StatCardProps = {
    title: string;
    value: string;
    description: string;
};

function StatCard({ title, value, description }: StatCardProps) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-sm font-medium text-gray-500">
                {title}
            </h2>

            <p className="mt-2 text-3xl font-bold text-gray-900">
                {value}
            </p>

            <p className="mt-2 text-gray-500">
                {description}
            </p>
        </article>
    );
}

export default StatCard;