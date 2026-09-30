create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, timezone text default 'America/Los_Angeles', weekly_report_enabled boolean default true, weekly_report_day smallint default 0, weekly_report_hour smallint default 18, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists public.channels (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, platform text not null, channel_url text, channel_handle text, external_id text, display_name text, status text default 'pending', connected_at timestamptz, created_at timestamptz default now());
create table if not exists public.weekly_reports (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, period_start date not null, period_end date not null, status text default 'queued', email_sent_at timestamptz, payload jsonb default '{}'::jsonb, created_at timestamptz default now());

alter table public.profiles enable row level security;
alter table public.channels enable row level security;
alter table public.weekly_reports enable row level security;

create policy "profiles own row" on public.profiles for all to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "channels own rows" on public.channels for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "reports own rows" on public.weekly_reports for select to authenticated using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user() returns trigger language plpgsql security invoker set search_path = public as $$ begin insert into public.profiles(id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'name','Creator')); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();