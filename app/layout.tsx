import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "SparkLab — AI Project Idea Generator for Teen Builders",
  description:
    "An AI invention lab that turns teenage curiosities into tangible, buildable, school-ready science and engineering projects.",
  keywords: [
    "school project ideas",
    "science fair projects",
    "STEM projects for teens",
    "AI project mentor",
    "SparkLab",
  ],
  authors: [{ name: "SparkLab Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#07080c] text-white font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
