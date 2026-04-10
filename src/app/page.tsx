"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/ui/Hero";
import Background3D from "@/components/3d/Background3D";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Moments from "@/components/sections/Moments";

export default function Home() {
  const { scrollY } = useScroll();

  const parallaxY = useTransform(scrollY, [0, 1000], [0, 400]);
  const parallaxOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const bgParallaxY = useTransform(scrollY, [0, 2000], [0, -600]);

  return (
    <main className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#10B981] selection:text-black">

      {/* Top Section with 3D Background */}
      <section className="relative min-h-screen w-full flex flex-col">
        <Background3D parallaxY={parallaxY} parallaxOpacity={parallaxOpacity} />

        <div className="relative z-10 flex-grow flex flex-col pointer-events-none">
          <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-6 flex justify-between items-center bg-gradient-to-b from-[#050505] to-transparent pointer-events-auto"
          >
            <span className="text-xl font-bold tracking-widest text-[#10B981]">MUHAMMAD ZAKI ATHALLAH</span>
            <nav className="flex gap-6 text-sm uppercase tracking-wide">
              <a href="#projects" className="hover:text-[#10B981] transition-colors">Work</a>
              <a href="#moments" className="hover:text-[#10B981] transition-colors">Moments</a>
            </nav>
          </motion.header>

          <div className="flex-grow flex items-center pointer-events-none">
            <Hero />
          </div>
        </div>
      </section>

      {/* Rest of the Content */}
      <div className="relative z-10 bg-[#050505]">
        {/* Parallax Background Glow */}
        <motion.div
          style={{ y: bgParallaxY }}
          className="absolute top-40 left-0 w-full h-[150vh] flex justify-center pointer-events-none overflow-hidden opacity-30"
        >
          <div className="w-[800px] h-[800px] bg-[#10B981] rounded-full blur-[150px] mix-blend-screen opacity-10"></div>
          <div className="w-[600px] h-[600px] bg-[#0ea5e9] rounded-full blur-[150px] mix-blend-screen opacity-10 translate-x-[-20%] translate-y-[50%]"></div>
        </motion.div>

        <Projects />
        <TechStack />
        <Moments scrollY={scrollY} />

        <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10">
          <p>© {new Date().getFullYear()} Muhammad Zaki Athallah. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
