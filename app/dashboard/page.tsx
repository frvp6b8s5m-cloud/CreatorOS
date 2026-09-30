"use client";

import { useState } from "react";
import { Bell, Facebook, Gauge, Instagram, Lightbulb, Mail, Radar, Settings, Sparkles, TrendingUp, Video, Youtube } from "lucide-react";

const platforms = [
  { name: "YouTube", icon: Youtube, followers: "1.2M" },
  { name: "TikTok", icon: Sparkles, followers: "842K" },
  { name: "Instagram", icon: Instagram, followers: "318K" },
  { name: "Facebook", icon: Facebook, followers: "94K" },
];

const trends = [["AI VIDEO", "+284%"], ["CREATOR TOOLS", "+117%"], ["SHORT-FORM DOCS", "+76%"]];
const opportunities = [
  ["AI storytelling is accelerating", "+284%", "Create around the format while momentum is rising."],
  ["Your audience is watching longer", "+31%", "Longer openings are holding attention better than your baseline."],
  ["TikTok → Reels format gap", "3 gaps", "Three strong formats are appearing on TikTok before your Reels."],
];

export default function Dashboard() {
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  async function sync() {
    setSyncing(true);
    setSyncMsg("");
    try {
      const response = await fetch("/api/sync", { method: "POST" });
      setSyncMsg(response.ok ? "Synced just now" : "Connect your platforms first");
    } catch {
      setSyncMsg("Sync unavailable right now");
    } finally {
      setSyncing(false);
    }
  }

  const nav = [["Home", Gauge], ["Analytics", TrendingUp], ["Trends", Radar], ["Ideas", Lightbulb], ["Content", Video]] as const;

  return <main className="app">
    <aside className="sidebar">
      <div className="brand"><div className="brandmark"><Sparkles size={17} /></div><div><b>CreatorOS</b><span>INTELLIGENCE</span></div></div>
      <div className="workspace"><span>WORKSPACE</span><strong>Creator Command</strong></div>
      <nav>{nav.map(([label, Icon], index) => <button className={index === 0 ? "active" : ""} key={label}><Icon size={17} /><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom">
        <button><Bell size={17} /><span>Alerts</span></button>
        <button><Settings size={17} /><span>Settings</span></button>
        <div className="status"><i />4 platforms connected</div>
      </div>
    </aside>

    <section className="main">
      <header className="dashboard-header">
        <div><div className="eyebrow">TUESDAY · SEPTEMBER 30, 2026</div><h1>Good morning, <span>Creator.</span></h1><p>Your audience is moving. <b>Here&apos;s what matters.</b></p></div>
        <div className="actions"><button className="live" onClick={sync}><i />{syncing ? "SYNCING…" : "SYNC"}</button>{syncMsg && <span className="sync-msg">{syncMsg}</span>}<div className="avatar">BZ</div></div>
      </header>

      <div className="source-strip">
        {platforms.map(({ name, icon: Icon, followers }) => <div className="source" key={name}><Icon size={15} /><span><b>{name}</b><small>{followers} followers</small></span><i /></div>)}
      </div>

      <section className="hero-grid">
        <div className="panel performance cinematic-panel">
          <div className="panel-head"><div><span className="label">THE BIG PICTURE</span><h2>Your content is <strong>moving up.</strong></h2></div><button className="period">30 days⌄</button></div>
          <div className="hero-metric"><span>TOTAL VIEWS</span><strong>2.91M</strong><b>+42.8%</b></div>
          <div className="chart cinematic-chart">{[32,42,38,55,49,62,71,66,82,78,91,88,100].map((height,index)=><div className="bar-wrap" key={index}><div className="bar" style={{height: height + "%"}} /></div>)}</div>
          <div className="metric-line"><span><b>8.7%</b> engagement</span><span><b>2.45M</b> followers</span><span><b>92</b> audience fit</span></div>
        </div>

        <div className="panel radar cinematic-panel">
          <div className="panel-head"><div><span className="label">TREND RADAR</span><h2>What&apos;s moving <strong>now.</strong></h2></div></div>
          <div className="radar-orb"><div className="orbit o1" /><div className="orbit o2" /><div className="orbit o3" /><div className="orb-center"><Radar size={23} /><span>LIVE SIGNALS</span></div><div className="dot d1" /><div className="dot d2" /><div className="dot d3" /></div>
          {trends.map(([name,growth])=><div className="trend-row" key={name}><span>{name}</span><b>{growth}</b></div>)}
        </div>
      </section>

      <section className="lower-grid">
        <div className="panel opportunities cinematic-panel">
          <div className="panel-head"><div><span className="label">YOUR NEXT MOVE</span><h2>Three signals worth acting on.</h2></div></div>
          {opportunities.map(([title,stat,detail],index)=><div className="op" key={title}><div className="op-number">0{index + 1}</div><div className="op-copy"><strong>{title}</strong><span>{detail}</span></div><div className="op-stat"><b>{stat}</b></div></div>)}
        </div>
        <div className="panel ai cinematic-panel">
          <span className="label">WEEKLY INTELLIGENCE</span><Mail size={20} /><h2>One brief.<br /><em>Everything that matters.</em></h2>
          <p>CreatorOS combines your four platforms into one simple weekly report.</p>
          <div className="report-row"><span><i />Next report</span><b>Sunday · 6:00 PM</b></div>
          <button className="primary"><Mail size={15} /> Preview report</button>
        </div>
      </section>

      <div className="mobile-nav">{nav.map(([label,Icon],index)=><button className={index === 0 ? "active" : ""} key={label}><Icon size={17} /><span>{label}</span></button>)}</div>
    </section>
  </main>;
}
