import React from "react";

const Whoami = () => {
  return (
    <div className="my-4 font-mono">
      {/* 1. ASCII Art Name with Gradient Colors */}
      <pre className="whitespace-pre-wrap text-[10px] sm:text-xs md:text-sm font-bold leading-none mb-6 select-none">
        <span className="text-green-500">  _  __     _     _                      </span>{"\n"}
        <span className="text-green-400"> | |/ /    (_)   | |                     </span>{"\n"}
        <span className="text-teal-400"> |&apos; / _ __ _ ___| |__  _ __   __ _      </span>{"\n"}
        <span className="text-cyan-400"> |  &lt; |&apos;__| / __| &apos;_ \| &apos;_ \ / _&apos; |     </span>{"\n"}
        <span className="text-blue-400"> | . \| |  | \__ \ | | | | | | (_| |     </span>{"\n"}
        <span className="text-blue-500"> |_|\_\_|  |_|___/_| |_|_| |_|\__,_|     </span>
      </pre>

      {/* 2. System Information */}
      <div className="space-y-2 text-sm md:text-base border-l-2 border-zinc-800 pl-4 ml-2">
        <div>
          <span className="text-green-400 font-bold w-24 inline-block">User:</span>
          <span className="text-white">Krishna Adhikari</span>
        </div>
        
        <div>
          <span className="text-green-400 font-bold w-24 inline-block">OS:</span>
          <span className="text-white">Krishna OS <span className="text-xs text-zinc-500">(v1.0.0)</span></span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-start">
          <span className="text-green-400 font-bold w-24 shrink-0">Role:</span>
          <span className="text-zinc-300">
            Backend Developer (Go) <span className="text-zinc-600">|</span> Solution Architect <span className="text-zinc-600">|</span> Network & System Administration
          </span>
        </div>

        <div>
          <span className="text-green-400 font-bold w-24 inline-block">Location:</span>
          <span className="text-white">Finland 🇫🇮</span>
        </div>
      </div>
    </div>
  );
};

export default Whoami;