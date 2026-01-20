
export const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "clear",
  "neofetch",
  "whoami"
];

export const ALIASES: Record<string, string> = {
  cls: "clear",
  exit: "clear",
  quit: "clear",
  "?": "help",
};


export function runCommand(input: string): string | "__CLEAR__" {
  const cmd = input.trim().toLowerCase();
  const command = ALIASES[cmd] ?? cmd;

  switch (command) {
    case "help":
      return `
Available commands:
  help        Show this help menu
  whoami     Who am I
  about      About me
  skills     Technical skills
  projects   My projects
  contact    Contact info
  neofetch   System profile
  ls         List files
  clear      Clear the terminal
`;

    case "whoami":
      return "krishna@portfolio";

    case "about":
      return `
Hi, I'm Krishna Adhikari 👋
IT & Network Engineer turned Software Enthusiast.
I enjoy building systems that are reliable, secure, and fun.
Currently in Finland 🇫🇮.
`;

    case "skills":
      return `
• Networking: Cisco, Juniper, Firewalls, VPNs
• Backend: Python, Java, Go
• Web: HTML, CSS, Next.js
• DevOps: Docker, Git, Ansible
• Cloud: AWS, Azure, OpenStack
`;

    case "projects":
      return `
• Terminal Portfolio (this site 😄)
• Network Infrastructure Design
• Firewall & VPN Deployments
• Mail Server Setup
• Monitoring & Automation
`;

    case "contact":
      return `
Email: krishna.adhikari@example.com
GitHub: https://github.com/yourusername
Website: https://krishnaadhikari.com
`;

    case "neofetch":
      return `
        ███████╗██╗  ██╗
        ██╔════╝██║ ██╔╝
        █████╗  █████╔╝ 
        ██╔══╝  ██╔═██╗ 
        ██║     ██║  ██╗
        ╚═╝     ╚═╝  ╚═╝

User: Krishna Adhikari
OS: Terminal Portfolio OS
Role: IT / Network / Software
Location: Finland
Shell: Next.js Terminal
`;

    case "ls":
      return `
about.txt
skills.txt
projects/
contact.txt
`;

    case "clear":
      return "__CLEAR__";

    default:
      return `command not found: ${input}
Type 'help' to see available commands.`;
  }
}
