"use client";

import { useState } from "react";

export default function Terminal() {
  const [input, setInput] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black text-green-400 font-mono p-4 rounded-lg shadow-lg">
        {/* Output area */}
        <div className="mb-2">
          <p>Welcome to Krishna’s Terminal Portfolio</p>
          <p>
            Type <span className="text-green-300">help</span> to get started.
          </p>
        </div>

        {/* Input line */}
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <input
            type="text"
            className="flex-1 bg-black outline-none text-green-400 caret-green-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
