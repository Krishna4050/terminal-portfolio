"use client";

import { useSound } from "@/context/SoundContext";

export default function SoundToggle() {
  const { isEnabled, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      onMouseDown={(e) => e.preventDefault()}
      className="fixed top-4 right-4 z-50 p-2 rounded text-zinc-500 hover:text-green-400 transition-colors bg-black/50 backdrop-blur border border-zinc-800 hover:border-green-500/50"
      title={isEnabled ? "Mute Sound" : "Enable Sound"}
    >
      {isEnabled ? (
        // Speaker On Icon
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
      ) : (
        // Speaker Mute Icon
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>
      )}
    </button>
  );
}