"use client";
import {ArrowRight,Check,Plus,Sparkles} from "lucide-react";
import {useEffect,useState} from "react";
type Channel={id:string;platform:string;display_name:string;external_account_id:string};
const platforms=[["YouTube","youtube"],["TikTok","tiktok"],["Instagram","instagram"],["Facebook","facebook"]] as const;
export default function Onboarding(){
 const [channels,setChannels]=useState<Channel[]>([]); const [platform,setPlatform]=useState("youtube"); const [name,setName]=useState(""); const [url,setUrl]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 useEffect(()=>{fetch("/api/channels").then(r=>r.json()).then(d=>setChannels(d.channels||[])).catch(()=>{});},[]);
 async function add(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");try{const r=await fetch("/api/channels",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({platform,name,url})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not add channel");setChannels(v=>[...v.filter(x=>x.id!==d.channel.id),d.channel]);setName("");setUrl("");}catch(e){setError(e instanceof Error?e.message:"Could not add channel");}finally{setBusy(false);}}
 return <main className="onboarding"><div className="onboard-shell">
  <div className="brand"><span className="brandmark"><Sparkles size={16}/></span><b>CreatorOS</b></div><div className="progress"><i className="on"/><i className="on"/><i className="on"/></div>
  <div className="section-label">STEP 2 · ADD YOUR CHANNELS</div><h1>Bring your<br/><em>entire audience.</em></h1>
  <p>Add the public homepage for each channel. No developer console, API keys, or OAuth setup is required.</p>
  <form onSubmit={add} className="channel-form"><label>Platform<select value={platform} onChange={e=>setPlatform(e.target.value)}>{platforms.map(([p,id])=><option key={id} value={id}>{p}</option>)}</select></label><label>Channel name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="My Creator Channel"/></label><label>Channel homepage URL<input required value={url} onChange={e=>setUrl(e.target.value)} placeholder="youtube.com/@yourname"/></label>{error&&<div className="error">{error}</div>}<button className="primary" disabled={busy}>{busy?"Adding…":"Add channel"} <Plus size={15}/></button></form>
  <div className="saved-channels"><div className="section-label">MONITORED CHANNELS · {channels.length}</div>{channels.map(c=><div className="saved-channel" key={c.id}><Check size={16}/><div><b>{c.display_name}</b><small>{c.platform} · <a href={c.external_account_id} target="_blank" rel="noreferrer">Open channel</a></small></div></div>)}</div>
  <button className="primary continue" disabled={!channels.length} onClick={()=>window.location.assign("/dashboard")}>Continue to CreatorOS <ArrowRight size={15}/></button>
 </div></main>
}