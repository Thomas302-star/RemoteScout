import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function expireStaleJobs(maxAgeDays = 30) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.rpc("expire_stale_jobs", {
    max_age_days: maxAgeDays,
  });

  if (error) {
    throw new Error(`Job freshness update failed: ${error.message}`);
  }

  return Number(data ?? 0);
}
