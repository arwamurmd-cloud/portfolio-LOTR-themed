import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import map from "@/assets/map.png.asset.json";
import ringMarker from "@/assets/ringmarker-cut.png.asset.json";
import parchment from "@/assets/parchment.png.asset.json";

type Project = {
  title: string;
  tagline: string;
  features: string[];
  x: number;
  y: number;
};

const PROJECTS: Project[] = [
  {
    title: "HIRESENSE",
    tagline: "AI-powered resume analysis platform.",
    features: ["Resume scoring", "ATS analysis", "Skill evaluation", "Recommendations"],
    x: 22,
    y: 30,
  },
  {
    title: "FOOD PACKAGE COMMODITIES CHECKER",
    tagline: "Food analysis application.",
    features: ["Ingredient detection", "Nutrition analysis", "Product insights"],
    x: 40,
    y: 62,
  },
  {
    title: "3D WEBSITE GAME",
    tagline: "Interactive browser-based 3D experience.",
    features: ["Real-time interaction", "3D environment", "Gameplay mechanics"],
    x: 57,
    y: 38,
  },
  {
    title: "AI EXPENSE TRACKER",
    tagline: "Personal finance assistant.",
    features: ["Expense tracking", "Budget planning", "Analytics", "Predictions"],
    x: 74,
    y: 66,
  },
  {
    title: "CONTENT CREATOR ASSISTANT",
    tagline: "AI content planning platform.",
    features: ["Content ideas", "Scheduling", "Analytics", "Branding support"],
    x: 86,
    y: 26,
  },
];

export function Projects() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-20"
    >
      <h2 className="relative z-10 text-3xl text-gold-gradient glow-gold sm:text-5xl">PROJECTS</h2>
      <p className="relative z-10 mt-3 font-serif-rune text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
        Seek the rings upon the map
      </p>

      <div className="relative z-10 mt-8 w-full max-w-6xl">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-sm border border-primary/25 shadow-[0_0_100px_-30px_var(--gold)]"
          style={{
            backgroundImage: `url(${map.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-background/35" />

          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <motion.button
                aria-label={p.title}
                className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full sm:h-14 sm:w-14"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.2 }}
                style={{ filter: "drop-shadow(0 0 14px var(--gold))" }}
              >
                <img src={ringMarker.url} alt="" className="h-full w-full object-contain" />
              </motion.button>
              <span
                className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full"
                style={{ background: "radial-gradient(circle, var(--gold), transparent 60%)", opacity: 0.35 }}
              />

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute top-full left-1/2 z-30 mt-3 w-64 -translate-x-1/2 rounded-sm border border-primary/40 p-5 sm:w-72"
                    style={{
                      backgroundImage: `url(${parchment.url})`,
                      backgroundSize: "auto 190%",
                      backgroundPosition: "center",
                      boxShadow: "0 12px 50px -10px rgba(0,0,0,0.8)",
                    }}
                  >
                    <div className="absolute inset-0 bg-[oklch(0.86_0.06_80)]/30" />
                    <div className="relative text-[oklch(0.24_0.05_50)]">
                      <h3 className="font-serif-rune text-sm leading-snug font-bold tracking-wide">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-xs italic">{p.tagline}</p>
                      <ul className="mt-3 space-y-1 text-xs">
                        {p.features.map((f) => (
                          <li key={f} className="flex gap-2">
                            <span>&#10022;</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-10 grid w-full max-w-6xl grid-cols-2 gap-2 sm:hidden">
        {PROJECTS.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setOpen(open === i ? null : i)}
            className="border border-primary/30 px-3 py-2 text-left font-serif-rune text-[0.6rem] tracking-widest text-primary uppercase"
          >
            {p.title}
          </button>
        ))}
      </div>
    </section>
  );
}
