import Link from "next/link";
import { ArrowRight, BarChart3, Bell, Brain, CheckCircle2, Mail, Radar, Sparkles, TrendingUp, Users, Zap } from "lucide-react";

type Feature = { title: string; desc: string; Icon: typeof BarChart3 };

const features: Feature[] = [
  { title: "Channel Intelligence", desc: "Understand what is happening across every connected channel.", Icon: BarChart3 },
  { title: "Trend Radar", desc: "Detect emerging topics before they become saturated.", Icon: Radar },
  { title: "AI Opportunities", desc: "Turn audience + market signals into concrete content ideas.", Icon: Brain },
  { title: "Weekly Intelligence", desc: "Get a complete performance and opportunity report by email.", Icon: Mail },
];

export default function Landing() {
  return <main className="landing" data-build="creatoros-live">
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
    <header className="landing-nav"><Link href="/" className="brand"><span className="brandmark"><Sparkles size={16}/></span><b>CreatorOS</b></Link><div className="nav-actions"><Link href="/login">Log in</Link><Link href="/signup" className="nav-cta">Create account <ArrowRight size={14}/></Link></div></header>
    <section className="landing-hero">
      <div className="hero-badge"><i/> CREATOR INTELLIGENCE PLATFORM</div>
      <h1>Know what to create<br/><em>before you create it.</em></h1>
      <p>Connect your channels. CreatorOS learns your audience, watches the market, finds opportunities, and turns your data into a weekly intelligence brief.</p>
      <div className="hero-actions"><Link href="/signup" className="primary large"><Sparkles size={17}/> Create your CreatorOS <ArrowRight size={16}/></Link><span><CheckCircle2 size={14}/> Free to get started</span></div>
      <div className="hero-preview"><div className="preview-top"><span>CREATOROS INTELLIGENCE</span><span><i/> LIVE SIGNALS</span></div><div className="preview-grid"><div><small>CHANNEL MOMENTUM</small><strong>+42.8%</strong><div className="mini-chart">{[34,48,40,61,55,72,66,91].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div></div><div className="preview-radar"><Radar size={25}/><b>Trend Radar</b><span>7 emerging signals</span></div><div className="preview-op"><Zap size={18}/><b>Opportunity detected</b><span>AI storytelling is accelerating</span><strong>+284%</strong></div></div></div>
    </section>
    <section className="feature-section"><div className="section-label">ONE COMMAND CENTER</div><h2>Everything your channel is telling you,<br/>in one place.</h2><div className="feature-grid">{features.map(({ title, desc, Icon })=><div className="feature" key={title}><span className="feature-icon"><Icon size={18}/></span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>
    <section className="workflow"><div><div className="section-label">THE INTELLIGENCE LOOP</div><h2>Connect once.<br/><em>Keep learning.</em></h2></div><div className="steps">{["Connect channels","CreatorOS analyzes","Signals become opportunities","Weekly brief arrives"].map((x,i)=><div className="step" key={x}><span>0{i+1}</span><b>{x}</b>{i<3&&<ArrowRight size={14}/>}</div>)}</div></section>
    <footer><span>CreatorOS</span><span>Creator intelligence, without the noise.</span></footer>
  </main>
}