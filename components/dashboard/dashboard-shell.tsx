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
    <main className="min-h-screen bg-[#f5f4ef] text-[#171916]">
      <header className="sticky top-0 z-30 border-b border-[#dedfd8] bg-[#f5f4ef]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/dashboard" className="rs-focus flex items-center gap-3 rounded-lg"><span className="grid size-9 place-items-center bg-[#174c3a] text-[11px] font-black text-[#d9ef62]">RS</span><span className="text-[17px] font-black tracking-[-.03em]">RemoteScout</span></Link>
          <div className="flex items-center gap-2 sm:gap-4"><Link href="/dashboard/profile" className="hidden max-w-52 truncate text-xs font-bold text-[#6c7169] hover:text-[#174c3a] sm:block">{email}</Link><button type="button" onClick={signOut} disabled={loading} className="rs-focus border border-[#cfd2c8] bg-white px-3.5 py-2.5 text-xs font-black hover:border-[#174c3a] disabled:opacity-60">{loading ? "Signing out..." : "Sign out"}</button></div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pt-4 lg:hidden">
        <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Dashboard navigation">
          {dashboardItems.map((item, index) => <Link key={item.label} href={item.href} className={`shrink-0 border px-3.5 py-2.5 text-xs font-black ${index === 0 ? "border-[#174c3a] bg-[#174c3a] text-white" : "border-[#d6d8d0] bg-white text-[#4f554e]"}`}>{item.label}</Link>)}
          {isAdmin ? <><Link href="/admin/jobs" className="shrink-0 border border-[#174c3a] bg-[#d9ef62] px-3.5 py-2.5 text-xs font-black text-[#174c3a]">Add / Manage Jobs</Link><Link href="/admin/users" className="shrink-0 border border-[#d6d8d0] bg-white px-3.5 py-2.5 text-xs font-black">Manage Users</Link></> : null}
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-6 lg:grid-cols-[210px_1fr] lg:px-8 lg:py-9">
        <aside className="hidden lg:block"><nav className="sticky top-24 border-t-2 border-[#171916] pt-3"><p className="px-1 pb-3 text-[10px] font-black uppercase tracking-[.16em] text-[#858a82]">Workspace</p>{dashboardItems.map((item, index) => <Link key={item.label} href={item.href} className={`block border-b border-[#dedfd8] px-2 py-3 text-sm font-black ${index === 0 ? "bg-white text-[#174c3a]" : "text-[#6c7169] hover:bg-white hover:text-[#171916]"}`}>{item.label}</Link>)}{isAdmin ? <div className="mt-7 border-t-2 border-[#171916] pt-3"><p className="px-1 pb-2 text-[10px] font-black uppercase tracking-[.16em] text-[#858a82]">Admin</p><Link href="/admin/jobs" className="block border border-[#174c3a] bg-[#d9ef62] px-3 py-3 text-xs font-black text-[#174c3a]">Add / Manage Jobs</Link><Link href="/admin/users" className="mt-2 block border border-[#d6d8d0] bg-white px-3 py-3 text-xs font-black text-[#4f554e]">Manage Users</Link></div> : null}</nav></aside>

        <section className="min-w-0 space-y-7">
          {emailVerified ? <div role="status" className="border border-[#bdd8c8] bg-[#edf7f0] px-5 py-4 text-sm text-[#174c3a]"><p className="font-black">Email verified successfully</p><p className="mt-1 text-xs">Your RemoteScout account is now verified.</p></div> : null}

          <section id="overview" className="border-b-2 border-[#171916] pb-9">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#174c3a]">Your workspace</p><h1 className="mt-3 text-4xl font-black tracking-[-.055em] sm:text-5xl">Find work worth<br /><span className="text-[#174c3a]">your attention.</span></h1><p className="mt-5 max-w-xl text-sm leading-7 text-[#6c7169]">Search remote opportunities, save the ones that stand out, and keep your applications organized.</p></div><Link href="/jobs" className="inline-flex w-fit items-center gap-2 bg-[#174c3a] px-5 py-3.5 text-sm font-black text-white hover:bg-[#10372a]">Browse jobs <span>→</span></Link></div>
          </section>

          <div className="grid border-y border-[#dedfd8] sm:grid-cols-3 sm:divide-x sm:divide-[#dedfd8]">
            {[['01','Job discovery','Browse active opportunities.','/jobs','Explore jobs →'],['02','Saved jobs','Keep interesting roles close.','/dashboard/saved','View saved →'],['03','Applications','Track where you stand.','/dashboard/applications','View applications →']].map(([n,t,x,href,cta]) => <Link href={href} key={n} className="group border-b border-[#dedfd8] px-1 py-6 sm:border-b-0 sm:px-6"><span className="text-[10px] font-black text-[#174c3a]">{n}</span><h2 className="mt-6 text-lg font-black group-hover:text-[#174c3a]">{t}</h2><p className="mt-2 text-xs leading-6 text-[#6c7169]">{x}</p><p className="mt-5 text-xs font-black text-[#174c3a]">{cta}</p></Link>)}
          </div>

          <section className="bg-[#174c3a] p-6 text-white sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#d9ef62]">Discover</p><h2 className="mt-2 text-2xl font-black tracking-[-.03em]">Start with the right search.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#c4d1c9]">Search by title, company, location, work setup, employment type, or category.</p></div><Link href="/jobs" className="w-fit bg-[#d9ef62] px-5 py-3 text-xs font-black text-[#174c3a]">Open job search →</Link></div></section>

          <section className="border-t-2 border-[#171916] pt-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#858a82]">Profile</p><h2 className="mt-2 text-xl font-black">Keep your details current.</h2><p className="mt-2 text-sm text-[#6c7169]">Update your basic information from your private profile.</p></div><Link href="/dashboard/profile" className="w-fit border border-[#cfd2c8] bg-white px-4 py-3 text-xs font-black hover:border-[#174c3a]">Edit profile →</Link></div></section>
        </section>
      </div>
    </main>
  );
}
