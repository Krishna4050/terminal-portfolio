"use server";

import { cookies } from "next/headers";
import { compare } from "bcryptjs";

// Update to accept both username and password
export async function verifySudoCredentials(username: string, password: string) {
  
  const correctUsername = process.env.ADMIN_USERNAME;
  const storedHash = process.env.ADMIN_HASH_SECURE;

   // 👇 ADD THIS TEMPORARY DEBUGGING BLOCK
  
   //keepign if needed only
  
  // 👆 REMOVE THIS AFTER FIXING

  // 1. Check Username (Plain text check is fine for username)
  if (username !== correctUsername) {
    return { success: false };
  }

  // 2. Check Password (SECURE HASH COMPARISON)
  // compare() takes the plain input and checks it against the hash
  const isPasswordCorrect = await compare(password, storedHash || "");

  if (isPasswordCorrect) {
    // 3. Set the session cookie (Same as before)
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, 
      path: "/",
    });
    
    return { success: true };
  }

  return { success: false };
}

export async function logoutAdmin() {
  (await cookies()).delete("admin_session");
  return { success: true };
}

export async function checkAdminSession() {
  const session = (await cookies()).get("admin_session");
  return session?.value === "true";
}