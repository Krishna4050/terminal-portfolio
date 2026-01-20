import React from 'react';

const About = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-2xl my-4">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar Image Placeholder */}
        <div className="relative w-32 h-32 shrink-0">
          <div className="absolute inset-0 bg-linear-to-tr from-green-500 to-blue-500 rounded-full blur-md opacity-75"></div>
          <div className="relative w-full h-full bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-zinc-700">
            {/* Replace this text with an <img /> tag later */}
            <span className="text-4xl">👨‍💻</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-1">
            Hi, I&apos;m <span className="text-green-400">Krishna Adhikari</span>
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            Backend-focused Software Engineer & Network Specialist
          </p>
          
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            A passionate developer with expertise in <span className="text-green-300">Go, Next.js, and Networking</span>. 
            I enjoy building systems that are reliable, secure, and fun. Currently building cool stuff in Finland 🇫🇮.
          </p>

          {/* Social Links / Buttons */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="https://github.com/Krishna4050" target="_blank" rel="noopener noreferrer" 
               className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-md border border-zinc-700 transition-colors">
              GitHub
            </a>
            <a href="mailto:krishna@example.com" 
               className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-md border border-zinc-700 transition-colors">
              Email
            </a>
            <a href="/resume.pdf" target="_blank"
               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-black font-bold text-xs rounded-md transition-colors">
              View Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;