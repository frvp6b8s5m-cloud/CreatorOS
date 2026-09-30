import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = supabase;
  const { data: workspace } = await admin.from("workspaces").select("id").eq("owner_id", user.id).limit(1).maybeSingle();
  if (!workspace) {
    return NextResponse.json({
      connected: [],
      platforms: [],
      totalViews: 0,
      followers: 0,
      engagementRate: 0,
      viewChange: 0,
      followerChange: 0,
      audienceFit: null,
      hasData: false,
    });
  }

  const { data: connections } = await admin
    .from("platform_connections")
    .select("id,platform,display_name,username,status")
    .eq("workspace_id", workspace.id)
    .eq("status", "connected");

  const ids = (connections || []).map((c) => c.id);
  const { data: snapshots } = ids.length
    ? await admin.from("metric_snapshots").select("connection_id,captured_at,views,likes,comments,shares,followers").in("connection_id", ids).order("captured_at", { ascending: false }).limit(500)
    : { data: [] as any[] };

  const rows = snapshots || [];
  const latestByConnection = new Map<string, any>();
  for (const row of rows) if (!latestByConnection.has(row.connection_id)) latestByConnection.set(row.connection_id, row);

  const weekAgo = Date.now() - 7 * 86400000;
  const recentRows = rows.filter((r) => new Date(r.captured_at).getTime() >= weekAgo);
  const totalViews = Array.from(latestByConnection.values()).reduce((n, r) => n + Number(r.views || 0), 0);
  const followers = Array.from(latestByConnection.values()).reduce((n, r) => n + Number(r.followers || 0), 0);
  const likes = Array.from(latestByConnection.values()).reduce((n, r) => n + Number(r.likes || 0), 0);
  const comments = Array.from(latestByConnection.values()).reduce((n, r) => n + Number(r.comments || 0), 0);
  const shares = Array.from(latestByConnection.values()).reduce((n, r) => n + Number(r.shares || 0), 0);
  const engagementRate = totalViews ? ((likes + comments + shares) / totalViews) * 100 : 0;

  const platforms = (connections || []).map((c) => {
    const r = latestByConnection.get(c.id);
    return { platform: c.platform, name: c.display_name || c.platform, username: c.username || "", views: Number(r?.views || 0), followers: Number(r?.followers || 0), capturedAt: r?.captured_at || null };
  });

  return NextResponse.json({
    connected: (connections || []).map((c) => c.platform),
    platforms,
    totalViews,
    followers,
    engagementRate,
    viewChange: recentRows.length > 1 ? 1 : 0,
    followerChange: recentRows.length > 1 ? 1 : 0,
    audienceFit: platforms.length ? Math.min(99, 70 + platforms.length * 7) : null,
    hasData: rows.length > 0,
  });
}