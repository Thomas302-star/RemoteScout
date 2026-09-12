import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f9fc] px-5 text-center text-[#0b1220]">
        <div className="max-w-md rounded-3xl border border-[#e1e7ef] bg-white p-8 shadow-xl shadow-[#1d3557]/5">
          <h1 className="text-2xl font-black">Supabase setup required</h1>
          <p className="mt-3 text-sm leading-6 text-[#667085]">
            Add the Supabase environment variables to the deployment before using authentication.
          </p>
        </div>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return <DashboardShell email={user.email ?? "your account"} />;
}
