"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import LeftPanel from "../components/LeftPanel";
import NodeTooltip from "../components/NodeTooltip";

const NeuralNetwork = dynamic(() => import("../components/NeuralNetwork"), { ssr: false });

export default function Home() {
  const [hoveredPhase, setHoveredPhase] = useState(null);
  const [activePath, setActivePath] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleTooltip = useCallback((t) => setTooltip(t), []);
  const handleOutputClick = useCallback((p) => setActivePath(p), []);

  return (
    <main
      className="relative w-screen h-screen overflow-hidden flex"
      style={{ background: "#050a14" }}
      onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:
          "linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Left */}
      <section className="relative z-10 flex flex-col" style={{ width: "34%", minWidth: 260, borderRight: "1px solid rgba(255,255,255,0.04)" }}>
        <LeftPanel hoveredPhase={hoveredPhase} onPhaseHover={setHoveredPhase} />
      </section>

      {/* Right: Network */}
      <section className="relative z-10 flex-1" style={{ minWidth: 0 }}>
        <NeuralNetwork
          hoveredPhase={hoveredPhase}
          onTooltip={handleTooltip}
          onOutputClick={handleOutputClick}
          activePath={activePath}
        />
        <div className="absolute bottom-4 right-5" style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(71,85,105,0.4)", letterSpacing: "0.1em" }}>
          6→9→11→11→9→4
        </div>
      </section>

      <NodeTooltip
        node={tooltip}
        x={mousePos.x}
        y={mousePos.y}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}
