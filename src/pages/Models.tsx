import { useEffect, useState } from "react";
import ModelCard from "../components/ModelCard";
import { getModels } from "../services/modelService";
import type { AIModel } from "../types/AIModel";
import ModelTable from "../components/ModelTable";

function Models() {
    const [models, setModels] = useState<AIModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("All");

    const filteredModels = models.filter((model) => {
    const matchesSearch = model.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesProvider =
        selectedProvider === "All" ||
        model.provider === selectedProvider;

    return matchesSearch && matchesProvider;
});

    useEffect(() => {
        getModels()
            .then((data) => {
                setModels(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load AI models.");
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-900">
                AI Models
            </h2>

            <p className="mt-2 text-gray-500">
                Monitor AI model usage and performance
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                    type="text"
                    placeholder="Search AI Models"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />

                <select
                    value={selectedProvider}
                    onChange={(event) => setSelectedProvider(event.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                >
                    <option value="All">All Providers</option>
                    <option value="OpenAI">OpenAI</option>
                    <option value="Anthropic">Anthropic</option>
                    <option value="Google">Google</option>
                </select>
            </div>

            {loading ? (
                <p className="mt-6 text-gray-500">
                    Loading models...
                </p>
            ) : error ? (
                <p className="mt-6 text-red-500">
                    {error}
                </p>
            ) : filteredModels.length > 0 ? (
                <>
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {filteredModels.map((model) => (
                            <ModelCard
                                key={model.id}
                                model={model}
                            />
                        ))}
                    </div>

                    <div className="mt-8">
                        <ModelTable models={filteredModels} />
                    </div>
                </>
            ) : (
                <p className="mt-8 text-center text-gray-500">
                    No AI models found.
                </p>
            )
            }
        </div>
    );
}

export default Models;