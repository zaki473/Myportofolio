import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <Desktop>
      <div className="ml-20 p-4">
        <Window
          title="Contact Me — Zaki"
          icon="✉️"
          className="max-w-lg"
          defaultPos={{ x: 120, y: 30 }}
          statusLeft="Send me a message!"
          statusRight="jakiathallah@gmail.com"
        >
          <div className="p-5">
            <ContactForm />
          </div>
        </Window>
      </div>
    </Desktop>
  );
}