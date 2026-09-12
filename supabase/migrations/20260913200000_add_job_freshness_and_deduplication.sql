alter table public.jobs
  add column if not exists dedupe_key text;

update public.jobs
set dedupe_key = md5(lower(trim(original_job_url)))
where dedupe_key is null;

alter table public.jobs
  alter column dedupe_key set not null;

create unique index if not exists jobs_dedupe_key_unique_idx
  on public.jobs(dedupe_key);

create or replace function public.expire_stale_jobs(max_age_days integer default 30)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  expired_count integer;
begin
  if max_age_days < 1 then
    raise exception 'max_age_days must be at least 1';
  end if;

  update public.jobs
  set status = 'expired',
      updated_at = now()
  where status = 'active'
    and coalesce(posted_at, discovered_at) < now() - make_interval(days => max_age_days);

  get diagnostics expired_count = row_count;
  return expired_count;
end;
$$;

revoke all on function public.expire_stale_jobs(integer) from public;
grant execute on function public.expire_stale_jobs(integer) to service_role;
