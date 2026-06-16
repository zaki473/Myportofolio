"use client";

import Link from "next/link";

const ITEMS = [
  { label: "Welcome",      icon: "🖥️", href: "/" },
  { label: "Projects",     icon: "📁", href: "/projects" },
  { label: "About Me",     icon: "👤", href: "/about" },
  { label: "Skills",       icon: "⚙️", href: "/skills" },
  { label: "Experience",   icon: "🏆", href: "/experience" },
  { label: "Organisasi",   icon: "🏛️", href: "/organization" },
  { label: "Contact",      icon: "✉️", href: "/contact" },
];

export default function StartMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="xp-start-menu">
      {/* Header */}
      <div className="xp-start-menu-header">
        <div
          className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl border-2 border-white"
          style={{ imageRendering: "pixelated" }}
        >
          👦
        </div>
        <div>
          <div className="text-white font-bold text-sm font-[Tahoma,sans-serif]">Zaki</div>
          <div className="text-blue-200 text-[11px] font-[Tahoma,sans-serif]">
            Informatics Engineering
          </div>
        </div>
      </div>

      {/* Left Panel */}
      <div className="flex">
        <div className="flex-1 border-r border-gray-300">
          {ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <div className="xp-start-menu-item">
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Panel */}
        <div
          className="w-[110px] flex flex-col gap-1 p-2"
          style={{
            background:
              "linear-gradient(180deg, #b8d4ff 0%, #e8eeff 100%)",
          }}
        >
          <div className="text-[11px] font-bold font-[Tahoma,sans-serif] text-blue-900 px-1 border-b border-blue-300 pb-1 mb-1">
            Quick Access
          </div>
          {["GitHub", "LinkedIn", "Resume"].map((s) => (
            <span
              key={s}
              className="xp-start-menu-item text-blue-800 text-[11px] py-1 px-1 hover:bg-blue-200 cursor-pointer rounded"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex justify-between px-3 py-2 border-t border-gray-300"
        style={{ background: "#d4e3ff" }}
      >
        <button className="xp-btn text-[11px] gap-1">
          <span>🔒</span> Log Off
        </button>
        <button className="xp-btn text-[11px] gap-1">
          <span>⏻</span> Shut Down
        </button>
      </div>
    </div>
  );
}