import React from "react";

const education = [
  {
    school: "kood/Sisu",
    degree: "Full Stack Development Program, Computer Software Engineering",
    date: "Oct 2025 - Oct 2027",
    desc: "Activities: Peer-to-Peer Learning, Agile Sprints, Collaborative Problem Solving, Technical Community",
    points: [
      "Focused on building fast and reliable backend applications using Go (Golang)",
      "Improved problem-solving skills through data structures, algorithms, and clean coding practices",
      "Gained hands-on experience through real projects, peer code reviews, and teamwork",
      "Developed strong self-learning skills while working under tight deadlines",
      "Built good collaboration and communication skills in group-based development",
      "Learned Git, version control workflows, and command-line tools",
      "Experience with JavaScript and TypeScript for web development"
    ],
    skills: ["Full-Stack Development", "Go", "Software Development", "Data Structures", "Algorithms", "DevOps"],
    initials: "K/S",
    color: "bg-purple-600"
  },
  {
    school: "Kajaani University of Applied Sciences (KAMK)",
    degree: "Bachelor's degree, International Business",
    date: "Aug 2024 - Dec 2027",
    desc: "Focus on global business strategies, financial accounting, and project management in an international context.",
    skills: ["Product Marketing", "Financial Accounting", "Project Management", "Leadership", "Supply Chain Management"],
    initials: "K",
    color: "bg-cyan-600"
  },
  {
    school: "Kantipur College of Management and Information Technology (KCMIT)",
    degree: "Bachelor's degree, Information Management",
    date: "Jan 2016 - Sep 2021",
    desc: "Comprehensive study of information systems, network administration, and enterprise architecture.",
    skills: ["Cloud Computing", "Data Center Operations", "Network Administration", "Enterprise Network Design", "DevOps"],
    initials: "KC",
    color: "bg-orange-600"
  }
];

const Education = () => {
  return (
    // UPDATED: Added 'mx-auto' for centering and 'max-w-6xl' for consistency
    <div className="w-full max-w-6xl mx-auto my-8">
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white mb-2">
          Education & <span className="text-green-400">Certifications</span>
        </h2>
        <p className="text-zinc-500 text-sm">
          My academic background and professional training
        </p>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div 
            key={index} 
            className="flex flex-col md:flex-row gap-4 md:gap-6 bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-all"
          >
            {/* School Logo / Initials */}
            <div className="shrink-0">
              <div className={`w-12 h-12 md:w-16 md:h-16 ${edu.color} rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-2xl shadow-lg`}>
                {edu.initials}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{edu.school}</h3>
                  <p className="text-green-400 text-sm font-medium">{edu.degree}</p>
                </div>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded border border-zinc-700 whitespace-nowrap w-fit mt-2 md:mt-0">
                  {edu.date}
                </span>
              </div>

              <p className="text-zinc-400 text-sm mb-4 leading-relaxed border-b border-zinc-800/50 pb-4">
                {edu.desc}
              </p>

              {/* Bullet Points */}
              {edu.points && (
                <ul className="mb-6 space-y-2">
                  {edu.points.map((point, i) => (
                    <li key={i} className="text-zinc-400 text-sm flex items-start gap-3">
                      <span className="text-green-500 mt-1.5 text-[8px] shrink-0">●</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {edu.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] md:text-xs text-zinc-400 bg-zinc-950/50 px-2.5 py-1 rounded border border-zinc-800 hover:border-zinc-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;