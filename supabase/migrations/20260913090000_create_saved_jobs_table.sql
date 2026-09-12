create table if not exists public.saved_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint saved_jobs_user_job_unique unique (user_id, job_id)
);

create index if not exists saved_jobs_user_id_idx on public.saved_jobs(user_id);
create index if not exists saved_jobs_job_id_idx on public.saved_jobs(job_id);

alter table public.saved_jobs enable row level security;

create policy "Users can read their saved jobs"
on public.saved_jobs
for select
using (auth.uid() = user_id);

create policy "Users can save jobs"
on public.saved_jobs
for insert
with check (auth.uid() = user_id);

create policy "Users can remove their saved jobs"
on public.saved_jobs
for delete
using (auth.uid() = user_id);
