import React from "react";
import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/lib/lenis";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhiram — Software Developer & Frontend Engineer",
  description:
    "Portfolio of Abhiram Suresh — Frontend Developer building responsive, user-centric web applications and scalable digital experiences using React.js, Next.js, and TypeScript.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Abhiram. — Software Developer",
    description:
      "Frontend Developer with 2+ years of experience building responsive, user-centric web applications using React.js, Next.js, and TypeScript.",
    type: "website",
    url: "https://abhi-raam.github.io/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
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
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
    >
      <body className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-['Archivo',sans-serif] uppercase antialiased font-normal overflow-x-hidden">
        <ReactLenis root options={{ lerp: 0.15, duration: 0.7, smoothWheel: true, wheelMultiplier: 1.15 }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
