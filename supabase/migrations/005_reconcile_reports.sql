-- Reconcile the original weekly_reports table with the workspace-based reporting system.
-- This is safe on both a fresh database and an existing CreatorOS database.
alter table if exists public.weekly_reports add column if not exists workspace_id uuid references public.workspaces(id) on delete cascade;
alter table if exists public.weekly_reports add column if not exists recipient_email text;
alter table if exists public.weekly_reports add column if not exists subject text;
alter table if exists public.weekly_reports add column if not exists html text;
alter table if exists public.weekly_reports add column if not exists sent_at timestamptz;

create index if not exists weekly_reports_workspace_idx on public.weekly_reports(workspace_id, created_at desc);
alter table if exists public.weekly_reports alter column user_id drop not null;
