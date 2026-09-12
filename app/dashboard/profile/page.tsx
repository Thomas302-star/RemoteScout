import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login?next=/dashboard/profile");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, headline, location, bio, website_url, linkedin_url")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1220]">
      <header className="border-b border-[#e4e9f0] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white">R</span>
            <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
          </Link>
          <Link href="/dashboard" className="text-sm font-bold text-[#667085] hover:text-[#155eef]">Back to dashboard</Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#155eef]">Your profile</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Profile settings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
            Keep your basic information up to date. Your profile is private to your account.
          </p>
        </div>
        <ProfileForm
          email={user.email ?? ""}
          profile={profile ?? { full_name: "", headline: "", location: "", bio: "", website_url: "", linkedin_url: "" }}
        />
      </section>
    </main>
  );
}
