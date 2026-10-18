import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextGen Build-a-thon 2026",
  description: "Chapter 02 - A 24-hour National-Level Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#02050A] overflow-x-hidden text-rendering-optimizeLegibility antialiased selection:bg-orange-500/30 selection:text-orange-200`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
