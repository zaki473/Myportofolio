"use client";

import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import Link from "next/link";
import { useState, useEffect } from "react";
import BootScreen from "@/components/BootScreen";

// Silakan ganti URL di bawah ini dengan URL foto ImageKit Anda
const PROFILE_IMAGE = "https://ik.imagekit.io/p27ub3udc/WhatsApp%20Image%202026-06-16%20at%2014.47.23.jpeg";

export default function Home() {
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isBooted = sessionStorage.getItem("zaki-booted");
      if (isBooted) {
        setShowBoot(false);
      }
    }
  }, []);

  const handleBootFinish = () => {
    setShowBoot(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("zaki-booted", "true");
    }
  };

  if (showBoot) {
    return <BootScreen onFinish={handleBootFinish} />;
  }

  return (
    <Desktop>
      {/* ── Welcome Window ─────────────────────────────── */}
      <Window
        title="Welcome.exe"
        icon="🖥️"
        className="w-[520px]"
        defaultPos={{ x: 100, y: 20 }}
        statusLeft="Status: Ready"
        statusRight="Welcome to my portfolio!"
        menuItems={["File", "Edit", "View", "Favorites", "Help"]}
      >
        <div className="flex h-[300px]">
          {/* Left Content */}
          <div className="p-5 flex-1">
            <h1
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 20,
                color: "#0058A8",
                lineHeight: 1.4,
                marginBottom: 8,
              }}
            >
              HELLO!
              <br />
              I&apos;M ZAKI
            </h1>
            <p className="text-[#1F1F1F] text-[12px] mt-3 font-[Tahoma,sans-serif]">
              Web Developer | Mobile Developer
              <br />
              IoT Enthusiast
            </p>
            <p className="text-[#555] text-[11px] mt-3 font-[Tahoma,sans-serif] leading-relaxed">
              Saya mahasiswa Teknologi Informasi yang suka membangun
              aplikasi web, aplikasi mobile, dan proyek IoT yang
              bermanfaat bagi banyak orang.
            </p>
            <div className="flex gap-2 mt-5">
              <Link href="/projects">
                <button className="xp-btn">
                  <span>📁</span> View Projects
                </button>
              </Link>
              <Link href="/about">
                <button className="xp-btn">
                  <span>👤</span> About Me
                </button>
              </Link>
            </div>
          </div>
          {/* Right: Bliss wallpaper / Profile Image */}
          <div
            className="w-[200px] h-full flex-shrink-0 border-l border-gray-300 bg-gray-200 overflow-hidden relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROFILE_IMAGE}
              alt="Zaki Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.backgroundImage = "url('/assets/images/bg.jpg')";
                  parent.style.backgroundSize = "cover";
                  parent.style.backgroundPosition = "center";
                }
              }}
            />
          </div>
        </div>
      </Window>

      {/* ── About Me Window ────────────────────────────── */}
      <Window
        title="About Me"
        icon="👤"
        className="w-[260px]"
        defaultPos={{ x: 640, y: 20 }}
        menuItems={["File", "Edit", "View", "Help"]}
      >
        <div className="xp-about-card p-3">
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-16 h-16 border-2 border-gray-500 flex items-center justify-center flex-shrink-0 bg-[#d4e8ff] overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROFILE_IMAGE}
                alt="Zaki Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = "<span class='text-4xl'>👦</span>";
                    parent.className += " flex items-center justify-center";
                  }
                }}
              />
            </div>
            <div>
              <div className="text-[#0058A8] text-[16px] font-bold font-[Tahoma,sans-serif]">
                Zaki
              </div>
              <div className="text-[11px] font-[Tahoma,sans-serif] text-gray-700">
                Information Technology Student
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[3px]">
            {[
              { icon: "🎓", text: "Mahasiswa Teknologi Informasi Universitas Brawijaya" },
              { icon: "📍", text: "Indonesia Kota Malang" },
              { icon: "✉️", text: "jakiathallah@gmail.com" },
              { icon: "📅", text: "Always Learning Something New" },
            ].map((r) => (
              <div key={r.text} className="xp-info-row">
                <span>{r.icon}</span>
                <span>{r.text}</span>
              </div>
            ))}
          </div>

          <Link href="/about">
            <button className="xp-btn mt-3 w-full justify-center">
              Open Profile &gt;&gt;
            </button>
          </Link>
        </div>
      </Window>

      {/* ── Skills Window ──────────────────────────────── */}
      <Window
        title="Skills.exe"
        icon="⚙️"
        className="w-[300px]"
        defaultPos={{ x: 640, y: 290 }}
        menuItems={["File", "Edit", "View", "Help"]}
        statusLeft="Keep learning, keep growing!"
      >
        <div className="p-3">
          {[
            { "name": "HTML / CSS / JS", "level": 90, "icon": "🌐", "category": "frontend" },
            { "name": "Next.js / React", "level": 80, "icon": "⚛️", "category": "frontend" },
            { "name": "Laravel / PHP", "level": 85, "icon": "🧡", "category": "backend" },
            { "name": "Firebase / Supabase", "level": 75, "icon": "🔥", "category": "backend" },
            { "name": "Python", "level": 70, "icon": "🐍", "category": "language" },
            { "name": "Flutter / Dart", "level": 80, "icon": "💙", "category": "language" },
            { "name": "MySQL / PostgreSQL", "level": 85, "icon": "🗄️", "category": "database" },
            { "name": "IoT / ESP32", "level": 80, "icon": "🔌", "category": "iot" },
            { "name": "Git / GitHub", "level": 90, "icon": "🐙", "category": "tools" },
            { "name": "Figma / UI-UX", "level": 75, "icon": "🎨", "category": "tools" },
            { "name": "Docker / XAMPP", "level": 70, "icon": "🐳", "category": "tools" }
          ].map((s) => (
            <div key={s.name} className="flex items-center gap-2 py-[3px]">
              <span className="w-4 text-center text-sm">{s.icon}</span>
              <span className="w-[120px] text-[11px] font-[Tahoma,sans-serif] truncate">
                {s.name}
              </span>
              <div className="xp-progress-track flex-1">
                <div
                  className="xp-progress-fill"
                  style={{ width: `${s.level}%` }}
                />
              </div>
              <span className="w-8 text-[11px] text-right font-[Tahoma,sans-serif]">
                {s.level}%
              </span>
            </div>
          ))}
        </div>
      </Window>

      {/* ── Projects Window ────────────────────────────── */}
      <Window
        title="Projects.exe"
        icon="📁"
        className="w-[520px]"
        defaultPos={{ x: 100, y: 340 }}
        statusLeft="Total Projects: 10+"
        statusRight="Double click a project to see more details."
        menuItems={["File", "Edit", "View", "Help"]}
      >
        <div className="p-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              {
                icon: "🏛️",
                title: "Website BEM Vokasi 2025",
                desc: "Mengelola konten, request kemenbiro secara dinamis.",
                href: "/projects/web",
              },
              {
                icon: "🕒",
                title: "Absensi Multi Admin",
                desc: "Aplikasi absensi mobile berbasis Flutter dengan multi-admin.",
                href: "/projects/mobile",
              },
              {
                icon: "🌱",
                title: "SmartOryza IoT",
                desc: "Sistem monitoring pertanian berbasis ESP32 & Firebase.",
                href: "/projects/iot",
              },
              {
                icon: "♻️",
                title: "Agrocircular Platform",
                desc: "Platform pengelolaan limbah pertanian, barter & jual.",
                href: "/projects/web",
              },
            ].map((p) => (
              <Link key={p.title} href={p.href}>
                <div className="xp-project-card h-full flex flex-col">
                  <div className="text-4xl mb-2 text-center">{p.icon}</div>
                  <div className="font-bold text-[11px] font-[Tahoma,sans-serif] text-center mb-1">
                    {p.title}
                  </div>
                  <div className="text-[10px] font-[Tahoma,sans-serif] text-gray-600 text-center mb-2 leading-tight flex-1">
                    {p.desc}
                  </div>
                  <button className="xp-btn w-full justify-center text-[10px] mt-auto">
                    Open
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Window>
    </Desktop>
  );
}