import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import projects from "@/data/projects.json";
import Link from "next/link";

export default function AIProjectsPage() {
  const filtered = projects.filter((p) => p.category === "ai");
  return (
    <Desktop>
      <div className="ml-20 p-4">
        <Window
          title="Projects / AI & Data"
          icon="🤖"
          className="max-w-2xl"
          defaultPos={{ x: 100, y: 30 }}
          statusLeft={`${filtered.length} AI & Data Projects`}
        >
          <div className="p-2 border-b border-gray-300 bg-[#f4f1e8]">
            <Link href="/projects">
              <button className="xp-btn text-[11px]">← Back to All Projects</button>
            </Link>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {filtered.map((p) => (
              <div key={p.id} className="xp-project-card flex flex-col">
                <div className="text-4xl mb-2 text-center">{p.icon}</div>
                <div className="font-bold text-[12px] font-[Tahoma,sans-serif] mb-1">
                  {p.title}
                </div>
                <div className="text-[11px] text-gray-600 mb-2 flex-1 leading-tight">
                  {p.description}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.tech.map((t) => (
                    <span key={t} className="bg-[#ECE9D8] border border-gray-400 text-[9px] px-1">
                      {t}
                    </span>
                  ))}
                </div>
                <a href={p.github} target="_blank" rel="noreferrer">
                  <button className="xp-btn w-full justify-center text-[10px]">
                    📂 Open
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
