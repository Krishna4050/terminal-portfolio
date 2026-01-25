"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- 1. GET ALL TESTIMONIALS ---
export async function getTestimonials() {
  
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (session?.value !== "true") throw new Error("Unauthorized");

  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    return [];
  }
  return data;
}

// --- 2. UPDATE STATUS ---
export async function updateTestimonialStatus(id: number, action: "approve" | "feature" | "decline", adminName: string) {
  
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (session?.value !== "true") throw new Error("Unauthorized");

  if (action === "decline") {
    await supabaseAdmin.from("testimonials").delete().eq("id", id);
    await logAction(adminName, "DELETE", `Deleted testimonial #${id}`);
  } 
  else if (action === "approve") {
    await supabaseAdmin
      .from("testimonials")
      .update({ approved: true, featured: false })
      .eq("id", id);
    await logAction(adminName, "APPROVE", `Approved testimonial #${id}`);
  } 
  else if (action === "feature") {
    await supabaseAdmin
      .from("testimonials")
      .update({ approved: true, featured: true })
      .eq("id", id);
    await logAction(adminName, "FEATURE", `Featured testimonial #${id}`);
  }

  revalidatePath("/"); 
  return { success: true };
}

// --- 3. LOGGING ---
export async function logAction(user: string, action: string, details: string) {
  await supabaseAdmin.from("system_logs").insert([
    { admin_user: user, action, details }
  ]);
}

// --- 4. GET LOGS ---
export async function getSystemLogs() {
  
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (session?.value !== "true") return [];
  
  const { data } = await supabaseAdmin
    .from("system_logs")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(50);
  return data || [];
}

// --- 5. ADD TESTIMONIAL (Public) ---
export async function addTestimonial(name: string, role: string, message: string, email: string, linkedin: string) {
  if (!name || !message) return { success: false, error: "Missing fields" };

  const { error } = await supabaseAdmin.from("testimonials").insert([
    {
      name,
      role,
      message,
      email,
      linkedin,
      approved: false,
      featured: false
    }
  ]);

  if (error) return { success: false, error: error.message };
  return { success: true };
}