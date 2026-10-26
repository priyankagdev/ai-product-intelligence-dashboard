-- The daily chart now covers the last 30 days and is labelled with dates
-- (for example "12 Oct") instead of weekday names.
ALTER TABLE ai_dashboard.dashboard_chart_data
    DROP CONSTRAINT IF EXISTS dashboard_chart_data_day_check;
