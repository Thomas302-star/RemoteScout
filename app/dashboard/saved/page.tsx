import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function SavedJobsPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard/saved");

  const { data: savedJobs } = await supabase
    .from("saved_jobs")
    .select("id, created_at, jobs(id, title, company, location, remote_status, employment_type, category, source_name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1220]">
      <header className="sticky top-0 z-20 border-b border-[#e4e9f0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white">R</span>
            <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
          </Link>
          <Link href="/jobs" className="rounded-full border border-[#d8e0ea] bg-white px-4 py-2.5 text-sm font-semibold hover:border-[#155eef] hover:text-[#155eef]">Browse jobs</Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8 lg:py-12">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">Your workspace</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Saved jobs</h1>
        <p className="mt-3 max-w-2xl text-[#667085]">Keep interesting opportunities in one place so you can return to them later.</p>

        {!savedJobs?.length ? (
          <section className="mt-8 rounded-[2rem] border border-dashed border-[#cfd8e3] bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-2xl font-black">No saved jobs yet</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#667085]">When you find a role worth revisiting, use the Save job button on its details page.</p>
            <Link href="/jobs" className="mt-6 inline-flex rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white hover:bg-[#0b4dcc]">Find jobs</Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-5">
            {savedJobs.map((item) => {
              const job = Array.isArray(item.jobs) ? item.jobs[0] : item.jobs;
              if (!job) return null;
              return (
                <article key={item.id} className="rounded-2xl border border-[#e1e7ef] bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <Link href={`/jobs/${job.id}`} className="min-w-0 flex-1">
                      <h2 className="text-xl font-black hover:text-[#155eef]">{job.title}</h2>
                      <p className="mt-1 font-semibold text-[#475467]">{job.company}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                        <span className="rounded-full bg-[#ecfdf3] px-3 py-1.5 text-[#067647]">{job.remote_status.replace(/_/g, " ")}</span>
                        {job.employment_type ? <span className="rounded-full bg-[#f2f4f7] px-3 py-1.5 text-[#475467]">{job.employment_type.replace(/_/g, " ")}</span> : null}
                        {job.category ? <span className="rounded-full bg-[#f2f4f7] px-3 py-1.5 text-[#475467]">{job.category.replace(/_/g, " ")}</span> : null}
                      </div>
                      <p className="mt-4 text-sm text-[#667085]">{job.location ?? "Location not specified"} · {job.source_name}</p>
                    </Link>
                    <Link href={`/jobs/${job.id}`} className="rounded-full bg-[#155eef] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#0b4dcc]">View job</Link>
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
