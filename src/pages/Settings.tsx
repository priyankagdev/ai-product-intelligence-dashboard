import ComingSoon from "../components/ComingSoon";

function Settings() {
    return (
        <ComingSoon
            title="Settings"
            icon="settings"
            description="Configure workspace preferences, integrations and notifications."
            plannedFeatures={[
                "Provider API connections",
                "Alert and notification preferences",
                "Workspace and display options",
            ]}
        />
    );
}

export default Settings;
