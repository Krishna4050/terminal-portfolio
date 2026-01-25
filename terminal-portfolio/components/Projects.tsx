import React, { useState, useEffect } from "react";
import Image from "next/image";
import { projects, Project } from "../data/projects";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 2. Insert this useEffect Hook
  // This locks the background scroll when the modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <div className="w-full max-w-6xl my-8 px-4">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white mb-2">
          Featured <span className="text-green-400">Projects</span>
        </h2>
        <p className="text-zinc-500 text-sm">
          Select a project to view the architectural details and outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="group bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-green-500/50 hover:bg-zinc-900/60 transition-all cursor-pointer flex flex-col h-full"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-green-400 bg-green-900/10 border border-green-900/30 px-2 py-1 rounded">
                {project.role}
              </span>
              <span className="text-zinc-500 text-xs">Project #{project.id}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-zinc-400 text-sm mb-6 flex-1">
              {project.shortDesc}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center text-green-400 text-sm font-bold group-hover:underline">
              View Case Study <span className="ml-2">→</span>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:p-8 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-zinc-950 w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border-none md:border border-zinc-800 rounded-none md:rounded-2xl ring-0 md:ring-1 ring-zinc-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
                    {selectedProject.role}
                  </span>
                  <div className="flex gap-2">
                    {selectedProject.tags.slice(0, 2).map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-md border border-zinc-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {selectedProject.title}
                </h2>
              </div>
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 rounded-full transition-all border border-zinc-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              
              {/* Overview */}
              <div className="mb-8 border-b border-zinc-800 pb-8">
                <h3 className="text-lg font-bold text-white mb-2">
                   {/* If you wanted a custom heading for Overview you could add it here too, but "Overview" is usually standard */}
                   Project Overview
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  {selectedProject.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* DYNAMIC HEADING 1: Default is "The Challenge" */}
                  <div>
                    <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                      {selectedProject.headingChallenge ? (
                         // If custom heading exists, show it (e.g. "What I Learned")
                         <span>{selectedProject.headingChallenge}</span>
                      ) : (
                         // Default Heading
                         <><span className="text-xl">⚡</span> The Challenge</>
                      )}
                    </h3>
                    
                    {selectedProject.challengeIntro && (
                      <p className="text-zinc-400 leading-relaxed text-sm md:text-base mb-3">
                        {selectedProject.challengeIntro}
                      </p>
                    )}
                    
                    <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-400 text-sm md:text-base">
                      {selectedProject.challengePoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* DYNAMIC HEADING 2: Default is "The Solution" */}
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      {selectedProject.headingSolution ? (
                         <span>{selectedProject.headingSolution}</span>
                      ) : (
                         <><span className="text-xl">💡</span> The Solution</>
                      )}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                      {selectedProject.solution}
                    </p>
                  </div>

                  {/* DYNAMIC HEADING 3: Default is "Key Implementations" */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">
                      {selectedProject.headingImplementations || "Key Implementations"}
                    </h3>
                    <div className="grid gap-4">
                      {selectedProject.implementations.map((imp, i) => (
                        <div key={i} className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 flex gap-4">
                          <span className="text-2xl pt-1">{imp.icon}</span>
                          <div>
                            <h4 className="text-white font-bold text-sm mb-1">{imp.title}</h4>
                            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{imp.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architecture Diagram */}
                  {selectedProject.diagram && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-white mb-4">Architecture Diagram</h3>
                      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden shadow-lg flex items-center justify-center">
                         <Image 
                           src={selectedProject.diagram}
                           alt={`${selectedProject.title} Architecture`}
                           fill
                           className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                         />
                      </div>
                      <p className="text-xs text-zinc-500 mt-3 italic text-center font-mono">
                      {  /* Figure 1.0: High-Level Schematic of the implemented Architecture. */ }
                      </p>
                    </div>
                  )}

                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-8">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Tech Stack Used</h4>
                    <div className="space-y-4">
                      {selectedProject.techStack.map((stack, i) => (
                        <div key={i}>
                          <p className="text-white font-bold text-sm mb-1">{stack.category}</p>
                          <div className="flex flex-wrap gap-2">
                            {stack.items.map((item, j) => (
                              <span key={j} className="text-xs text-zinc-400 bg-zinc-950 border border-zinc-800 px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result/Outcome Section */}
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Result</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedProject.outcomes.map((outcome, i) => (
                        <div key={i} className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                           <div>
                             <p className={`text-2xl font-bold ${outcome.color}`}>{outcome.value}</p>
                             <p className="text-zinc-500 text-xs">{outcome.label}</p>
                           </div>
                           <div className="h-8 w-1 bg-zinc-800 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedProject.outcomeDesc && (
                      <div className="mt-6 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
                        {selectedProject.outcomeDesc}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;