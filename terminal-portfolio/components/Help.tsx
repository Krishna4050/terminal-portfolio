import React from "react";

const commands = [
  { 
    cmd: "whoami", 
    desc: "User profile & system status", 
    alias: "info",
    icon: "👤"
  },
  { 
    cmd: "about", 
    desc: "Comprehensive bio & background", 
    alias: "",
    icon: "📄"
  },
  { 
    cmd: "education", 
    desc: "Academic degrees & certifications", 
    alias: "edu",
    icon: "🎓"
  },
  { 
    cmd: "experience", 
    desc: "Professional career timeline", 
    alias: "exp",
    icon: "💼"
  },
  { 
    cmd: "projects", 
    desc: "Featured development work", 
    alias: "work",
    icon: "🚀"
  },
  { 
    cmd: "skills", 
    desc: "Technical stack & tools", 
    alias: "tech",
    icon: "🛠️"
  },
  { 
    cmd: "recommendations", 
    desc: "Testimonials & feedback", 
    alias: "rec",
    icon: "💬"
  },
  { 
    cmd: "contact", 
    desc: "Social links & email form", 
    alias: "email",
    icon: "📫"
  },
];

const utilityCommands = [
  { cmd: "clear", desc: "Clear terminal history", alias: "cls" },
  { cmd: "ls", desc: "List directory files", alias: "dir" },
  { cmd: "help", desc: "Show this help menu", alias: "?" },
];

const Help = () => {
  return (
    <div className="w-full max-w-4xl my-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">
          Available <span className="text-green-400">Commands</span>
        </h2>
        <p className="text-zinc-500 text-sm">
          Type any command below or use the <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-xs text-zinc-300 border border-zinc-700">Tab</kbd> key to autocomplete.
        </p>
      </div>

      {/* Main Commands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {commands.map((item, index) => (
          <div 
            key={index} 
            className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl hover:border-green-500/30 hover:bg-zinc-900/60 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                <span className="font-bold text-green-400 group-hover:text-green-300 font-mono text-sm">
                  {item.cmd}
                </span>
              </div>
              {item.alias && (
                <span className="text-[10px] text-zinc-600 border border-zinc-800 px-1.5 py-0.5 rounded bg-black/50 font-mono">
                  alt: {item.alias}
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed pl-1">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Utility Commands (Smaller list) */}
      <div>
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">System Utilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {utilityCommands.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-sm text-zinc-400">
              <span className="font-mono text-zinc-300 font-bold bg-zinc-800 px-2 py-0.5 rounded text-xs min-w-15 text-center">
                {item.cmd}
              </span>
              <span className="text-zinc-500 text-xs border-l border-zinc-800 pl-3">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;