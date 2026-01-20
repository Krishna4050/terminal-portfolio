"use client";

import { useState, useRef, useEffect } from "react";
import { runCommand, COMMANDS } from "../utils/commands";
import { playKeySound, playEnterSound, loadSoundPreference } from "../utils/sound";





type HistoryItem = {
  command: string;
  output?: string;
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);


  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [history]);

useEffect(() => {
  loadSoundPreference();
}, []);



const typeOutput = (
  text: string,
  callback: (value: string) => void,
  speed = 15
    ) => {
    let index = 0;
    let current = "";

    const interval = setInterval(() => {
      current += text[index];
      callback(current);
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
};



  const handleCommand = () => {
  if (!input.trim()) return;

  const command = input;
  const result = runCommand(command);

  setCommandHistory((prev) => [...prev, command]);
  setHistoryIndex(null);

  // CLEAR COMMAND
  if (result === "__CLEAR__") {
    setHistory([]);
    setInput("");
    return;
  }

  // Add command immediately with empty output
  setHistory((prev) => [
    ...prev,
    { command, output: "" },
  ]);

  // Animate output
  if (result) {
    typeOutput(result, (typedText) => {
      setHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          command,
          output: typedText,
        };
        return updated;
      });
    });
  }

  setInput("");
};




  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black text-green-400 font-mono p-4 rounded-lg shadow-lg">
        {/* Output History */}
        <div className="mb-2 space-y-1 whitespace-pre-wrap">
            {/* Stable Welcome Message */}
            <div className="text-green-500 mb-2">
              Welcome to Krishna’s Terminal Portfolio
              {"\n"}Type <span className="text-green-300">help</span> to get started.
            </div>

            {/* Command History */}
            {history.map((item, index) => (
              <div key={index}>
                <div>
                  <span className="mr-2">$</span>
                  <span>{item.command}</span>
                </div>
                {item.output && <div>{item.output}</div>}
              </div>
            ))}

            <div ref={bottomRef} />
        </div>



        {/* Input Line */}
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <input
            type="text"
            className="flex-1 bg-black outline-none text-green-400 caret-green-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key.length === 1) {
              playKeySound();
            }
            if (e.key === "Enter") {
              playEnterSound();
              handleCommand();
            }


              if (e.key === "Tab") {
                e.preventDefault();

                if (!input) return;

                const matches = COMMANDS.filter((cmd) =>
                  cmd.startsWith(input.toLowerCase())
                );

                if (matches.length === 0) return;

                // First TAB → store matches
                if (tabMatches.length === 0) {
                  setTabMatches(matches);
                  setTabIndex(0);
                  setInput(matches[0]);
                } else {
                  // Cycle through matches
                  const nextIndex = (tabIndex + 1) % tabMatches.length;
                  setTabIndex(nextIndex);
                  setInput(tabMatches[nextIndex]);
                }
              }
              if (e.key !== "Tab") {
                setTabMatches([]);
                setTabIndex(0);
              }


              if (e.key === "Enter") {
                handleCommand();
              }

              if (e.key === "ArrowUp") {
                e.preventDefault();
                if (commandHistory.length === 0) return;

                const index =
                  historyIndex === null
                    ? commandHistory.length - 1
                    : Math.max(historyIndex - 1, 0);

                setHistoryIndex(index);
                setInput(commandHistory[index]);
              }

              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex === null) return;

                const index = historyIndex + 1;

                if (index >= commandHistory.length) {
                  setHistoryIndex(null);
                  setInput("");
                } else {
                  setHistoryIndex(index);
                  setInput(commandHistory[index]);
                }
              }
            }}
            
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
