import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ApplicationStatusButton from "@/components/jobs/application-status-button";

const statusLabels: Record<string, string> = {
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export default async function ApplicationsPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard/applications");

  const { data: applications } = await supabase
    .from("job_applications")
    .select("id, job_id, status, applied_at, jobs(id, title, company, company_logo_url, location, remote_status, employment_type, category)")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const rows = (applications ?? []) as Array<{
    id: string;
    job_id: string;
    status: string;
    applied_at: string;
    jobs: {
      id: string;
      title: string;
      company: string;
      company_logo_url: string | null;
      location: string | null;
      remote_status: string;
      employment_type: string | null;
      category: string | null;
    } | null;
  }>;

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1220]">
      <header className="sticky top-0 z-20 border-b border-[#e4e9f0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white">R</span><span className="text-lg font-extrabold tracking-tight">RemoteScout</span></Link>
          <Link href="/jobs" className="rounded-full bg-[#155eef] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0b4dcc]">Browse jobs</Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8 lg:py-12">
        <Link href="/dashboard" className="text-sm font-bold text-[#155eef] hover:underline">← Back to dashboard</Link>
        <div className="mt-5">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#155eef]">Your applications</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Application tracker</h1>
          <p className="mt-3 max-w-2xl text-[#667085]">Keep a simple record of the remote roles you have applied to and update each status as you progress.</p>
        </div>

        {rows.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-dashed border-[#d8e0ea] bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-black">No applications yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#667085]">Open a job, choose an application status, and it will appear here.</p>
            <Link href="/jobs" className="mt-6 inline-flex rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white hover:bg-[#0b4dcc]">Find a job</Link>
          </section>
        ) : (
          <div className="mt-8 space-y-4">
            {rows.map((application) => {
              const job = application.jobs;
              if (!job) return null;
              return (
                <article key={application.id} className="rounded-2xl border border-[#e1e7ef] bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#dbe3ef] bg-[#f8fafc] text-lg font-black text-[#155eef]">
                        {job.company_logo_url ? <img src={job.company_logo_url} alt="" className="size-full object-cover" /> : job.company.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <Link href={`/jobs/${job.id}`} className="text-lg font-black hover:text-[#155eef]">{job.title}</Link>
                        <p className="mt-1 text-sm font-semibold text-[#475467]">{job.company}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#667085]">
                          <span className="rounded-full bg-[#ecfdf3] px-2.5 py-1 text-[#067647]">{job.remote_status.replace(/_/g, " ")}</span>
                          {job.location ? <span className="rounded-full bg-[#f2f4f7] px-2.5 py-1">{job.location}</span> : null}
                          {job.employment_type ? <span className="rounded-full bg-[#f2f4f7] px-2.5 py-1">{job.employment_type.replace(/_/g, " ")}</span> : null}
                        </div>
                        <p className="mt-3 text-xs text-[#98a2b3]">Added {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(application.applied_at))} · {statusLabels[application.status] ?? application.status}</p>
                      </div>
                    </div>
                    <div className="w-full shrink-0 lg:w-56">
                      <ApplicationStatusButton jobId={job.id} applicationId={application.id} initialStatus={application.status as "applied" | "interviewing" | "offer" | "rejected" | "withdrawn"} />
                    </div>
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
