"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      else setError("This password reset link is invalid or has expired. Request a new one.");
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setMessage("Your password has been reset successfully. You can now sign in with your new password.");
    setPassword("");
    setConfirmPassword("");
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
            <h1 className="mt-3 text-3xl font-black tracking-tight">Reset your password</h1>
            <p className="mt-3 text-sm leading-6 text-[#667085]">Choose a new password for your RemoteScout account.</p>
          </div>

          {error ? <div role="alert" className="mb-5 rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm leading-6 text-[#b42318]">{error}</div> : null}
          {message ? <div role="status" className="mb-5 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-sm leading-6 text-[#166534]">{message}</div> : null}

          {ready && !message ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <PasswordField label="New password" value={password} onChange={setPassword} show={showPassword} onToggle={() => setShowPassword((value) => !value)} />
              <PasswordField label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} show={showConfirmPassword} onToggle={() => setShowConfirmPassword((value) => !value)} />
              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#155eef] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 transition hover:bg-[#0b4dcc] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Updating password..." : "Update password"}
              </button>
            </form>
          ) : null}

          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="font-bold text-[#155eef] hover:underline">Back to sign in</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function PasswordField({ label, value, onChange, show, onToggle }: { label: string; value: string; onChange: (value: string) => void; show: boolean; onToggle: () => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#0b1220]">{label}</label>
      <div className="relative">
        <input type={show ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} minLength={6} required className="w-full rounded-2xl border border-[#dce3ec] bg-white px-4 py-3.5 pr-12 text-sm outline-none focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10" placeholder="At least 6 characters" />
        <button type="button" onClick={onToggle} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-[#667085] hover:bg-[#f2f4f7] hover:text-[#155eef]">
          {show ? "◉" : "○"}
        </button>
      </div>
    </div>
  );
}
