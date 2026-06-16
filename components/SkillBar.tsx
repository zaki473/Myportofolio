"use client";

import { useEffect, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  icon: string;
}

export default function SkillBar({ name, level, icon }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(level), 300);
    return () => clearTimeout(t);
  }, [level]);

  return (
    <div className="flex items-center gap-3 py-[3px]">
      <span className="text-base w-5 text-center">{icon}</span>
      <span
        className="w-[130px] font-[Tahoma,sans-serif] text-[11px] text-[#1F1F1F] truncate"
      >
        {name}
      </span>
      <div className="xp-progress-track flex-1">
        <div
          className="xp-progress-fill"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-8 text-right font-[Tahoma,sans-serif] text-[11px] text-[#1F1F1F]">
        {level}%
      </span>
    </div>
  );
}