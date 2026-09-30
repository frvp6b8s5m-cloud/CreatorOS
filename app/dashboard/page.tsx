"use client";

import { useState } from "react";
import {
  ArrowUpRight, Bell, Facebook, Instagram, Lightbulb, Mail, Play,
  Radar, Settings, Sparkles, TrendingUp, Users, Video, Youtube
} from "lucide-react";

const platforms = [
  { name: "YouTube", icon: Youtube, stat: "1.2M" },
  { name: "TikTok", icon: Sparkles, stat: "842K" },
  { name: "Instagram", icon: Instagram, stat: "318K" },
  { name: "Facebook", icon: Facebook, stat: "94K" },
];

const signals = [
  { title: "AI storytelling", detail: "Momentum is accelerating across your audience.", growth: "+284%" },
  { title: "Longer openings", detail: "Your audience is staying longer than usual.", growth: "+31%" },
  { title: "Short-form docs", detail: "A format is spreading across multiple platforms.", growth: "+76%" },
];

const nav = [
  ["Home", Sparkles],
  ["Analytics", TrendingUp],
  ["Trends", Radar],
  ["Ideas", Lightbulb],
] as const;

export default function Dashboard() {
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  async function sync() {
    setSyncing(true);
    setMessage("");
    try {
      const response = await fetch("/api/sync", { method: "POST" });
      setMessage(response.ok ? "Updated just now" : "Connect a platform to sync");
    } catch {
      setMessage("Sync unavailable");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <main className="command">
      <aside className="command-sidebar">
        <div className="brand">
          <span className="brandmark"><Sparkles size={16} /></span>
          <span className="brand-word">CreatorOS</span>
        </div>

        <div className="side-nav">
          {nav.map(([label, Icon], index) => (
            <button className={index === 0 ? "active" : ""} key={label}>
              <Icon size={16} /><span>{label}</span>
            </button>
          ))}
        </div>

        <div className="side-bottom">
          <button><Bell size={16} /><span>Alerts</span></button>
          <button><Settings size={16} /><span>Settings</span></button>
          <small><i />4 platforms connected</small>
        </div>
      </aside>

      <section className="command-main">
        <header className="command-top">
          <div>
            <span className="eyebrow">CREATOROS · TUESDAY, SEPTEMBER 30</span>
            <h1>Good morning, <em>Creator.</em></h1>
            <p>Everything worth knowing, in one place.</p>
          </div>
          <div className="top-actions">
            {message && <span className="sync-note">{message}</span>}
            <button className="sync-button" onClick={sync}>
              <i />{syncing ? "Updating" : "Update"}
            </button>
            <div className="avatar">BZ</div>
          </div>
        </header>

        <section className="cinematic-hero">
          <div className="hero-copy">
            <span className="section-kicker">THE BIG PICTURE</span>
            <h2>Your content is <em>moving.</em></h2>
            <p>Across every platform, your audience is showing stronger signals than your usual baseline.</p>
            <div className="hero-number">
              <strong>2.91M</strong>
              <span>total views <b>+42.8%</b></span>
            </div>
          </div>
          <div className="hero-chart" aria-label="30 day view trend">
            {[28,35,32,48,43,56,52,65,61,76,70,84,92,87,100].map((height, i) => (
              <i key={i} style={{ height: height + "%" }} />
            ))}
          </div>
          <div className="hero-foot">
            <span><b>8.7%</b> engagement</span>
            <span><b>2.45M</b> followers</span>
            <span><b>92</b> audience fit</span>
            <span>Last 30 days</span>
          </div>
        </section>

        <section className="platform-line">
          {platforms.map(({ name, icon: Icon, stat }) => (
            <div key={name}>
              <Icon size={15} />
              <span><b>{name}</b><small>{stat} followers</small></span>
              <i />
            </div>
          ))}
        </section>

        <section className="signal-layout">
          <div className="signals-card">
            <div className="section-heading">
              <div><span className="section-kicker">WHAT MATTERS NOW</span><h3>Three signals worth your attention.</h3></div>
              <ArrowUpRight size={18} />
            </div>
            {signals.map((signal, index) => (
              <article className="signal" key={signal.title}>
                <span className="signal-index">0{index + 1}</span>
                <div><strong>{signal.title}</strong><p>{signal.detail}</p></div>
                <b>{signal.growth}</b>
              </article>
            ))}
          </div>

          <div className="next-card">
            <div className="next-glow" />
            <span className="section-kicker">YOUR NEXT MOVE</span>
            <Sparkles size={19} />
            <h3>Make the idea<br /><em>while it&apos;s moving.</em></h3>
            <p>Turn the strongest signal into a short-form concept built around your audience.</p>
            <button>Open Idea Lab <ArrowUpRight size={14} /></button>
          </div>
        </section>

        <section className="bottom-layout">
          <div className="mini-card">
            <span className="section-kicker">WEEKLY INTELLIGENCE</span>
            <div><Mail size={17} /><strong>Your weekly brief is ready every Sunday.</strong><button>Preview</button></div>
          </div>
          <div className="mini-card">
            <span className="section-kicker">RECENT CONTENT</span>
            <div><Video size={17} /><strong>See what is outperforming your baseline.</strong><button>View content</button></div>
          </div>
        </section>
      </section>
    </main>
  );
}
