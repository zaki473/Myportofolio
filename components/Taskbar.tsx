"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TASKS = [
  { label: "Welcome.exe",    href: "/",             icon: "🖥️" },
  { label: "Projects.exe",   href: "/projects",     icon: "📁" },
  { label: "About Me",       href: "/about",        icon: "👤" },
  { label: "Skills.exe",     href: "/skills",       icon: "⚙️" },
  { label: "Experience",     href: "/experience",   icon: "🏆" },
  { label: "Organisasi.exe", href: "/organization", icon: "🏛️" },
  { label: "Contact Me",     href: "/contact",      icon: "✉️" },
];

export default function Taskbar({ onStart }: { onStart: () => void }) {
  const [time, setTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      );
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="xp-taskbar">
      {/* Start Button */}
      <button className="xp-start-btn" onClick={onStart}>
        <span className="text-lg">🪟</span>
        start
      </button>

      {/* Divider */}
      <div className="w-[2px] h-full bg-[#1a4faa] mx-1" />

      {/* Tasks */}
      <div className="flex items-center flex-wrap overflow-hidden gap-1 px-1">
        {TASKS.map((t) => (
          <Link key={t.href} href={t.href}>
            <div
              className={`taskbar-task ${pathname === t.href ? "active" : ""}`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* System Tray */}
      <div className="xp-systray">
        <span>🔊</span>
        <span>🌐</span>
        <span className="ml-1 font-[Tahoma,sans-serif] text-[11px]">{time}</span>
      </div>
    </div>
  );
}