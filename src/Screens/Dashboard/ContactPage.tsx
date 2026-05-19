import React, { useState, useEffect, useRef } from "react";

// ── Shared ──────────────────────────────────────────────────────────────────
const Input: React.FC<{label:string;placeholder:string;value:string;onChange:(v:string)=>void;type?:string}> = ({label,placeholder,value,onChange,type="text"}) => (
  <div>
    <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">{label}</label>
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} type={type}
      className="cp-input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white placeholder-gray-600 transition-all"/>
  </div>
);

const Textarea: React.FC<{label:string;placeholder:string;value:string;onChange:(v:string)=>void;rows?:number}> = ({label,placeholder,value,onChange,rows=5}) => (
  <div>
    <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">{label}</label>
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="cp-input w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white placeholder-gray-600 transition-all"/>
  </div>
);

const SendBtn: React.FC<{label:string;sending:boolean;sent:boolean;disabled:boolean;onClick:()=>void}> = ({label,sending,sent,disabled,onClick}) => (
  sent ? (
    <div className="check-pop flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 py-3 text-[13px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">
      ✓ Sent successfully!
    </div>
  ) : (
    <button onClick={onClick} disabled={disabled||sending}
      className="send-btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c5cfc] py-3.5 text-[14px] font-bold text-white">
      {sending ? <><span className="spinner">⟳</span> Sending...</> : <><span>🚀</span> {label}</>}
    </button>
  )
);

