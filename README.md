# CreatorOS

CreatorOS is a multi-platform creator intelligence command center for **YouTube, TikTok, Instagram and Facebook**.

## What is built
- Cinematic responsive web app and command-center dashboard
- Supabase authentication and workspace model
- Server-side OAuth architecture for all four platforms
- Encrypted OAuth token storage with AES-256-GCM
- Cross-platform normalized metrics and native metric preservation
- Analytics, Trend Radar, Idea Lab, Content Intelligence and Settings
- Sync-job API surface for background workers
- Weekly intelligence report generation
- Resend email delivery when configured
- Supabase RLS policies for workspace-owned data
- Vercel cron configuration for weekly reporting

## Intelligence loop
**Create account → connect channels → ingest → normalize → analyze → detect trends → generate opportunities → measure → report.**

## Required setup
1. Create a Supabase project.
2. Run migrations in `supabase/migrations/`.
3. Copy `.env.example` to `.env.local`.
4. Generate a strong random `TOKEN_ENCRYPTION_KEY`.
5. Configure OAuth applications and redirect URLs for YouTube/Google, TikTok and Meta.
6. Set `SUPABASE_SERVICE_ROLE_KEY` only on the server.
7. Configure Resend and `REPORT_FROM_EMAIL` for weekly email delivery.
8. Deploy to Vercel or another Next.js host.

## OAuth callback URLs
Use your deployed origin:
- `/api/auth/callback/youtube`
- `/api/auth/callback/tiktok`
- `/api/auth/callback/instagram`
- `/api/auth/callback/facebook`

Connect routes: `/api/auth/youtube`, `/api/auth/tiktok`, `/api/auth/instagram`, `/api/auth/facebook`.

## Background jobs
See `workers/README.md`. The intended production pipeline is account sync → metric snapshots → content analysis → trend scanning → opportunity detection → alerts → weekly report.

## Local development
```bash
npm install
npm run dev
```

## Important
The UI can run before external platform credentials are configured, but **real platform metrics and OAuth connections require the corresponding developer applications, scopes, redirect URLs and API permissions**. Demo dashboard values are presentation data until a connection has been synced.
