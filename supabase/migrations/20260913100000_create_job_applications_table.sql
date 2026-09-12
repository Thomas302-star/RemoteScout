create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  status text not null default 'applied',
  applied_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint job_applications_user_job_unique unique (user_id, job_id),
  constraint job_applications_status_check check (status in ('applied', 'interviewing', 'offer', 'rejected', 'withdrawn'))
);

create index if not exists job_applications_user_id_idx on public.job_applications(user_id);
create index if not exists job_applications_job_id_idx on public.job_applications(job_id);
create index if not exists job_applications_status_idx on public.job_applications(status);

alter table public.job_applications enable row level security;

create policy "Users can read their applications"
on public.job_applications
for select
using (auth.uid() = user_id);

create policy "Users can create their applications"
on public.job_applications
for insert
with check (auth.uid() = user_id);

create policy "Users can update their applications"
on public.job_applications
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can remove their applications"
on public.job_applications
for delete
using (auth.uid() = user_id);

create or replace function public.set_job_applications_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists job_applications_updated_at on public.job_applications;
create trigger job_applications_updated_at
before update on public.job_applications
for each row execute function public.set_job_applications_updated_at();
