"use client";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
};

export default function TechStack() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-[#050505]/80 backdrop-blur-md border-y border-white/5 relative z-10">
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer} className="max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Tech Stack</h2>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-4">
          {['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'React Three Fiber', 'Three.js', 'Framer Motion', 'Blender', 'WebGL'].map((skill, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium hover:border-[#10B981]/50 hover:bg-[#10B981]/10 hover:text-[#10B981] transition-colors cursor-default flex items-center gap-2 shadow-lg"
            >
              <Code2 className="w-4 h-4" /> {skill}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
