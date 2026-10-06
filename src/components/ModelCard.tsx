import type { AIModel } from "../types/AIModel";

type ModelCardProps = {
    model: AIModel;
};

function ModelCard({ model }: ModelCardProps) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="text-xl font-semibold">
                {model.name}
            </h3>

            <p className="mt-2 text-gray-500">
                Provider: {model.provider}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                    <span className="block text-sm text-gray-500">
                        Requests
                    </span>
                    <span className="text-lg font-semibold">
                        {model.requests.toLocaleString()}
                    </span>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">
                        Cost
                    </span>
                    <span className="text-lg font-semibold">
                        ${model.cost.toFixed(2)}
                    </span>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">
                        Latency
                    </span>
                    <span className="text-lg font-semibold">
                        {model.latency} ms
                    </span>
                </div>
            </div>
        </article>
    );
}

export default ModelCard;