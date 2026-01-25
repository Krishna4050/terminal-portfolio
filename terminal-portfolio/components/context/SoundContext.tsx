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

  // Load preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("terminal_sound");
      if (saved !== null) {
        const userPref = saved === "true";
        // Timeout fix for the ESLint warning
        setTimeout(() => setIsEnabled(userPref), 0);
      }
    }
  }, []);

  const toggleSound = () => {
    setIsEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("terminal_sound", String(newValue));
      return newValue;
    });
  };

  const playSound = (type: "keypress" | "enter") => {
    if (!isEnabled) return;

    // 1. Determine the file path
    // Make sure 'keypress.mp3' exists in your public/sounds folder!
    const audioFile = type === "enter" ? "/sounds/enter.mp3" : "/sounds/keypress.mp3";
    
    // 2. Debugging: Check console to see if this runs when you type
    // console.log("Playing sound:", type, audioFile); 

    const audio = new Audio(audioFile);
    
    // 3. Volume Check: Keypresses are usually quieter, let's bump the volume
    audio.volume = type === "enter" ? 0.4 : 0.2; 
    
    // 4. Reset time to allow rapid typing sounds
    audio.currentTime = 0; 
    
    audio.play().catch((e) => {
      // Browsers often block audio if user hasn't interacted yet
      console.warn("Audio blocked:", e);
    });
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