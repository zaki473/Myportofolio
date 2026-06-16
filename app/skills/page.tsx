import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import SkillsContent from "@/components/SkillsContent";
import skills from "@/data/skills.json";

export default function SkillsPage() {
  return (
    <Desktop>
      <div className="ml-20 p-4">
        <Window
          title="Skills.exe"
          icon="⚙️"
          className="max-w-xl"
          defaultPos={{ x: 120, y: 30 }}
          statusLeft="Keep learning, keep growing!"
          statusRight={`${skills.length} Skills`}
        >
          <SkillsContent />
        </Window>
      </div>
    </Desktop>
  );
}