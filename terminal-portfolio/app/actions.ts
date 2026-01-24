"use server";

import { supabase } from "@/utils/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM_EMAIL = "send@krishnaadhikari.com"; 

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
      from: FROM_EMAIL,
      to: email, // Send to the user's provided email
      subject: "Thanks for your recommendation!",
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi ${name},</h2>
          <p>Thank you so much for taking the time to write a recommendation for my portfolio.</p>
          <p>I have received your message:</p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #4ade80;">
            "${message}"
          </blockquote>
          <p>Once I review and approve it, it will appear live on my terminal interface.</p>
          <p>Best regards,<br/>Krishna Adhikari</p>
        </div>
      `,
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