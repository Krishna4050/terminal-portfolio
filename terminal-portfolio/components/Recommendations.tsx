import React from "react";

const recommendations = [
  {
    name: "David Pere",
    role: "Strategic professional | CTO",
    date: "February 1, 2024",
    text: "Krishna has consistently demonstrated a strong work ethic, technical proficiency, and exceptional leadership skills throughout his time working with us. As a developer, he played a pivotal role in organizing and executing various Product updates.",
    initial: "D",
  },
  {
    name: "Teddy Eragbai",
    role: "Lead Tech Community Manager",
    date: "March 23, 2024",
    text: "I am pleased to recommend Krishna for his exceptional technical and leadership skills. As a Technical Executive, he oversaw technical operations using advanced technologies to achieve project milestones and foster innovation.",
    initial: "T",
  },
];

const Recommendations = () => {
  return (
    <div className="w-full max-w-5xl my-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          <span className="text-green-400">Recommendations</span>
        </h2>
        <p className="text-zinc-500 text-sm">
          What mentors and colleagues say about my work
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <div 
            key={index} 
            className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl relative hover:border-zinc-700 transition-colors"
          >
            {/* Large Quote Icon */}
            <div className="text-zinc-700 mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
              </svg>
            </div>

            {/* Quote Text */}
            <p className="text-zinc-300 italic leading-relaxed mb-8 text-sm">
              &quot;{rec.text}&quot;
            </p>

            {/* Footer with Avatar */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 font-bold">
                {rec.initial}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{rec.name}</h4>
                <p className="text-zinc-500 text-xs">{rec.role}</p>
                <p className="text-zinc-600 text-[10px] mt-0.5">{rec.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;