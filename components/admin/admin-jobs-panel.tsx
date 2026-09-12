"use client";

import { useState } from "react";

const emptyForm = {
  title: "", company: "", companyLogoUrl: "", description: "", location: "", remoteStatus: "remote",
  employmentType: "full_time", salaryMin: "", salaryMax: "", salaryCurrency: "USD", experienceLevel: "",
  skills: "", category: "", sourceName: "", sourceUrl: "", originalJobUrl: "", applicationUrl: "",
  postedAt: "", status: "active",
};

type Job = {
  id: string; title: string; company: string; company_logo_url: string | null; description: string; location: string | null;
  remote_status: string; employment_type: string | null; salary_min: number | null; salary_max: number | null; salary_currency: string | null;
  experience_level: string | null; skills: string[]; category: string | null; source_name: string; source_url: string;
  original_job_url: string; application_url: string; posted_at: string | null; status: string;
};

type FormState = typeof emptyForm;

function toForm(job: Job): FormState {
  return {
    title: job.title, company: job.company, companyLogoUrl: job.company_logo_url ?? "", description: job.description,
    location: job.location ?? "", remoteStatus: job.remote_status, employmentType: job.employment_type ?? "",
    salaryMin: job.salary_min?.toString() ?? "", salaryMax: job.salary_max?.toString() ?? "", salaryCurrency: job.salary_currency ?? "USD",
    experienceLevel: job.experience_level ?? "", skills: job.skills.join(", "), category: job.category ?? "", sourceName: job.source_name,
    sourceUrl: job.source_url, originalJobUrl: job.original_job_url, applicationUrl: job.application_url,
    postedAt: job.posted_at ? new Date(job.posted_at).toISOString().slice(0, 10) : "", status: job.status,
  };
}

