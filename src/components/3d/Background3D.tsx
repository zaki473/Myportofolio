"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Lanyard from "./Lanyard";
import { motion, MotionValue } from "framer-motion";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        arr[i] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#10B981" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Background3D({ parallaxY, parallaxOpacity }: { parallaxY: MotionValue<any>, parallaxOpacity: MotionValue<any> }) {
    return (
        <motion.div style={{ opacity: parallaxOpacity, y: parallaxY }} className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <Particles />
              <Lanyard />
            </Suspense>
          </Canvas>
        </motion.div>
    );
}
