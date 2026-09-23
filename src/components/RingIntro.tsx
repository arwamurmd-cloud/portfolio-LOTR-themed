import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";

const DURATION = 5000;

function TheRing({ start }: { start: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const ash = useRef<THREE.Points>(null);

  const { positions, dirs } = useMemo(() => {
    const n = 900;
    const positions = new Float32Array(n * 3);
    const dirs = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.55 + (Math.random() - 0.5) * 0.14;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = Math.sin(a) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      dirs[i * 3] = (Math.random() - 0.5) * 0.8;
      dirs[i * 3 + 1] = 0.5 + Math.random() * 1.2;
      dirs[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    return { positions, dirs };
  }, []);

  const base = useMemo(() => positions.slice(), [positions]);

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = (performance.now() - start) / DURATION; // 0..1

    // camera orbit
    const ang = 0.6 + t * 2.4;
    const rad = 6.4 - t * 2.1;
    camera.position.set(Math.sin(ang) * rad, 0.6 + Math.sin(t * 3) * 0.7, Math.cos(ang) * rad);
    camera.lookAt(0, 0, 0);

    if (ring.current) {
      ring.current.rotation.y += dt * 1.1;
      ring.current.rotation.x = Math.sin(t * 2) * 0.25;
      const mat = ring.current.material as THREE.MeshStandardMaterial;
      const fade = Math.max(0, 1 - Math.max(0, (t - 0.6) / 0.28));
      mat.opacity = fade;
      mat.emissiveIntensity = 0.4 + Math.max(0, t - 0.4) * 5;
      ring.current.visible = fade > 0.01;
    }

    if (ash.current) {
      const d = Math.max(0, (t - 0.6) / 0.4);
      const arr = ash.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i] = base[i] + dirs[i] * d * 3;
        arr[i + 1] = base[i + 1] + dirs[i + 1] * d * 3.4;
        arr[i + 2] = base[i + 2] + dirs[i + 2] * d * 3;
      }
      ash.current.geometry.attributes.position.needsUpdate = true;
      const m = ash.current.material as THREE.PointsMaterial;
      m.opacity = d <= 0 ? 0 : Math.max(0, 1 - d) * 0.9;
    }
  });

  return (
    <group>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.55, 0.2, 48, 220]} />
        <meshStandardMaterial
          color="#c9a227"
          metalness={1}
          roughness={0.18}
          emissive="#ff8a1f"
          emissiveIntensity={0.4}
          transparent
        />
      </mesh>
      <points ref={ash}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ff7a18"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function RingIntro({ onDone }: { onDone: () => void }) {
  const [start] = useState(() => performance.now());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone();
    }, DURATION);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <Canvas camera={{ position: [0, 1, 6.4], fov: 50 }} dpr={[1, 2]}>
            <color attach="background" args={["#0b0907"]} />
            <fog attach="fog" args={["#0b0907", 6, 16]} />
            <ambientLight intensity={0.35} />
            <pointLight position={[3, 2, 4]} intensity={40} color="#ffb257" />
            <pointLight position={[-4, -1, -3]} intensity={25} color="#ff5a1f" />
            <Environment>
              <Lightformer intensity={3} position={[0, 4, 2]} scale={[8, 8, 1]} color="#ffd9a0" />
              <Lightformer
                intensity={2}
                color="#ff6a1a"
                position={[-5, 0, -2]}
                rotation-y={Math.PI / 2}
                scale={[14, 3, 1]}
              />
            </Environment>
            <TheRing start={start} />
          </Canvas>
          <motion.p
            className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 font-serif-rune text-xs tracking-[0.5em] text-primary/70 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5, times: [0, 0.2, 0.7, 1] }}
          >
            One Ring to rule them all
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
