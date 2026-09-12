"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const dashboardItems = [
  { label: "Overview", href: "#overview" },
  { label: "Discover jobs", href: "#discover" },
  { label: "Saved jobs", href: "#saved" },
  { label: "Applications", href: "#applications" },
];

export default function DashboardShell({ email }: { email: string }) {
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
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white shadow-lg shadow-[#155eef]/20">
              R
            </span>
            <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden max-w-52 truncate text-sm text-[#667085] sm:block">
              {email}
            </span>
            <button
              type="button"
              onClick={signOut}
              disabled={loading}
              className="rounded-full border border-[#d8e0ea] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1220] transition hover:border-[#155eef] hover:text-[#155eef] disabled:opacity-60"
            >
              {loading ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 rounded-2xl border border-[#e1e7ef] bg-white p-3 shadow-sm">
            <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">
              Workspace
            </p>
            <div className="space-y-1">
              {dashboardItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    index === 0
                      ? "bg-[#eff4ff] text-[#155eef]"
                      : "text-[#667085] hover:bg-[#f8fafc] hover:text-[#0b1220]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </aside>

        <section className="min-w-0 space-y-6">
          <div id="overview" className="rounded-[2rem] border border-[#dbe6f7] bg-gradient-to-br from-[#eef4ff] via-white to-white p-7 shadow-sm sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">
              Your workspace
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Welcome to RemoteScout.
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-[#667085]">
              Your account is ready. Soon, this dashboard will give you one clean place to discover remote opportunities, save the ones you like, and keep track of applications.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#discover"
                className="rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 transition hover:bg-[#0b4dcc]"
              >
                Explore the dashboard
              </a>
              <Link
                href="/"
                className="rounded-full border border-[#d8e0ea] bg-white px-5 py-3 text-sm font-bold text-[#0b1220] transition hover:border-[#155eef] hover:text-[#155eef]"
              >
                Back to home
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Job discovery", "Next step", "Your remote job feed will appear here once job data is connected."],
              ["Saved jobs", "Coming soon", "Save interesting roles so you can return to them later."],
              ["Applications", "Coming soon", "Keep a simple record of the roles you decide to apply for."],
            ].map(([title, status, text]) => (
              <article
                key={title}
                className="rounded-2xl border border-[#e4e9f0] bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[#155eef]">
                  {status}
                </p>
                <h2 className="mt-3 font-extrabold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#667085]">{text}</p>
              </article>
            ))}
          </div>

          <section id="discover" className="rounded-2xl border border-[#e4e9f0] bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">
                  Discover
                </p>
                <h2 className="mt-2 text-xl font-black">Your remote job feed</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                  Job listings will be connected in the next product stages. This space is ready for the directory and search experience.
                </p>
              </div>
              <span className="w-fit rounded-full bg-[#f2f4f7] px-3 py-1.5 text-xs font-bold text-[#667085]">
                Not connected yet
              </span>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section id="saved" className="rounded-2xl border border-[#e4e9f0] bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">
                Saved jobs
              </p>
              <h2 className="mt-2 text-xl font-black">Keep opportunities close</h2>
              <p className="mt-3 text-sm leading-6 text-[#667085]">
                Once job discovery is connected, you will be able to save roles here instead of searching for them again.
              </p>
              <div className="mt-6 rounded-xl border border-dashed border-[#d8e0ea] bg-[#f8fafc] p-5 text-sm text-[#667085]">
                No saved jobs yet.
              </div>
            </section>

            <section id="applications" className="rounded-2xl border border-[#e4e9f0] bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">
                Applications
              </p>
              <h2 className="mt-2 text-xl font-black">Stay organized</h2>
              <p className="mt-3 text-sm leading-6 text-[#667085]">
                Application tracking will give you a simple view of roles you have decided to pursue.
              </p>
              <div className="mt-6 rounded-xl border border-dashed border-[#d8e0ea] bg-[#f8fafc] p-5 text-sm text-[#667085]">
                No applications yet.
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
