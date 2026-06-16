"use client";

import SkillBar from "./SkillBar";
import skills from "@/data/skills.json";

const CATEGORIES = ["frontend", "backend", "language", "database", "iot", "tools"];

export default function SkillsContent() {
  return (
    <div className="p-4">
      {CATEGORIES.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        if (!catSkills.length) return null;
        return (
          <div key={cat} className="mb-4">
            <div className="xp-inset mb-2">
              <h2 className="text-[#0058A8] font-bold text-[12px] font-[Tahoma,sans-serif] capitalize">
                📂 {cat}
              </h2>
            </div>
            <div className="flex flex-col gap-[2px] pl-2">
              {catSkills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} icon={s.icon} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}