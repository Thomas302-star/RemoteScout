import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Job = {
  id: string;
  title: string;
  company: string;
  company_logo_url: string | null;
  location: string | null;
  remote_status: "remote" | "hybrid" | "onsite";
  employment_type: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  category: string | null;
  source_name: string;
  original_job_url: string;
  application_url: string;
  posted_at: string | null;
  discovered_at: string;
};

type SearchParams = {
  q?: string;
  remote?: string;
  type?: string;
  category?: string;
};

function formatSalary(job: Job) {
  if (job.salary_min == null && job.salary_max == null) return null;

  const currency = job.salary_currency ? `${job.salary_currency} ` : "";
  const format = (value: number) => Math.round(value).toLocaleString();

  if (job.salary_min != null && job.salary_max != null) {
    return `${currency}${format(job.salary_min)} – ${currency}${format(job.salary_max)}`;
  }

  if (job.salary_min != null) return `From ${currency}${format(job.salary_min)}`;
  return `Up to ${currency}${format(job.salary_max ?? 0)}`;
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(value),
  );
}

function label(value: string | null) {
  if (!value) return null;
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildJobsUrl(params: SearchParams) {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.remote) query.set("remote", params.remote);
  if (params.type) query.set("type", params.type);
  if (params.category) query.set("category", params.category);
  const value = query.toString();
  return value ? `/jobs?${value}` : "/jobs";
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f9fc] px-5 text-center text-[#0b1220]">
        <div className="max-w-md rounded-3xl border border-[#e1e7ef] bg-white p-8 shadow-xl shadow-[#1d3557]/5">
          <h1 className="text-2xl font-black">Supabase setup required</h1>
          <p className="mt-3 text-sm leading-6 text-[#667085]">
            Add the Supabase environment variables to the deployment before using the jobs directory.
          </p>
        </div>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/jobs");

  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const remote = params.remote ?? "";
  const type = params.type ?? "";
  const category = params.category ?? "";

  let jobsQuery = supabase
    .from("jobs")
    .select(
      "id, title, company, company_logo_url, location, remote_status, employment_type, salary_min, salary_max, salary_currency, category, source_name, original_job_url, application_url, posted_at, discovered_at",
    )
    .eq("status", "active");

  if (q) {
    const safeSearch = q.replace(/[%(),]/g, " ").trim();
    if (safeSearch) {
      jobsQuery = jobsQuery.or(
        `title.ilike.%${safeSearch}%,company.ilike.%${safeSearch}%,location.ilike.%${safeSearch}%,category.ilike.%${safeSearch}%`,
      );
    }
  }

  if (["remote", "hybrid", "onsite"].includes(remote)) {
    jobsQuery = jobsQuery.eq("remote_status", remote);
  }

  if (type) jobsQuery = jobsQuery.eq("employment_type", type);
  if (category) jobsQuery = jobsQuery.eq("category", category);

  const [{ data: jobs, error }, { data: categoryRows }] = await Promise.all([
    jobsQuery
      .order("posted_at", { ascending: false, nullsFirst: false })
      .order("discovered_at", { ascending: false }),
    supabase.from("jobs").select("category").eq("status", "active").not("category", "is", null),
  ]);

  const typedJobs = (jobs ?? []) as Job[];
  const categories = Array.from(
    new Set((categoryRows ?? []).map((row) => row.category).filter(Boolean) as string[]),
  ).sort();

  const hasFilters = Boolean(q || remote || type || category);

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1220]">
      <header className="sticky top-0 z-20 border-b border-[#e4e9f0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white shadow-lg shadow-[#155eef]/20">R</span>
            <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
          </Link>
          <Link href="/dashboard" className="rounded-full border border-[#d8e0ea] bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-[#155eef] hover:text-[#155eef]">
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">Discover</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Remote jobs</h1>
          <p className="mt-3 max-w-2xl leading-7 text-[#667085]">
            Search active remote opportunities and narrow the results by work setup, employment type, or category.
          </p>
        </div>

        <section className="mb-7 rounded-2xl border border-[#e1e7ef] bg-white p-5 shadow-sm sm:p-6">
          <form action="/jobs" method="get" className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_1fr_1fr_1fr_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#344054]">Search jobs</span>
              <input
                name="q"
                defaultValue={q}
                placeholder="Title, company, location..."
                className="w-full rounded-xl border border-[#d8e0ea] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#98a2b3] focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#344054]">Work setup</span>
              <select name="remote" defaultValue={remote} className="w-full rounded-xl border border-[#d8e0ea] bg-white px-4 py-3 text-sm outline-none focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10">
                <option value="">All setups</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#344054]">Employment</span>
              <select name="type" defaultValue={type} className="w-full rounded-xl border border-[#d8e0ea] bg-white px-4 py-3 text-sm outline-none focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10">
                <option value="">All types</option>
                <option value="full_time">Full time</option>
                <option value="part_time">Part time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#344054]">Category</span>
              <select name="category" defaultValue={category} className="w-full rounded-xl border border-[#d8e0ea] bg-white px-4 py-3 text-sm outline-none focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10">
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>{label(item)}</option>
                ))}
              </select>
            </label>

            <div className="flex gap-2 lg:justify-end">
              <button type="submit" className="flex-1 rounded-xl bg-[#155eef] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b4dcc] lg:flex-none">
                Search
              </button>
              {hasFilters ? (
                <Link href="/jobs" className="rounded-xl border border-[#d8e0ea] bg-white px-4 py-3 text-sm font-bold text-[#475467] transition hover:border-[#155eef] hover:text-[#155eef]">
                  Clear
                </Link>
              ) : null}
            </div>
          </form>
        </section>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#667085]">
            {typedJobs.length} {typedJobs.length === 1 ? "job" : "jobs"} found
            {hasFilters ? " for your search" : ""}
          </p>
        </div>

        {error ? (
          <section className="rounded-2xl border border-[#fecaca] bg-white p-7 shadow-sm">
            <h2 className="text-lg font-black">We could not load the jobs</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">Please try again later.</p>
          </section>
        ) : typedJobs.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-[#cfd8e3] bg-white px-6 py-16 text-center shadow-sm sm:px-10">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#eff4ff] text-[#155eef]">
              <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" />
              </svg>
            </div>
            <h2 className="mt-5 text-2xl font-black">{hasFilters ? "No jobs match your search" : "No active jobs yet"}</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#667085]">
              {hasFilters
                ? "Try a different search term or remove one of the filters."
                : "RemoteScout is ready for job listings. Once a connected source provides active jobs, they will appear here automatically."}
            </p>
            {hasFilters ? (
              <Link href="/jobs" className="mt-6 inline-flex rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 transition hover:bg-[#0b4dcc]">
                Clear search
              </Link>
            ) : (
              <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 transition hover:bg-[#0b4dcc]">
                Back to dashboard
              </Link>
            )}
          </section>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {typedJobs.map((job) => {
              const salary = formatSalary(job);
              const posted = formatDate(job.posted_at ?? job.discovered_at);

              return (
                <article key={job.id} className="group rounded-2xl border border-[#e1e7ef] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#bfd0ee] hover:shadow-md">
                  <div className="flex gap-4">
                    <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#e4e9f0] bg-[#f8fafc] text-lg font-black text-[#155eef]">
                      {job.company_logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={job.company_logo_url} alt="" className="size-full object-cover" />
                      ) : (
                        job.company.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-black leading-6 group-hover:text-[#155eef]">{job.title}</h2>
                      <p className="mt-1 font-semibold text-[#475467]">{job.company}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-full bg-[#ecfdf3] px-3 py-1.5 text-[#067647]">{label(job.remote_status)}</span>
                    {job.employment_type ? <span className="rounded-full bg-[#f2f4f7] px-3 py-1.5 text-[#475467]">{label(job.employment_type)}</span> : null}
                    {job.category ? <span className="rounded-full bg-[#f2f4f7] px-3 py-1.5 text-[#475467]">{label(job.category)}</span> : null}
                  </div>

                  <dl className="mt-5 grid gap-3 text-sm text-[#667085] sm:grid-cols-2">
                    {job.location ? <div><dt className="font-bold text-[#344054]">Location</dt><dd className="mt-1">{job.location}</dd></div> : null}
                    {salary ? <div><dt className="font-bold text-[#344054]">Salary</dt><dd className="mt-1">{salary}</dd></div> : null}
                    <div><dt className="font-bold text-[#344054]">Source</dt><dd className="mt-1">{job.source_name}</dd></div>
                    {posted ? <div><dt className="font-bold text-[#344054]">Posted</dt><dd className="mt-1">{posted}</dd></div> : null}
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef1f5] pt-5">
                    <a href={job.original_job_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#475467] hover:text-[#155eef]">View source</a>
                    <a href={job.application_url} target="_blank" rel="noreferrer" className="rounded-full bg-[#155eef] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0b4dcc]">Apply for this job</a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
