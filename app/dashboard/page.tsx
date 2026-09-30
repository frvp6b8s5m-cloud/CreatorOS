"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bell, ChevronRight, Facebook, Instagram, Lightbulb, Mail,
  Radar, Settings, Sparkles, TrendingUp, Youtube
} from "lucide-react";

const platforms = [
  { name: "YouTube", icon: Youtube, value: "1.2M" },
  { name: "TikTok", icon: Sparkles, value: "842K" },
  { name: "Instagram", icon: Instagram, value: "318K" },
  { name: "Facebook", icon: Facebook, value: "94K" },
];

const trendSignals = [
  ["AI VIDEO", "+284%", "Rising fast"],
  ["CREATOR TOOLS", "+117%", "Strong momentum"],
  ["SHORT-FORM DOCS", "+76%", "Early signal"],
];

const nextMoves = [
  ["01", "AI storytelling is accelerating", "Build around the format while momentum is rising.", "+284%"],
  ["02", "Longer openings are working", "Your audience is holding attention beyond your baseline.", "+31%"],
  ["03", "TikTok is leading your Reels", "Three formats are appearing there before Instagram.", "3 gaps"],
];

export default function Dashboard() {
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");
  const [live, setLive] = useState<any>(null);

  async function loadDashboard() {
    try {
      const response = await fetch("/api/dashboard", { cache: "no-store" });
      if (response.ok) setLive(await response.json());
    } catch {}
  }

  useEffect(() => { loadDashboard(); }, []);

  async function sync() {
    setSyncing(true);
    setSyncMsg("");
    try {
      const response = await fetch("/api/sync", { method: "POST" });
      setSyncMsg(response.ok ? "Updated just now" : "Connect a platform first");
      if (response.ok) await loadDashboard();
    } catch {
      setSyncMsg("Could not update right now");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <main className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandmark"><Sparkles size={16} /></div>
          <div><b>CreatorOS</b><span>INTELLIGENCE</span></div>
        </div>

        <div className="workspace">
          <span>WORKSPACE</span>
          <strong>Creator Command</strong>
        </div>

        <nav>
          <Link className="active" href="/dashboard"><span>01</span>Home</Link>
          <Link href="/analytics"><span>02</span>Analytics</Link>
          <Link href="/trends"><span>03</span>Trends</Link>
          <Link href="/ideas"><span>04</span>Ideas</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link href="/alerts"><Bell size={16} /><span>Alerts</span></Link>
          <Link href="/settings"><Settings size={16} /><span>Settings</span></Link>
          <div className="status"><i />{live?.connected?.length ? `${live.connected.length} platform${live.connected.length === 1 ? "" : "s"} connected` : "Waiting for channels"}</div>
        </div>
      </aside>

      <section className="main cinematic-main">
        <header className="dashboard-header cinematic-header">
          <div>
            <div className="eyebrow">TUESDAY · SEPTEMBER 30, 2026</div>
            <h1>Good morning, <span>Creator.</span></h1>
            <p>Your audience is moving. <b>Here&apos;s what matters.</b></p>
          </div>
          <div className="actions">
            <button className="sync-button" onClick={sync}>
              <i />{syncing ? "UPDATING…" : "UPDATE DATA"}
            </button>
            {syncMsg && <span className="sync-msg">{syncMsg}</span>}
            <div className="avatar">BZ</div>
          </div>
        </header>

        <section className="platform-dock">
          <span className="dock-label">YOUR WORLD</span>
          {platforms.map(({ name, icon: Icon, value }) => (
            <div className="platform-pill" key={name}>
              <Icon size={14} />
              <b>{name}</b>
              <span>{live?.platforms?.find((p: any) => p.platform === name.toLowerCase())?.views ? `${(live.platforms.find((p: any) => p.platform === name.toLowerCase()).views / 1000).toFixed(0)}K` : "—"}</span>
              <i />
            </div>
          ))}
        </section>

        <section className="cinematic-hero">
          <div className="hero-copy">
            <span className="label">THE BIG PICTURE</span>
            <h2>Your content is<br /><em>moving up.</em></h2>
            <div className="hero-number">
              <strong>{live?.hasData ? `${(live.totalViews / 1000000).toFixed(2)}M` : "—"}</strong>
              <span>total views</span>
            </div>
            <div className="hero-change"><i /> {live?.connected?.length || 0} connected <span>{live?.hasData ? "live data available" : "connect a channel to start"}</span></div>
          </div>

          <div className="hero-visual">
            <div className="chart-grid">
              {[0, 1, 2, 3].map((n) => <i key={n} />)}
            </div>
            <svg viewBox="0 0 800 260" preserveAspectRatio="none" aria-label="30 day view trend">
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#9b86ff" stopOpacity=".34" />
                  <stop offset="100%" stopColor="#9b86ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 225 C80 210 85 170 145 184 S230 160 280 174 S350 128 405 145 S475 100 530 118 S620 78 670 91 S735 45 800 54 L800 260 L0 260 Z" fill="url(#area)" />
              <path d="M0 225 C80 210 85 170 145 184 S230 160 280 174 S350 128 405 145 S475 100 530 118 S620 78 670 91 S735 45 800 54" fill="none" stroke="#aa98ff" strokeWidth="3" />
              <circle cx="800" cy="54" r="6" fill="#c2b7ff" />
            </svg>
            <div className="chart-caption"><span>30 DAYS AGO</span><span>TODAY</span></div>
          </div>

          <div className="hero-stats">
            <div><span>ENGAGEMENT</span><b>{live?.hasData ? `${live.engagementRate.toFixed(1)}%` : "—"}</b><small>live</small></div>
            <div><span>FOLLOWERS</span><b>{live?.hasData ? live.followers.toLocaleString() : "—"}</b><small>live</small></div>
            <div><span>AUDIENCE FIT</span><b>{live?.audienceFit ?? "—"}</b><small>{live?.hasData ? "Connected audience" : "Connect channels"}</small></div>
          </div>
        </section>

        <section className="signal-grid">
          <div className="signal-panel">
            <div className="section-head">
              <div><span className="label">TREND RADAR</span><h3>What&apos;s moving <em>now.</em></h3></div>
              <Radar size={19} />
            </div>
            <div className="radar-stage">
              <div className="radar-rings"><i /><i /><i /></div>
              <div className="radar-core"><Radar size={19} /><span>LIVE<br />SIGNALS</span></div>
              <b className="signal-dot sd1">AI</b>
              <b className="signal-dot sd2">DOCS</b>
              <b className="signal-dot sd3">TOOLS</b>
            </div>
            <div className="trend-list">
              {trendSignals.map(([name, growth, state]) => (
                <div key={name}><span><b>{name}</b><small>{state}</small></span><strong>{growth}</strong></div>
              ))}
            </div>
          </div>

          <div className="signal-panel next-move">
            <div className="section-head">
              <div><span className="label">YOUR NEXT MOVE</span><h3>Three signals worth <em>acting on.</em></h3></div>
              <Lightbulb size={19} />
            </div>
            <div className="move-list">
              {nextMoves.map(([number, title, detail, stat]) => (
                <div className="move" key={number}>
                  <span className="move-number">{number}</span>
                  <div><b>{title}</b><small>{detail}</small></div>
                  <strong>{stat}</strong>
                  <ChevronRight size={15} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="weekly-card">
          <div className="weekly-icon"><Mail size={20} /></div>
          <div>
            <span className="label">WEEKLY INTELLIGENCE</span>
            <h3>One brief. <em>Everything that matters.</em></h3>
            <p>Your cross-platform report arrives every Sunday with performance, trends, opportunities and what to do next.</p>
          </div>
          <button>Preview report <ChevronRight size={15} /></button>
        </section>

        <footer className="dashboard-footer">CREATOROS · YOUR CONTENT, ONE CLEAR SIGNAL.</footer>
      </section>
    </main>
  );
}
