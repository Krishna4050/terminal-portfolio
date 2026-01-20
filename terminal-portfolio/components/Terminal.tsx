"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { runCommand, COMMANDS, CommandOutput } from "../utils/commands";
import { playKeySound, playEnterSound, loadSoundPreference } from "../utils/sound";
import { runBootSequence } from "@/utils/bootSequence";

// 1. Define the Welcome Banner here so we can reuse it!
const WELCOME_MESSAGE = (
  <div className="mb-6">
    <pre className="text-[10px] sm:text-xs md:text-sm font-bold text-green-500 leading-none mb-4 select-none">
{`
  _  __     _     _                      
 | |/ /    (_)   | |                     
 | ' / _ __ _ ___| |__  _ __   __ _      
 |  < | '__| / __| '_ \\| '_ \\ / _\` |     
 | . \\| |  | \\__ \\ | | | | | | (_| |     
 |_|\\_\\_|  |_|___/_| |_|_| |_|\\__,_|     
`}
    </pre>
    <div className="border border-green-500/30 bg-green-500/5 p-4 rounded-lg max-w-lg">
      <p className="text-white font-bold mb-2">SYSTEM READY v1.0.0</p>
      <p className="text-zinc-400 text-sm mb-2">
        Welcome to my interactive portfolio terminal. 
        This environment is designed to showcase my engineering background.
      </p>
      <p className="text-zinc-500 text-xs">
        Type <span className="text-green-400 font-bold">help</span> to see available commands.
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
  
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [isBooting, setIsBooting] = useState(true);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, lines]);

  useEffect(() => {
    loadSoundPreference();
  }, []);

  // 2. Updated Boot Sequence
  useEffect(() => {
    async function boot() {
      await runBootSequence((line) => {
        setLines((prev) => [...prev, line]);
      });
      
      // Clear boot text and show Welcome Message
      setLines([]); 
      setHistory([
        { command: "", type: "component", output: WELCOME_MESSAGE }
      ]);
      
      setIsBooting(false);
    }
    boot();
  }, []);

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

    // 3. UPDATED CLEAR LOGIC: Reset to Welcome Message
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

    // Text Output Logic
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black text-green-400 font-mono p-4 rounded-lg shadow-lg min-h-150 flex flex-col">
        
        {/* Boot Text (only visible during boot) */}
        <div className="mb-2 space-y-1 whitespace-pre-wrap">
          {lines.map((line, i) => <div key={i}>{line}</div>)}
        </div>

        {/* Output History */}
        <div className="space-y-2">
          {history.map((item, index) => (
            <div key={index}>
              {/* Only show the typed command if it is NOT empty (Welcome message has empty command) */}
              {item.command && (
                <div className="flex items-center">
                  <span className="mr-2 text-green-500">$</span>
                  <span className="text-white">{item.command}</span>
                </div>
              )}
              
              {item.type === "component" ? (
                <div className="animate-fade-in-up mt-2">
                  {item.output}
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-green-300">
                  {item.output as string}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <div className="flex items-center mt-2">
          <span className="mr-2 text-green-500">$</span>
          <input
            disabled={isBooting}
            className={`flex-1 bg-black outline-none text-green-400 caret-green-400 ${isBooting ? "opacity-50" : ""}`}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}