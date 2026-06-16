import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import experience from "@/data/experience.json";

export default function experiencePage() {
  return (
    <Desktop>
      <div className="ml-20 p-4">
        <Window
          title="Experience"
          icon="🏆"
          className="max-w-2xl"
          defaultPos={{ x: 120, y: 30 }}
          statusLeft={`${experience.length} Experiences`}
          statusRight="Always learning, always growing!"
        >
          <div className="p-4 grid grid-cols-2 gap-3">
            {experience.map((exp) => (
              <div key={exp.id} className="xp-inset flex gap-3 items-start">
                <span className="text-4xl">{exp.icon}</span>
                <div>
                  <div className="font-bold text-[12px] font-[Tahoma,sans-serif] text-[#0058A8] mb-1">
                    {exp.title}
                  </div>
                  <div className="text-[11px] font-[Tahoma,sans-serif] text-gray-600 mb-1 leading-tight">
                    {exp.description}
                  </div>
                  <div className="flex gap-2 text-[10px] text-gray-500 font-[Tahoma,sans-serif] flex-wrap">
                    <span>📅 {exp.year}</span>
                    <span>🏛️ {exp.issuer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Window>
      </div>
    </Desktop>
  );
}