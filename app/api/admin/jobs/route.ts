import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const STATUSES = ["active", "expired", "removed"] as const;
const REMOTE_STATUSES = ["remote", "hybrid", "onsite"] as const;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeJobPayload(body: Record<string, unknown>) {
  const salaryMin = body.salaryMin === "" || body.salaryMin == null ? null : Number(body.salaryMin);
  const salaryMax = body.salaryMax === "" || body.salaryMax == null ? null : Number(body.salaryMax);
  const postedAt = cleanText(body.postedAt);

  if (!cleanText(body.title) || !cleanText(body.company) || !cleanText(body.description)) {
    throw new Error("Title, company, and description are required.");
  }
  if (!cleanText(body.originalJobUrl) || !cleanText(body.applicationUrl)) {
    throw new Error("Original job URL and application URL are required.");
  }
  if (Number.isNaN(salaryMin) || Number.isNaN(salaryMax) || (salaryMin !== null && salaryMax !== null && salaryMin > salaryMax)) {
    throw new Error("Salary values are invalid.");
  }

  const remoteStatus = cleanText(body.remoteStatus) || "remote";
  const status = cleanText(body.status) || "active";
  if (!REMOTE_STATUSES.includes(remoteStatus as (typeof REMOTE_STATUSES)[number])) {
    throw new Error("Invalid remote status.");
  }
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
    throw new Error("Invalid job status.");
  }

  return {
    title: cleanText(body.title),
    company: cleanText(body.company),
    company_logo_url: cleanText(body.companyLogoUrl) || null,
    description: cleanText(body.description),
    location: cleanText(body.location) || null,
    remote_status: remoteStatus,
    employment_type: cleanText(body.employmentType) || null,
    salary_min: salaryMin,
    salary_max: salaryMax,
    salary_currency: cleanText(body.salaryCurrency) || null,
    experience_level: cleanText(body.experienceLevel) || null,
    skills: cleanText(body.skills).split(",").map((skill) => skill.trim()).filter(Boolean),
    category: cleanText(body.category) || null,
    source_name: cleanText(body.sourceName) || "RemoteScout",
    source_url: cleanText(body.sourceUrl) || cleanText(body.originalJobUrl),
    original_job_url: cleanText(body.originalJobUrl),
    application_url: cleanText(body.applicationUrl),
    posted_at: postedAt ? new Date(postedAt).toISOString() : null,
    status,
  };
}

export async function GET() {
  const { isAdmin } = await getAdminContext();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("jobs").select("*").order("discovered_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ jobs: data ?? [] });
}

export async function POST(request: Request) {
  const { isAdmin } = await getAdminContext();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await request.json();
    const job = normalizeJobPayload(body);
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("jobs").insert(job).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ job: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request." }, { status: 400 });
  }
}
