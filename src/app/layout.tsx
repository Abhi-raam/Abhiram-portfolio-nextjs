import React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhiram Suresh | Software Engineer & Frontend Developer Portfolio",
  description:
    "Professional portfolio of Abhiram Suresh, a Software Engineer and Frontend Developer specializing in React.js, Next.js, TypeScript, Tailwind CSS, and Progressive Web Apps (PWAs). Explore featured projects, career experience, and technical achievements.",
  keywords: [
    "Abhiram Suresh",
    "Software Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "PWA",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Abhiram Suresh" }],
  creator: "Abhiram Suresh",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhiramsuresh.dev",
    title: "Abhiram Suresh | Software Engineer & Frontend Developer",
    description:
      "Professional portfolio of Abhiram Suresh, a Software Engineer and Frontend Developer specializing in React.js, Next.js, TypeScript, Tailwind CSS, and Progressive Web Apps (PWAs).",
    siteName: "Abhiram Suresh Portfolio",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/20">{children}</body>
    </html>
  );
}
