import ComingSoon from "../components/ComingSoon";

function Analytics() {
    return (
        <ComingSoon
            title="Analytics"
            icon="analytics"
            description="Deeper insight into usage patterns, spend and performance across your AI products."
            plannedFeatures={[
                "Usage breakdowns by model, feature and team",
                "Cost forecasting and budget alerts",
                "Latency percentiles and error-rate tracking",
            ]}
        />
    );
}

export default Analytics;
