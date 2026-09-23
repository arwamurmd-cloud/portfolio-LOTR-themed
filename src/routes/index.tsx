import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";

const RingIntro = lazy(() =>
  import("@/components/RingIntro").then((m) => ({ default: m.RingIntro })),
);

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Arwa Dungarpur — AI & ML Student, Creator, Future Builder" },
      {
        name: "description",
        content:
          "A cinematic Lord of the Rings inspired portfolio by Arwa Dungarpur, AI & ML student building interactive digital experiences.",
      },
      { property: "og:title", content: "Arwa Dungarpur — Portfolio" },
      {
        property: "og:description",
        content:
          "Dark fantasy portfolio: AI projects, interactive Middle-earth map and 3D ring intro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative bg-background">
      <Suspense fallback={null}>
        <RingIntro onDone={() => setIntroDone(true)} />
      </Suspense>
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <Hero />
        <About />
        <Projects />
      </div>
    </main>
  );
}