export default function AdminJobsPanel({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(key: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
    setError("");
  }

  async function saveJob(event: React.FormEvent) {
    event.preventDefault(); setSaving(true); setMessage(""); setError("");
    try {
      const response = await fetch(editingId ? `/api/admin/jobs/${editingId}` : "/api/admin/jobs", {
        method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to save job.");
      if (editingId) setJobs((current) => current.map((job) => job.id === editingId ? data.job : job));
      else setJobs((current) => [data.job, ...current]);
      setMessage(editingId ? "Job updated successfully." : "Job created successfully.");
      resetForm();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save job."); }
    finally { setSaving(false); }
  }

  async function removeJob(id: string) {
    if (!window.confirm("Delete this job permanently?")) return;
    setError("");
    const response = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) { setError(data.error ?? "Unable to delete job."); return; }
    setJobs((current) => current.filter((job) => job.id !== id));
    if (editingId === id) resetForm();
    setMessage("Job deleted.");
  }

  async function changeStatus(id: string, status: string) {
    const job = jobs.find((item) => item.id === id); if (!job) return;
    const response = await fetch(`/api/admin/jobs/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(toForm({ ...job, status })) });
    const data = await response.json();
    if (!response.ok) { setError(data.error ?? "Unable to update status."); return; }
    setJobs((current) => current.map((item) => item.id === id ? data.job : item));
  }

  const inputClass = "w-full rounded-xl border border-[#d8e0ea] bg-white px-3.5 py-3 text-sm outline-none focus:border-[#155eef] focus:ring-2 focus:ring-[#155eef]/10";
  const labelClass = "mb-1.5 block text-sm font-semibold text-[#344054]";

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e1e7ef] bg-white p-6 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4"><div><h2 className="text-xl font-black">{editingId ? "Edit job" : "Add a job"}</h2><p className="mt-1 text-sm text-[#667085]">Manage the job information shown to users.</p></div>{editingId ? <button type="button" onClick={resetForm} className="text-sm font-bold text-[#667085] hover:text-[#155eef]">Cancel edit</button> : null}</div>
        <form onSubmit={saveJob} className="grid gap-5 md:grid-cols-2">
          <div><label className={labelClass}>Job title</label><input required className={inputClass} value={form.title} onChange={(e) => updateField("title", e.target.value)} /></div>
          <div><label className={labelClass}>Company</label><input required className={inputClass} value={form.company} onChange={(e) => updateField("company", e.target.value)} /></div>
          <div className="md:col-span-2"><label className={labelClass}>Description</label><textarea required rows={7} className={inputClass} value={form.description} onChange={(e) => updateField("description", e.target.value)} /></div>
          <div><label className={labelClass}>Location</label><input className={inputClass} placeholder="Worldwide" value={form.location} onChange={(e) => updateField("location", e.target.value)} /></div>
          <div><label className={labelClass}>Category</label><input className={inputClass} placeholder="Engineering" value={form.category} onChange={(e) => updateField("category", e.target.value)} /></div>
          <div><label className={labelClass}>Work setup</label><select className={inputClass} value={form.remoteStatus} onChange={(e) => updateField("remoteStatus", e.target.value)}><option value="remote">Remote</option><option value="hybrid">Hybrid</option><option value="onsite">On-site</option></select></div>
          <div><label className={labelClass}>Employment type</label><select className={inputClass} value={form.employmentType} onChange={(e) => updateField("employmentType", e.target.value)}><option value="full_time">Full-time</option><option value="part_time">Part-time</option><option value="contract">Contract</option><option value="freelance">Freelance</option><option value="internship">Internship</option></select></div>
          <div><label className={labelClass}>Experience level</label><input className={inputClass} placeholder="Mid-level" value={form.experienceLevel} onChange={(e) => updateField("experienceLevel", e.target.value)} /></div>
          <div><label className={labelClass}>Skills</label><input className={inputClass} placeholder="React, TypeScript, SQL" value={form.skills} onChange={(e) => updateField("skills", e.target.value)} /></div>
          <div><label className={labelClass}>Salary minimum</label><input type="number" min="0" className={inputClass} value={form.salaryMin} onChange={(e) => updateField("salaryMin", e.target.value)} /></div>
          <div><label className={labelClass}>Salary maximum</label><input type="number" min="0" className={inputClass} value={form.salaryMax} onChange={(e) => updateField("salaryMax", e.target.value)} /></div>
          <div><label className={labelClass}>Currency</label><input className={inputClass} placeholder="USD" value={form.salaryCurrency} onChange={(e) => updateField("salaryCurrency", e.target.value)} /></div>
          <div><label className={labelClass}>Posted date</label><input type="date" className={inputClass} value={form.postedAt} onChange={(e) => updateField("postedAt", e.target.value)} /></div>
          <div><label className={labelClass}>Source name</label><input className={inputClass} value={form.sourceName} onChange={(e) => updateField("sourceName", e.target.value)} /></div>
          <div><label className={labelClass}>Status</label><select className={inputClass} value={form.status} onChange={(e) => updateField("status", e.target.value)}><option value="active">Active</option><option value="expired">Expired</option><option value="removed">Removed</option></select></div>
          <div><label className={labelClass}>Company logo URL</label><input type="url" className={inputClass} value={form.companyLogoUrl} onChange={(e) => updateField("companyLogoUrl", e.target.value)} /></div>
          <div><label className={labelClass}>Source URL</label><input required type="url" className={inputClass} value={form.sourceUrl} onChange={(e) => updateField("sourceUrl", e.target.value)} /></div>
          <div><label className={labelClass}>Original job URL</label><input required type="url" className={inputClass} value={form.originalJobUrl} onChange={(e) => updateField("originalJobUrl", e.target.value)} /></div>
          <div><label className={labelClass}>Application URL</label><input required type="url" className={inputClass} value={form.applicationUrl} onChange={(e) => updateField("applicationUrl", e.target.value)} /></div>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3"><button disabled={saving} className="rounded-full bg-[#155eef] px-5 py-3 text-sm font-bold text-white hover:bg-[#0b4dcc] disabled:opacity-60">{saving ? "Saving..." : editingId ? "Update job" : "Create job"}</button>{message ? <p role="status" className="text-sm font-semibold text-[#15803d]">{message}</p> : null}{error ? <p role="alert" className="text-sm font-semibold text-[#b42318]">{error}</p> : null}</div>
        </form>
      </section>

      <section className="rounded-2xl border border-[#e1e7ef] bg-white shadow-sm">
        <div className="border-b border-[#e4e9f0] px-6 py-5 sm:px-7"><h2 className="text-xl font-black">Jobs ({jobs.length})</h2><p className="mt-1 text-sm text-[#667085]">Manage existing jobs and their public status.</p></div>
        {jobs.length === 0 ? <div className="px-6 py-12 text-center text-sm text-[#667085]">No jobs have been added yet.</div> : <div className="divide-y divide-[#e4e9f0]">{jobs.map((job) => <article key={job.id} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"><div className="min-w-0"><h3 className="font-extrabold">{job.title}</h3><p className="mt-1 text-sm text-[#667085]">{job.company}{job.category ? ` · ${job.category}` : ""}</p><p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#98a2b3]">{job.remote_status} · {job.employment_type ?? "Not specified"}</p></div><div className="flex flex-wrap items-center gap-2"><select aria-label={`Status for ${job.title}`} className="rounded-full border border-[#d8e0ea] bg-white px-3 py-2 text-xs font-bold" value={job.status} onChange={(e) => changeStatus(job.id, e.target.value)}><option value="active">Active</option><option value="expired">Expired</option><option value="removed">Removed</option></select><button type="button" onClick={() => { setEditingId(job.id); setForm(toForm(job)); setMessage(""); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="rounded-full border border-[#d8e0ea] px-3 py-2 text-xs font-bold hover:border-[#155eef] hover:text-[#155eef]">Edit</button><button type="button" onClick={() => removeJob(job.id)} className="rounded-full border border-[#fecaca] px-3 py-2 text-xs font-bold text-[#b42318] hover:bg-[#fef2f2]">Delete</button></div></article>)}</div>}
      </section>
    </div>
  );
}
