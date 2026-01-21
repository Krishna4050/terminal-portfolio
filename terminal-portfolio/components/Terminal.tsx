"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { runCommand, COMMANDS, CommandOutput } from "../utils/commands";
import { playKeySound, playEnterSound, loadSoundPreference } from "../utils/sound";
import { runBootSequence } from "@/utils/bootSequence";

// 1. Define the Centered Welcome Banner
const WELCOME_MESSAGE = (
  <div className="my-10 flex flex-col items-center justify-center text-center w-full">
    {/* ASCII Art - Centered */}
    <pre className="text-[10px] sm:text-xs md:text-sm font-bold text-green-500 leading-none mb-8 select-none whitespace-pre">
{`
  _  __     _     _                      
 | |/ /    (_)   | |                     
 | ' / _ __ _ ___| |__  _ __   __ _      
 |  < | '__| / __| '_ \\| '_ \\ / _\` |     
 | . \\| |  | \\__ \\ | | | | | | (_| |     
 |_|\\_\\_|  |_|___/_| |_|_| |_|\\__,_|     
`}
    </pre>

    {/* Info Box - Centered */}
    <div className="border border-green-500/30 bg-green-500/5 p-6 rounded-lg max-w-lg w-full shadow-[0_0_15px_rgba(34,197,94,0.1)]">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <p className="text-white font-bold tracking-widest text-sm">SYSTEM READY v1.0.0</p>
      </div>
      
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
        Welcome to my digital workspace.
        Explore my projects and professional journey through this interactive command-line interface.
      </p>
      
      <p className="text-zinc-500 text-xs uppercase tracking-wider">
        Type <span className="text-green-400 font-bold glow-text">help</span> to see available commands
      </p>
    </div>
  </div>
);

type HistoryItem = {
  command: string;
  type: "text" | "component";
  output: string | ReactNode;
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [isBooting, setIsBooting] = useState(true);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 10);
  }, [history, lines]);

  // MOBILE FIX 1: Only auto-focus if screen is wide (Desktop)
  useEffect(() => {
    if (!isBooting && window.innerWidth > 768) {
      inputRef.current?.focus();
    }
  }, [isBooting]);

  useEffect(() => {
    loadSoundPreference();
  }, []);

  useEffect(() => {
    async function boot() {
      await runBootSequence((line) => {
        setLines((prev) => [...prev, line]);
      });
      
      setLines([]); 
      setHistory([
        { command: "", type: "component", output: WELCOME_MESSAGE }
      ]);
      
      setIsBooting(false);
    }
    boot();
  }, []);

  const handleTerminalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // MOBILE FIX 2: If on mobile, don't force focus when clicking background
    // This allows users to scroll without the keyboard popping up
    if (window.innerWidth < 768) return;

    const target = e.target as HTMLElement;

    if (
      target.tagName === "INPUT" || 
      target.tagName === "TEXTAREA" || 
      target.tagName === "BUTTON" || 
      target.tagName === "A" ||
      target.closest("a") || 
      target.closest("button")
    ) {
      return;
    }

    if (window.getSelection()?.toString()) return;

    inputRef.current?.focus();
  };

  const typeOutput = (text: string, callback: (val: string) => void) => {
    let index = 0;
    let current = "";
    const interval = setInterval(() => {
      current += text[index];
      callback(current);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 15);
  };

  const handleCommand = () => {
    if (!input.trim()) return;

    const command = input.trim();
    const result: CommandOutput = runCommand(command);

    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(null);
    setTabMatches([]);

    // MOBILE FIX 3: Close keyboard after submitting a command
    if (window.innerWidth < 768) {
      inputRef.current?.blur();
    }

    if (result.type === "clear") {
      setHistory([
        { command: "", type: "component", output: WELCOME_MESSAGE }
      ]);
      setInput("");
      return;
    }

    if (result.type === "component") {
      setHistory((prev) => [
        ...prev,
        { command, type: "component", output: result.content },
      ]);
      setInput("");
      return;
    }

    setHistory((prev) => [
      ...prev,
      { command, type: "text", output: "" },
    ]);

    if (typeof result.content === "string") {
      typeOutput(result.content, (typedText) => {
        setHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            command,
            type: "text",
            output: typedText,
          };
          return updated;
        });
      });
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      playEnterSound();
      handleCommand();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      if (!input) return;

      let matches = tabMatches;
      if (matches.length === 0) {
        matches = COMMANDS.filter((cmd) => cmd.startsWith(input.toLowerCase()));
      }
      if (matches.length === 0) return;

      if (tabMatches.length === 0) {
        setTabMatches(matches);
        setTabIndex(0);
        setInput(matches[0]);
      } else {
        const nextIndex = (tabIndex + 1) % matches.length;
        setTabIndex(nextIndex);
        setInput(matches[nextIndex]);
      }
      return;
    }

    if (e.key !== "Tab" && e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt") {
      setTabMatches([]);
      setTabIndex(0);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const idx = historyIndex === null ? commandHistory.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(idx);
      setInput(commandHistory[idx]);
      playKeySound();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const idx = historyIndex + 1;
      if (idx >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(idx);
        setInput(commandHistory[idx]);
      }
      playKeySound();
      return;
    }

    playKeySound();
  };

  return (
    <div 
      className="w-full max-w-7xl mx-auto min-h-screen p-4 md:p-8 flex flex-col justify-center cursor-text"
      onClick={handleTerminalClick}
    >
      <div className="bg-black text-green-400 font-mono p-6 md:p-8 rounded-xl shadow-2xl border border-zinc-800 h-[85vh] flex flex-col relative overflow-hidden ring-1 ring-zinc-800/50">
        
        {/* Boot Text */}
        <div className="mb-2 space-y-1 whitespace-pre-wrap shrink-0">
          {lines.map((line, i) => <div key={i}>{line}</div>)}
        </div>

        {/* Output History - Scrollable Area */}
        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
          {history.map((item, index) => (
            <div key={index} className="wrap-break-words">
              {item.command && (
                <div className="flex items-center mb-1">
                  <span className="mr-3 text-green-500 font-bold">$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              
              {item.type === "component" ? (
                <div className="animate-fade-in-up my-4">
                  {item.output}
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-green-300 leading-relaxed">
                  {item.output as string}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <div className="flex items-center mt-4 pt-4 border-t border-zinc-900 shrink-0">
          <span className="mr-3 text-green-500 font-bold text-lg">$</span>
          <input
            ref={inputRef}
            disabled={isBooting}
            // MOBILE FIX 4: Removed autoFocus attribute (handled via useEffect now)
            className={`flex-1 bg-black outline-none text-green-400 caret-green-400 text-lg ${isBooting ? "opacity-50" : ""}`}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}