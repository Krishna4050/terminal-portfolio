import React from 'react';

const About = () => {
  return (
    // UPDATED: Changed max-w-2xl to max-w-6xl for a wider layout
    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl w-full max-w-6xl my-4">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        
        {/* Avatar Section - Fixed width */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 bg-linear-to-tr from-green-500 to-blue-500 rounded-full blur-md opacity-75 animate-pulse"></div>
            <div className="relative w-full h-full bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-zinc-700 shadow-xl">
              <span className="text-5xl">👨‍💻</span>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="mt-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full border border-zinc-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Open to work</span>
          </div>
        </div>

        {/* Content Section - Expands to fill space */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Hi, I&apos;m <span className="text-green-400">Krishna Adhikari</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-mono mb-6 border-b border-zinc-800 pb-4">
            Backend Developer (Go) | Solution Architect | Network & System Administration
          </p>
          
          <div className="space-y-4 text-zinc-300 leading-relaxed text-sm md:text-base max-w-3xl">
            <p>
              IT professional with a background in system administration and solution architecture, now focused 
              on software development. Currently studying at <span className="text-green-300 font-bold">kood/Sisu</span>, 
              a project-based, peer-to-peer program, with a focus on backend development using <span className="text-green-300">Go (Golang)</span> and 
              experience with JavaScript.
            </p>
            <p>
              Strong problem-solver who understands how applications run, scale, and communicate within real systems. 
              Motivated by learning fast, working in collaborative teams, and building simple, reliable solutions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="https://github.com/Krishna4050" target="_blank" rel="noopener noreferrer" 
               className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm rounded-lg border border-zinc-700 transition-all hover:-translate-y-0.5 shadow-lg flex items-center gap-2">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               GitHub
            </a>
            <a href="mailto:krishna@example.com" 
               className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm rounded-lg border border-zinc-700 transition-all hover:-translate-y-0.5 shadow-lg flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               Email
            </a>
            <a href="/resume.pdf" target="_blank"
               className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-black font-bold text-sm rounded-lg transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center gap-2">
               View Resume
               <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;