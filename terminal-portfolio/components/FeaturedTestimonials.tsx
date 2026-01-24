"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

type Testimonial = { id: number; name: string; role: string; message: string; };

export default function FeaturedTestimonials() {
  const [featured, setFeatured] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("approved", true)
        .eq("featured", true) // Only fetch featured ones
        .limit(2); // Only take 2
      
      if (data) setFeatured(data);
    }
    fetchFeatured();
  }, []);

  if (featured.length === 0) return null;

  return (
    <div className="mt-8 pt-8 border-t border-zinc-800">
      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Endorsed By</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((item) => (
          <div key={item.id} className="bg-zinc-900/20 border border-zinc-800/50 p-4 rounded-lg flex gap-3">
             <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-xs font-bold border border-green-500/20">
                {item.name[0]}
             </div>
             <div>
               <p className="text-zinc-300 text-xs italic mb-1">&quot;{item.message.substring(0, 80)}...&quot;</p>
               <p className="text-zinc-500 text-[10px] font-bold">— {item.name}, {item.role}</p>
             </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <span className="text-[10px] text-zinc-600">
          Type <span className="text-green-500 font-mono">testimonials</span> to see all
        </span>
      </div>
    </div>
  );
}