// ── Tab 1: Get in touch ──────────────────────────────────────────────────────
const TabGetInTouch: React.FC = () => {
  const [name,setName]=useState(""); const [email,setEmail]=useState("");
  const [subject,setSubject]=useState(""); const [message,setMessage]=useState("");
  const [subjectOpen,setSubjectOpen]=useState(false);
  const [sending,setSending]=useState(false); const [sent,setSent]=useState(false);
  const subjects=["General inquiry","Technical support","Billing question","Partnership","Press & Media","Other"];

  const handleSend=()=>{ if(!name||!email||!subject||!message) return; setSending(true); setTimeout(()=>{setSending(false);setSent(true);},1500); };

  const contactWays=[
    {icon:"✉️",label:"Email",sub:"hello@operino.ai",badge:null,color:"#7c5cfc"},
    {icon:"💬",label:"Live Chat",sub:"Chat with our support team",badge:"Available",color:"#22c55e"},
    {icon:"📖",label:"Help Center",sub:"Find answers to common questions",badge:null,color:"#3b82f6"},
    {icon:"🤝",label:"Partnerships",sub:"business@operino.ai",badge:null,color:"#f97316"},
    {icon:"📺",label:"Press & Media",sub:"press@operino.ai",badge:null,color:"#a78bfa"},
  ];

  const faqs=[
    {q:"How quickly will I get a response?",a:"Our team typically responds within 24 hours. For urgent issues, use Live Chat for immediate assistance."},
    {q:"What information should I include in my message?",a:"Include your account email, a clear description of your issue, and any relevant screenshots or error messages."},
    {q:"Do you offer phone support?",a:"Currently we offer support via email and live chat. Phone support is available for Business plan users."},
  ];
  const [openFaq,setOpenFaq]=useState<number|null>(null);
  const [rating,setRating]=useState(0);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
      <div className="flex flex-col gap-5">
        {/* Form */}
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-6">
          <h2 className="mb-1 text-[15px] font-bold text-white">Send us a message</h2>
          <p className="mb-5 text-[12px] text-gray-500">Fill out the form below and we'll get back to you.</p>
          {sent ? (
            <div className="check-pop flex flex-col items-center gap-3 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl ring-2 ring-emerald-500/30">✓</div>
              <p className="text-[16px] font-bold text-white">Message sent!</p>
              <p className="text-[13px] text-gray-400">We'll get back to you within 24 hours.</p>
              <button onClick={()=>{setSent(false);setName("");setEmail("");setSubject("");setMessage("");}}
                className="mt-2 rounded-xl border border-white/12 bg-white/5 px-5 py-2 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Send another message</button>
            </div>
          ):(
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Full name" placeholder="Enter your full name" value={name} onChange={setName}/>
                <Input label="Email address" placeholder="Enter your email address" value={email} onChange={setEmail} type="email"/>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Subject</label>
                <div className="relative">
                  <button onClick={()=>setSubjectOpen(o=>!o)}
                    className="cp-input flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] transition-all">
                    <span className={subject?"text-white":"text-gray-600"}>{subject||"Select a subject"}</span>
                    <span className={`text-gray-500 text-xs transition-transform duration-200 ${subjectOpen?"rotate-180":""}`}>▾</span>
                  </button>
                  {subjectOpen&&<div className="drop-in absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-2xl">
                    {subjects.map(s=><div key={s} onClick={()=>{setSubject(s);setSubjectOpen(false);}} className="subject-item px-4 py-2.5 text-[13px] text-gray-400 hover:text-white">{s}</div>)}
                  </div>}
                </div>
              </div>
              <Textarea label="Message" placeholder="Type your message here..." value={message} onChange={setMessage}/>
              <SendBtn label="Send Message" sending={sending} sent={sent} disabled={!name||!email||!subject||!message} onClick={handleSend}/>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h2 className="mb-1 text-[15px] font-bold text-white">Frequently Asked Questions</h2>
          <p className="mb-4 text-[12px] text-gray-500">Quick answers to common questions.</p>
          <div className="flex flex-col gap-2">
            {faqs.map((f,i)=>(
              <div key={i} className="faq-item rounded-xl bg-white/3 px-4" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[13px] font-semibold text-white">{f.q}</span>
                  <span className={`flex-shrink-0 ml-3 text-[#a78bfa] text-sm transition-transform duration-200 ${openFaq===i?"rotate-180":""}`}>▾</span>
                </div>
                <div className="faq-answer overflow-hidden" style={{maxHeight:openFaq===i?"120px":"0",opacity:openFaq===i?1:0}}>
                  <p className="pb-3 text-[12px] leading-relaxed text-gray-400">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all FAQs →</button>
        </div>

        {/* Bottom CTA */}
        <div className="cp-card flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#0d0b1f] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c5cfc]/20 text-xl">🎧</div>
            <div><p className="text-[13px] font-bold text-white">Need immediate help?</p><p className="text-[11px] text-gray-500">Check out our Help Center or start a live chat.</p></div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Visit Help Center</button>
            <button className="send-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-4 py-2 text-[12px] font-bold text-white">💬 Start Live Chat</button>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-5">
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-1 text-[14px] font-bold text-white">Other ways to reach us</h3>
          <p className="mb-4 text-[11px] text-gray-500">Choose the best way to contact us.</p>
          <div className="flex flex-col gap-2">
            {contactWays.map((w,i)=>(
              <div key={i} className="way-row flex items-center gap-3 rounded-xl bg-white/3 px-3 py-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xl" style={{background:`${w.color}20`}}>{w.icon}</div>
                <div className="flex-1 min-w-0"><p className="text-[12px] font-bold text-white">{w.label}</p><p className="truncate text-[11px]" style={{color:w.badge?w.color:"rgba(156,163,175,1)"}}>{w.sub}</p></div>
                {w.badge&&<span className="live-badge flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{background:`${w.color}20`,color:w.color}}>{w.badge}</span>}
                <span className="way-arrow text-gray-600 text-sm">›</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-1 text-[14px] font-bold text-white">We value your feedback</h3>
          <p className="mb-3 text-[11px] text-gray-500">Your feedback helps us improve Operino.</p>
          <div className="flex items-center justify-between rounded-xl border border-[#7c5cfc]/25 bg-[#7c5cfc]/08 px-4 py-3 mb-3">
            <div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#7c5cfc]/20 text-lg">⭐</div><div><p className="text-[12px] font-bold text-white">Share your feedback</p><p className="text-[10px] text-gray-500">Help us build a better experience.</p></div></div>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#7c5cfc] text-white text-sm hover:bg-[#6b4ce0] transition-all flex-shrink-0">→</button>
          </div>
          <p className="mb-2 text-[11px] text-gray-500 text-center">Rate your experience</p>
          <div className="flex justify-center gap-2">
            {[1,2,3,4,5].map(s=>(
              <button key={s} onClick={()=>setRating(s)} className={`text-2xl transition-transform hover:scale-125 ${s<=rating?"text-yellow-400":"text-gray-700"}`}>★</button>
            ))}
          </div>
        </div>
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-3 text-[14px] font-bold text-white">Office Hours</h3>
          {[{l:"Monday – Friday",v:"9 AM – 6 PM UTC"},{l:"Saturday",v:"10 AM – 2 PM UTC"},{l:"Sunday",v:"Closed"}].map((h,i)=>(
            <div key={i} className="flex items-center justify-between border-b border-white/5 py-2">
              <span className="text-[12px] text-gray-400">{h.l}</span>
              <span className={`text-[12px] font-semibold ${h.v==="Closed"?"text-red-400":"text-white"}`}>{h.v}</span>
            </div>
          ))}
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/08 px-3 py-2 border border-emerald-500/20">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-[11px] font-semibold text-emerald-400">Support team is online now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Tab 2: Support ───────────────────────────────────────────────────────────
const TabSupport: React.FC = () => {
  const [title,setTitle]=useState(""); const [email,setEmail]=useState("");
  const [priority,setPriority]=useState(""); const [desc,setDesc]=useState("");
  const [sending,setSending]=useState(false); const [sent,setSent]=useState(false);
  const [priorityOpen,setPriorityOpen]=useState(false);

  const tickets=[
    {id:"TKT-1042",title:"WhatsApp integration not syncing",status:"In Progress",priority:"High",date:"May 14, 2024",statusColor:"#f97316"},
    {id:"TKT-1039",title:"AI Employee not responding correctly",status:"Resolved",priority:"Medium",date:"May 10, 2024",statusColor:"#22c55e"},
    {id:"TKT-1035",title:"Billing invoice question",status:"Resolved",priority:"Low",date:"May 5, 2024",statusColor:"#22c55e"},
  ];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
      <div className="flex flex-col gap-5">
        {/* New ticket form */}
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-6">
          <h2 className="mb-1 text-[15px] font-bold text-white">Submit a Support Ticket</h2>
          <p className="mb-5 text-[12px] text-gray-500">Describe your issue and we'll assign a specialist to help you.</p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Issue title" placeholder="Brief description of the issue" value={title} onChange={setTitle}/>
              <Input label="Email address" placeholder="your@email.com" value={email} onChange={setEmail} type="email"/>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Priority level</label>
              <div className="relative">
                <button onClick={()=>setPriorityOpen(o=>!o)}
                  className="cp-input flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] transition-all">
                  <span className={priority?"text-white":"text-gray-600"}>{priority||"Select priority"}</span>
                  <span className={`text-gray-500 text-xs transition-transform duration-200 ${priorityOpen?"rotate-180":""}`}>▾</span>
                </button>
                {priorityOpen&&<div className="drop-in absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-2xl">
                  {[{l:"🔴 Critical",v:"Critical"},{l:"🟠 High",v:"High"},{l:"🟡 Medium",v:"Medium"},{l:"🟢 Low",v:"Low"}].map(p=>(
                    <div key={p.v} onClick={()=>{setPriority(p.v);setPriorityOpen(false);}} className="subject-item px-4 py-2.5 text-[13px] text-gray-400 hover:text-white">{p.l}</div>
                  ))}
                </div>}
              </div>
            </div>
            <Textarea label="Describe your issue" placeholder="Please provide as much detail as possible..." value={desc} onChange={setDesc} rows={5}/>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Attachments (optional)</label>
              <div className="flex items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/3 py-5 cursor-pointer hover:border-[#7c5cfc]/40 hover:bg-[#7c5cfc]/05 transition-all">
                <div className="text-center"><p className="text-sm">📎</p><p className="text-[12px] text-gray-500 mt-1">Drop files here or <span className="text-[#a78bfa]">browse</span></p><p className="text-[10px] text-gray-600 mt-0.5">PNG, JPG, PDF up to 10MB</p></div>
              </div>
            </div>
            <SendBtn label="Submit Ticket" sending={sending} sent={sent} disabled={!title||!email||!priority||!desc} onClick={()=>{setSending(true);setTimeout(()=>{setSending(false);setSent(true);},1500);}}/>
          </div>
        </div>

        {/* Existing tickets */}
        <div className="cp-card rounded-2xl bg-[#0d0b1f] overflow-hidden">
          <div className="border-b border-white/8 px-5 py-3 flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-white">Your Tickets</h3>
            <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">View all →</button>
          </div>
          <div className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-600" style={{gridTemplateColumns:"80px 1fr 100px 80px 100px"}}>
            <span>ID</span><span>Title</span><span>Status</span><span>Priority</span><span>Date</span>
          </div>
          {tickets.map((t,i)=>(
            <div key={i} className="way-row grid items-center px-5 py-3 cursor-pointer" style={{gridTemplateColumns:"80px 1fr 100px 80px 100px"}}>
              <span className="font-mono text-[11px] text-[#a78bfa]">{t.id}</span>
              <span className="text-[12px] font-semibold text-white truncate pr-3">{t.title}</span>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold w-fit" style={{background:`${t.statusColor}20`,color:t.statusColor}}>{t.status}</span>
              <span className="text-[11px] text-gray-400">{t.priority}</span>
              <span className="text-[11px] text-gray-500">{t.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-5">
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-3 text-[14px] font-bold text-white">Support Channels</h3>
          {[{icon:"💬",l:"Live Chat",sub:"Response in minutes",badge:"Online",c:"#22c55e"},{icon:"✉️",l:"Email Support",sub:"support@operino.ai",badge:"< 24h",c:"#7c5cfc"},{icon:"📖",l:"Documentation",sub:"Self-service guides",badge:null,c:"#3b82f6"},{icon:"🎥",l:"Video Tutorials",sub:"Watch & learn",badge:null,c:"#a78bfa"}].map((s,i)=>(
            <div key={i} className="way-row flex items-center gap-3 rounded-xl bg-white/3 px-3 py-2.5 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl text-base" style={{background:`${s.c}20`}}>{s.icon}</div>
              <div className="flex-1"><p className="text-[12px] font-semibold text-white">{s.l}</p><p className="text-[10px] text-gray-500">{s.sub}</p></div>
              {s.badge&&<span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{background:`${s.c}20`,color:s.c}}>{s.badge}</span>}
              <span className="way-arrow text-gray-600 text-xs">›</span>
            </div>
          ))}
        </div>
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-3 text-[14px] font-bold text-white">System Status</h3>
          {[{l:"API",s:"Operational"},{l:"Dashboard",s:"Operational"},{l:"Conversations",s:"Operational"},{l:"Integrations",s:"Degraded"}].map((s,i)=>(
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-[12px] text-gray-400">{s.l}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${s.s==="Operational"?"bg-emerald-500/15 text-emerald-400":"bg-yellow-500/15 text-yellow-400"}`}>{s.s}</span>
            </div>
          ))}
          <button className="mt-2 text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">View status page →</button>
        </div>
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-2 text-[14px] font-bold text-white">SLA Response Times</h3>
          {[{l:"Critical",v:"< 1 hour",c:"#f87171"},{l:"High",v:"< 4 hours",c:"#f97316"},{l:"Medium",v:"< 24 hours",c:"#fbbf24"},{l:"Low",v:"< 72 hours",c:"#22c55e"}].map((s,i)=>(
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5">
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full" style={{background:s.c}}/><span className="text-[12px] text-gray-400">{s.l}</span></div>
              <span className="text-[11px] font-semibold text-white">{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Tab 3: Partnerships ──────────────────────────────────────────────────────
const TabPartnerships: React.FC = () => {
  const [company,setCompany]=useState(""); const [name,setName]=useState("");
  const [email,setEmail]=useState(""); const [type,setType]=useState(""); const [desc,setDesc]=useState("");
  const [typeOpen,setTypeOpen]=useState(false);
  const [sending,setSending]=useState(false); const [sent,setSent]=useState(false);

  const types=["Technology Integration","Reseller Partner","Agency Partner","Strategic Alliance","Other"];

  const benefits=[
    {icon:"🚀",title:"Revenue sharing",desc:"Earn competitive commissions on referrals and integrations."},
    {icon:"🎯",title:"Co-marketing",desc:"Joint marketing campaigns and co-branded materials."},
    {icon:"🛠️",title:"Technical support",desc:"Dedicated integration support and developer resources."},
    {icon:"📈",title:"Growth resources",desc:"Access to training, certifications, and growth tools."},
  ];

  const partners=[
    {icon:"🟣",name:"Slack",type:"Technology"},
    {icon:"🔵",name:"Google",type:"Technology"},
    {icon:"🧡",name:"HubSpot",type:"CRM"},
    {icon:"🔴",name:"Zapier",type:"Automation"},
    {icon:"⚫",name:"Notion",type:"Productivity"},
    {icon:"💙",name:"Stripe",type:"Payments"},
  ];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
      <div className="flex flex-col gap-5">
        {/* Benefits */}
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-6">
          <h2 className="mb-1 text-[15px] font-bold text-white">Partner with Operino</h2>
          <p className="mb-5 text-[12px] text-gray-500">Join our growing ecosystem and help businesses automate smarter.</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {benefits.map((b,i)=>(
              <div key={i} className="cp-card flex gap-3 rounded-xl bg-white/3 p-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-xl">{b.icon}</div>
                <div><p className="text-[12px] font-bold text-white">{b.title}</p><p className="text-[10px] text-gray-500 mt-0.5">{b.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-5">
            <h3 className="mb-4 text-[14px] font-bold text-white">Apply for Partnership</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Company name" placeholder="Your company name" value={company} onChange={setCompany}/>
                <Input label="Your name" placeholder="Full name" value={name} onChange={setName}/>
              </div>
              <Input label="Business email" placeholder="you@company.com" value={email} onChange={setEmail} type="email"/>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Partnership type</label>
                <div className="relative">
                  <button onClick={()=>setTypeOpen(o=>!o)} className="cp-input flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] transition-all">
                    <span className={type?"text-white":"text-gray-600"}>{type||"Select type"}</span>
                    <span className={`text-gray-500 text-xs transition-transform duration-200 ${typeOpen?"rotate-180":""}`}>▾</span>
                  </button>
                  {typeOpen&&<div className="drop-in absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-2xl">
                    {types.map(t=><div key={t} onClick={()=>{setType(t);setTypeOpen(false);}} className="subject-item px-4 py-2.5 text-[13px] text-gray-400 hover:text-white">{t}</div>)}
                  </div>}
                </div>
              </div>
              <Textarea label="Tell us about your use case" placeholder="Describe how you'd like to partner with Operino..." value={desc} onChange={setDesc} rows={4}/>
              <SendBtn label="Submit Application" sending={sending} sent={sent} disabled={!company||!name||!email||!type||!desc} onClick={()=>{setSending(true);setTimeout(()=>{setSending(false);setSent(true);},1500);}}/>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-5">
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-3 text-[14px] font-bold text-white">Contact Partnerships</h3>
          <div className="flex items-center gap-3 rounded-xl border border-[#7c5cfc]/25 bg-[#7c5cfc]/08 p-3 mb-3">
            <span className="text-xl">🤝</span>
            <div><p className="text-[12px] font-bold text-white">business@operino.ai</p><p className="text-[10px] text-gray-500">Response within 2 business days</p></div>
          </div>
          <p className="text-[11px] text-gray-500">For existing partners, access your partner portal for resources and support.</p>
          <button className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Partner Portal →</button>
        </div>
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-3 text-[14px] font-bold text-white">Current Partners</h3>
          <div className="grid grid-cols-3 gap-2">
            {partners.map((p,i)=>(
              <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/6 bg-white/3 p-3 cursor-pointer hover:border-[#7c5cfc]/35 transition-all">
                <span className="text-2xl">{p.icon}</span>
                <p className="text-[10px] font-semibold text-white">{p.name}</p>
                <p className="text-[9px] text-gray-600">{p.type}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-2 text-[14px] font-bold text-white">Partnership Tiers</h3>
          {[{l:"Silver",v:"Up to $10K ARR",c:"#9ca3af"},{l:"Gold",v:"$10K – $50K ARR",c:"#fbbf24"},{l:"Platinum",v:"$50K+ ARR",c:"#a78bfa"}].map((t,i)=>(
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
              <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full" style={{background:t.c}}/><span className="text-[12px] font-semibold text-white">{t.l}</span></div>
              <span className="text-[11px] text-gray-500">{t.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Tab 4: Press & Media ─────────────────────────────────────────────────────
const TabPressMedia: React.FC = () => {
  const [name,setName]=useState(""); const [email,setEmail]=useState("");
  const [outlet,setOutlet]=useState(""); const [inquiry,setInquiry]=useState("");
  const [sending,setSending]=useState(false); const [sent,setSent]=useState(false);

  const resources=[
    {icon:"🖼️",label:"Logo Package",desc:"SVG, PNG formats in all sizes",action:"Download"},
    {icon:"🎨",label:"Brand Guidelines",desc:"Colors, fonts, usage rules",action:"Download"},
    {icon:"📸",label:"Product Screenshots",desc:"High-res dashboard images",action:"Download"},
    {icon:"📄",label:"Press Release Kit",desc:"Latest announcements",action:"Download"},
    {icon:"👤",label:"Executive Bios",desc:"Leadership team profiles",action:"Download"},
    {icon:"📊",label:"Company Fact Sheet",desc:"Key stats and milestones",action:"Download"},
  ];

  const mentions=[
    {pub:"TechCrunch",title:"Operino raises $5M to automate AI workflows",date:"Apr 2024",icon:"📰"},
    {pub:"Forbes",title:"Top 10 AI Automation Startups to Watch",date:"Mar 2024",icon:"📰"},
    {pub:"Product Hunt",title:"#1 Product of the Day",date:"Feb 2024",icon:"🏆"},
  ];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
      <div className="flex flex-col gap-5">
        {/* Press resources */}
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-6">
          <h2 className="mb-1 text-[15px] font-bold text-white">Press Resources</h2>
          <p className="mb-5 text-[12px] text-gray-500">Download official assets and materials for your coverage.</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {resources.map((r,i)=>(
              <div key={i} className="cp-card flex items-center gap-3 rounded-xl bg-white/3 p-3 cursor-pointer hover:border-[#7c5cfc]/35">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-xl">{r.icon}</div>
                <div className="flex-1 min-w-0"><p className="text-[12px] font-bold text-white truncate">{r.label}</p><p className="text-[10px] text-gray-500">{r.desc}</p></div>
                <button className="flex-shrink-0 rounded-lg bg-[#7c5cfc]/20 px-2 py-1 text-[10px] font-semibold text-[#a78bfa] hover:bg-[#7c5cfc]/35 transition-all">⬇️</button>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-5">
            <h3 className="mb-4 text-[14px] font-bold text-white">Media Inquiry</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Your name" placeholder="Full name" value={name} onChange={setName}/>
                <Input label="Email address" placeholder="you@publication.com" value={email} onChange={setEmail} type="email"/>
              </div>
              <Input label="Publication / Outlet" placeholder="Where are you writing for?" value={outlet} onChange={setOutlet}/>
              <Textarea label="Your inquiry" placeholder="Tell us about your story or request..." value={inquiry} onChange={setInquiry} rows={4}/>
              <SendBtn label="Send Inquiry" sending={sending} sent={sent} disabled={!name||!email||!outlet||!inquiry} onClick={()=>{setSending(true);setTimeout(()=>{setSending(false);setSent(true);},1500);}}/>
            </div>
          </div>
        </div>

        {/* Press mentions */}
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-1 text-[14px] font-bold text-white">Recent Coverage</h3>
          <p className="mb-4 text-[11px] text-gray-500">Latest press mentions and awards.</p>
          <div className="flex flex-col gap-2">
            {mentions.map((m,i)=>(
              <div key={i} className="way-row flex items-center gap-3 rounded-xl bg-white/3 px-4 py-3">
                <span className="text-2xl flex-shrink-0">{m.icon}</span>
                <div className="flex-1"><p className="text-[12px] font-bold text-white">{m.title}</p><p className="text-[11px] text-gray-500">{m.pub} • {m.date}</p></div>
                <span className="way-arrow text-gray-600 text-sm">›</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-5">
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-3 text-[14px] font-bold text-white">Press Contact</h3>
          <div className="flex items-center gap-3 rounded-xl border border-[#7c5cfc]/25 bg-[#7c5cfc]/08 p-3 mb-3">
            <span className="text-xl">📺</span>
            <div><p className="text-[12px] font-bold text-white">press@operino.ai</p><p className="text-[10px] text-gray-500">Response within 24 hours</p></div>
          </div>
          <div className="flex flex-col gap-1.5">
            {[{l:"Press inquiries",v:"press@operino.ai"},{l:"Analyst relations",v:"ir@operino.ai"},{l:"Speaking requests",v:"events@operino.ai"}].map((c,i)=>(
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[11px] text-gray-500">{c.l}</span>
                <span className="text-[11px] font-semibold text-[#a78bfa]">{c.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cp-card rounded-2xl bg-[#0d0b1f] p-5">
          <h3 className="mb-3 text-[14px] font-bold text-white">Company Stats</h3>
          {[{l:"Founded",v:"2023"},{l:"Team size",v:"50+ people"},{l:"Customers",v:"5,000+ teams"},{l:"Countries",v:"42 countries"},{l:"Funding",v:"$8M raised"}].map((s,i)=>(
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-[11px] text-gray-500">{s.l}</span>
              <span className="text-[11px] font-bold text-white">{s.v}</span>
            </div>
          ))}
        </div>
        <div className="cp-card rounded-2xl bg-[#7c5cfc]/08 border border-[#7c5cfc]/25 p-5">
          <p className="mb-1 text-[13px] font-bold text-white">Social Media</p>
          <p className="mb-3 text-[11px] text-gray-500">Follow us for the latest updates.</p>
          {[{icon:"🐦",l:"Twitter / X",v:"@operino_ai"},{icon:"💼",l:"LinkedIn",v:"/company/operino"},{icon:"📸",l:"Instagram",v:"@operino.ai"}].map((s,i)=>(
            <div key={i} className="flex items-center gap-2 py-1.5">
              <span>{s.icon}</span><span className="text-[11px] text-gray-400">{s.l}</span>
              <span className="ml-auto text-[11px] font-semibold text-[#a78bfa]">{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main ContactPage ─────────────────────────────────────────────────────────
const ContactPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Get in touch");
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const tabs = ["Get in touch","Support","Partnerships","Press & Media"];

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .cp-fade { animation: fadeUp 0.55s ease forwards; }
        .cp-input:focus { outline:none; border-color:rgba(124,92,252,0.6); box-shadow:0 0 0 3px rgba(124,92,252,0.1); }
        .cp-card { border:1px solid rgba(255,255,255,0.07); transition:border-color 0.2s ease; }
        .cp-card:hover { border-color:rgba(124,92,252,0.2); }
        .way-row { border:1px solid rgba(255,255,255,0.06); transition:all 0.22s ease; }
        .way-row:hover { border-color:rgba(124,92,252,0.4); background:rgba(124,92,252,0.07)!important; transform:translateX(3px); }
        .way-row:hover .way-arrow { color:#a78bfa; }
        .way-arrow { transition:color 0.2s ease; }
        .faq-item { border:1px solid rgba(255,255,255,0.06); transition:all 0.22s ease; cursor:pointer; overflow:hidden; }
        .faq-item:hover { border-color:rgba(124,92,252,0.3); }
        .faq-answer { transition:max-height 0.35s ease, opacity 0.3s ease; }
        .send-btn { position:relative; overflow:hidden; transition:transform 0.2s ease,box-shadow 0.2s ease,background 0.2s ease; }
        .send-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 28px rgba(124,92,252,0.5); background:#6b4ce0!important; }
        .send-btn:disabled { opacity:0.5; cursor:not-allowed; }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        .send-btn::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .send-btn:hover:not(:disabled)::after { animation:shimmer 0.55s ease forwards; }
        @keyframes spin { to{transform:rotate(360deg)} }
        .spinner { animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes checkPop { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
        .check-pop { animation:checkPop 0.4s ease forwards; }
        .cp-tab { transition:color 0.2s ease, border-color 0.2s ease; }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0)} }
        .live-badge { animation:pulse 2s ease-in-out infinite; }
        .subject-item { transition:background 0.15s ease; cursor:pointer; }
        .subject-item:hover { background:rgba(124,92,252,0.12); color:white; }
        @keyframes dropIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        .drop-in { animation:dropIn 0.2s ease forwards; }
        @keyframes tabSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .tab-content { animation:tabSlide 0.3s ease forwards; }
      `}</style>

      <div ref={ref} className="min-h-full w-full px-6 py-6"
        onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setMouse({ x: ((e.clientX-r.left)/r.width)*100, y: ((e.clientY-r.top)/r.height)*100 }); }}>

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute rounded-full bg-[#7c5cfc] opacity-[0.05] blur-[120px]" style={{width:400,height:400,top:`${mouse.y*0.35}%`,left:`${mouse.x*0.35}%`,transform:"translate(-50%,-50%)",transition:"top 1s ease, left 1s ease"}}/>
        </div>

        {/* Header */}
        <div className={`mb-6 flex flex-wrap items-start justify-between gap-4 ${visible?"cp-fade":"opacity-0"}`} style={{animationDelay:"0s"}}>
          <div>
            <h1 className="font-['Syne'] text-[clamp(20px,3vw,28px)] font-bold text-white">Contact Us</h1>
            <p className="mt-0.5 text-[13px] text-gray-500">We're here to help! Reach out to our team and we'll get back to you as soon as possible.</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5">
            <span className="text-[#a78bfa]">⏱️</span>
            <div><p className="text-[11px] text-gray-500">Average response time</p><p className="text-[12px] font-bold text-white">Under 24 hours</p></div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`mb-5 flex gap-0 border-b border-white/8 overflow-x-auto ${visible?"cp-fade":"opacity-0"}`} style={{animationDelay:"0.08s"}}>
          {tabs.map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)}
              className={`cp-tab pb-3 pr-5 text-[13px] font-semibold border-b-2 whitespace-nowrap ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={activeTab} className="tab-content">
          {activeTab==="Get in touch" && <TabGetInTouch/>}
          {activeTab==="Support" && <TabSupport/>}
          {activeTab==="Partnerships" && <TabPartnerships/>}
          {activeTab==="Press & Media" && <TabPressMedia/>}
        </div>
      </div>
    </>
  );
};

export default ContactPage;
