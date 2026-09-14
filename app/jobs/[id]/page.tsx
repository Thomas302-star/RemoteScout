import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import SaveJobButton from "@/components/jobs/save-job-button";
import ApplicationStatusButton from "@/components/jobs/application-status-button";

type Job = {
  id: string;
  title: string;
  company: string;
  company_logo_url: string | null;
  description: string;
  location: string | null;
  remote_status: "remote" | "hybrid" | "onsite";
  employment_type: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  experience_level: string | null;
  skills: string[];
  category: string | null;
  source_name: string;
  original_job_url: string;
  application_url: string;
  posted_at: string | null;
  discovered_at: string;
};

function label(value: string | null) {
  if (!value) return null;
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatSalary(job: Job) {
  if (job.salary_min == null && job.salary_max == null) return null;
  const currency = job.salary_currency ? `${job.salary_currency} ` : "";
  const format = (value: number) => Math.round(value).toLocaleString();
  if (job.salary_min != null && job.salary_max != null) return `${currency}${format(job.salary_min)} – ${currency}${format(job.salary_max)}`;
  if (job.salary_min != null) return `From ${currency}${format(job.salary_min)}`;
  return `Up to ${currency}${format(job.salary_max ?? 0)}`;
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/jobs");

  const { id } = await params;
  const { data: job } = await supabase
    .from("jobs")
    .select("id, title, company, company_logo_url, description, location, remote_status, employment_type, salary_min, salary_max, salary_currency, experience_level, skills, category, source_name, original_job_url, application_url, posted_at, discovered_at")
    .eq("id", id)
    .eq("status", "active")
    .maybeSingle();

  if (!job) notFound();
  const typedJob = job as Job;
  const salary = formatSalary(typedJob);
  const posted = formatDate(typedJob.posted_at ?? typedJob.discovered_at);

  const { data: savedJob } = await supabase
    .from("saved_jobs")
    .select("id")
    .eq("user_id", user.id)
    .eq("job_id", typedJob.id)
    .maybeSingle();

  const { data: application } = await supabase
    .from("job_applications")
    .select("id, status")
    .eq("user_id", user.id)
    .eq("job_id", typedJob.id)
    .maybeSingle();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f9fc] text-[#0b1220]">
      <header className="sticky top-0 z-20 border-b border-[#e4e9f0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 lg:px-8">
          <Link href="/jobs" className="flex min-w-0 items-center gap-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white">R</span><span className="truncate text-base font-extrabold tracking-tight sm:text-lg">RemoteScout</span></Link>
          <Link href="/jobs" className="shrink-0 rounded-full border border-[#d8e0ea] bg-white px-3.5 py-2.5 text-xs font-semibold hover:border-[#155eef] hover:text-[#155eef] sm:px-4 sm:text-sm">Back to jobs</Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-7 sm:px-5 sm:py-8 lg:px-8 lg:py-12">
        <Link href="/jobs" className="text-sm font-bold text-[#155eef] hover:underline">← Back to all jobs</Link>

        <section className="mt-5 rounded-[1.5rem] border border-[#dbe6f7] bg-gradient-to-br from-[#eef4ff] via-white to-white p-5 shadow-sm sm:rounded-[2rem] sm:p-10">
          <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start">
            <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#dbe3ef] bg-white text-2xl font-black text-[#155eef]">
              {typedJob.company_logo_url ? <img src={typedJob.company_logo_url} alt="" className="size-full object-cover" /> : typedJob.company.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#155eef]">{typedJob.company}</p>
              <h1 className="mt-2 break-words text-3xl font-black tracking-tight sm:text-4xl">{typedJob.title}</h1>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-full bg-[#ecfdf3] px-3 py-1.5 text-[#067647]">{label(typedJob.remote_status)}</span>
                {typedJob.employment_type ? <span className="rounded-full bg-white px-3 py-1.5 text-[#475467]">{label(typedJob.employment_type)}</span> : null}
                {typedJob.category ? <span className="rounded-full bg-white px-3 py-1.5 text-[#475467]">{label(typedJob.category)}</span> : null}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:shrink-0">
              <SaveJobButton jobId={typedJob.id} initialSaved={Boolean(savedJob)} />
              <a href={typedJob.application_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#155eef] px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 hover:bg-[#0b4dcc]">Apply for this job</a>
            </div>
          </div>
        </section>

        <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_300px]">
          <article className="min-w-0 rounded-2xl border border-[#e1e7ef] bg-white p-5 shadow-sm sm:p-8"><h2 className="text-xl font-black">Job description</h2><div className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-[#475467]">{typedJob.description}</div></article>
          <aside className="space-y-5">
            <section className="rounded-2xl border border-[#e1e7ef] bg-white p-5 shadow-sm sm:p-6"><h2 className="text-base font-black">Job details</h2><dl className="mt-4 space-y-4 text-sm">{typedJob.location ? <div><dt className="font-bold text-[#344054]">Location</dt><dd className="mt-1 break-words text-[#667085]">{typedJob.location}</dd></div> : null}{salary ? <div><dt className="font-bold text-[#344054]">Salary</dt><dd className="mt-1 break-words text-[#667085]">{salary}</dd></div> : null}{typedJob.experience_level ? <div><dt className="font-bold text-[#344054]">Experience</dt><dd className="mt-1 text-[#667085]">{label(typedJob.experience_level)}</dd></div> : null}<div><dt className="font-bold text-[#344054]">Source</dt><dd className="mt-1 break-words text-[#667085]">{typedJob.source_name}</dd></div>{posted ? <div><dt className="font-bold text-[#344054]">Posted</dt><dd className="mt-1 text-[#667085]">{posted}</dd></div> : null}</dl></section>
            <section className="rounded-2xl border border-[#e1e7ef] bg-white p-5 shadow-sm sm:p-6"><h2 className="text-base font-black">Application</h2><p className="mt-2 text-sm leading-6 text-[#667085]">Track this role after you apply and update its status from your applications dashboard.</p><div className="mt-4"><ApplicationStatusButton jobId={typedJob.id} applicationId={application?.id} initialStatus={application?.status as "applied" | "interviewing" | "offer" | "rejected" | "withdrawn" | undefined} /></div><Link href="/dashboard/applications" className="mt-4 inline-block text-sm font-bold text-[#155eef] hover:underline">View all applications →</Link></section>
            {typedJob.skills.length > 0 ? <section className="rounded-2xl border border-[#e1e7ef] bg-white p-5 shadow-sm sm:p-6"><h2 className="text-base font-black">Skills</h2><div className="mt-4 flex flex-wrap gap-2">{typedJob.skills.map((skill) => <span key={skill} className="break-words rounded-full bg-[#f2f4f7] px-3 py-1.5 text-xs font-bold text-[#475467]">{skill}</span>)}</div></section> : null}
            <a href={typedJob.original_job_url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-[#d8e0ea] bg-white p-5 text-sm font-bold text-[#475467] shadow-sm hover:border-[#155eef] hover:text-[#155eef]">View original source →</a>
          </aside>
        </div>
      </div>
    </main>
  );
}
