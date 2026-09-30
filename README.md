# CreatorOS

CreatorOS is a creator intelligence dashboard for monitoring **YouTube, TikTok, Instagram, and Facebook** in one place.

## What it does

- Account creation and sign-in
- Add and manage creator channels
- Cross-platform performance monitoring
- Analytics and momentum signals
- Trend Radar
- AI-assisted content opportunities
- Weekly intelligence reports
- Email delivery of weekly reports
- Supabase-backed data storage
- OAuth-ready platform connections

## Stack

- Next.js + React + TypeScript
- Supabase Auth + Postgres
- Vercel or Railway for hosting
- Resend for email reports
- Platform APIs for live channel metrics

## Local setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Fill in the Supabase variables first.
5. Run the SQL migrations in `supabase/migrations/` in filename order.
6. Start the app with `npm run dev`.
7. Open `http://localhost:3000`.

## Production configuration

Set the same environment variables in your hosting provider. Never commit `.env.local` or real API keys.

For OAuth, each provider's developer console must use the exact callback URL configured in the corresponding `*_REDIRECT_URI` variable.

## Database

The migrations build the CreatorOS data model for users, channels, platform connections, metric snapshots, content, trends, opportunities, and reports.

## Important

The public channel URL onboarding flow is useful for a quick setup, but **live platform metrics require valid platform API/OAuth credentials**. Until those credentials are configured, the application should not claim that a platform is connected or that its metrics are live.

## Project structure

```
app/          Next.js routes and UI
lib/          shared server/client logic and platform adapters
supabase/     database migrations
workers/      background-worker documentation
docs/         project documentation
```
