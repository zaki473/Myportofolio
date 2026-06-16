"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";

const ICONS = [
  { label: "My Computer", icon: "🖥️", href: "/" },
  { label: "About Me",    icon: "👤", href: "/about" },
  { label: "Projects",    icon: "📁", href: "/projects" },
  { label: "Skills",      icon: "⚙️", href: "/skills" },
  { label: "Experience",  icon: "🏆", href: "/experience" },
  { label: "Organisasi",  icon: "🏛️", href: "/organization" },
  { label: "Contact Me",  icon: "✉️", href: "/contact" },
  { label: "Recycle Bin", icon: "🗑️", href: "#" },
];

interface DesktopProps {
  children: React.ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
  const [showStart, setShowStart] = useState(false);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => setShowStart(false)}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {ICONS.map((icon) => (
          <Link key={icon.label} href={icon.href}>
            <div className="desktop-icon">
              <span className="text-4xl">{icon.icon}</span>
              <span className="desktop-icon-label">{icon.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Page Content — windows rendered here */}
      <div className="absolute inset-0 overflow-hidden pb-[30px]">
        {children}
      </div>

      {/* Start Menu */}
      {showStart && (
        <div onClick={(e) => e.stopPropagation()}>
          <StartMenu onClose={() => setShowStart(false)} />
        </div>
      )}

      {/* Taskbar */}
      <Taskbar onStart={() => setShowStart((v) => !v)} />
    </div>
  );
}