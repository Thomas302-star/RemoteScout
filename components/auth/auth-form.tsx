"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type AuthMode = "login" | "signup";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not configured yet. Add the Supabase environment variables to continue.");
      return;
    }

    setLoading(true);

    if (isLogin) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      window.location.href = "/dashboard";
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      window.location.href = "/dashboard";
      return;
    }

    setMessage("Account created. Check your email to confirm your account, then sign in.");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#0b1220]">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-[#dce3ec] bg-white px-4 py-3.5 text-sm text-[#0b1220] outline-none transition placeholder:text-[#9aa5b5] focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#0b1220]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          minLength={6}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-[#dce3ec] bg-white px-4 py-3.5 text-sm text-[#0b1220] outline-none transition placeholder:text-[#9aa5b5] focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10"
          placeholder="At least 6 characters"
        />
      </div>

      {error ? (
        <div role="alert" className="rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm leading-6 text-[#b42318]">
          {error}
        </div>
      ) : null}

      {message ? (
        <div role="status" className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-sm leading-6 text-[#166534]">
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[#155eef] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 transition hover:bg-[#0b4dcc] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
      </button>
    </form>
  );
}
