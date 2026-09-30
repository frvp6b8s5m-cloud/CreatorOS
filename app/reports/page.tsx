"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowLeft,FileText,Mail,Sparkles} from "lucide-react";
type Insight={title:string;summary:string;confidence:number;actions:string[]};
export default function Reports(){
 const [items,setItems]=useState<Insight[]|null>(null);
 useEffect(()=>{fetch("/api/report/preview").then(r=>r.ok?r.json():null).then(d=>setItems(d?.insights||[])).catch(()=>setItems([]));},[]);
 return <main className="simple-page"><div className="simple-card"><Link href="/dashboard" className="back"><ArrowLeft size={15}/> Back to dashboard</Link><Sparkles size={20}/><span className="label">WEEKLY INTELLIGENCE</span><h1>Your week in<br/><em>creator intelligence.</em></h1><p>CreatorOS turns your connected channels into a concise weekly brief with opportunities, experiments, and next moves.</p><div className="report-list">{items===null?<div className="empty-channel">Preparing your intelligence brief…</div>:items.map((x,i)=><div className="report-item" key={x.title}><span>0{i+1}</span><div><b>{x.title}</b><p>{x.summary}</p><small>{Math.round(x.confidence*100)}% confidence · {x.actions.join(" · ")}</small></div></div>)}</div><div className="report-note"><Mail size={16}/><span>Weekly email delivery is configured for the account email when the scheduled report job runs.</span></div><Link className="primary" href="/dashboard"><FileText size={15}/> Return to command center</Link></div></main>;
}