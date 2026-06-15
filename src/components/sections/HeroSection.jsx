"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import LeftPanel from "../LeftPanel";
import NodeTooltip from "../NodeTooltip";

const NeuralNetwork = dynamic(() => import("../NeuralNetwork"), { ssr: false });

export default function Home() {
  const [activePath, setActivePath] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleTooltip = useCallback((t) => setTooltip(t), []);
  const handleOutputClick = useCallback((p) => setActivePath(p), []);

  return (
    <section
      id="hero"
      className="relative grid min-h-screen grid-cols-1 items-center justify-center gap-8 p-5 lg:p-10 lg:grid-cols-2"
      onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
    >

      {/* Mobile background network */}
      <section className="absolute inset-0 -z-10 opacity-30 pointer-events-none lg:hidden">
        <NeuralNetwork
          onTooltip={() => {}}
          onOutputClick={() => {}}
          activePath={null}
        />
      </section>

      {/* Left */}
      <div className="relative z-10">
        <LeftPanel />
      </div>

      {/* Right: Network (hidden on screens smaller than md) */}
      <section className="relative z-10 hidden h-[80vh] lg:block">
        <NeuralNetwork
          onTooltip={handleTooltip}
          onOutputClick={handleOutputClick}
          activePath={activePath}
        />
      </section>

      {/* Tooltip: show hover effect on each node */}
      <NodeTooltip
        node={tooltip}
        x={mousePos.x}
        y={mousePos.y}
      />
    </section>
  );
}
