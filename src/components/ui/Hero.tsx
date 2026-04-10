"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const SplitText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const letters = text.split("");

  return (
    <div className={`inline-block overflow-hidden ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.03,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-col justify-center min-h-[80vh] px-6 lg:px-20 pointer-events-none">
      <div className="max-w-4xl pointer-events-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#FAFAFA] mb-6">
          <SplitText text="Hi, I'm " />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#064e3b]">
            <SplitText text="Zaki" delay={0.2} />
          </span>
          <br className="hidden md:block" />
          <SplitText text="Creative Developer" delay={0.5} />
        </h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Building aesthetic, highly interactive, and immersive web experiences.
          Specializing in React, Next.js, and Three.js 3D environments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex gap-4"
        >
          <a href="#projects" className="group flex items-center gap-2 px-6 py-3 bg-[#10B981] text-[#050505] rounded-full font-medium transition-all hover:scale-105 hover:bg-[#0ea5e9]">
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="flex items-center px-6 py-3 border border-[#10B981]/30 rounded-full text-[#FAFAFA] font-medium transition-all hover:bg-[#10B981]/10">
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
