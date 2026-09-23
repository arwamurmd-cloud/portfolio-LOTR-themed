import { useRef, useState } from "react";
import { motion } from "motion/react";
import sauron from "@/assets/sauron.png.asset.json";
import portrait from "@/assets/portrait.png.asset.json";
import { Embers } from "./Embers";

export function Hero() {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const move = (clientX: number, clientY: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: ((clientX - r.left) / r.width) * 100, y: ((clientY - r.top) / r.height) * 100 });
  };

  const maskOut = `radial-gradient(circle 150px at ${pos.x}% ${pos.y}%, transparent 38%, rgba(0,0,0,0.55) 62%, #000 82%)`;
  const maskIn = `radial-gradient(circle 150px at ${pos.x}% ${pos.y}%, #000 38%, rgba(0,0,0,0.45) 62%, transparent 82%)`;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden fog-layer"
    >
      <Embers />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <p className="font-serif-rune text-[0.7rem] tracking-[0.55em] text-primary/70 uppercase">
            Portfolio of
          </p>
          <h1 className="mt-5 text-4xl leading-tight text-gold-gradient glow-gold sm:text-6xl lg:text-7xl">
            ARWA
            <br />
            DUNGARPUR
          </h1>
          <div className="my-7 max-w-sm rune-divider" />
          <ul className="space-y-2 font-serif-rune text-base tracking-[0.25em] text-muted-foreground uppercase sm:text-lg">
            <li>AI &amp; ML Student</li>
            <li>Creator</li>
            <li>Future Builder</li>
          </ul>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground/80 italic">
            &ldquo;All we have to decide is what to do with the time that is given us.&rdquo;
          </p>
          <a
            href="#projects"
            className="mt-9 inline-block border border-primary/40 px-7 py-3 font-serif-rune text-xs tracking-[0.35em] text-primary uppercase transition-colors hover:bg-primary/10"
          >
            Enter Middle-earth
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            ref={frame}
            onPointerMove={(e) => {
              move(e.clientX, e.clientY);
              setActive(true);
            }}
            onPointerLeave={() => setActive(false)}
            className="relative aspect-3/5 w-full overflow-hidden rounded-sm border border-primary/25 shadow-[0_0_80px_-20px_var(--ember)]"
          >
            {/* Portrait layer (never altered) */}
            <img
              src={portrait.url}
              alt="Arwa Dungarpur"
              className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500"
              style={{
                opacity: active ? 1 : 0,
                maskImage: active ? maskIn : "none",
                WebkitMaskImage: active ? maskIn : "none",
              }}
            />
            {/* Sauron front layer */}
            <img
              src={sauron.url}
              alt="Sauron"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                maskImage: active ? maskOut : "none",
                WebkitMaskImage: active ? maskOut : "none",
                transition: "mask-image 120ms linear",
              }}
            />
            <div
              className="pointer-events-none absolute h-[300px] w-[300px] rounded-full border border-primary/40"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: active ? 0.5 : 0,
                boxShadow: "0 0 60px -10px var(--ember) inset",
                transition: "opacity 400ms ease",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
          </div>
          <p className="mt-4 text-center font-serif-rune text-[0.65rem] tracking-[0.4em] text-muted-foreground/70 uppercase">
            Hover to see beyond the shadow
          </p>
        </motion.div>
      </div>
    </section>
  );
}
