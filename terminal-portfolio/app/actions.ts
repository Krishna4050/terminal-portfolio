"use server";

import { supabase } from "@/utils/supabase";
import { Resend } from "resend";
import WelcomeEmail from "@/components/emails/WelcomeEmail";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM_EMAIL = "Krishna Portfolio <no-reply@krishnaadhikari.com>"; 

// 🌍 NEW: Log Visitor Location
export async function logVisit() {
  const headerStore = await headers();
  
  // Vercel automatically provides these headers
  const city = headerStore.get("x-vercel-ip-city") || "Unknown City";
  const country = headerStore.get("x-vercel-ip-country-region") || "Unknown Country"; // Can vary, sometimes just "x-vercel-ip-country"
  const countryCode = headerStore.get("x-vercel-ip-country") || "XX";

  // Prevent spam: Simple check to ensure we have real data (or localhost)
  // We insert even "Unknown" so you can see traffic volume, but you can filter if you want.
  
  const { error } = await supabase
    .from("visits")
    .insert([{ city, country, country_code: countryCode }]);

  if (error) console.error("Error logging visit:", error);
}

// 🌍 NEW: Get Recent Visits for 'trace' command
export async function getRecentVisits() {
  const { data } = await supabase
    .from("visits")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10); // Show last 10 visitors

  return data || [];
}

export async function submitTestimonial(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const message = formData.get("message") as string;
  const email = formData.get("email") as string;
  const linkedin = formData.get("linkedin") as string;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email address. Please include a domain like .com" };
  }

  // 1. Server-Side Validation for LinkedIn
  if (linkedin && linkedin.trim() !== "") {
    // Strict Regex: Must start with https:// and contain linkedin.com
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
    if (!linkedinRegex.test(linkedin)) {
      return { success: false, message: "Invalid LinkedIn URL. It must start with https://linkedin.com" };
    }
  }

  // 2. Save to Supabase
  const { error } = await supabase
    .from("testimonials")
    .insert([{ 
      name, 
      role, 
      message, 
      email, 
      linkedin: linkedin || null, // Save null if empty
      approved: false 
    }]);

  if (error) {
    console.error("Supabase Error:", error);
    return { success: false, message: "Database error. Please try again." };
  }

  // 3. Send Email to USER (Confirmation)
  try {
      await resend.emails.send({
        from: 'Krishna Portfolio <no-reply@krishnaadhikari.com>',
        to: email,
        subject: "Thanks for your recommendation!",
        // 👇 Pass the 'message' variable here
        react: WelcomeEmail({ 
          name: name, 
          message: message 
        }) 
      });

    // 4. Send Email to ADMIN (You)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "🔔 New Testimonial Submitted",
      html: `
        <h2>New Recommendation from ${name}</h2>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>LinkedIn:</strong> ${linkedin || "Not provided"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
        <br />
        <p><a href="https://supabase.com/dashboard">👉 Go to Supabase to Approve</a></p>
      `,
    });

  } catch (emailError) {
    console.error("Email Error:", emailError);
    // Continue even if email fails, because DB save was successful
  }

  return { success: true, message: "Recommendation sent successfully!" };
}