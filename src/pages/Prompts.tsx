import ComingSoon from "../components/ComingSoon";

function Prompts() {
    return (
        <ComingSoon
            title="Prompts"
            icon="prompts"
            description="A shared library to manage, version and evaluate the prompts behind your AI features."
            plannedFeatures={[
                "Prompt versioning and change history",
                "Side-by-side output comparison across models",
                "Quality and cost metrics per prompt",
            ]}
        />
    );
}

export default Prompts;
