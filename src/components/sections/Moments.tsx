"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

function ParallaxMoment({ scrollY, title, subtitle, className, yRange, colorRange, delay = 0 }: {
  scrollY: MotionValue<number>;
  title: string;
  subtitle: string;
  className: string;
  yRange: number[];
  colorRange: string;
  delay?: number;
}) {
  const y = useTransform(scrollY, [0, 4000], yRange);
  return (
    <motion.div 
      style={{ y }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={`absolute rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl flex flex-col justify-end p-6 hover:scale-[1.02] transition-transform ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorRange} opacity-60 backdrop-blur-sm pointer-events-none`}></div>
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-white">{title}</h3>
        <p className="text-sm md:text-base text-gray-200 font-medium">{subtitle}</p>
      </div>
    </motion.div>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
};

export default function Moments({ scrollY }: { scrollY: MotionValue<number> }) {
  return (
    <section id="moments" className="py-32 px-6 lg:px-20 max-w-7xl mx-auto text-center relative z-10 min-h-[140vh] flex flex-col items-center overflow-visible">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="mb-24"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">Moments & Milestones</motion.h2>
        <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">A parallax journey through my key achievements, certifications, and unforgettable professional memories.</motion.p>
      </motion.div>

      <div className="relative w-full h-[80vh] flex justify-center items-center max-w-6xl">
        <ParallaxMoment 
          scrollY={scrollY} title="AWS Certified" subtitle="Solutions Architect Associate 2024"
          yRange={[200, -200]} colorRange="from-[#10B981] to-[#0b2e3f]"
          className="left-0 md:left-[5%] top-[10%] w-[250px] md:w-[350px] h-[400px] skew-y-3"
          delay={0.1}
        />
        <ParallaxMoment 
          scrollY={scrollY} title="Hackathon Winner" subtitle="Global Web3 Innovation Summit"
          yRange={[400, -400]} colorRange="from-[#0ea5e9] to-[#050505]"
          className="right-0 md:right-[5%] top-[20%] w-[280px] md:w-[400px] h-[300px] -skew-y-3 z-10"
          delay={0.3}
        />
        <ParallaxMoment 
          scrollY={scrollY} title="Best Developer Award" subtitle="Awarded for outstanding system architecture and UI aesthetics."
          yRange={[-50, 150]} colorRange="from-[#050505] to-[#10B981]"
          className="z-20 w-[300px] md:w-[500px] h-[350px] shadow-[0_20px_50px_rgba(16,185,129,0.2)]"
          delay={0.5}
        />
      </div>
    </section>
  );
}
