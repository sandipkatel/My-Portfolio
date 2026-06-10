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
      className="grid min-h-screen grid-cols-1 items-center justify-center gap-8 p-5 lg:p-10 lg:grid-cols-2"
      onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
    >

      {/* Left */}
        <LeftPanel />

      {/* Right: Network (hidden on screens smaller than md) */}
      <section className="hidden lg:block h-[80vh]">
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
