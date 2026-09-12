import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const body = await request.json().catch(() => null) as { jobId?: string } | null;
  const jobId = body?.jobId;
  if (!jobId) return NextResponse.json({ error: "Job ID is required." }, { status: 400 });

  const { error } = await supabase.from("saved_jobs").insert({ user_id: user.id, job_id: jobId });
  if (error && error.code !== "23505") {
    return NextResponse.json({ error: "Could not save this job." }, { status: 500 });
  }

  return NextResponse.json({ saved: true });
}

export async function DELETE(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const body = await request.json().catch(() => null) as { jobId?: string } | null;
  const jobId = body?.jobId;
  if (!jobId) return NextResponse.json({ error: "Job ID is required." }, { status: 400 });

  const { error } = await supabase.from("saved_jobs").delete().eq("user_id", user.id).eq("job_id", jobId);
  if (error) return NextResponse.json({ error: "Could not remove this saved job." }, { status: 500 });

  return NextResponse.json({ saved: false });
}
