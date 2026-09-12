import type { NormalizedJob } from "@/lib/jobs/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const TRACKING_PARAMETERS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ref",
]);

export function createJobDedupeKey(originalJobUrl: string) {
  try {
    const url = new URL(originalJobUrl);
    url.hash = "";

    for (const key of [...url.searchParams.keys()]) {
      if (TRACKING_PARAMETERS.has(key.toLowerCase())) {
        url.searchParams.delete(key);
      }
    }

    const normalized = `${url.protocol.toLowerCase()}//${url.host.toLowerCase()}${url.pathname.replace(/\/+$/, "") || "/"}${url.search}`;
    return normalized;
  } catch {
    return originalJobUrl.trim().toLowerCase();
  }
}

export async function ingestJobs(jobs: NormalizedJob[]) {
  if (jobs.length === 0) {
    return { processed: 0, skippedDuplicates: 0 };
  }

  const supabase = createSupabaseAdminClient();
  const uniqueJobs = new Map<string, NormalizedJob>();

  for (const job of jobs) {
    const key = createJobDedupeKey(job.originalJobUrl);
    if (!uniqueJobs.has(key)) {
      uniqueJobs.set(key, job);
    }
  }

  const rows = [...uniqueJobs.entries()].map(([dedupeKey, job]) => ({
    title: job.title,
    company: job.company,
    company_logo_url: job.companyLogoUrl ?? null,
    description: job.description,
    location: job.location ?? null,
    remote_status: job.remoteStatus,
    employment_type: job.employmentType ?? null,
    salary_min: job.salaryMin ?? null,
    salary_max: job.salaryMax ?? null,
    salary_currency: job.salaryCurrency ?? null,
    experience_level: job.experienceLevel ?? null,
    skills: job.skills,
    category: job.category ?? null,
    source_name: job.sourceName,
    source_url: job.sourceUrl,
    original_job_url: job.originalJobUrl,
    application_url: job.applicationUrl,
    posted_at: job.postedAt ?? null,
    dedupe_key: dedupeKey,
    status: "active",
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("jobs")
    .upsert(rows, { onConflict: "dedupe_key" });

  if (error) {
    throw new Error(`Job ingestion failed: ${error.message}`);
  }

  return {
    processed: rows.length,
    skippedDuplicates: jobs.length - rows.length,
  };
}
