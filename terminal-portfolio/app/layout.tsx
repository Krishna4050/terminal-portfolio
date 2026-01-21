//import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Krishna Adhikari",
  description: "Backend Developer (Go) | Solution Architect | Network & System Administration",
  keywords: ["Krishna Adhikari", "Solution Architect", "Backend Developer", "Network Engineer", "Golang Developer", "Nepal", "Finland"],
  authors: [{ name: "Krishna Adhikari" }],
  creator: "Krishna Adhikari",
  openGraph: {
    title: "Krishna Adhikari | Backend Developer (Go) | Solution Architect | Network & System Administration",
    description: "Explore the professional journey and projects of Krishna Adhikari.",
    url: "https://krishnaadhikari.com", // <--- REPLACE with your actual Vercel link
    siteName: "Krishna Adhikari",
    images: [
      {
        url: "/me.jpg", // Uses your avatar as the preview image
        width: 800,
        height: 600,
        alt: "Krishna Adhikari",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}

        {/* 2. ADD COMPONENT HERE */}
        <Analytics />
      </body>
    </html>
  );
}
