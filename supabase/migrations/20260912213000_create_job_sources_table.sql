create table if not exists public.job_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source_type text not null,
  base_url text not null,
  jobs_url text,
  description text,
  is_active boolean not null default true,
  supports_api boolean not null default false,
  supports_rss boolean not null default false,
  aggregation_allowed boolean not null default false,
  attribution_required boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint job_sources_source_type_check check (
    source_type in ('job_board', 'company_careers', 'api', 'rss', 'other')
  )
);

create unique index if not exists job_sources_name_unique_idx
  on public.job_sources(lower(name));
create index if not exists job_sources_active_idx
  on public.job_sources(is_active);
create index if not exists job_sources_type_idx
  on public.job_sources(source_type);

alter table public.job_sources enable row level security;

create policy "Anyone can read active job sources"
on public.job_sources
for select
using (is_active = true);
