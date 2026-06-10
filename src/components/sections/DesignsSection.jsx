'use client';
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { designs } from '@/data/misc';

const ACCENT_COLORS = {
  violet: { bg: 'rgba(124,110,245,0.12)', border: 'rgba(124,110,245,0.25)', text: '#7c6ef5' },
  cyan:   { bg: 'rgba(45,212,191,0.12)',  border: 'rgba(45,212,191,0.25)',  text: '#2dd4bf' },
  amber:  { bg: 'rgba(245,166,35,0.12)',  border: 'rgba(245,166,35,0.25)',  text: '#f5a623' },
  rose:   { bg: 'rgba(240,98,146,0.12)',  border: 'rgba(240,98,146,0.25)',  text: '#f06292' },
};

// Gradient maps for placeholder backgrounds
const GRADIENTS = {
  violet: 'linear-gradient(135deg, #1a1030 0%, #12121e 60%, #0f0f18 100%)',
  cyan:   'linear-gradient(135deg, #0a2028 0%, #12121e 60%, #0f0f18 100%)',
  amber:  'linear-gradient(135deg, #201808 0%, #12121e 60%, #0f0f18 100%)',
  rose:   'linear-gradient(135deg, #200818 0%, #12121e 60%, #0f0f18 100%)',
};

function DesignPlaceholder({ accent, id }) {
  const color = ACCENT_COLORS[accent]?.text || '#7c6ef5';
  const shapes = [
    { x: 20, y: 15, w: 55, h: 8, rx: 4 },
    { x: 20, y: 30, w: 40, h: 5, rx: 3 },
    { x: 20, y: 50, w: 60, h: 18, rx: 6 },
    { x: 20, y: 74, w: 28, h: 12, rx: 4 },
    { x: 52, y: 74, w: 28, h: 12, rx: 4 },
  ];

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {shapes.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx}
          fill={color} opacity={0.08 + (i % 3) * 0.04} />
      ))}
      {/* Grid lines */}
      {[25, 50, 75].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="100" stroke={color} strokeWidth="0.3" opacity="0.1" />
      ))}
      {[33, 66].map(y => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={color} strokeWidth="0.3" opacity="0.1" />
      ))}
      {/* Corner frame */}
      <rect x="8" y="8" width="84" height="84" rx="6" fill="none" stroke={color} strokeWidth="0.6" opacity="0.15" />
    </svg>
  );
}

function Lightbox({ design, onClose }) {
  const accent = ACCENT_COLORS[design.accent] || ACCENT_COLORS.violet;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        cursor: 'zoom-out',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${accent.border}`,
          borderRadius: '16px',
          overflow: 'hidden',
          maxWidth: '800px',
          width: '100%',
          cursor: 'default',
          boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 40px ${accent.bg}`,
        }}
      >
        {/* Preview area */}
        <div style={{
          height: '360px',
          background: GRADIENTS[design.accent],
          position: 'relative',
          overflow: 'hidden',
        }}>
          <DesignPlaceholder accent={design.accent} id={design.id} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '0.5rem',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accent.text, letterSpacing: '0.15em', opacity: 0.8 }}>
              DESIGN PREVIEW
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {design.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{design.description}</p>
            </div>
            <button onClick={onClose} style={{
              background: 'none', border: '1px solid var(--border)', borderRadius: '6px',
              color: 'var(--text-muted)', cursor: 'pointer', padding: '0.4rem 0.6rem',
              fontSize: '0.85rem', transition: 'all 0.2s',
              flexShrink: 0,
            }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {design.tags.map(t => (
              <span key={t} style={{
                padding: '0.2rem 0.6rem', borderRadius: '4px',
                background: accent.bg, border: `1px solid ${accent.border}`,
                fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: accent.text,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from{opacity:0} to{opacity:1} }`}</style>
    </div>
  );
}

export default function DesignsSection() {
  const ref = useReveal();
  const [selected, setSelected] = useState(null);

  return (
    <section id="designs" style={{ padding: '7rem 1.5rem', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>04 - Designs</p>
          <h2 style={headingStyle}>Visual work</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '480px' }}>
            UI concepts and interfaces I've designed - mostly tooling for researchers and engineers. Click to expand.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gap: '1rem',
        }}>
          {designs.map((design, i) => {
            const accent = ACCENT_COLORS[design.accent] || ACCENT_COLORS.violet;
            const isTall = i === 0 || i === 4;

            return (
              <div
                key={design.id}
                className={`reveal reveal-delay-${Math.min(i % 3 + 1, 4)}`}
                onClick={() => setSelected(design)}
                style={{
                  gridRow: isTall ? 'span 2' : 'span 1',
                  background: GRADIENTS[design.accent],
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'zoom-in',
                  position: 'relative',
                  minHeight: isTall ? '320px' : '180px',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = accent.border;
                  e.currentTarget.style.transform = 'scale(1.015)';
                  e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <DesignPlaceholder accent={design.accent} id={design.id} />

                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 50%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '1.25rem',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                }}
                  className="design-overlay"
                >
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {design.title}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{design.description}</p>
                </div>

                {/* Always-visible tag corner */}
                <div style={{
                  position: 'absolute', top: '0.75rem', left: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  background: accent.bg,
                  border: `1px solid ${accent.border}`,
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: accent.text,
                  letterSpacing: '0.06em',
                }}>
                  {design.tags[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selected && <Lightbox design={selected} onClose={() => setSelected(null)} />}

      <style>{`
        div:hover .design-overlay { opacity: 1 !important; }
        @media (max-width: 768px) {
          #designs [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          #designs [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const headingStyle = {
  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  color: 'var(--text-primary)',
};
