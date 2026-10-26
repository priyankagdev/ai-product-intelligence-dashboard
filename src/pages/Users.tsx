import ComingSoon from "../components/ComingSoon";

function Users() {
    return (
        <ComingSoon
            title="Users"
            icon="users"
            description="See who is using AI features and how much, and manage access for your team."
            plannedFeatures={[
                "Per-user and per-team usage and spend",
                "Role-based access to dashboards",
                "Usage limits and quotas",
            ]}
        />
    );
}

export default Users;
