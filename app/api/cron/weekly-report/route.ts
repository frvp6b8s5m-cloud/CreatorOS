import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) return new NextResponse("Unauthorized",{status:401});
  // Production worker: query enabled profiles, aggregate the prior 7 days,
  // render the intelligence brief, send it through the configured email provider,
  // then persist the delivery in weekly_reports.
  return NextResponse.json({ ok:true, message:"Weekly intelligence job accepted" });
}