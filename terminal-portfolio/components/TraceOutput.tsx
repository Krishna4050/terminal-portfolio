"use client";

import { useEffect, useState } from "react";
import { getRecentVisits } from "@/app/actions";

type Visit = {
  id: number;
  city: string;
  country_code: string;
  created_at: string;
};

export default function TraceOutput() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getRecentVisits();
      setVisits(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-zinc-500 animate-pulse">Initializing network trace...</div>;

  return (
    <div className="my-4 max-w-2xl">
      <div className="flex justify-between border-b border-zinc-800 pb-2 mb-2 text-xs text-zinc-500 font-mono uppercase">
        <span>Target Location</span>
        <span>Status</span>
      </div>

      <div className="space-y-1 font-mono text-sm">
        {visits.map((visit, i) => {
          // Calculate if "Online" (visited in last 5 minutes)
          const visitTime = new Date(visit.created_at).getTime();
          const now = new Date().getTime();
          const isRecent = (now - visitTime) < 5 * 60 * 1000; // 5 mins

          return (
            <div key={visit.id} className="flex justify-between items-center group hover:bg-zinc-900/50 p-1 rounded">
              <div className="flex items-center gap-3">
                <span className="text-zinc-600 text-xs w-4">0{i + 1}</span>
                <span className="text-green-400">
                  {/* Flag Emoji based on country code (optional, or just text) */}
                  {visit.city === "Unknown City" ? "Hidden Location" : `${visit.city}, ${visit.country_code}`}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isRecent ? "text-green-500 animate-pulse" : "text-zinc-600"}`}>
                  {isRecent ? "● ACTIVE" : "○ OFFLINE"}
                </span>
                <span className="text-zinc-700 text-[10px]">
                  {new Date(visit.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-xs text-zinc-500 pt-2 border-t border-zinc-800 border-dashed">
        &gt; Total trace nodes: {visits.length} visible
      </div>
    </div>
  );
}