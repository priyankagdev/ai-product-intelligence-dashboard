import { useEffect, useState } from "react";
import type { DashboardStats } from "../types/DashboardStats";
import { getDashboardStats } from "../services/dashboardService";
import StatCard from "../components/StatCard";
import UsageChart from "../components/UsageChart";

function Dashboard() {
    const [stats, setStats] = useState<DashboardStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getDashboardStats()
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load dashboard statistics.");
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-900">
                Dashboard
            </h2>

            <p className="mt-2 text-gray-500">
                AI usage overview
            </p>

            {loading ? (
                <p className="mt-6 text-gray-500">
                    Loading dashboard...
                </p>
            ) : error ? (
                <p className="mt-6 text-red-500">
                    {error}
                </p>
            ) : (
                <>
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {stats.map((stat) => (
                            <StatCard
                                key={stat.id}
                                title={stat.title}
                                value={stat.value}
                                description={stat.description}
                            />
                        ))}
                    </div>

                    <UsageChart />
                </>
            )}
        </div>
    );
}

export default Dashboard;