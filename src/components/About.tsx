import { useRef } from "react";
import { motion, useInView } from "motion/react";
import gandalf from "@/assets/gandalf.png.asset.json";
import parchment from "@/assets/parchment.png.asset.json";

const PARAGRAPHS = [
  "In a world driven by technology and creativity, I am forging my own path.",
  "I'm Arwa Dungarpur, a Computer Science student specializing in Artificial Intelligence and Machine Learning, passionate about building digital experiences that blend innovation, design, and storytelling.",
  "From exploring emerging technologies to creating engaging content and interactive web experiences, I enjoy transforming ideas into something meaningful and memorable.",
  "My journey has only just begun, but with every project I build, I strive to learn, create, and push the boundaries of what's possible.",
  "Even the smallest person can change the course of the future.",
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={ref}
      id="about"
      className="relative flex min-h-screen w-full items-center overflow-hidden border-y border-primary/15 fog-layer"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <motion.div
            className="pointer-events-none absolute -top-6 left-2 h-40 w-40 rounded-full"
            style={{ background: "radial-gradient(circle, var(--gold-bright), transparent 65%)" }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={inView ? { opacity: [0, 0.75, 0.45], scale: [0.4, 1.5, 1.2] } : {}}
            transition={{ duration: 2.4, ease: "easeOut" }}
          />
          <motion.img
            src={gandalf.url}
            alt="Gandalf"
            className="relative w-full"
            style={{
              maskImage:
                "radial-gradient(ellipse 65% 60% at 50% 48%, #000 55%, rgba(0,0,0,0.35) 80%, transparent 96%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 65% 60% at 50% 48%, #000 55%, rgba(0,0,0,0.35) 80%, transparent 96%)",
              filter: "contrast(1.05) brightness(0.95)",
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.3 }}
          />
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, filter: "brightness(0.1)" }}
            animate={inView ? { opacity: 1, filter: "brightness(1)" } : {}}
            transition={{ duration: 1.8, delay: 0.7 }}
            className="relative overflow-hidden rounded-sm border border-primary/25 p-8 sm:p-12"
            style={{
              backgroundImage: `url(${parchment.url})`,
              backgroundSize: "190% auto",
              backgroundPosition: "center",
              boxShadow: "0 0 90px -25px var(--gold)",
            }}
          >
            <div className="absolute inset-0 bg-[oklch(0.86_0.06_80)]/25" />
            <div className="relative">
              <h2 className="text-3xl text-[oklch(0.25_0.06_50)] sm:text-4xl">ABOUT ME</h2>
              <div className="my-6 rune-divider opacity-70" />
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-[oklch(0.25_0.05_50)] sm:text-base">
                {PARAGRAPHS.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.1 + i * 0.25 }}
                    className={i === PARAGRAPHS.length - 1 ? "font-serif-rune italic" : ""}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
