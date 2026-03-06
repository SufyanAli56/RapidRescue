"use client"; // This tells Next.js this is a Client Component for dynamic content

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./globals.css"

// Footer component moved to client to fix hydration error for dynamic year
function Footer() {
  const [year, setYear] = useState<number | null>(null);

  // Set the year on the client after hydration
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Avoid rendering on server until year is set
  if (!year) return null;

  return (
    <footer className="bg-gray-200 text-center p-2 mt-4">
      &copy; {year} RapidRescue
    </footer>
  );
}

// RootLayout component wraps all pages
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Body can have static classes, dynamic props like dir should use client logic */}
      <body className="bg-gray-100 min-h-screen transition-colors duration-300">
        {/* Header */}
        <header className="bg-red-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🚨 RapidRescue</h1>
          <nav className="space-x-4">
            <Link href="/emergency" className="hover:underline">
              Emergency
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/map" className="hover:underline">
              Map
            </Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="p-4">{children}</main>

        {/* Footer is client-only to avoid hydration mismatch */}
        <Footer />
      </body>
    </html>
  );
}