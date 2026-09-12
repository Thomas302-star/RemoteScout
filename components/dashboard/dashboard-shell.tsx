"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

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
      <header className="border-b border-[#e4e9f0] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white shadow-lg shadow-[#155eef]/20">R</span>
            <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
          </Link>
          <button
            type="button"
            onClick={signOut}
            disabled={loading}
            className="rounded-full border border-[#d8e0ea] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1220] transition hover:border-[#155eef] hover:text-[#155eef] disabled:opacity-60"
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="rounded-[2rem] border border-[#e1e7ef] bg-white p-7 shadow-xl shadow-[#1d3557]/5 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">Your workspace</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Welcome to RemoteScout.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#667085]">
            You are signed in as <span className="font-semibold text-[#0b1220]">{email}</span>. Your account is ready for the remote job discovery features coming next.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Job discovery", "Coming in Feature 7", "Search and explore remote opportunities."],
              ["Saved jobs", "Coming later", "Keep interesting opportunities in one place."],
              ["Applications", "Coming later", "Track the roles you decide to apply for."],
            ].map(([title, status, text]) => (
              <article key={title} className="rounded-2xl border border-[#e4e9f0] bg-[#f8fafc] p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#155eef]">{status}</p>
                <h2 className="mt-3 font-extrabold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#667085]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
