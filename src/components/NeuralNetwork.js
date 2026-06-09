"use client";
import { useEffect, useRef, useCallback } from "react";
import { SKILL_NODES, JOURNEY_PHASES, OUTPUT_PATHS } from "../data/journey";

const LAYER_SIZES = [6, 9, 11, 11, 9, 4];
const NODE_MIN_R = 8;
const NODE_MAX_R = NODE_MIN_R * 1.5;
const MONO = { R: 191, G: 196, B: 198 };

function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
function lerp(a, b, t) { return a + (b - a) * t; }

export default function NeuralNetwork({ hoveredPhase, onTooltip, onOutputClick, activePath }) {
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const neuronsRef = useRef([]);
  const connectionsRef = useRef([]);

  // Keep latest props in refs — canvas loop reads these without re-init
  const hoveredPhaseRef = useRef(null);
  const activePathRef = useRef(null);
  // wave: 0 = idle, positive = wave spreading right→left (output to input)
  // we go from layer 5 down to 0, so wave value = 5 - progress
  const waveRef = useRef(-1);       // -1 = inactive
  const waveDirRef = useRef("in"); // "in" spreading inward

  useEffect(() => { hoveredPhaseRef.current = hoveredPhase; }, [hoveredPhase]);

  useEffect(() => {
    activePathRef.current = activePath;
    if (activePath) {
      // Start wave from output (layer 5) sweeping left
      waveRef.current = 5.0;
      waveDirRef.current = "in";
    } else {
      waveRef.current = -1;
      neuronsRef.current.flat().forEach(n => { n.highlightT = 0; });
      connectionsRef.current.forEach(c => { c.highlightT = 0; });
    }
  }, [activePath]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    // Build neurons
    const neurons = LAYER_SIZES.map((size, li) =>
      Array.from({ length: size }, (_, ni) => {
        const skill = SKILL_NODES.find(s => s.layerIndex === li && s.neuronIndex === ni);
        return {
          x: 0, y: 0,
          activation: skill?.proficiency ?? 0.5,
          baseActivation: skill?.proficiency ?? 0.5,
          highlightT: 0,
          bias: (Math.random() - 0.5) * 2,
          pulse: Math.random() * Math.PI * 2,
          pulseDir: Math.random() > 0.5 ? 1 : -1,
          id: skill?.id ?? `l${li}_${ni}`,
          label: skill?.label ?? "",
          year: skill?.year ?? 0,
          layerIndex: li,
          neuronIndex: ni,
        };
      })
    );
    neuronsRef.current = neurons;

    // Build connections
    const connections = [];
    for (let li = 0; li < neurons.length - 1; li++)
      for (const from of neurons[li])
        for (const to of neurons[li + 1])
          connections.push({
            from, to,
            weight: (Math.random() - 0.5) * 2,
            signal: Math.random(),
            signalActive: Math.random() > 0.99,
            signalSpeed: 0.003 + Math.random() * 0.003,
            highlightT: 0,
          });
    connectionsRef.current = connections;

    let time = 0;
    const maxSz = Math.max(...LAYER_SIZES);

    function draw() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = devicePixelRatio;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      const neurons = neuronsRef.current;
      const connections = connectionsRef.current;
      const hPhase = hoveredPhaseRef.current;
      const path = activePathRef.current;

      // Advance wave (sweeping from layer 5 down to -1)
      if (waveRef.current >= 0) {
        waveRef.current -= 0.05;
      }
      const waveFront = waveRef.current; // current layer the wave front is at

      const padX = w * 0.05;
      const padY = h * 0.13;
      const usableW = w - padX * 2;
      const usableH = h - padY * 2;
      const layerGap = usableW / (LAYER_SIZES.length - 1);

      // ── Update neurons ──────────────────────────────────────────────────
      neurons.forEach((layer, li) => {
        layer.forEach((n, ni) => {
          const lh = (layer.length - 1) * (usableH / (maxSz - 1));
          const top = (usableH - lh) / 2;
          const sp = layer.length > 1 ? lh / (layer.length - 1) : 0;
          n.x = padX + li * layerGap;
          n.y = padY + top + ni * sp;
          n.pulse += 0.04 * n.pulseDir;

          const inPath = path?.ancestorNodes.includes(n.id) ?? false;

          // Wave hit: wave front is at or has passed this layer
          const waveHit = inPath && waveFront <= li && waveFront >= li - 1.2;
          const waveFlash = waveHit ? Math.max(0, 1 - (li - waveFront) / 1.2) : 0;

          // Target highlight: settled glow after wave passes
          const settled = inPath && waveFront < li ? 1 : 0;
          const targetHL = Math.max(settled * 0.85, waveFlash);
          n.highlightT += (targetHL - n.highlightT) * (waveFlash > 0 ? 0.2 : 0.05);

          // Idle oscillation
          const idle = sigmoid(Math.sin(time * 0.5 + n.bias + li * 0.3 + ni * 0.2) * 1.2);
          const base = n.baseActivation * 0.7 + idle * 0.3;
          const phaseBoost = hPhase === li ? 0.25 : 0;
          n.activation = Math.min(1, base + phaseBoost + n.highlightT * 0.25);
        });
      });

      // ── Update connections ───────────────────────────────────────────────
      connections.forEach(c => {
        const inPath = path
          ? path.ancestorNodes.includes(c.from.id) && path.ancestorNodes.includes(c.to.id)
          : false;
        // Connection highlight follows the more-settled of its two nodes
        const targetHL = inPath ? Math.max(c.from.highlightT, c.to.highlightT) * 0.9 : 0;
        c.highlightT += (targetHL - c.highlightT) * 0.07;
      });

      // ── Draw connections ─────────────────────────────────────────────────
      for (const conn of connections) {
        const cpX = (conn.from.x + conn.to.x) / 2;
        const cpY = (conn.from.y + conn.to.y) / 2
          + Math.sin(conn.from.neuronIndex + conn.to.neuronIndex) * 12;

        const hl = conn.highlightT;
        const col = path ? path.color : MONO;
        const R = Math.floor(lerp(MONO.R, col.R, hl));
        const G = Math.floor(lerp(MONO.G, col.G, hl));
        const B = Math.floor(lerp(MONO.B, col.B, hl));
        const alpha = Math.abs(conn.weight) * 0.15 + 0.03 + hl * 0.45;

        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.quadraticCurveTo(cpX, cpY, conn.to.x, conn.to.y);
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha.toFixed(2)})`;
        ctx.lineWidth = Math.abs(conn.weight) * 0.9 + 0.3 + hl * 1.5;
        ctx.stroke();

        // Signal dots — denser & faster on active paths
        if (conn.signalActive) {
          conn.signal += conn.signalSpeed * (1 + hl * 4);
          if (conn.signal > 1) {
            conn.signal = 0;
            conn.signalActive = Math.random() > (hl > 0.4 ? 0.02 : 0.95);
          }
          const t = conn.signal;
          const bx = (1-t)**2 * conn.from.x + 2*(1-t)*t * cpX + t**2 * conn.to.x;
          const by = (1-t)**2 * conn.from.y + 2*(1-t)*t * cpY + t**2 * conn.to.y;
          ctx.beginPath();
          ctx.arc(bx, by, 2 + hl * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${R},${G},${B},${(Math.sin(t * Math.PI) * (0.5 + hl * 0.5)).toFixed(2)})`;
          ctx.fill();
        } else if (Math.random() < (hl > 0.4 ? 0.025 : 0.0002)) {
          conn.signalActive = true;
        }
      }

      // ── Draw neurons ─────────────────────────────────────────────────────
      neurons.forEach((layer, li) => {
        layer.forEach(n => {
          const r = NODE_MIN_R + n.activation * (NODE_MAX_R - NODE_MIN_R);
          const glowR = r + 6 + Math.sin(n.pulse) * 2;
          const hl = n.highlightT;

          const isOutput = li === 5;
          const outPath = OUTPUT_PATHS.find(p => p.outputNodeId === n.id);
          const nodeCol = (isOutput && outPath) ? outPath.color : MONO;
          const col = path ? path.color : nodeCol;

          const R = Math.floor(lerp(MONO.R, col.R, isOutput ? 1 : hl));
          const G = Math.floor(lerp(MONO.G, col.G, isOutput ? 1 : hl));
          const B = Math.floor(lerp(MONO.B, col.B, isOutput ? 1 : hl));

          // Glow
          const gg = ctx.createRadialGradient(n.x, n.y, r * 0.3, n.x, n.y, glowR);
          const glowA = (n.activation * 0.3 + hl * 0.35 + (isOutput ? 0.15 : 0)).toFixed(2);
          gg.addColorStop(0, `rgba(${R},${G},${B},${glowA})`);
          gg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = gg; ctx.fill();

          // Body
          const bg = ctx.createRadialGradient(n.x - r * 0.3, n.y - r * 0.3, 1, n.x, n.y, r);
          bg.addColorStop(0, `rgba(${R},${G},${B},${(0.5 + n.activation * 0.5).toFixed(2)})`);
          bg.addColorStop(0.6, `rgba(${Math.floor(R*.4)},${Math.floor(G*.4)},${Math.floor(B*.4)},0.9)`);
          bg.addColorStop(1, "rgba(5,10,20,0.95)");
          ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = bg; ctx.fill();

          // Border — output nodes get thicker ring
          ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${R},${G},${B},${(0.35 + n.activation * 0.45 + hl * 0.3).toFixed(2)})`;
          ctx.lineWidth = isOutput ? 2 : 1.2 + hl * 0.8;
          ctx.stroke();

          // Output node: label below + click hint ring
          if (isOutput && outPath) {
            const isActive = activePath?.outputNodeId === n.id;
            // Outer dashed ring hint
            if (!isActive) {
              ctx.save();
              ctx.beginPath(); ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
              ctx.setLineDash([3, 4]);
              ctx.strokeStyle = `rgba(${R},${G},${B},0.3)`;
              ctx.lineWidth = 1; ctx.stroke();
              ctx.setLineDash([]);
              ctx.restore();
            }
            // Label
            ctx.save();
            ctx.font = `${isActive ? "bold " : ""}8px 'Space Grotesk', sans-serif`;
            ctx.textAlign = "center"; ctx.textBaseline = "top";
            ctx.fillStyle = `rgba(${R},${G},${B},${isActive ? 0.95 : 0.55})`;
            ctx.fillText(outPath.label, n.x, n.y + r + 7);
            ctx.restore();
          }
        });
      });

      // ── Phase labels (top) ────────────────────────────────────────────────
      JOURNEY_PHASES.forEach((phase, li) => {
        const layer = neurons[li];
        if (!layer) return;
        const isH = hPhase === li;
        ctx.fillStyle = isH ? "rgba(255,255,255,0.85)" : "rgba(148,163,184,0.4)";
        ctx.font = `${isH ? "bold " : ""}10px 'Space Grotesk', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(phase.label, layer[0].x, padY - 22);
        ctx.fillStyle = isH ? "rgba(220,220,220,0.55)" : "rgba(71,85,105,0.35)";
        ctx.font = "9px monospace";
        ctx.fillText(phase.year, layer[0].x, padY - 10);
      });

      // ── Active path description ───────────────────────────────────────────
      if (path) {
        const { R, G, B } = path.color;
        ctx.fillStyle = `rgba(${R},${G},${B},0.7)`;
        ctx.font = "bold 11px 'Space Grotesk', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`▶ ${path.label}`, padX, h - 22);
        ctx.fillStyle = "rgba(148,163,184,0.45)";
        ctx.font = "10px 'Space Grotesk', sans-serif";
        ctx.fillText(path.description, padX, h - 10);
      } else {
        ctx.fillStyle = "rgba(100,116,139,0.3)";
        ctx.font = "9px monospace";
        ctx.textAlign = "left";
        ctx.fillText("click an output node to trace its path", padX, h - 10);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    // ── Mouse events ─────────────────────────────────────────────────────────
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found = null;
      for (const layer of neuronsRef.current) {
        for (const n of layer) {
          if (Math.hypot(n.x - mx, n.y - my) < NODE_MAX_R + 8) { found = n; break; }
        }
        if (found) break;
      }
      canvas.style.cursor = found?.layerIndex === 5 ? "pointer" : "crosshair";
      onTooltip(found ? { label: found.label, year: found.year, activation: found.activation, layerIndex: found.layerIndex, x: e.clientX, y: e.clientY } : null);
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (const n of neuronsRef.current[5] ?? []) {
        if (Math.hypot(n.x - mx, n.y - my) < NODE_MAX_R + 10) {
          const path = OUTPUT_PATHS.find(p => p.outputNodeId === n.id) ?? null;
          // toggle off if same node clicked again
          onOutputClick(activePathRef.current?.outputNodeId === n.id ? null : path);
          return;
        }
      }
      // Click anywhere else: deselect
      onOutputClick(null);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", () => { onTooltip(null); });
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", () => onTooltip(null));
      canvas.removeEventListener("click", onClick);
    };
  }, [onTooltip, onOutputClick]);

  useEffect(() => { return init(); }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}
