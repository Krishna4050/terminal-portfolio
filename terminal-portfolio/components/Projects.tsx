import React from "react";

const projects = [
  {
    title: "Terminal Portfolio",
    desc: "A developer portfolio that mimics a Linux terminal. Built with Next.js & Tailwind.",
    tech: ["Next.js", "React", "Tailwind", "TypeScript"],
    link: "https://github.com/Krishna4050/terminal-portfolio",
  },
  {
    title: "Network Monitor",
    desc: "Real-time network traffic analyzer and packet sniffer for local networks.",
    tech: ["Python", "Scapy", "Grafana", "Docker"],
    link: "#",
  },
  {
    title: "Cloud File Server",
    desc: "Secure file storage system with end-to-end encryption and user auth.",
    tech: ["Go", "PostgreSQL", "AWS S3", "Docker"],
    link: "#",
  },
];

const Projects = () => {
  return (
    <div className="my-4 w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl hover:border-green-500/50 transition-colors group"
          >
            <h3 className="text-xl font-bold text-green-400 mb-2 group-hover:text-green-300">
              {p.title}
            </h3>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed h-16 overflow-hidden">
              {p.desc}
            </p>
            
            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tech.map((t) => (
                <span key={t} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-white hover:text-green-400 transition-colors"
            >
              View Project 
              <span className="ml-1">→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;