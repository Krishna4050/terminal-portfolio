import React from "react";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Skills from "../components/Skills";
import Recommendations from "../components/Recommendations";
import Whoami from "../components/Whoami";
import Education from "../components/Education";
import Help from "../components/Help";
import TestimonialsOutput from "@/components/TestimonialsOutput";

export const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "recommendations",
  "contact",
  "testimonials",
  "clear",
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
        type: "component",
        content: <Help />,
      };

    case "whoami":
      return {
        type: "component",
        content: <Whoami />,
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

    case "education":
      return {
        type: "component",
        content: <Education />,
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

    case "testimonials":
      return {
        type: "component",
        content: <TestimonialsOutput />,
      };

    default:
      return {
        type: "text",
        content: `command not found: ${input}\nType 'help' to see available commands.`,
      };
  }
}