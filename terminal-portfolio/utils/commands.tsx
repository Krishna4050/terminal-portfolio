import React from "react";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Skills from "../components/Skills";
import Recommendations from "../components/Recommendations";

export const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "recommendations",
  "contact",
  "clear",
  "neofetch",
  "whoami",
  "ls"
];

export const ALIASES: Record<string, string> = {
  cls: "clear",
  exit: "clear",
  quit: "clear",
  "?": "help",
};

// Define the return type so Terminal.tsx knows what to do
export type CommandOutput = {
  type: "text" | "component" | "clear";
  content: string | React.ReactNode;
};

export function runCommand(input: string): CommandOutput {
  const cmd = input.trim().toLowerCase();
  const command = ALIASES[cmd] ?? cmd;

  switch (command) {
    case "help":
      return {
        type: "text",
        content: `
Available commands:
  help                Show this help menu
  whoami              Who am I
  about               About me (Interactive)
  skills              Technical skills
  projects            My projects
  recommendations     Recommendations for friends and collegues
  contact             Contact info
  neofetch            System profile
  ls                  List files
  clear               Clear the terminal
`,
      };

    case "whoami":
      return {
        type: "text",
        content: "krishna@portfolio",
      };

    case "about":
      return {
        type: "component",
        content: <About />,
      };

    case "skills":
      return {
        type: "component",
        content: <Skills />,
      };

    // We will upgrade this to a Component in the next step!
    case "projects":
      return {
        type: "component",
        content: <Projects />,
      };

    case "experience":
      return {
        type: "component",
        content: <Experience />,
      };
    
    case "recommendations":
      return {
        type: "component",
        content: <Recommendations />,
      };

    case "contact":
      return {
        type: "component",
        content: <Contact />,
      };

    case "neofetch":
      return {
        type: "text",
        content: `
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
`,
      };

    case "ls":
      return {
        type: "text",
        content: `
about.txt
skills.txt
projects/
contact.txt
`,
      };

    case "clear":
      return {
        type: "clear",
        content: "",
      };

    default:
      return {
        type: "text",
        content: `command not found: ${input}\nType 'help' to see available commands.`,
      };
  }
}