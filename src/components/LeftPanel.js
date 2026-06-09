"use client";
import AnimatedRoles from "./AnimatedRoles";


export default function LeftPanel() {
  return (
      <section
        className="relative z-10 flex w-150 flex-col justify-center pl-16 pr-12"
      >

        {/* Name */}
        <h1
          className="mb-4 text-6xl font-bold text-slate-100"
        >
          Sandip{" "}
          <span
            className="relative inline-block"
          >
            <span
              className="relative bg-gradient-to-br from-slate-200 to-slate-400 bg-clip-text text-transparent"
            >
              Katel
            </span>
          </span>
        </h1>

        {/* Role line */}
        <h4
          className="mb-8 text-2xl font-normal text-slate-400"
        >
          I am a{" "}
          <AnimatedRoles />
        </h4>

        {/* Short bio */}
        <p
          className="mb-10 max-w-80 text-slate-500"
        >
          Building intelligent systems at the intersection of machine learning,
          data engineering, and software craftsmanship.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-3">
          <button
            className="cursor-pointer rounded-lg bg-gradient-to-br from-slate-300 to-slate-500 px-6 py-2.5 font-medium text-slate-950"
          >
            View Projects
          </button>
          <button
            className="cursor-pointer rounded-lg border border-slate-600/70 bg-transparent px-6 py-2.5 font-medium text-slate-400"
          >
            Contact Me
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-8 mt-12">
          {[
            { val: "3+", label: "Years in AI/ML" },
            { val: "10+", label: "Projects shipped" },
            { val: "∞", label: "Models trained" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-2xl font-bold text-transparent"
              >
                {s.val}
              </div>
              <div
                className="text-sm uppercase tracking-[0.08em] text-slate-500"
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}