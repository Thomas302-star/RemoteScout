import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { AdminUsersPanel } from "@/components/admin/admin-users-panel";

export default async function AdminUsersPage() {
  const { user, isAdmin } = await getAdminContext();

  if (!user) redirect("/login?next=/admin/users");
  if (!isAdmin) redirect("/dashboard");

  const admin = createSupabaseAdminClient();
  const { data: authData, error: authError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  if (authError) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl border border-red-200 bg-white p-6 text-red-700">
          Unable to load users right now.
        </div>
      </main>
    );
  }

  const ids = authData.users.map((item) => item.id);
  const { data: profiles } = ids.length
    ? await admin.from("profiles").select("id, full_name, headline, location").in("id", ids)
    : { data: [] };
  const profileMap = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

  const users = authData.users.map((item) => {
    const profile = profileMap.get(item.id);
    return {
      id: item.id,
      email: item.email ?? "",
      fullName: profile?.full_name ?? "",
      headline: profile?.headline ?? "",
      location: profile?.location ?? "",
      createdAt: item.created_at,
      lastSignInAt: item.last_sign_in_at ?? null,
      bannedUntil: item.banned_until ?? null,
      emailConfirmedAt: item.email_confirmed_at ?? null,
      isCurrentAdmin: item.id === user.id,
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin/jobs" className="text-sm font-semibold text-slate-500 hover:text-slate-900">← Admin jobs</Link>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">User management</h1>
            <p className="mt-2 text-sm text-slate-600">View and manage registered RemoteScout accounts.</p>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100">Dashboard</Link>
        </div>
        <AdminUsersPanel initialUsers={users} />
      </div>
    </main>
  );
}
