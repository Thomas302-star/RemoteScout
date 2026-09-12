"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setMessage("If an account exists for this email, a password reset link has been sent. Check your inbox.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-5 py-10 text-[#0b1220] sm:py-16">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-[#155eef] text-sm font-black text-white">R</span>
          <span className="text-lg font-extrabold tracking-tight">RemoteScout</span>
        </Link>
        <section className="rounded-[2rem] border border-[#e1e7ef] bg-white p-7 shadow-xl shadow-[#1d3557]/5 sm:p-9">
          <div className="mb-7 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#155eef]">Account recovery</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight">Forgot your password?</h1>
            <p className="mt-3 text-sm leading-6 text-[#667085]">Enter your email and we&apos;ll send you a link to create a new password.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email address</label>
              <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-[#dce3ec] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10" placeholder="you@example.com" />
            </div>
            {error ? <div role="alert" className="rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm leading-6 text-[#b42318]">{error}</div> : null}
            {message ? <div role="status" className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-sm leading-6 text-[#166534]">{message}</div> : null}
            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#155eef] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 transition hover:bg-[#0b4dcc] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm"><Link href="/login" className="font-bold text-[#155eef] hover:underline">Back to sign in</Link></p>
        </section>
      </div>
    </main>
  );
}
