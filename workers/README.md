# CreatorOS Workers
Production jobs are intentionally separated from the web request lifecycle:
1. account-sync — refresh OAuth tokens and discover connected accounts
2. metric-snapshot — persist time-series platform metrics
3. content-analyzer — classify topic, format, hook and performance
4. trend-scanner — calculate velocity, acceleration, persistence and saturation
5. opportunity-engine — combine creator baseline with trend signals
6. alert-engine — notify on breakouts, anomalies and expiring connections
7. weekly-report — render the seven-day intelligence brief and deliver email

Each job should be idempotent and keyed by workspace + connection + time window. Secrets and refresh tokens must remain server-side.