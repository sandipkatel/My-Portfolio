"use client";

const LAYER_NAMES = ["Foundation", "Exploration", "Depth", "Engineering", "Research", "Now"];

export default function NodeTooltip({ node, x, y }) {
  if (!node || !node.label) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: x + 16,
        top: y - 12,
        pointerEvents: "none",
        zIndex: 50,
        background: "rgba(10,15,26,0.92)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: "8px 12px",
        minWidth: 130,
        backdropFilter: "blur(4px)",
      }}
    >
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 600, color: "#f1f5f9", margin: "0 0 3px" }}>
        {node.label}
      </p>
      <p style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(100,116,139,0.7)", margin: "0 0 5px" }}>
        {LAYER_NAMES[node.layerIndex]} · {node.year}
      </p>
      {/* Proficiency bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${Math.round(node.activation * 100)}%`,
          background: "rgba(191,196,198,0.7)",
          borderRadius: 2,
          transition: "width 0.3s",
        }} />
      </div>
      <p style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(100,116,139,0.5)", margin: "3px 0 0", textAlign: "right" }}>
        {Math.round(node.activation * 100)}% proficiency
      </p>
    </div>
  );
}
