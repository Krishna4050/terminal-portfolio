"use client";

import { useState, useEffect } from "react";
import { getTestimonials, updateTestimonialStatus, getSystemLogs } from "@/app/actions/db";

// Types matching your exact Schema
type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  approved: boolean; 
  featured: boolean; 
  email?: string;
  linkedin?: string;
  created_at: string;
};

type Log = {
  id: number;
  admin_user: string;
  action: string;
  details: string;
  timestamp: string;
};

export default function AdminDashboard() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "featured" | "logs">("pending");
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    async function loadData() {
      try {
        const [data, logData] = await Promise.all([getTestimonials(), getSystemLogs()]);
        
       
        setItems(data as Testimonial[]);
        setLogs(logData as Log[]);

      } catch (e) {
        console.error("Failed to load data", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // 2. Handle Actions
  const handleAction = async (id: number, action: "approve" | "feature" | "decline") => {
    // Optimistic UI Update
    if (action === "decline") {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else if (action === "approve") {
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, approved: true, featured: false } : i));
    } else if (action === "feature") {
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, approved: true, featured: true } : i));
    }

    // Call Server
    await updateTestimonialStatus(id, action, "ROOT_ADMIN");
    
    // Refresh Logs
    const newLogs = await getSystemLogs();
    
    
    setLogs(newLogs as Log[]);
  };

  // 3. Filter Logic
  // 3. Filter Logic (Safe version)
  const filteredItems = items.filter((i) => {
    // Ensure we treat nulls as false
    const isApproved = !!i.approved; 
    const isFeatured = !!i.featured;

    if (activeTab === "pending") return !isApproved; 
    if (activeTab === "approved") return isApproved && !isFeatured;
    if (activeTab === "featured") return isFeatured;
    return false;
  });

  if (isLoading) return <div className="text-green-500 animate-pulse font-mono text-sm">Loading Database...</div>;

  return (
    <div className="w-full max-w-4xl my-6 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden animate-fade-in-up">
      
      {/* HEADER */}
      <div className="bg-black/50 border-b border-zinc-800 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          <h2 className="text-white font-bold font-mono text-lg">ROOT_ACCESS // DASHBOARD</h2>
        </div>
        
        {/* TABS */}
        <div className="flex gap-1 bg-black p-1 rounded-lg border border-zinc-800">
          {(["pending", "approved", "featured", "logs"] as const).map((tab) => {
            const count = items.filter(i => {
               if (tab === "pending") return !i.approved;
               return false;
            }).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab 
                    ? "bg-zinc-800 text-white shadow-sm border border-zinc-700" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab} {tab === "pending" && <span className="ml-1 text-green-400">({count})</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-4 md:p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
        
        {/* LOGS VIEW */}
        {activeTab === "logs" ? (
          <div className="space-y-2">
             {logs.map((log) => (
               <div key={log.id} className="text-xs font-mono flex gap-4 text-zinc-500 border-b border-zinc-900 pb-2">
                 <span className="text-zinc-600 shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                 <span className="text-green-500 shrink-0">{log.admin_user}</span>
                 <span className="text-zinc-400">{log.action}: {log.details}</span>
               </div>
             ))}
          </div>
        ) : (
          /* TESTIMONIALS VIEW */
          filteredItems.length === 0 ? (
            <div className="text-center py-10 text-zinc-600 italic">No records found in {activeTab}.</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-black border border-zinc-800 p-4 rounded-lg hover:border-zinc-700 transition-colors flex flex-col md:flex-row gap-4">
                
                {/* ID Badge & Contact */}
                <div className="shrink-0 flex flex-col gap-2">
                  <span className="text-xs font-mono text-zinc-600 bg-zinc-900 px-2 py-1 rounded w-fit">#{item.id}</span>
                  {item.linkedin && (
                     <a href={item.linkedin} target="_blank" className="text-[10px] text-blue-400 hover:underline">LinkedIn ↗</a>
                  )}
                  {item.email && (
                     <span className="text-[10px] text-zinc-500">{item.email}</span>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-green-400 font-bold">{item.name}</h3>
                    <span className="text-xs text-zinc-500">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wide">{item.role}</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">&quot;{item.message}&quot;</p>
                </div>

                {/* Buttons */}
                <div className="flex md:flex-col gap-2 shrink-0 justify-end md:justify-start border-t md:border-t-0 md:border-l border-zinc-900 pt-3 md:pt-0 md:pl-4">
                  {!item.approved && (
                    <>
                      <button onClick={() => handleAction(item.id, "approve")} className="px-3 py-1 bg-green-900/20 text-green-400 border border-green-900/50 rounded text-xs hover:bg-green-900/40">Approve</button>
                      <button onClick={() => handleAction(item.id, "decline")} className="px-3 py-1 bg-red-900/20 text-red-400 border border-red-900/50 rounded text-xs hover:bg-red-900/40">Decline</button>
                    </>
                  )}
                  
                  {item.approved && !item.featured && (
                    <>
                       <button onClick={() => handleAction(item.id, "feature")} className="px-3 py-1 bg-yellow-900/20 text-yellow-400 border border-yellow-900/50 rounded text-xs hover:bg-yellow-900/40">★ Feature</button>
                       <button onClick={() => handleAction(item.id, "decline")} className="px-3 py-1 bg-zinc-900 text-zinc-500 border border-zinc-800 rounded text-xs hover:text-white">Delete</button>
                    </>
                  )}

                  {item.featured && (
                     <button onClick={() => handleAction(item.id, "decline")} className="px-3 py-1 bg-zinc-900 text-zinc-500 border border-zinc-800 rounded text-xs hover:text-white">Delete</button>
                  )}
                </div>
              </div>
            ))
          )
        )}
      </div>

      <div className="bg-black/30 border-t border-zinc-800 p-2 text-[10px] text-zinc-600 font-mono text-center">
        SUPABASE_CONN: {items.length} records active.
      </div>
    </div>
  );
}