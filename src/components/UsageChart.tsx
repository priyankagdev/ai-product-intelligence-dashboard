import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const usageData = [
    { day: "Mon", requests: 12000, cost: 42 },
    { day: "Tue", requests: 15000, cost: 48 },
    { day: "Wed", requests: 18000, cost: 56 },
    { day: "Thu", requests: 14000, cost: 44 },
    { day: "Fri", requests: 21000, cost: 68 },
    { day: "Sat", requests: 19000, cost: 61 },
    { day: "Sun", requests: 23450, cost: 72 },
];

function UsageChart() {
    return (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
                AI Request Trend
            </h2>

            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="#2563eb"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default UsageChart;