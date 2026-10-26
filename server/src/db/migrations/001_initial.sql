CREATE SCHEMA IF NOT EXISTS ai_dashboard;

CREATE TABLE IF NOT EXISTS ai_dashboard.dashboard_stats (
    id text PRIMARY KEY CHECK (id IN ('requests', 'tokens', 'cost')),
    title text NOT NULL,
    value numeric(18, 2) NOT NULL CHECK (value >= 0),
    description text NOT NULL,
    sort_order smallint NOT NULL UNIQUE CHECK (sort_order > 0),
    CHECK (id = 'cost' OR value = trunc(value))
);

CREATE TABLE IF NOT EXISTS ai_dashboard.dashboard_chart_data (
    day text PRIMARY KEY CHECK (day IN ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')),
    requests integer NOT NULL CHECK (requests >= 0),
    cost_usd numeric(12, 2) NOT NULL CHECK (cost_usd >= 0),
    sort_order smallint NOT NULL UNIQUE CHECK (sort_order > 0)
);

CREATE TABLE IF NOT EXISTS ai_dashboard.ai_models (
    id text PRIMARY KEY,
    name text NOT NULL,
    provider text NOT NULL,
    requests integer NOT NULL CHECK (requests >= 0),
    cost_usd numeric(12, 2) NOT NULL CHECK (cost_usd >= 0),
    latency_ms integer NOT NULL CHECK (latency_ms >= 0),
    sort_order smallint NOT NULL UNIQUE CHECK (sort_order > 0)
);
