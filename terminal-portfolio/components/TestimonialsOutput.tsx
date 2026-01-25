"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import TestimonialModal from "./TestimonialModal";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  linkedin?: string; // Add optional linkedin field
};

export default function TestimonialsOutput() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      
      if (data) setItems(data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  if (loading) return <div className="text-zinc-500 italic animate-pulse">Loading testimonials...</div>;

  return (
    <div className="my-4 w-full max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-green-400 font-bold text-lg">Community Recommendations</h3>
          <p className="text-zinc-500 text-xs">Verified feedback from colleagues and clients.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded border border-zinc-700 flex items-center gap-2 transition-all"
        >
          <span className="text-green-400">+</span> Add Comments/Recommendations
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length === 0 ? (
          <p className="text-zinc-600 italic text-sm">No testimonials found yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-lg hover:border-zinc-700 transition-colors flex flex-col h-full">
               <div className="flex items-center gap-3 mb-3">
                 <div className="w-9 h-9 rounded bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-400">
                    {item.name[0]}
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="text-white text-sm font-bold truncate">{item.name}</div>
                   <div className="text-zinc-500 text-[10px] uppercase tracking-wider truncate">{item.role}</div>
                 </div>
                 
                 {/* LinkedIn Button (Only if link exists) */}
                 {item.linkedin && (
                   <a 
                     href={item.linkedin} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 p-1.5 rounded transition-colors"
                     title="View LinkedIn Profile"
                   >
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                   </a>
                 )}
               </div>
               
               <p className="text-zinc-400 text-xs leading-relaxed italic flex-1">&quot;{item.message}&quot;</p>
            </div>
          ))
        )}
      </div>

      {showModal && <TestimonialModal onClose={() => setShowModal(false)} />}
    </div>
  );
}