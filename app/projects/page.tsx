import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import Link from "next/link";
import projects from "@/data/projects.json";

const CATEGORIES = [
  { label: "All Projects", href: "/projects",              icon: "📁" },
  { label: "Web",          href: "/projects/web",          icon: "🌐" },
  { label: "Mobile",       href: "/projects/mobile",       icon: "📱" },
  { label: "IoT",          href: "/projects/iot",          icon: "🔌" },
  { label: "AI & Data",    href: "/projects/ai",           icon: "🤖" },
];

export default function ProjectsPage() {
  return (
    <Desktop>
      <div className="ml-20 p-4">
        <Window
          title="Projects.exe"
          icon="📁"
          className="max-w-3xl"
          defaultPos={{ x: 100, y: 20 }}
          statusLeft={`Total Projects: ${projects.length}+`}
          statusRight="Double click a project to see more details."
        >
          {/* Category Nav */}
          <div className="flex gap-1 p-2 border-b border-gray-300 bg-[#f4f1e8] flex-wrap">
            {CATEGORIES.map((c) => (
              <Link key={c.href} href={c.href}>
                <button className="xp-btn text-[11px]">
                  <span>{c.icon}</span> {c.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="p-4 grid grid-cols-3 gap-3">
            {projects.map((p) => (
              <div key={p.id} className="xp-project-card flex flex-col">
                <div className="text-5xl mb-3 text-center">{p.icon}</div>
                <div className="font-bold text-[12px] font-[Tahoma,sans-serif] mb-1">
                  {p.title}
                </div>
                <div className="text-[11px] font-[Tahoma,sans-serif] text-gray-600 mb-2 flex-1 leading-tight">
                  {p.description}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="bg-[#ECE9D8] border border-gray-400 text-[9px] px-1 py-[1px] font-[Tahoma,sans-serif]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a href={p.github} target="_blank" rel="noreferrer">
                  <button className="xp-btn w-full justify-center text-[10px]">
                    📂 GitHub
                  </button>
                </a>
              </div>
            ))}
          </div>
        </Window>
      </div>
    </Desktop>
  );
}