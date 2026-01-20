"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
// ✅ RE-ADDED 'COMMANDS' here so we can check for matches
import { runCommand, COMMANDS, CommandOutput } from "../utils/commands";
import { playKeySound, playEnterSound, loadSoundPreference } from "../utils/sound";
import { runBootSequence } from "@/utils/bootSequence";

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
  
  // ✅ ADDED THESE BACK for Tab Completion
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

  useEffect(() => {
    async function boot() {
      await runBootSequence((line) => {
        setLines((prev) => [...prev, line]);
      });
      setLines((prev) => [...prev, "", "Welcome to Krishna’s Terminal.", "Type 'help' to start."]);
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

    const command = input.trim(); // Trim extra spaces
    const result: CommandOutput = runCommand(command);

    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(null);
    setTabMatches([]); // Reset tab state on submit

    if (result.type === "clear") {
      setHistory([]);
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

  // ✅ THE KEYDOWN LOGIC (Includes Tab + Arrows)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    // 1. ENTER KEY
    if (e.key === "Enter") {
      playEnterSound();
      handleCommand();
      return;
    }

    // 2. TAB KEY (Auto-complete)
    if (e.key === "Tab") {
      e.preventDefault();

      if (!input) return;

      // Find all commands that start with current input
      // If we are already cycling matches, stick to the original search term
      //const searchBase = tabMatches.length > 0 ? tabMatches[0].substring(0, input.length) : input.toLowerCase();
      
      let matches = tabMatches;
      if (matches.length === 0) {
        matches = COMMANDS.filter((cmd) => cmd.startsWith(input.toLowerCase()));
      }

      if (matches.length === 0) return;

      // Cycle through matches
      if (tabMatches.length === 0) {
        // First Press: Init matches
        setTabMatches(matches);
        setTabIndex(0);
        setInput(matches[0]);
      } else {
        // Subsequent Presses: Cycle next
        const nextIndex = (tabIndex + 1) % matches.length;
        setTabIndex(nextIndex);
        setInput(matches[nextIndex]);
      }
      return;
    }

    // Reset Tab logic if user types something else
    if (e.key !== "Tab" && e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt") {
      setTabMatches([]);
      setTabIndex(0);
    }

    // 3. ARROW UP (History Back)
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const idx = historyIndex === null ? commandHistory.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(idx);
      setInput(commandHistory[idx]);
      playKeySound();
      return;
    }

    // 4. ARROW DOWN (History Forward)
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

    // Play sound for normal keys
    playKeySound();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black text-green-400 font-mono p-4 rounded-lg shadow-lg min-h-150 flex flex-col">
        
        {/* Boot Sequence */}
        <div className="mb-2 space-y-1 whitespace-pre-wrap">
          {lines.map((line, i) => <div key={i}>{line}</div>)}
        </div>

        {/* History */}
        <div className="space-y-2">
          {history.map((item, index) => (
            <div key={index}>
              <div className="flex items-center">
                <span className="mr-2 text-green-500">$</span>
                <span className="text-white">{item.command}</span>
              </div>
              
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

        {/* Input Area */}
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