'use client';
import { useReveal } from '../useReveal';
import { awards } from '@/data/misc';

const ACCENT = {
  violet: { bg: 'rgba(124,110,245,0.08)', border: 'rgba(124,110,245,0.2)', text: '#7c6ef5' },
  cyan:   { bg: 'rgba(45,212,191,0.08)',  border: 'rgba(45,212,191,0.2)',  text: '#2dd4bf' },
  amber:  { bg: 'rgba(245,166,35,0.08)',  border: 'rgba(245,166,35,0.2)',  text: '#f5a623' },
  rose:   { bg: 'rgba(240,98,146,0.08)',  border: 'rgba(240,98,146,0.2)',  text: '#f06292' },
};

export default function AwardsSection() {
  const ref = useReveal();

  return (
    <section id="awards" style={{ padding: '7rem 1.5rem', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>

        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>06 - Awards</p>
          <h2 style={headingStyle}>Recognition</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '480px' }}>
            Things that felt meaningful to receive - listed not to brag, but because they mark moments that shaped how I work.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '18px',
            top: '8px',
            bottom: '8px',
            width: '1px',
            background: 'linear-gradient(to bottom, var(--accent-violet), transparent)',
            opacity: 0.3,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {awards.map((award, i) => {
              const a = ACCENT[award.accent] || ACCENT.violet;
              return (
                <div
                  key={award.id}
                  className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr',
                    gap: '1.25rem',
                    alignItems: 'start',
                  }}
                >
                  {/* Timeline dot */}
                  <div style={{ paddingTop: '18px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: a.text,
                      boxShadow: `0 0 10px ${a.text}55`,
                      flexShrink: 0,
                      border: `2px solid ${a.border}`,
                    }} />
                  </div>

                  {/* Card */}
                  <div style={{
                    padding: '1.25rem 1.5rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = a.border; e.currentTarget.style.boxShadow = `0 4px 20px ${a.bg}`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                        <span style={{
                          padding: '0.15rem 0.55rem',
                          background: a.bg,
                          border: `1px solid ${a.border}`,
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: a.text,
                          letterSpacing: '0.06em',
                        }}>
                          {award.institution}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '0.97rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.5rem', marginBottom: '0.4rem' }}>
                        {award.award}
                      </h3>
                      <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {award.description}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: a.text,
                      flexShrink: 0,
                    }}>
                      {award.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const headingStyle = {
  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  color: 'var(--text-primary)',
};
