"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const dashboardItems = [
  { label: "Overview", href: "#overview" },
  { label: "Discover jobs", href: "/jobs" },
  { label: "Saved jobs", href: "/dashboard/saved" },
  { label: "Applications", href: "/dashboard/applications" },
  { label: "Profile", href: "/dashboard/profile" },
];

export default function DashboardShell({ email, emailVerified = false, isAdmin = false }: { email: string; emailVerified?: boolean; isAdmin?: boolean }) {
  const [loading, setLoading] = useState(false);
  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    setLoading(true);
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#f5f4ef] text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-[#deddd6] bg-[#f5f4ef]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3"><span className="grid size-9 place-items-center bg-[#111111] text-sm font-black text-white">R</span><span className="text-[17px] font-black tracking-[-0.02em]">RemoteScout</span></Link>
          <div className="flex items-center gap-2 sm:gap-4"><Link href="/dashboard/profile" className="hidden max-w-52 truncate text-sm font-bold text-[#6d6d67] hover:text-[#1457ff] sm:block">{email}</Link><button type="button" onClick={signOut} disabled={loading} className="border border-[#cfcfc7] bg-white px-3.5 py-2.5 text-sm font-bold transition hover:border-[#111111] disabled:opacity-60">{loading ? "Signing out..." : "Sign out"}</button></div>
        </div>
      </header>

      <div className="border-b border-[#deddd6] bg-white lg:hidden"><nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3" aria-label="Dashboard navigation">{dashboardItems.map((item)=><Link key={item.label} href={item.href} className="shrink-0 border border-[#d8d7d0] px-3.5 py-2 text-xs font-bold text-[#55554f] hover:border-[#1457ff] hover:text-[#1457ff]">{item.label}</Link>)}{isAdmin?<><Link href="/admin/jobs" className="shrink-0 bg-[#1457ff] px-3.5 py-2 text-xs font-black text-white">Add / Manage Jobs</Link><Link href="/admin/users" className="shrink-0 border border-[#111111] px-3.5 py-2 text-xs font-black">Manage Users</Link></>:null}</nav></div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-7 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-10">
        <aside className="hidden lg:block"><nav className="sticky top-24 border-l border-[#d8d7d0] pl-4"><p className="mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#999890]">Workspace</p><div className="space-y-1">{dashboardItems.map((item,index)=><Link key={item.label} href={item.href} className={`block px-3 py-2.5 text-sm font-bold transition ${index===0?"border-l-2 border-[#1457ff] bg-[#eeece5] text-[#1457ff]":"text-[#66665f] hover:bg-[#eeece5] hover:text-[#111111]"}`}>{item.label}</Link>)}{isAdmin?<div className="mt-7 border-t border-[#deddd6] pt-5"><p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#999890]">Admin</p><Link href="/admin/jobs" className="mb-1 block bg-[#1457ff] px-3 py-2.5 text-sm font-black text-white hover:bg-[#0b3fc4]">Add / Manage Jobs</Link><Link href="/admin/users" className="block border border-[#d8d7d0] bg-white px-3 py-2.5 text-sm font-bold hover:border-[#111111]">Manage Users</Link></div>:null}</div></nav></aside>

        <section className="min-w-0">
          {emailVerified?<div role="status" className="mb-7 flex items-center gap-3 border border-[#b9e2c8] bg-[#f2fbf5] px-4 py-3 text-sm text-[#23643a]"><span className="font-black">✓</span><div><p className="font-black">Email verified successfully</p><p className="mt-0.5 text-xs">Your account is ready to use.</p></div></div>:null}

          <section id="overview" className="border-b border-[#deddd6] pb-10">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1457ff]">Your workspace</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[.98] tracking-[-0.055em] sm:text-6xl">Find your next remote role.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6d6d67]">Search opportunities, keep the good ones close, and stay organized as you apply.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/jobs" className="inline-flex w-fit items-center justify-center bg-[#1457ff] px-5 py-3.5 text-sm font-black text-white hover:bg-[#0b3fc4]">Browse remote jobs ↗</Link><Link href="/dashboard/saved" className="inline-flex w-fit items-center justify-center border border-[#cfcfc7] bg-white px-5 py-3.5 text-sm font-black hover:border-[#111111]">View saved jobs</Link></div>
          </section>

          <div className="mt-8 grid border-l border-t border-[#deddd6] sm:grid-cols-3">
            {[['Saved jobs','Return to roles you want to revisit.','/dashboard/saved'],['Applications','Keep your application progress in one place.','/dashboard/applications'],['Profile','Keep your basic information current.','/dashboard/profile']].map(([title,text,href])=><Link href={href} key={title} className="border-b border-r border-[#deddd6] bg-white p-6 transition hover:bg-[#eeece5]"><p className="text-xs font-black uppercase tracking-[0.12em] text-[#999890]">{title}</p><p className="mt-4 text-sm font-bold leading-6 text-[#55554f]">{text}</p><span className="mt-6 inline-block text-xs font-black text-[#1457ff]">Open ↗</span></Link>)}
          </div>

          <section className="mt-10 border-t border-[#deddd6] pt-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#1457ff]">Discover</p><h2 className="mt-2 text-2xl font-black tracking-tight">Start with a focused search.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#6d6d67]">Browse active opportunities and filter by the work setup, category, and employment type that fit you.</p></div><Link href="/jobs" className="w-fit bg-[#111111] px-4 py-3 text-sm font-black text-white hover:bg-[#1457ff]">Open jobs ↗</Link></div><div className="mt-6 border border-[#cfcfc7] bg-white p-5"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center bg-[#eeece5] text-[#1457ff]">⌕</span><div><p className="text-sm font-black">Remote job directory</p><p className="mt-1 text-xs text-[#77776f]">Search titles, companies, locations, and categories.</p></div></div></div></section>

          <section className="mt-10 border-t border-[#deddd6] pt-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#999890]">Account</p><h2 className="mt-2 text-xl font-black">Your profile and preferences</h2><p className="mt-2 text-sm leading-6 text-[#6d6d67]">Manage the basic information connected to your RemoteScout account.</p></div><Link href="/dashboard/profile" className="w-fit border border-[#111111] bg-white px-4 py-3 text-sm font-black hover:bg-[#111111] hover:text-white">Edit profile ↗</Link></div></section>
        </section>
      </div>
    </main>
  );
}
