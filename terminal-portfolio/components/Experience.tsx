import React from "react";

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    role: "Backend & Systems",
    date: "2023 - Present",
    location: "Helsinki, Finland",
    desc: "Leading backend modernization, migrating legacy monoliths to Go microservices, and optimizing high-throughput systems.",
    tech: ["Go", "Kafka", "Kubernetes", "gRPC"],
  },
  {
    title: "Network & Systems Admin",
    company: "Global Net Infra",
    role: "Infrastructure",
    date: "2021 - 2023",
    location: "Remote / Finland",
    desc: "Managed hybrid cloud infrastructure, automated server provisioning, and ensured 99.99% uptime for critical networks.",
    tech: ["Ansible", "Terraform", "Cisco", "Prometheus"],
  },
  {
    title: "IT Support Specialist",
    company: "Local ISP",
    role: "Support",
    date: "2019 - 2021",
    location: "Nepal",
    desc: "Provided technical support for enterprise network clients and configured firewalls for small businesses.",
    tech: ["Networking", "Linux", "Troubleshooting"],
  },
];

const Experience = () => {
  return (
    <div className="w-full max-w-5xl my-4">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-white">
          Professional <span className="text-green-400">Experience</span>
        </h2>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>

      {/* Horizontal Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="group flex flex-col justify-between bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl hover:border-green-500/50 transition-all hover:-translate-y-1"
          >
            <div>
              {/* Header: Date & Role badge */}
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono text-zinc-500 border border-zinc-700 px-2 py-1 rounded bg-zinc-800/50">
                  {exp.date}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-green-400 font-bold border border-green-900/50 bg-green-900/10 px-2 py-1 rounded-full">
                  {exp.role}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-300 transition-colors">
                {exp.title}
              </h3>
              
              <div className="flex items-center text-zinc-400 text-xs mb-3 font-mono">
                <span className="mr-2">🏢 {exp.company}</span>
                <span>📍 {exp.location}</span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-4 border-t border-zinc-800/50 pt-3">
                {exp.desc}
              </p>
            </div>

            {/* Tech Stack Footer */}
            <div className="flex flex-wrap gap-2 mt-auto pt-3">
              {exp.tech.map((t, i) => (
                <span 
                  key={i} 
                  className="text-xs text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;