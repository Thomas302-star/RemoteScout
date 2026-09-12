import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import AdminJobsPanel from "@/components/admin/admin-jobs-panel";

export default async function AdminJobsPage() {
  const { user, isAdmin } = await getAdminContext();

  if (!user) redirect("/login?next=/admin/jobs");
  if (!isAdmin) redirect("/dashboard");

  const supabase = createSupabaseAdminClient();
  const { data: jobs } = await supabase.from("jobs").select("*").order("discovered_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1220]">
      <header className="border-b border-[#e4e9f0] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white">R</span><span className="text-lg font-extrabold tracking-tight">RemoteScout Admin</span></Link>
          <Link href="/dashboard" className="rounded-full border border-[#d8e0ea] bg-white px-4 py-2.5 text-sm font-semibold hover:border-[#155eef] hover:text-[#155eef]">Back to dashboard</Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#155eef]">Admin</p><h1 className="mt-2 text-3xl font-black tracking-tight">Job management</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">Add, edit, publish, expire, remove, and delete jobs in the RemoteScout directory.</p></div>
        <AdminJobsPanel initialJobs={jobs ?? []} />
      </div>
    </main>
  );
}
