import React from "react";

const experiences = [
  {
    title: "Enterprise Solution Architect",
    company: "Worldlink Communication Limited",
    role: "Solution Architect",
    date: "2021 – 2024",
    location: "Kathmandu, Nepal",
    desc: [
      "Deployed and maintained enterprise-grade servers and structured cabling (Cisco, Juniper, Ruckus).",
      "Implemented firewalls and endpoint protection (Sophos, Fortinet, Palo Alto) to secure critical networks.",
      "Designed routed network environments for major enterprise clients, ensuring high avail-ability.",
      "Communicated technical issues and solutions clearly to customers and internal teams.",
      "Handled data center power systems (PDUs, UPS, generators) for 24/7 continuous uptime.",
      "Provided high-level technical support and documentation for complex network/system issues."
    ],
    tech: ["Cisco", "Juniper", "Palo Alto", "Fortinet", "Data Center"],
  },
  {
    title: "Enterprise Support Representative",
    company: "Worldlink Communication Limited",
    role: "Support",
    date: "July 2021 – Aug 2021",
    location: "Kathmandu, Nepal",
    desc: [
      "Configured and maintained network devices including switches and routers (Cisco, Juniper, Extreme, EdgeCore).",
      "Diagnosed and resolved network, hardware, and software issues using ping, traceroute, SNMP monitoring, and command-line diagnostics.",
      "Monitored network performance using SNMP-based tools, bandwidth systems, and firewall logs to minimize downtime.",
      "Managed and monitored Intranet services and Virtual Private Servers (VPS).",
      "Provided troubleshooting support for mail servers and web servers.",
      "Assisted in firewall configuration and basic security management."
    ],
    tech: ["SNMP", "VPS", "Linux", "Troubleshooting", "Cisco"],
  },
  {
    title: "Technical Associate",
    company: "CLASSIC TECH PVT. LTD",
    role: "Technical Support",
    date: "Nov 2019 – Dec 2020",
    location: "Kathmandu, Nepal",
    desc: [
      "Provided technical support by handling and following up on customer support tickets.",
      "Monitored incoming issues and coordinated with relevant teams for resolution.",
      "Prepared and submitted daily operational and support reports.",
      "Supported enterprise customers by monitoring services and resolving connectivity issues.",
      "Delivered field support, including on-site troubleshooting and basic network maintenance."
    ],
    tech: ["Network Support", "Field Support", "Customer Service"],
  },
];

const Experience = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-2 md:px-0">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Professional <span className="text-green-400">Journey</span>
        </h2>
        <p className="text-zinc-500 text-sm">
          My career timeline in network infrastructure & architecture
        </p>
      </div>

      <div className="relative space-y-12">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2 md:translate-x-0"></div>

        {experiences.map((exp, index) => (
          <div key={index} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-green-500 -translate-x-1/2 mt-6 z-10 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>

            {/* Empty space */}
            <div className="hidden md:block md:w-1/2"></div>

            {/* Content Card */}
            <div className="md:w-1/2 pl-12 md:pl-0">
              <div className={`relative bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors ${
                index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
              }`}>
                
                {/* Connecting Line */}
                <div className={`hidden md:block absolute top-7 w-8 h-0.5 bg-zinc-800 ${
                  index % 2 === 0 ? '-left-8' : '-right-8'
                }`}></div>

                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {exp.title}
                  </h3>
                  <span className="text-xs font-mono text-green-400 bg-green-900/10 border border-green-900/30 px-2 py-1 rounded whitespace-nowrap">
                    {exp.date}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-zinc-300 font-medium text-sm flex items-center gap-2">
                    <span className="text-lg">🏢</span> {exp.company}
                  </p>
                  <p className="text-zinc-500 text-xs ml-7 mt-0.5">
                    📍 {exp.location}
                  </p>
                </div>

                <ul className="space-y-2 mb-5">
                  {exp.desc.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
                      {/* UPDATED: Changed text-zinc-600 to text-green-500 */}
                      <span className="text-green-500 mt-1.5 text-[6px] shrink-0">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/50">
                  {exp.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] text-zinc-500 bg-zinc-950/50 px-2 py-1 rounded border border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;