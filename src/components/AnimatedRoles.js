"use client";
import { useEffect, useState } from "react";

const ROLES = ["Developer", "Designer", "Researcher", "Learner"];

export default function AnimatedRoles() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing");
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let timeout;
    const current = ROLES[index];

    if (phase === "typing") {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setPhase("hold"), 1800);
      }
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("erasing"), 400);
    } else if (phase === "erasing") {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 45);
      } else {
        setIndex((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, charIdx, index]);

  return (
    <span className="relative inline-block">
      <span
        className="font-semibold"
        style={{
          background: "linear-gradient(90deg, #38bdf8, #818cf8, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {displayed}
      </span>
      <span
        className="inline-block w-[2px] ml-[1px] align-middle"
        style={{
          height: "1em",
          background: "#818cf8",
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
