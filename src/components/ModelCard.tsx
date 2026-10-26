import type { AIModel } from "../types/AIModel";
import { formatLatency, formatRequestCount, formatUsdCost } from "../utils/modelFormatters";

type ModelCardProps = {
    model: AIModel;
};

function ModelCard({ model }: ModelCardProps) {
    return (
        <article className="min-w-0 rounded-xl border border-border bg-card p-5 text-primary shadow-sm transition-shadow hover:shadow-md sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 break-words text-lg font-semibold text-primary sm:text-xl">
                    {model.name}
                </h3>

                <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                    {model.provider}
                </span>
            </div>

            <dl className="mt-5 grid min-w-0 grid-cols-3 gap-3 sm:gap-4">
                <div className="min-w-0">
                    <dt className="text-sm font-medium text-muted">
                        Requests
                    </dt>
                    <dd className="mt-1 break-words text-base font-semibold tabular-nums text-primary sm:text-lg">
                        {formatRequestCount(model.requests)}
                    </dd>
                </div>

                <div className="min-w-0">
                    <dt className="text-sm font-medium text-muted">
                        Cost
                    </dt>
                    <dd className="mt-1 break-words text-base font-semibold tabular-nums text-primary sm:text-lg">
                        {formatUsdCost(model.costUsd)}
                    </dd>
                </div>

                <div className="min-w-0">
                    <dt className="text-sm font-medium text-muted">
                        Latency
                    </dt>
                    <dd className="mt-1 break-words text-base font-semibold tabular-nums text-primary sm:text-lg">
                        {formatLatency(model.latencyMs)}
                    </dd>
                </div>
            </dl>
        </article>
    );
}

export default ModelCard;
