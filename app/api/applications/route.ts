import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const STATUSES = ["applied", "interviewing", "offer", "rejected", "withdrawn"] as const;
type ApplicationStatus = (typeof STATUSES)[number];

function isStatus(value: unknown): value is ApplicationStatus {
  return typeof value === "string" && STATUSES.includes(value as ApplicationStatus);
}

async function getClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return { supabase, user };
}

export async function POST(request: Request) {
  const client = await getClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const jobId = body?.jobId;
  const status = body?.status ?? "applied";

  if (typeof jobId !== "string" || !isStatus(status)) {
    return NextResponse.json({ error: "Invalid job or status." }, { status: 400 });
  }

  const { data: job } = await client.supabase
    .from("jobs")
    .select("id")
    .eq("id", jobId)
    .eq("status", "active")
    .maybeSingle();

  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  const { data, error } = await client.supabase
    .from("job_applications")
    .upsert(
      { user_id: client.user.id, job_id: jobId, status },
      { onConflict: "user_id,job_id" },
    )
    .select("id, job_id, status, applied_at, created_at, updated_at")
    .single();

  if (error) return NextResponse.json({ error: "Could not save application." }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: Request) {
  const client = await getClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const applicationId = body?.applicationId;
  const status = body?.status;

  if (typeof applicationId !== "string" || !isStatus(status)) {
    return NextResponse.json({ error: "Invalid application or status." }, { status: 400 });
  }

  const { data, error } = await client.supabase
    .from("job_applications")
    .update({ status })
    .eq("id", applicationId)
    .eq("user_id", client.user.id)
    .select("id, job_id, status, applied_at, created_at, updated_at")
    .maybeSingle();

  if (error) return NextResponse.json({ error: "Could not update application." }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Application not found." }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const client = await getClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const applicationId = body?.applicationId;

  if (typeof applicationId !== "string") {
    return NextResponse.json({ error: "Invalid application." }, { status: 400 });
  }

  const { error } = await client.supabase
    .from("job_applications")
    .delete()
    .eq("id", applicationId)
    .eq("user_id", client.user.id);

  if (error) return NextResponse.json({ error: "Could not remove application." }, { status: 500 });
  return NextResponse.json({ removed: true });
}
