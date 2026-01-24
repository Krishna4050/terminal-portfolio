"use client";

import { useState } from "react";
import { submitTestimonial } from "@/app/actions";

interface Props {
  onClose: () => void;
}

export default function TestimonialModal({ onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [charCount, setCharCount] = useState(0);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    linkedin: "",
    message: ""
  });

  // Touched State
  const [touched, setTouched] = useState({
    email: false,
    linkedin: false
  });

  // Validation Errors State
  const [errors, setErrors] = useState({
    email: "",
    linkedin: ""
  });

  // ⚡ HELPER: Validate a single field
  const validateField = (name: string, value: string) => {
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // If empty, no error (unless touched & required, handled elsewhere). If typed, check regex.
      if (value && !emailRegex.test(value)) {
        return "Please enter a valid email (e.g. name@domain.com)";
      }
      return "";
    }
    
    if (name === "linkedin") {
      const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
      if (value && !linkedinRegex.test(value)) {
        return "Must start with https://linkedin.com/";
      }
      return "";
    }
    return "";
  };

  // Handle Input Changes (Updates Value AND Validation instantly)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // 1. Update the value
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 2. Validate immediately (No useEffect needed!)
    if (name === "email" || name === "linkedin") {
       const errorMsg = validateField(name, value);
       setErrors(prev => ({ ...prev, [name]: errorMsg }));
    }

    if (name === "message") setCharCount(value.length);
  };

  // Handle Blur (User leaves the field)
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Re-validate on blur just to be safe (e.g. if they clicked away without typing)
    const value = field === "email" ? formData.email : formData.linkedin;
    const errorMsg = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  // Final Submit Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    // Run a final check on everything
    const emailError = validateField("email", formData.email);
    const linkedinError = validateField("linkedin", formData.linkedin);

    if (emailError || linkedinError) {
      setErrors({ email: emailError, linkedin: linkedinError });
      setTouched({ email: true, linkedin: true });
      return;
    }

    setStatus("submitting");

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => dataToSend.append(key, value));

    const result = await submitTestimonial(dataToSend);
    
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setServerError(result.message || "Something went wrong.");
    }
  }

  // Visual Logic
  const showEmailError = touched.email && errors.email;
  const showLinkedinError = touched.linkedin && errors.linkedin;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden ring-1 ring-zinc-700/50">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-2">Write a Recommendation</h3>
          <p className="text-zinc-500 text-sm mb-6">Your email is kept private. LinkedIn is optional.</p>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h4 className="text-green-400 font-bold mb-2">Thank You!</h4>
              <p className="text-zinc-400 text-sm">A confirmation email has been sent to you.</p>
              <button onClick={onClose} className="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-white text-sm transition-colors">Close Window</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your Name *" 
                  maxLength={50} 
                  className="bg-black border border-zinc-800 p-3 rounded-lg text-white text-sm focus:border-green-500 outline-none w-full" 
                />
                <input 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  required 
                  placeholder="Role / Company *" 
                  maxLength={50} 
                  className="bg-black border border-zinc-800 p-3 rounded-lg text-white text-sm focus:border-green-500 outline-none w-full" 
                />
              </div>

              {/* EMAIL FIELD */}
              <div>
                <input 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  required 
                  placeholder="Email Address (e.g. name@company.com) *" 
                  className={`w-full bg-black border p-3 rounded-lg text-white text-sm outline-none transition-colors ${
                    showEmailError ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-green-500"
                  }`} 
                />
                <div className={`text-red-400 text-[10px] mt-1 font-medium transition-opacity duration-300 ${showEmailError ? "opacity-100" : "opacity-0 h-0"}`}>
                  {errors.email}
                </div>
              </div>

              {/* LINKEDIN FIELD */}
              <div>
                <input 
                  name="linkedin" 
                  type="url" 
                  value={formData.linkedin}
                  onChange={handleChange}
                  onBlur={() => handleBlur("linkedin")}
                  placeholder="LinkedIn Profile URL (Optional)" 
                  className={`w-full bg-black border p-3 rounded-lg text-white text-sm outline-none transition-colors ${
                    showLinkedinError ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-green-500"
                  }`} 
                />
                <div className="flex justify-between items-start mt-1">
                  <div className={`text-red-400 text-[10px] font-medium transition-opacity duration-300 ${showLinkedinError ? "opacity-100" : "opacity-0"}`}>
                    {errors.linkedin}
                  </div>
                  {!showLinkedinError && (
                    <p className="text-[10px] text-zinc-600">Format: https://linkedin.com/in/...</p>
                  )}
                </div>
              </div>

              {/* MESSAGE FIELD */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  maxLength={500}
                  placeholder="How was your experience working with me?"
                  className="w-full bg-black border border-zinc-800 p-3 rounded-lg text-white text-sm focus:border-green-500 outline-none resize-none"
                />
                <div className="flex justify-between mt-1">
                  {status === "error" && <span className="text-red-400 text-xs font-bold animate-pulse">{serverError}</span>}
                  <span className="text-[10px] text-zinc-600 ml-auto">{charCount} / 500</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || !!errors.email || !!errors.linkedin}
                className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {status === "submitting" ? "Verifying & Sending..." : "Submit Recommendation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}