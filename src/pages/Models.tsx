import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import ModelCard from "../components/ModelCard";
import ModelTable from "../components/ModelTable";
import SelectControl from "../components/SelectControl";
import PageHeader from "../components/PageHeader";
import ErrorState from "../components/ErrorState";
import Skeleton from "../components/Skeleton";
import { getModels } from "../services/modelService";
import { useAsyncData } from "../hooks/useAsyncData";
import { formatLatency, formatRequestCount, formatUsdCost } from "../utils/modelFormatters";
import {
    getModelSortLabel,
    modelSortOptions,
    sortModels,
    type ModelSortKey,
} from "../utils/modelSorting";

const ALL_PROVIDERS = "all";
const PROVIDER_OPTION_PREFIX = "provider:";

const baseControlClassName =
    "min-w-0 w-full rounded-lg border border-border bg-card py-2.5 text-sm text-primary shadow-sm outline-none transition-colors placeholder:text-muted hover:border-accent/60 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 sm:text-base md:py-3";
const searchControlClassName = `${baseControlClassName} pl-10 pr-4`;

function ModelsSkeleton() {
    return (
        <div role="status" className="mt-6">
            <span className="sr-only">Loading models...</span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[0, 1, 2].map((index) => (
                    <Skeleton key={index} className="h-20" />
                ))}
            </div>
            <Skeleton className="mt-6 h-72" />
        </div>
    );
}

function Models() {
    const { data, loading, error, reload } = useAsyncData(
        getModels,
        "Failed to load AI models.",
    );
    // The search term lives in the URL (?q=) so a filtered view survives a reload and can be shared.
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("q") ?? "";
    const [selectedProvider, setSelectedProvider] = useState(ALL_PROVIDERS);
    const [sortKey, setSortKey] = useState<ModelSortKey>("requests");
    const searchInputRef = useRef<HTMLInputElement>(null);

    const models = data ?? [];
    const providers = Array.from(new Set(models.map((model) => model.provider)));
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const hasActiveFilters =
        normalizedSearchTerm !== "" || selectedProvider !== ALL_PROVIDERS;

    const filteredModels = sortModels(
        models.filter((model) => {
            const matchesSearch = model.name
                .toLowerCase()
                .includes(normalizedSearchTerm);

            const matchesProvider =
                selectedProvider === ALL_PROVIDERS ||
                `${PROVIDER_OPTION_PREFIX}${model.provider}` === selectedProvider;

            return matchesSearch && matchesProvider;
        }),
        sortKey,
    );

    const totalRequests = filteredModels.reduce((sum, model) => sum + model.requests, 0);
    const totalCost = filteredModels.reduce((sum, model) => sum + model.costUsd, 0);
    const averageLatency =
        totalRequests > 0
            ? Math.round(
                  filteredModels.reduce(
                      (sum, model) => sum + model.latencyMs * model.requests,
                      0,
                  ) / totalRequests,
              )
            : 0;

    function setSearchTerm(value: string) {
        setSearchParams(
            (previous) => {
                const next = new URLSearchParams(previous);
                if (value) {
                    next.set("q", value);
                } else {
                    next.delete("q");
                }
                return next;
            },
            { replace: true },
        );
    }

    function clearFilters() {
        setSearchTerm("");
        setSelectedProvider(ALL_PROVIDERS);
        // The Clear button disappears once filters are cleared, so keep keyboard focus useful.
        searchInputRef.current?.focus();
    }

    const summary = [
        { label: "Total requests", value: formatRequestCount(totalRequests) },
        { label: "Total cost", value: formatUsdCost(totalCost) },
        { label: "Avg. latency", value: formatLatency(averageLatency) },
    ];

    return (
        <div className="min-w-0">
            <PageHeader
                title="AI Models"
                description="Monitor AI model usage and performance"
            />

            <div className="grid min-w-0 grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
                <div className="relative col-span-2 lg:col-span-1">
                    <AppIcon
                        name="search"
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    />
                    <input
                        ref={searchInputRef}
                        type="search"
                        placeholder="Search AI Models"
                        aria-label="Search AI Models"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className={searchControlClassName}
                    />
                </div>

                <SelectControl
                    ariaLabel="Filter by provider"
                    value={selectedProvider}
                    onChange={(event) => setSelectedProvider(event.target.value)}
                    className={baseControlClassName}
                >
                    <option value={ALL_PROVIDERS}>All Providers</option>
                    {providers.map((provider) => (
                        <option
                            key={provider}
                            value={`${PROVIDER_OPTION_PREFIX}${provider}`}
                        >
                            {provider}
                        </option>
                    ))}
                </SelectControl>

                <SelectControl
                    ariaLabel="Sort models"
                    value={sortKey}
                    onChange={(event) => setSortKey(event.target.value as ModelSortKey)}
                    className={baseControlClassName}
                >
                    {modelSortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SelectControl>
            </div>

            {loading ? (
                <ModelsSkeleton />
            ) : error ? (
                <ErrorState message={error} onRetry={reload} />
            ) : models.length === 0 ? (
                <p className="mt-8 text-center text-muted">
                    No AI models available yet.
                </p>
            ) : filteredModels.length > 0 ? (
                <>
                    <dl className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
                        {summary.map((item) => (
                            <div
                                key={item.label}
                                className="min-w-0 rounded-xl border border-border bg-card px-3 py-3 shadow-sm sm:px-5 sm:py-4"
                            >
                                <dt className="text-xs font-medium text-muted sm:text-sm">{item.label}</dt>
                                <dd className="mt-1 text-sm font-semibold tabular-nums text-primary min-[380px]:text-base sm:text-xl">
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <h2 className="text-lg font-semibold tracking-tight text-primary">
                            Model Performance
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                            <p role="status">
                                Showing {filteredModels.length} of {models.length} models
                                {" · "}
                                {getModelSortLabel(sortKey)}
                            </p>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="rounded font-semibold text-accent transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Cards on small screens, table from md up */}
                    <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 md:hidden">
                        {filteredModels.map((model) => (
                            <ModelCard
                                key={model.id}
                                model={model}
                            />
                        ))}
                    </div>

                    <div className="mt-4 hidden min-w-0 md:block">
                        <ModelTable
                            models={filteredModels}
                            sortKey={sortKey}
                            onSortChange={setSortKey}
                        />
                    </div>
                </>
            ) : (
                <div className="mt-8 text-center">
                    <p className="text-muted">
                        No AI models found.
                    </p>
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-3 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Models;
