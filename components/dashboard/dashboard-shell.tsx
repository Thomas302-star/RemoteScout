"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const dashboardItems = [
  { label: "Overview", href: "#overview" },
  { label: "Discover jobs", href: "/jobs" },
  { label: "Saved jobs", href: "/dashboard/saved" },
  { label: "Applications", href: "/dashboard/applications" },
];

export default function DashboardShell({ email, emailVerified = false }: { email: string; emailVerified?: boolean }) {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    setLoading(true);
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#0b1220]">
      <header className="sticky top-0 z-20 border-b border-[#e4e9f0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white">R</span><span className="text-lg font-extrabold tracking-tight">RemoteScout</span></Link>
          <div className="flex items-center gap-3"><span className="hidden max-w-52 truncate text-sm text-[#667085] sm:block">{email}</span><button type="button" onClick={signOut} disabled={loading} className="rounded-full border border-[#d8e0ea] bg-white px-4 py-2.5 text-sm font-semibold hover:border-[#155eef] hover:text-[#155eef] disabled:opacity-60">{loading ? "Signing out..." : "Sign out"}</button></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-8">
        <aside className="hidden lg:block"><nav className="sticky top-24 rounded-2xl border border-[#e1e7ef] bg-white p-3 shadow-sm"><p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">Workspace</p><div className="space-y-1">{dashboardItems.map((item, index) => <Link key={item.label} href={item.href} className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${index === 0 ? "bg-[#eff4ff] text-[#155eef]" : "text-[#667085] hover:bg-[#f8fafc] hover:text-[#0b1220]"}`}>{item.label}</Link>)}</div></nav></aside>

        <section className="min-w-0 space-y-6">
          {emailVerified ? <div role="status" className="flex items-start gap-3 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] px-5 py-4 text-sm text-[#166534] shadow-sm"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#dcfce7] font-bold">✓</span><div><p className="font-bold">Email verified successfully</p><p className="mt-1 text-[#15803d]">Your RemoteScout account is now verified.</p></div></div> : null}

          <div id="overview" className="rounded-[2rem] border border-[#dbe6f7] bg-gradient-to-br from-[#eef4ff] via-white to-white p-7 shadow-sm sm:p-10"><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">Your workspace</p><h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Welcome to RemoteScout.</h1><p className="mt-4 max-w-2xl leading-7 text-[#667085]">Your account is ready. Discover remote opportunities, save the ones you like, and keep track of applications as you move through the process.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/jobs" className="rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 hover:bg-[#0b4dcc]">Browse remote jobs</Link><Link href="/dashboard/applications" className="rounded-full border border-[#d8e0ea] bg-white px-5 py-3 text-sm font-bold hover:border-[#155eef] hover:text-[#155eef]">Track applications</Link></div></div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[ ["Job discovery", "Available", "Browse active remote opportunities from connected sources."], ["Saved jobs", "Available", "Save interesting roles and return to them later."], ["Applications", "Available", "Track roles you applied to and update their status." ] ].map(([title, status, text]) => <article key={title} className="rounded-2xl border border-[#e4e9f0] bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-[#155eef]">{status}</p><h2 className="mt-3 font-extrabold">{title}</h2><p className="mt-2 text-sm leading-6 text-[#667085]">{text}</p>{title === "Saved jobs" ? <Link href="/dashboard/saved" className="mt-4 inline-block text-sm font-bold text-[#155eef] hover:underline">Open saved jobs →</Link> : null}{title === "Applications" ? <Link href="/dashboard/applications" className="mt-4 inline-block text-sm font-bold text-[#155eef] hover:underline">Open applications →</Link> : null}</article>)}
          </div>

          <section id="discover" className="rounded-2xl border border-[#e4e9f0] bg-white p-6 shadow-sm sm:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">Discover</p><h2 className="mt-2 text-xl font-black">Find your next remote role</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">Browse active jobs collected from connected sources.</p></div><Link href="/jobs" className="w-fit rounded-full bg-[#155eef] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0b4dcc]">Open jobs</Link></div></section>

          <div className="grid gap-6 md:grid-cols-2"><section id="saved" className="rounded-2xl border border-[#e4e9f0] bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">Saved jobs</p><h2 className="mt-2 text-xl font-black">Keep opportunities close</h2><p className="mt-3 text-sm leading-6 text-[#667085]">Save roles from any job details page and find them here.</p><Link href="/dashboard/saved" className="mt-6 inline-flex rounded-full bg-[#155eef] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0b4dcc]">View saved jobs</Link></section><section id="applications" className="rounded-2xl border border-[#e4e9f0] bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">Applications</p><h2 className="mt-2 text-xl font-black">Stay organized</h2><p className="mt-3 text-sm leading-6 text-[#667085]">Track jobs you have applied to and update the status as your application progresses.</p><Link href="/dashboard/applications" className="mt-6 inline-flex rounded-full bg-[#155eef] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0b4dcc]">View applications</Link></section></div>
        </section>
      </div>
    </main>
  );
}
