import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { user, isAdmin } = await getAdminContext();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim().toLowerCase() ?? "";
  const admin = createSupabaseAdminClient();
  const { data: authData, error: authError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (authError) return NextResponse.json({ error: authError.message }, { status: 500 });

  const ids = authData.users.map((item) => item.id);
  const { data: profiles, error: profileError } = ids.length
    ? await admin.from("profiles").select("id, full_name, headline, location, bio, website_url, linkedin_url, created_at, updated_at").in("id", ids)
    : { data: [], error: null };

  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

  const profileMap = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
  const users = authData.users
    .map((item) => {
      const profile = profileMap.get(item.id);
      return {
        id: item.id,
        email: item.email ?? "",
        fullName: profile?.full_name ?? "",
        headline: profile?.headline ?? "",
        location: profile?.location ?? "",
        createdAt: item.created_at,
        lastSignInAt: item.last_sign_in_at,
        bannedUntil: item.banned_until,
        emailConfirmedAt: item.email_confirmed_at,
      };
    })
    .filter((item) => !search || item.email.toLowerCase().includes(search) || item.fullName.toLowerCase().includes(search))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ users });
}

export async function DELETE(request: Request) {
  const { user, isAdmin } = await getAdminContext();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";

  if (!userId) return NextResponse.json({ error: "User ID is required." }, { status: 400 });
  if (userId === user.id) return NextResponse.json({ error: "You cannot delete your own admin account." }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { error } = await admin.auth.admin.deleteUser(userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
