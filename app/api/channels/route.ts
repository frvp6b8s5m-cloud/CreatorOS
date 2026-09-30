import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED = new Set(["youtube","tiktok","instagram","facebook"]);

function normalizeUrl(value: string) {
  const raw = value.trim();
  const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  if (!["http:","https:"].includes(url.protocol)) throw new Error("Use a valid channel URL.");
  return url.toString().replace(/\/$/, "");
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = createAdminClient();
  const { data: workspace } = await admin.from("workspaces").select("id").eq("owner_id", user.id).limit(1).maybeSingle();
  if (!workspace) return NextResponse.json({ channels: [] });
  const { data, error } = await admin.from("platform_connections").select("id,platform,display_name,username,external_account_id,status,created_at").eq("workspace_id", workspace.id).order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ channels: data ?? [] });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const platform = String(body.platform || "").toLowerCase();
  const name = String(body.name || "").trim();
  const username = String(body.username || "").trim();
  if (!ALLOWED.has(platform) || !name) return NextResponse.json({ error: "Choose a platform and enter a channel name." }, { status: 400 });
  let url: string;
  try { url = normalizeUrl(String(body.url || "")); } catch { return NextResponse.json({ error: "Enter a valid channel homepage URL." }, { status: 400 }); }

  const admin = createAdminClient();
  let { data: workspace } = await admin.from("workspaces").select("id").eq("owner_id", user.id).limit(1).maybeSingle();
  if (!workspace) {
    const created = await admin.from("workspaces").insert({ owner_id: user.id, name: "Creator Command" }).select("id").single();
    if (created.error) return NextResponse.json({ error: created.error.message }, { status: 500 });
    workspace = created.data;
  }
  const { data, error } = await admin.from("platform_connections").upsert({
    workspace_id: workspace.id, platform, external_account_id: url, display_name: name,
    username: username || null, status: "connected", updated_at: new Date().toISOString(),
  }, { onConflict: "workspace_id,platform,external_account_id" }).select("id,platform,display_name,username,external_account_id,status").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ channel: data });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing channel id." }, { status: 400 });
  const admin = createAdminClient();
  const { data: workspace } = await admin.from("workspaces").select("id").eq("owner_id", user.id).limit(1).maybeSingle();
  if (!workspace) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const { error } = await admin.from("platform_connections").delete().eq("id", id).eq("workspace_id", workspace.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}