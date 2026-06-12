'use client';
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { about, skills } from '@/data/about';

/* ── Syntax-highlight colour tokens ─────────────────────────────── */
const A = {
  key:     '#7c6ef5',
  string:  '#2dd4bf',
  bracket: '#8888a8',
  comment: '#44445a',
  url:     '#6a9fb5',
  green:   '#28c840',
  number:  '#f5a623',
};

const toSlug = str =>
  str.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/__+/g, '_');

function C({ c, children }) {
  return <span style={{ color: A[c] || A.bracket }}>{children}</span>;
}

/* ── Social links ────────────────────────────────────────────────── */
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
                color: A.green, background: 'rgba(40,200,64,0.1)',
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
                <span style={{ color: A.url }}>https://</span>
                <span style={{ color: 'var(--text-secondary)' }}>sandipkatel.dev</span>
                <span style={{ color: A.key }}>/api/skills</span>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                fontWeight: 600, color: A.green, flexShrink: 0,
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
                <span key={k} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: A.comment }}>
                  <span style={{ color: A.url }}>{k}:</span>{' '}
                  <span style={{ color: 'var(--text-muted)' }}>{v}</span>
                </span>
              ))}
            </div>

            {/* JSON body */}
            <div style={{
              padding: '1.4rem 1.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.83rem',
              lineHeight: 2,
              overflowX: 'auto',
            }}>
              <div><C c="bracket">{'{'}</C></div>

              <div style={{ paddingLeft: '1.5rem' }}>
                <C c="key">"status"</C><C c="bracket">: </C><C c="number">200</C><C c="bracket">,</C>
              </div>
              <div style={{ paddingLeft: '1.5rem' }}>
                <C c="key">"message"</C><C c="bracket">: </C><C c="string">"OK"</C><C c="bracket">,</C>
              </div>
              <div style={{ paddingLeft: '1.5rem' }}>
                <C c="key">"data"</C><C c="bracket">: {'{'}</C>
              </div>

              {skills.map((cluster, ci) => {
                const key    = toSlug(cluster.cluster);
                const isCol  = collapsed[key];
                const isLast = ci === skills.length - 1;

                return (
                  <div key={key}>
                    <div
                      onClick={() => toggle(key)}
                      style={{
                        paddingLeft: '3rem',
                        cursor: 'pointer',
                        userSelect: 'none',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.3rem',
                        borderRadius: '4px',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,110,245,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{
                        color: A.comment, fontSize: '0.55rem',
                        display: 'inline-block', width: '10px', flexShrink: 0,
                        transition: 'transform 0.15s',
                        transform: isCol ? 'rotate(-90deg)' : 'rotate(0deg)',
                      }}>▾</span>

                      <C c="key">"{key}"</C>
                      <C c="bracket">: [</C>

                      {isCol ? (
                        <>
                          <C c="comment"> … </C>
                          <C c="bracket">]</C>
                          {!isLast && <C c="bracket">,</C>}
                          <span style={{ color: A.comment, fontSize: '0.65rem', marginLeft: '0.75rem' }}>
                            {'// '}{cluster.cluster} · {cluster.items.length} skills
                          </span>
                        </>
                      ) : (
                        <>
                          {cluster.items.map((name, si) => (
                            <span key={name}>
                              <C c="string">"{name}"</C>
                              {si < cluster.items.length - 1 && <C c="bracket">, </C>}
                            </span>
                          ))}
                          <C c="bracket">]</C>
                          {!isLast && <C c="bracket">,</C>}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              <div style={{ paddingLeft: '1.5rem' }}><C c="bracket">{'}'}</C></div>
              <div><C c="bracket">{'}'}</C></div>
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
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: A.comment }}>
                click any key to collapse ↑
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: A.comment }}>
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