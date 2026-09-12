import type { NormalizedJob } from "@/lib/jobs/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function ingestJobs(jobs: NormalizedJob[]) {
  if (jobs.length === 0) {
    return { inserted: 0, skipped: 0 };
  }

  const supabase = createSupabaseAdminClient();

  const rows = jobs.map((job) => ({
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
  }));

  const { data, error } = await supabase
    .from("jobs")
    .upsert(rows, { onConflict: "original_job_url" })
    .select("id");

  if (error) {
    throw new Error(`Job ingestion failed: ${error.message}`);
  }

  return {
    inserted: data?.length ?? 0,
    skipped: Math.max(0, jobs.length - (data?.length ?? 0)),
  };
}
