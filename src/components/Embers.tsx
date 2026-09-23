import { useMemo } from "react";

export function Embers({ count = 26 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 12,
        duration: 9 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 120,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bits.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-[-10%] rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            background: "var(--ember)",
            boxShadow: "0 0 8px var(--ember)",
            animation: `ember-rise ${b.duration}s linear ${b.delay}s infinite`,
            // @ts-expect-error custom property
            "--drift": `${b.drift}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes ember-rise {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(var(--drift), -110vh, 0) scale(0.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
