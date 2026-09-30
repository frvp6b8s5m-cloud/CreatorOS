# CreatorOS

CreatorOS is a creator-intelligence command center.

## Product flow
Create account → Connect channels → Initial intelligence scan → Dashboard → Weekly email report.

## Stack
Next.js + TypeScript, Supabase Auth + Postgres + RLS, weekly cron, and a cinematic responsive dashboard.

## Setup
Copy `.env.example` to `.env.local`. Configure Supabase and apply `supabase/migrations/001_creatoros.sql`. Configure the weekly report email provider and cron secret.

## Run
npm install
npm run dev
