"use client";
import { motion } from "framer-motion";
import { MonitorPlay, Layers, Cpu } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
};

export default function Projects() {
  const projects = [
    { title: "E-Commerce Experience", desc: "A robust 3D interactive storefront built with Next.js & Three.js.", icon: <MonitorPlay className="text-[#10B981] w-8 h-8 mb-4"/> },
    { title: "Financial Dashboard", desc: "Real-time aesthetic data visualization using custom webgl shaders.", icon: <Layers className="text-[#10B981] w-8 h-8 mb-4"/> },
    { title: "AI Generation Tool", desc: "Seamless interface for creating generative AI art with ReactBits.", icon: <Cpu className="text-[#10B981] w-8 h-8 mb-4"/> },
  ];

  return (
    <section id="projects" className="py-24 px-6 lg:px-20 max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Work</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#10B981] to-transparent rounded"></div>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div key={i} variants={fadeInUp} className="h-full">
              <GlowCard>
                {proj.icon}
                <h3 className="text-2xl font-bold mb-2">{proj.title}</h3>
                <p className="text-gray-400 font-light flex-grow">{proj.desc}</p>
                <div className="mt-6 flex items-center text-sm font-semibold text-[#10B981] group cursor-pointer w-fit">
                  View Project <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
