import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // 1. Send data to FormSubmit.co
      const response = await fetch("https://formsubmit.co/ajax/demon.cider591@passinbox.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          // Controls the email YOU receive
          _subject: "New Portfolio Message from " + form.name,
          _template: "table",
          // Controls the email THEY receive (Auto-Reply)
          _autoresponse: "Thank you for reaching out! I have received your message and will get back to you as soon as possible. \n\nBest regards,\nKrishna Adhikari"
        })
      });

      if (response.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" }); // Clear form
        setTimeout(() => setStatus(""), 5000); // Reset button after 5s
      } else {
        setStatus("");
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("");
      alert("Error sending message. Please check your internet connection.");
    }
  };

  return (
    <div className="w-full max-w-5xl my-8">
      <div className="flex flex-col items-center mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Get In <span className="text-green-400">Touch</span>
        </h2>
        <p className="text-zinc-400 text-sm">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Contact Form */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-1">Send me a message</h3>
          <p className="text-zinc-500 text-sm mb-6">
            Fill out the form below and I&apos;ll get back to you ASAP.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500 transition-colors"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500 transition-colors"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Message</label>
              <textarea 
                rows={4}
                required
                className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500 transition-colors resize-none"
                placeholder="I'd like to discuss a project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button 
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                status === "sent" 
                  ? "bg-green-600 text-white" 
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "sent" ? (
                <>Message Sent! ✓</>
              ) : (
                <>Send Message <span className="text-xl">→</span></>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Social Links */}
        <div className="flex flex-col gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl h-full">
            <h3 className="text-xl font-bold text-white mb-6">Connect with me</h3>
            
            <div className="space-y-4">
              {/* GitHub */}
              <a href="https://github.com/Krishna4050" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-green-500/50 hover:bg-zinc-900 transition-all group">
                <div className="p-3 bg-zinc-800 rounded-lg text-white group-hover:text-green-400 group-hover:bg-zinc-950 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-green-400 transition-colors">GitHub</h4>
                  <p className="text-zinc-500 text-sm">github.com/Krishna4050</p>
                </div>
              </a>


              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/krishna4050" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-green-500/50 hover:bg-zinc-900 transition-all group">
                <div className="p-3 bg-zinc-800 rounded-lg text-white group-hover:text-green-400 group-hover:bg-zinc-950 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-green-400 transition-colors">LinkedIn</h4>
                  <p className="text-zinc-500 text-sm">Connect on LinkedIn</p>
                </div>
              </a>


              {/* Email */}
              <a href="mailto:info@krishnaadhikari.com" 
                 className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-green-500/50 hover:bg-zinc-900 transition-all group">
                <div className="p-3 bg-zinc-800 rounded-lg text-white group-hover:text-green-400 group-hover:bg-zinc-950 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-green-400 transition-colors">Email</h4>
                  <p className="text-zinc-500 text-sm">demon.cider591@passinbox.com</p>
                </div>
              </a>

              {/* Instagram (NEW) - Replace # with your link */}
              <a href="https://www.instagram.com/krish_na.adhikari?igsh=Y2J5cXMzNWVuZG50&utm_source=qr" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-pink-500/50 hover:bg-zinc-900 transition-all group">
                <div className="p-3 bg-zinc-800 rounded-lg text-white group-hover:text-pink-400 group-hover:bg-zinc-950 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-pink-400 transition-colors">Instagram</h4>
                  <p className="text-zinc-500 text-sm">Follow on Instagram</p>
                </div>
              </a>

              {/* Buy Me a Coffee (NEW) */}
              <a href="https://buymeacoffee.com/krish_na" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-4 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all group text-yellow-400">
                <div className="p-3 bg-yellow-400 rounded-lg text-black transition-colors group-hover:bg-black group-hover:text-yellow-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754h-7.92c-.663 0-1.2.537-1.2 1.2v7.357c0 2.507 1.812 4.588 4.195 5.062C11.396 18.232 12.896 19.2 12 19.2c-1.325 0-2.4-.896-2.4-2h-2.4c0 2.429 2.15 4.4 4.8 4.4s4.8-1.971 4.8-4.4c.001-.064.03-.68.04-1.504 2.379-.533 4.16-2.605 4.16-5.096V6.035c0-.451-.295-.862-.795-1.244zM18.8 11.6c0 1.323-.979 2.435-2.25 2.607.01-.194.026-.642.026-1.632V5.437h1.424c.435 0 .8.365.8.8v5.363zM2.4 17.6h7.2v2.4H2.4z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold transition-colors">Buy Me a Coffee</h4>
                  <p className="text-xs opacity-80 uppercase tracking-wide">Support my work</p>
                </div>
              </a>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;