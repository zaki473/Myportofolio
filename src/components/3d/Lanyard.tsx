"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Line } from "@react-three/drei";

export default function Lanyard() {
  const badgeRef = useRef<THREE.Mesh>(null);
  const lanyardRef = useRef<any>(null);
  
  // Track mouse coordinates directly in a mutable ref to avoid React state re-renders matching 60FPS
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Pre-allocate memory so we don't GC spike in 60FPS render loop
  const points = useMemo(() => Array(20).fill(0).map(() => new THREE.Vector3()), []);
  const anchor = useMemo(() => new THREE.Vector3(3.5, 5, 0), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const clipPos = useMemo(() => new THREE.Vector3(), []);
  const control = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!badgeRef.current) return;

    const time = state.clock.getElapsedTime();
    
    targetPos.set(
      3 + mouse.current.x * 1.5,
      -1 + mouse.current.y * 1.5 + Math.sin(time * 2) * 0.1,
      Math.sin(time) * 0.2
    );

    badgeRef.current.position.lerp(targetPos, 0.02);
    
    const targetRotY = mouse.current.x * 0.6 + Math.sin(time * 1.5) * 0.1;
    const targetRotZ = mouse.current.x * -0.3 + Math.cos(time * 1.2) * 0.05;
    
    badgeRef.current.rotation.y = THREE.MathUtils.lerp(badgeRef.current.rotation.y, targetRotY, 0.03);
    badgeRef.current.rotation.z = THREE.MathUtils.lerp(badgeRef.current.rotation.z, targetRotZ, 0.03);

    const badgePos = badgeRef.current.position;
    clipPos.set(badgePos.x, badgePos.y + 1.1, badgePos.z); 

    control.set(
      (anchor.x + clipPos.x) / 2 - 0.5, 
      (anchor.y + clipPos.y) / 2, 
      (anchor.z + clipPos.z) / 2 + Math.sin(time) * 0.5
    );

    for (let i = 0; i < points.length; i++) {
        const t = i / (points.length - 1);
        points[i].x = Math.pow(1-t, 2)*anchor.x + 2*(1-t)*t*control.x + Math.pow(t, 2)*clipPos.x;
        points[i].y = Math.pow(1-t, 2)*anchor.y + 2*(1-t)*t*control.y + Math.pow(t, 2)*clipPos.y;
        points[i].z = Math.pow(1-t, 2)*anchor.z + 2*(1-t)*t*control.z + Math.pow(t, 2)*clipPos.z;
    }
    
    if (lanyardRef.current && lanyardRef.current.geometry) {
        const positions = points.flatMap(p => [p.x, p.y, p.z]);
        lanyardRef.current.geometry.setPositions(positions);
    }
  });

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} color="#10B981" />
      <spotLight position={[5, 5, 5]} angle={0.2} penumbra={1} intensity={2} color="#10B981" />
      
      <Line ref={lanyardRef} points={points} color="#10B981" lineWidth={4} />
      
      <mesh ref={badgeRef} position={[3, -1, 0]}>
        <boxGeometry args={[1.8, 2.6, 0.05]} />
        <meshPhysicalMaterial color="#050505" metalness={0.9} roughness={0.1} clearcoat={1} envMapIntensity={2} />
        
        <mesh position={[0, 0, 0.031]}>
          <planeGeometry args={[1.6, 2.4]} />
          <meshPhysicalMaterial color="#064e3b" emissive="#10B981" emissiveIntensity={0.2} transparent opacity={0.8} />
        </mesh>
        
        <mesh position={[0, 1.1, 0]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
            <meshBasicMaterial color="#050505" />
        </mesh>
      </mesh>
    </>
  );
}
