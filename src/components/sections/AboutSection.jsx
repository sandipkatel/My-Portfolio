'use client';
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { about, skills } from '@/data/about';

/* ── Syntax-highlight colour tokens ─────────────────────────────── */
const TOKEN = {
  key: 'text-white/90',
  string: 'text-cyan-400',
  bracket: 'text-white/25',
  comment: 'text-white/25',
  url: 'text-white/40',
  green: 'text-green-400',
  number: 'text-white/70',
};

function T({ t, children }) {
  return <span className={TOKEN[t] || TOKEN.bracket}>{children}</span>;
}
const toSlug = str =>
  str.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/__+/g, '_');

/* ── Component ───────────────────────────────────────────────────── */
export default function AboutSection() {
  const ref = useReveal();
  const [collapsed, setCollapsed] = useState({});
  const toggle = key => setCollapsed(p => ({ ...p, [key]: !p[key] }));

  const totalSkills = skills.reduce((a, c) => a + c.items.length, 0);

  return (
    <section id="about" style={{ padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>

        {/* ── Section header ── */}
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>01 — About</p>
          <h2 style={{
            fontSize: 'clamp(1.8rem,3.5vw,2.6rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}>
            The person behind the models
          </h2>
        </div>

        {/* ── Two-column grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,360px) 1fr',
          gap: '3.5rem',
          alignItems: 'start',
        }}
          className="about-merged-grid"
        >

          {/* ── LEFT — identity + bio + socials ── */}
          <div className="reveal reveal-delay-1">

            {/* Bio paragraphs */}
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {about.bio.map((para, i) => (
                <p key={i} style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* ── RIGHT — skills API viewer ── */}
          <div className="reveal reveal-delay-2" style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}>

            {/* URL bar */}
            <div style={{
              background: '#0d0d1a',
              borderBottom: '1px solid var(--border)',
              padding: '0.6rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} style={{
                    width: '10px', height: '10px',
                    borderRadius: '50%', background: c, opacity: 0.85,
                  }} />
                ))}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700,
                color: TOKEN.green, background: 'rgba(40,200,64,0.1)',
                border: '1px solid rgba(40,200,64,0.2)', borderRadius: '4px',
                padding: '0.15rem 0.5rem', flexShrink: 0,
              }}>
                GET
              </span>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)', borderRadius: '6px',
                padding: '0.25rem 0.75rem', fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem',
              }}>
                <span className="text-white/30">https://</span>
                <span className="text-white/60">sandipkatel.dev</span>
                <span className="text-white/90">/api/skills</span>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                fontWeight: 600, color: TOKEN.green, flexShrink: 0,
              }}>
                200 OK
              </span>
            </div>

            {/* Response headers */}
            <div style={{
              background: '#0d0d1a',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '0.35rem 1.25rem',
              display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
            }}>
              {[
                ['Content-Type', 'application/json'],
                ['X-Total-Skills', `${totalSkills}`],
                ['X-Clusters', `${skills.length}`],
              ].map(([k, v]) => (
                <span key={k} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: TOKEN.comment }}>
                  <span style={{ color: TOKEN.string }}>{k}:</span>{' '}
                  <span style={{ color: 'var(--text-muted)' }}>{v}</span>
                </span>
              ))}
            </div>

            {/* JSON body */}
            <div className="overflow-x-auto px-4 py-5 font-mono text-[0.78rem] leading-[2] sm:px-7 sm:py-6 sm:text-[0.83rem]">
              <div><T t="bracket">{'{'}</T></div>

              <div className="pl-6">
                <T t="key">"status"</T><T t="bracket">: </T><T t="number">200</T><T t="bracket">,</T>
              </div>
              <div className="pl-6">
                <T t="key">"message"</T><T t="bracket">: </T><T t="string">"OK"</T><T t="bracket">,</T>
              </div>
              <div className="pl-6">
                <T t="key">"data"</T><T t="bracket">: {'{'}</T>
              </div>

              {skills.map((cluster, ci) => {
                const key    = toSlug(cluster.cluster);
                const isCol  = collapsed[key];
                const isLast = ci === skills.length - 1;

                return (
                    <div
                    key={key}
                      onClick={() => toggle(key)}
                      className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 rounded pl-8 pr-2 cursor-pointer select-none transition-colors hover:bg-white/[0.04] sm:pl-12"
                    >
                      <span
                      className={`inline-block w-2.5 flex-shrink-0 text-[0.55rem] text-white/25 transition-transform ${
                        isCol ? '-rotate-90' : 'rotate-0'
                      }`}>▾</span>

                      <T t="key">"{key}"</T>
                    <T t="bracket">: [</T>

                      {isCol ? (
                      <>
                        <T t="comment"> … </T>
                        <T t="bracket">]</T>
                        {!isLast && <T t="bracket">,</T>}
                        <span className="ml-2 text-[0.65rem] text-white/25">
                          {'// '}{cluster.cluster} · {cluster.items.length} skills
                        </span>
                      </>
                    ) : (
                      <>
                        {cluster.items.map((name, si) => (
                          <span key={name}>
                            <T t="string">"{name}"</T>
                            {si < cluster.items.length - 1 && <T t="bracket">, </T>}
                          </span>
                        ))}
                        <T t="bracket">]</T>
                        {!isLast && <T t="bracket">,</T>}
                      </>
                    )}
                  </div>
                );
              })}

              <div className="pl-6"><T t="bracket">{'}'}</T></div>
              <div><T t="bracket">{'}'}</T></div>
            </div>

            {/* Status bar */}
            <div style={{
              background: '#0d0d1a',
              borderTop: '1px solid var(--border-subtle)',
              padding: '0.35rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: TOKEN.comment }}>
                click any key to collapse ↑
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: TOKEN.comment }}>
                {skills.length} clusters · {totalSkills} skills
              </span>
            </div>
          </div>
        </div>

        {/* ── Responsive override ── */}
        <style>{`
          @media (max-width: 900px) {
            .about-merged-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}