// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/utils/supabase";
// import { submitTestimonial } from "@/app/actions"; // Import the server action

// type Testimonial = {
//   id: number;
//   name: string;
//   role: string;
//   message: string;
// };

// export default function Testimonials() {
//   const [items, setItems] = useState<Testimonial[]>([]);
//   const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

//   // 1. Fetch Approved Testimonials on Load
//   useEffect(() => {
//     async function fetchTestimonials() {
//       const { data } = await supabase
//         .from("testimonials")
//         .select("*")
//         .eq("approved", true) // Only get approved ones
//         .order("created_at", { ascending: false });

//       if (data) setItems(data);
//     }
//     fetchTestimonials();
//   }, []);

//   // 2. Handle Form Submission
//   async function handleSubmit(formData: FormData) {
//     setStatus("submitting");
//     const result = await submitTestimonial(formData);
    
//     if (result.success) {
//       setStatus("success");
//       // Optional: Reset form here if you used a ref
//     } else {
//       setStatus("error");
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto my-16 px-4">
//       <h2 className="text-3xl font-bold text-white mb-8 text-center">
//         Community <span className="text-green-400">Recommendations</span>
//       </h2>

//       {/* LIST OF TESTIMONIALS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//         {items.length === 0 ? (
//           <p className="text-zinc-500 text-center col-span-2 italic">
//             No recommendations yet. Be the first to write one!
//           </p>
//         ) : (
//           items.map((item) => (
//             <div key={item.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl relative">
//               <div className="absolute -top-3 -left-2 text-4xl text-green-500/20">&quot;</div>
//               <p className="text-zinc-300 italic mb-4 relative z-10 leading-relaxed">
//                 {item.message}
//               </p>
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-full bg-linear-to-tr from-green-500 to-blue-500 flex items-center justify-center text-xs font-bold text-black">
//                   {item.name[0]}
//                 </div>
//                 <div>
//                   <h4 className="text-white text-sm font-bold">{item.name}</h4>
//                   <p className="text-zinc-500 text-xs">{item.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* SUBMISSION FORM */}
//       <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-2xl mx-auto">
//         <h3 className="text-xl font-bold text-white mb-1">Leave a Recommendation</h3>
//         <p className="text-zinc-500 text-sm mb-6">Worked with me? I&apos;d love to hear your thoughts.</p>

//         {status === "success" ? (
//           <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg text-green-400 text-center">
//             ✅ Thank you! Your message has been sent for approval.
//           </div>
//         ) : (
//           <form action={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="name"
//                 required
//                 placeholder="Your Name"
//                 className="w-full bg-black border border-zinc-800 p-3 rounded-lg text-white focus:border-green-500 outline-none transition-colors"
//               />
//               <input
//                 name="role"
//                 required
//                 placeholder="Role (e.g. Colleague, Client)"
//                 className="w-full bg-black border border-zinc-800 p-3 rounded-lg text-white focus:border-green-500 outline-none transition-colors"
//               />
//             </div>
//             <textarea
//               name="message"
//               required
//               rows={3}
//               placeholder="What was it like working with Krishna?"
//               className="w-full bg-black border border-zinc-800 p-3 rounded-lg text-white focus:border-green-500 outline-none transition-colors resize-none"
//             />
//             <button
//               type="submit"
//               disabled={status === "submitting"}
//               className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-transform active:scale-95 disabled:opacity-50"
//             >
//               {status === "submitting" ? "Sending..." : "Submit Recommendation"}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }