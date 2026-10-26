import type { AIModel } from "../types/AIModel"
import { formatLatency, formatRequestCount, formatUsdCost } from "../utils/modelFormatters";
import { modelSortDirection, type ModelSortKey } from "../utils/modelSorting";

type ModelTableProps = {
    models: AIModel[];
    sortKey: ModelSortKey;
    onSortChange: (sortKey: ModelSortKey) => void;
}

const headerCell = "whitespace-nowrap px-6 py-4 text-sm font-semibold text-muted";

type SortableHeaderProps = {
    label: string;
    columnKey: ModelSortKey;
    align: "left" | "right";
    sortKey: ModelSortKey;
    onSortChange: (sortKey: ModelSortKey) => void;
}

function SortableHeader({ label, columnKey, align, sortKey, onSortChange }: SortableHeaderProps) {
    const isActive = sortKey === columnKey;
    const direction = modelSortDirection[columnKey];
    const arrow = (
        <span aria-hidden="true" className="inline-block w-3 text-accent">
            {isActive ? (direction === "desc" ? "↓" : "↑") : ""}
        </span>
    );

    return (
        <th
            scope="col"
            aria-sort={isActive ? (direction === "desc" ? "descending" : "ascending") : "none"}
            className={`${headerCell} ${align === "right" ? "text-right" : "text-left"}`}
        >
            <button
                type="button"
                onClick={() => onSortChange(columnKey)}
                className={`inline-flex items-center gap-1 rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? "text-primary" : ""
                }`}
            >
                {/* Fixed-width slot so the sort arrow never shifts the label; on right-aligned
                    columns it sits before the label to keep the text flush with the numbers. */}
                {align === "right" && arrow}
                {label}
                {align === "left" && arrow}
            </button>
        </th>
    );
}

function ModelTable({ models, sortKey, onSortChange }: ModelTableProps) {
    const sortProps = { sortKey, onSortChange };

    return (
        <div className="max-w-full min-w-0 overflow-x-auto rounded-xl border border-border shadow-sm">
            <table className="w-full bg-card text-primary">
                <caption className="sr-only">Model performance</caption>
                <thead className="bg-page">
                    <tr>
                        <SortableHeader label="Model" columnKey="name" align="left" {...sortProps} />
                        <th scope="col" className={`${headerCell} text-left`}>Provider</th>
                        <SortableHeader label="Requests" columnKey="requests" align="right" {...sortProps} />
                        <SortableHeader label="Cost" columnKey="cost" align="right" {...sortProps} />
                        <SortableHeader label="Latency" columnKey="latency" align="right" {...sortProps} />
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr
                            key={model.id}
                            className="border-t border-border transition-colors hover:bg-page"
                        >
                            <th scope="row" className="break-words px-6 py-4 text-left font-medium">
                                {model.name}
                            </th>

                            <td className="px-6 py-4">
                                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                                    {model.provider}
                                </span>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-right tabular-nums">
                                {formatRequestCount(model.requests)}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-right tabular-nums">
                                {formatUsdCost(model.costUsd)}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-right tabular-nums">
                                {formatLatency(model.latencyMs)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ModelTable;
