import React from "react";

// Data extracted from your screenshot
const skillCategories = [
  {
    title: "Backend & Programming",
    icon: "🔷",
    skills: [
      { name: "Go", color: "bg-cyan-600 border-cyan-400" },
      { name: "Python", color: "bg-blue-600 border-blue-400" },
      { name: "Java", color: "bg-orange-500 border-orange-300" },
      { name: "Bash", color: "bg-zinc-700 border-zinc-500" },
    ],
  },
  {
    title: "Networking & Infrastructure",
    icon: "🌐",
    skills: [
      { name: "Cisco", color: "bg-sky-600 border-sky-400" },
      { name: "Juniper", color: "bg-green-600 border-green-400" },
      { name: "Firewalls", color: "bg-orange-600 border-orange-400" },
      { name: "VPN", color: "bg-blue-700 border-blue-500" },
    ],
  },
  {
    title: "Security & Monitoring",
    icon: "🛡️",
    skills: [
      { name: "Sophos", color: "bg-emerald-600 border-emerald-400" },
      { name: "Palo Alto", color: "bg-red-600 border-red-400" },
      { name: "Nagios", color: "bg-zinc-800 border-zinc-600" },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    skills: [
      { name: "MySQL", color: "bg-blue-600 border-blue-400" },
      { name: "MongoDB", color: "bg-green-500 border-green-300" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      { name: "Docker", color: "bg-blue-500 border-blue-300" },
      { name: "Ansible", color: "bg-red-600 border-red-400" },
      { name: "Terraform", color: "bg-purple-600 border-purple-400" },
      { name: "AWS", color: "bg-slate-700 border-slate-500" },
      { name: "Azure", color: "bg-blue-600 border-blue-400" },
      { name: "OpenStack", color: "bg-red-500 border-red-300" },
    ],
  },
  {
    title: "Tools & Collaboration",
    icon: "🔧",
    skills: [
      { name: "Git", color: "bg-orange-600 border-orange-400" },
      { name: "GitHub", color: "bg-zinc-800 border-zinc-500" },
      { name: "GitLab", color: "bg-orange-500 border-orange-300" },
      { name: "Jira", color: "bg-blue-700 border-blue-500" },
      { name: "Notion", color: "bg-zinc-700 border-zinc-500" },
    ],
  },
];

const Skills = () => {
  return (
    <div className="w-full max-w-4xl my-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-white">
          Tech Stack & <span className="text-green-400">Skills</span>
        </h2>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, index) => (
          <div 
            key={index} 
            className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{cat.icon}</span>
              <h3 className="font-bold text-zinc-200">{cat.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <div 
                  key={i}
                  className={`
                    ${skill.color} 
                    text-white text-xs font-bold px-3 py-1.5 rounded-md border-b-2 shadow-sm uppercase tracking-wider
                  `}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;