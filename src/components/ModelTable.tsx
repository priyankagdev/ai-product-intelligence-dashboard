import type { AIModel } from "../types/AIModel"

type ModelTableProps = {
    models: AIModel[];
}

function ModelTable({ models }: ModelTableProps) {
    return (
        <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Model Performance
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full min-w-175 bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Model</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Provider</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Requests</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Costs</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Latency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map((model) => (
                            <tr
                                key={model.id}
                                className="border-t border-gray-100 hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {model.name}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {model.provider}
                                </td>

                                <td className="px-6 py-4">
                                    {model.requests.toLocaleString()}
                                </td>

                                <td className="px-6 py-4">
                                    ${model.cost.toFixed(2)}
                                </td>

                                <td className="px-6 py-4">
                                    {model.latency} ms
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ModelTable;