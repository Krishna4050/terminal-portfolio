"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SoundContextType = {
  isEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: "keypress" | "enter") => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(true);

  // 1. Load preference from LocalStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem("terminal_sound");
    if (saved !== null) {
      setIsEnabled(saved === "true");
    }
  }, []);

  // 2. Toggle function
  const toggleSound = () => {
    setIsEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("terminal_sound", String(newValue));
      return newValue;
    });
  };

  // 3. Central Play Function
  const playSound = (type: "keypress" | "enter") => {
    if (!isEnabled) return; // 🔇 If muted, do nothing

    // Define your audio files here
    // Make sure these files exist in your public/ folder!
    const audioFile = type === "enter" ? "/sounds/enter.mp3" : "/sounds/keypress.mp3";
    
    const audio = new Audio(audioFile);
    audio.volume = 0.2; // Keep it subtle
    audio.play().catch(() => {}); // Ignore errors (browsers sometimes block auto-audio)
  };

  return (
    <SoundContext.Provider value={{ isEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used within a SoundProvider");
  return context;
}