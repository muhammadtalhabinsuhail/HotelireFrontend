"use client";

import { PropertyProvider } from "./PropertyContext";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function AddPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PropertyProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <Navigation />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </div>
    </PropertyProvider>
  );
}
