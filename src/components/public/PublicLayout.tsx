"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PublicLayoutProps {
  children: ReactNode;
  onLoginClick?: () => void;
}

export function PublicLayout({ children, onLoginClick }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header onLoginClick={onLoginClick} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
