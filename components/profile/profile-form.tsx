"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Profile = {
  full_name: string;
  headline: string;
  location: string;
  bio: string;
  website_url: string;
  linkedin_url: string;
};

export default function ProfileForm({ email, profile }: { email: string; profile: Profile }) {
  const [form, setForm] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function update(field: keyof Profile, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      setSaving(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Your session has expired. Please sign in again.");
      setSaving(false);
      return;
    }

    const { error: saveError } = await supabase.from("profiles").upsert({
      id: user.id,
      ...form,
    });

    if (saveError) {
      setError(saveError.message);
    } else {
      setMessage("Profile saved successfully.");
    }

    setSaving(false);
  }

  const inputClass = "mt-2 w-full rounded-xl border border-[#d8e0ea] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#155eef] focus:ring-4 focus:ring-[#155eef]/10";

  return (
    <form onSubmit={save} className="rounded-3xl border border-[#e1e7ef] bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold">Full name<input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className={inputClass} placeholder="Your name" /></label>
        <label className="text-sm font-bold">Email<input value={email} readOnly className={`${inputClass} bg-[#f8fafc] text-[#667085]`} /></label>
        <label className="text-sm font-bold">Headline<input value={form.headline} onChange={(e) => update("headline", e.target.value)} className={inputClass} placeholder="e.g. Frontend Developer" /></label>
        <label className="text-sm font-bold">Location<input value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} placeholder="e.g. Lagos, Nigeria" /></label>
        <label className="text-sm font-bold sm:col-span-2">Bio<textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} className={`${inputClass} min-h-28 resize-y`} placeholder="A short introduction about you" /></label>
        <label className="text-sm font-bold">Website<input type="url" value={form.website_url} onChange={(e) => update("website_url", e.target.value)} className={inputClass} placeholder="https://example.com" /></label>
        <label className="text-sm font-bold">LinkedIn<input type="url" value={form.linkedin_url} onChange={(e) => update("linkedin_url", e.target.value)} className={inputClass} placeholder="https://linkedin.com/in/yourname" /></label>
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-[#eef1f5] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="text-sm">
          {message ? <span className="text-[#15803d]">{message}</span> : null}
          {error ? <span className="text-[#b42318]">{error}</span> : null}
        </div>
        <button type="submit" disabled={saving} className="rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#155eef]/20 hover:bg-[#0b4dcc] disabled:cursor-not-allowed disabled:opacity-60">
          {saving ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}
