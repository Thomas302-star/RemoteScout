"use client";

import { useState } from "react";

export default function SaveJobButton({ jobId, initialSaved = false }: { jobId: string; initialSaved?: boolean }) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function toggleSaved() {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch("/api/saved-jobs", {
        method: saved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) throw new Error("Request failed");
      const result = (await response.json()) as { saved: boolean };
      setSaved(result.saved);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      disabled={loading}
      aria-pressed={saved}
      className={`shrink-0 rounded-full border px-5 py-3 text-center text-sm font-bold transition disabled:cursor-wait disabled:opacity-60 ${saved ? "border-[#155eef] bg-[#eff4ff] text-[#155eef]" : "border-[#d8e0ea] bg-white text-[#344054] hover:border-[#155eef] hover:text-[#155eef]"}`}
    >
      {loading ? "Saving..." : saved ? "Saved" : "Save job"}
    </button>
  );
}
