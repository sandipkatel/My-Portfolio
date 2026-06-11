'use client';
import { useReveal } from '../useReveal';
import { about } from '@/data/about';

const SOCIAL_LINKS = [
  {
    href: about.github, label: 'GitHub',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  {
    href: about.linkedin, label: 'LinkedIn',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    href: about.medium, label: 'Medium',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
  },
  {
    href: `mailto:${about.email}`, label: 'Email',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  },
];

export default function AboutSection() {
  const ref = useReveal();

  return (
    <section id="about" className="px-6 py-28">
      <div ref={ref} className="mx-auto max-w-[1200px]">

        {/* Section header */}
        <div className="reveal mb-14">
          <p className="section-eyebrow mb-3">01 — About</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            The person behind the models
          </h2>
        </div>

        <div className="about-grid grid grid-cols-[360px_1fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">

          {/* ── Photo column: IDE card ── */}
          <div className="reveal reveal-delay-1 relative">

            {/* IDE card wrapper */}
            <div className="overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_24px_60px_rgba(0,0,0,0.4)]">

              {/* IDE title bar */}
              <div className="flex items-center gap-[0.6rem] border-b border-[var(--border)] bg-[#0d0d1a] px-4 py-[0.55rem]">
                {/* Traffic lights */}
                <div className="flex gap-[5px]">
                  {['#ff5f57','#febc2e','#28c840'].map(c => (
                    <div key={c} className="h-[10px] w-[10px] rounded-full opacity-85" style={{ background: c }} />
                  ))}
                </div>
                {/* Fake tab */}
                <div className="ml-2 flex items-center gap-[0.35rem] rounded-t-[4px] border border-[var(--border)] border-b-[var(--bg-secondary)] bg-[var(--bg-secondary)] px-3 py-[0.2rem] font-mono text-[0.68rem] text-[var(--accent-violet)]">
                  <span className="text-[0.7rem] text-[var(--accent-cyan)]">🐍</span>
                  sandip.py
                </div>
              </div>

              {/* Line numbers + photo */}
              <div className="relative flex">
                {/* Line numbers gutter */}
                <div className="min-w-[32px] select-none bg-[#0d0d1a] px-[0.6rem] py-3 text-right font-mono text-[0.62rem] leading-none text-[var(--text-muted)]">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span key={i} className={`block py-[1.5px] ${i === 2 || i === 8 || i === 14 ? 'opacity-100' : 'opacity-35'}`}>
                      {i + 1}
                    </span>
                  ))}
                </div>

                {/* Photo */}
                <div className="relative min-h-[380px] flex-1 bg-[var(--bg)]">
                  <img
                    src="/sandip.jpeg"
                    alt="Sandip Katel"
                    className="block h-full w-full object-cover object-[center_top]"
                  />

                  {/* Bottom overlay: syntax-highlighted "comment" */}
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(10,10,15,0.95)_0%,rgba(10,10,15,0.6)_60%,transparent_100%)] px-4 pb-[0.9rem] pt-5 font-mono text-[0.68rem] leading-[1.7]">
                    <div className="text-[#6a737d]"># Kathmandu, Nepal</div>
                    <div>
                      <span className="text-[var(--accent-violet)]">def </span>
                      <span className="text-[var(--accent-cyan)]">who_am_i</span>
                      <span className="text-[var(--text-secondary)]">():</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[var(--accent-amber)]">return </span>
                      <span className="text-[#a8d8a8]">&quot;AI Engineer + Researcher&quot;</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* IDE status bar */}
              <div className="flex items-center justify-between bg-[var(--accent-violet)] px-4 py-[0.25rem]">
                <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[rgba(255,255,255,0.85)]">
                  Python 3.11 · UTF-8
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[rgba(255,255,255,0.85)]">
                  Ln 1, Col 1
                </span>
              </div>
            </div>
          </div>

          {/* ── Bio column ── */}
          <div>
            <div className="reveal reveal-delay-2">

              {/* Const intro block */}
              <div className="mb-7 rounded-r-[8px] border border-[var(--border)] border-l-[3px] border-l-[var(--accent-violet)] bg-[var(--bg-card)] px-5 py-4 font-mono text-[0.8rem] leading-[1.7]">
                <span className="text-[var(--accent-violet)]">const </span>
                <span className="text-[var(--accent-cyan)]">dev</span>
                <span className="text-[var(--text-secondary)]"> = {'{'}</span>
                <br />
                {[
                  { key: '  name', val: `"Sandip Katel"`, vc: '#a8d8a8' },
                  { key: '  role', val: `"AI Engineer & Researcher"`, vc: '#a8d8a8' },
                  { key: '  based', val: `"Kathmandu, Nepal 🇳🇵"`, vc: '#a8d8a8' },
                  { key: '  open_to', val: `"research + product"`, vc: '#a8d8a8' },
                ].map(l => (
                  <div key={l.key}>
                    <span className="text-[var(--accent-amber)]">{l.key}</span>
                    <span className="text-[var(--text-muted)]">: </span>
                    <span style={{ color: l.vc }}>{l.val}</span>
                    <span className="text-[var(--text-muted)]">,</span>
                  </div>
                ))}
                <span className="text-[var(--text-secondary)]">{'}'}</span>
              </div>

              {/* Bio paragraphs */}
              <div className="mb-8 flex flex-col gap-[1.1rem]">
                {about.bio.map((para, i) => (
                  <p key={i} className="text-[0.95rem] leading-[1.8] text-[var(--text-secondary)]">
                    {para}
                  </p>
                ))}
              </div>

              {/* Social links */}
              <div className="mb-8 flex flex-wrap gap-[0.6rem]">
                {SOCIAL_LINKS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-[0.4rem] rounded-[6px] border border-[var(--border)] bg-transparent px-[0.85rem] py-[0.4rem] font-mono text-[0.78rem] text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent-violet)] hover:text-[var(--accent-violet)]"
                    dangerouslySetInnerHTML={{ __html: `${s.icon}<span>${s.label}</span>` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}