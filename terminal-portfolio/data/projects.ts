export type Project = {
  id: number;
  title: string;
  role: string;
  tags: string[];
  shortDesc: string;
  // New Fields
  overview: string; 
  challengeIntro: string;
  challengePoints: string[]; // For bullet points
  solution: string;
  implementations: { title: string; desc: string; icon: string }[];
  techStack: { category: string; items: string[] }[];
  outcomes: { value: string; label: string; color: string }[];
  diagram?: string;
  outcomeDesc?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Enterprise Network Redesign for Reliability and Security",
    role: "Network Architect", 
    tags: ["Cisco", "Fortinet", "Network Design", "Security"],
    shortDesc: "I worked with a mid-sized enterprise that was struggling with frequent network issues due to an outdated flat network design.",
    
    // 1. NEW OVERVIEW SECTION
    overview: "I worked with a mid-sized enterprise that was struggling with frequent network issues due to an outdated flat network design. The setup caused performance problems, security risks, and complete outages whenever maintenance was required.",

    // 2. CHALLENGE SPLIT INTO INTRO + POINTS
    challengeIntro: "The existing network had several critical problems:",
    challengePoints: [
      "No redundancy – any maintenance or failure at the core caused a full network outage",
      "Poor security – all departments shared the same internal network with no proper segmentation",
      "Broadcast storms – flat topology led to unnecessary traffic and performance drops",
      "Messy cabling – inefficient layout made troubleshooting and hardware replacement difficult"
    ],

    solution: "I redesigned the entire network using a hierarchical 3-tier architecture with a strong focus on high availability, security, and future scalability. This included both logical redesign and physical cabling improvements.",
    
    diagram: "/firstproject.png",
    
    implementations: [
      {
        title: "Perimeter Security",
        desc: "Deployed Fortinet Next-Generation Firewalls in a high-availability (HA) setup. Configured firewall policies and VPN access to properly control north-south traffic.",
        icon: "🛡️"
      },
      {
        title: "Redundant Core Network",
        desc: "Implemented Cisco core switches using VSS/stacking. Removed single points of failure and achieved fast failover with minimal downtime.",
        icon: "⚙️"
      },
      {
        title: "Improved Physical Topology",
        desc: "Reorganized data center cabling using an End-of-Row (EoR) design. Improved airflow and cooling efficiency by around 20% and made future maintenance much easier.",
        icon: "🔌"
      }
    ],
    techStack: [
      { category: "Hardware", items: ["Cisco Catalyst 9300", "Fortinet FortiGate 200F"] },
      { category: "Protocols", items: ["OSPF", "BGP", "HSRP / VRRP", "LACP", "802.1Q"] },
      { category: "Tools", items: ["AutoCAD", "draw.io", "Wireshark", "PuTTY", "Python"] }
    ],
    outcomes: [
      { value: "50%", label: "Traffic Increase Handled", color: "text-green-400" },
      { value: "20%", label: "Cooling Efficiency", color: "text-blue-400" },
      { value: "Zero", label: "Major Outages", color: "text-purple-400" }
    ],
    // 3. FULL RESULT TEXT
    outcomeDesc: "The project was delivered on time and within budget. After the upgrade: The client successfully rolled out a new VoIP system. The network handled a 50% increase in user traffic over the next year. No major performance or availability issues were reported."
  },
  {
    id: 2,
    title: "Strengthening Enterprise Security with NGFW Migration",
    role: "Security Engineer",
    tags: ["Fortinet & Palo Alto", "Sophos Endpoint", "SSL-VPN", "Cybersecurity"],
    shortDesc: "The client was using legacy firewalls that could only filter traffic at a basic level. As more employees started working remotely, security risks increased and the IT team had very limited visibility into what was happening on the networkespecially encrypted traffic.",
    
    // 1. OVERVIEW
    overview: "The client was operating on legacy stateful firewalls that lacked application-layer visibility (Layer 7). With the shift to remote work, their attack surface expanded, exposing the network to ransomware threats. They had no visibility into encrypted traffic, and endpoint security was fragmented.",
    
    // 2. CHALLENGE
    challengeIntro: "The main issues were:",
    challengePoints: [
      "Lack of Layer 7 visibility: 'We can't see what applications users are running.'",
      "Frequent VPN disconnections affecting remote users",
      "Increased exposure to ransomware and malware threats",
      "No inspection of encrypted HTTPS traffic",
      "Endpoint protection was inconsistent across users"
    ],

    // 3. SOLUTION
    solution: "I implemented a defense-in-depth security approach, upgrading the perimeter to Next-Generation Firewalls and strengthening endpoint protection. The goal was to gain full visibility, improve threat detection, and secure remote access without affecting user productivity.",
    
    // Ensure you rename your image file in /public to secondproject.jpg (or update this path)
    diagram: "/secondproject.png", 
    
    // 4. IMPLEMENTATIONS
    implementations: [
      { 
        title: "Perimeter Defense", 
        desc: "Deployed Fortinet and Palo Alto NGFWs at the network edge. Enabled IPS and sandboxing to detect zero-day and known threats. Configured SSL inspection to decrypt and inspect HTTPS traffic", 
        icon: "🌐" 
      },
      { 
        title: "Remote Access & Endpoint", 
        desc: "Set up SSL-VPN with multi-factor authentication (MFA) for remote users. Deployed Sophos Intercept X across endpoints. Applied granular web filtering policies to restrict non-business traffic", 
        icon: "📱" 
      }
    ],
    
    // 5. TECH STACK
    techStack: [
      { category: "Firewalls", items: ["Fortinet FortiGate", "Palo Alto Networks (PAN-OS)"] },
      { category: "Endpoint", items: ["Sophos Intercept X", "Antivirus"] },
      { category: "Protocols", items: ["IPsec IKEv2", "SSL-VPN", "HTTPS Inspection"] }
    ],
    
    // 6. OUTCOMES
    outcomes: [
      { value: "100%", label: "Malware Blocked", color: "text-green-400" },
      { value: "Layer 7", label: "Traffic Visibility", color: "text-blue-400" },
      { value: "Secure", label: "Remote Access", color: "text-orange-400" }
    ],
    
    outcomeDesc: "TMalware threats blocked before reaching internal systems. Full visibility into Layer 7 application traffic. Stable and secure remote access for sales and remote teams"
  }
];