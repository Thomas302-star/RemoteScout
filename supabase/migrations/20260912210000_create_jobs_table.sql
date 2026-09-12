create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  company_logo_url text,
  description text not null,
  location text,
  remote_status text not null default 'remote',
  employment_type text,
  salary_min numeric,
  salary_max numeric,
  salary_currency text,
  experience_level text,
  skills text[] not null default '{}',
  category text,
  source_name text not null,
  source_url text not null,
  original_job_url text not null,
  application_url text not null,
  posted_at timestamptz,
  discovered_at timestamptz not null default now(),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint jobs_remote_status_check check (remote_status in ('remote', 'hybrid', 'onsite')),
  constraint jobs_status_check check (status in ('active', 'expired', 'removed')),
  constraint jobs_salary_check check (
    salary_min is null or salary_max is null or salary_min <= salary_max
  )
);

create index if not exists jobs_status_idx on public.jobs(status);
create index if not exists jobs_category_idx on public.jobs(category);
create index if not exists jobs_remote_status_idx on public.jobs(remote_status);
create index if not exists jobs_posted_at_idx on public.jobs(posted_at desc);
create index if not exists jobs_discovered_at_idx on public.jobs(discovered_at desc);
create index if not exists jobs_source_name_idx on public.jobs(source_name);

create unique index if not exists jobs_original_job_url_unique_idx
  on public.jobs(original_job_url);

create unique index if not exists jobs_source_job_identity_unique_idx
  on public.jobs(source_name, original_job_url);

alter table public.jobs enable row level security;

create policy "Anyone can read active jobs"
on public.jobs
for select
using (status = 'active');
