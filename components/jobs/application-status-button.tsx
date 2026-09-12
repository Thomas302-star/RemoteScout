"use client";

import { useState } from "react";

const statuses = [
  ["applied", "Applied"],
  ["interviewing", "Interviewing"],
  ["offer", "Offer"],
  ["rejected", "Rejected"],
  ["withdrawn", "Withdrawn"],
] as const;

type Status = (typeof statuses)[number][0];

export default function ApplicationStatusButton({
  jobId,
  applicationId,
  initialStatus,
}: {
  jobId: string;
  applicationId?: string | null;
  initialStatus?: Status | null;
}) {
  const [status, setStatus] = useState<Status | null>(initialStatus ?? null);
  const [applicationIdState, setApplicationIdState] = useState(applicationId ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function update(nextStatus: Status) {
    setLoading(true);
    setError("");

    try {
      const response = applicationIdState
        ? await fetch("/api/applications", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ applicationId: applicationIdState, status: nextStatus }),
          })
        : await fetch("/api/applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobId, status: nextStatus }),
          });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      setStatus(nextStatus);
      if (data.id) setApplicationIdState(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={`application-status-${jobId}`} className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
        {status ? "Application status" : "Track this application"}
      </label>
      <select
        id={`application-status-${jobId}`}
        value={status ?? ""}
        onChange={(event) => update(event.target.value as Status)}
        disabled={loading}
        className="w-full rounded-xl border border-[#d8e0ea] bg-white px-3 py-2.5 text-sm font-semibold text-[#344054] outline-none focus:border-[#155eef] disabled:opacity-60"
      >
        <option value="" disabled>Choose status</option>
        {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      {loading ? <p className="text-xs text-[#667085]">Saving...</p> : null}
      {error ? <p className="text-xs text-[#b42318]">{error}</p> : null}
    </div>
  );
}
