'use client';
import { useReveal } from '../useReveal';
import { volunteering, volunteeringStatement } from '@/data/misc';

export default function VolunteeringSection() {
  const ref = useReveal();

  return (
    <section id="volunteering" style={{ padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>

        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>05 - Volunteering</p>
          <h2 style={headingStyle}>Giving back to the community</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '4rem', alignItems: 'start' }}>

          {/* Statement side */}
          <div className="reveal reveal-delay-1">
            <div style={{
              padding: '1.75rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              borderLeft: '3px solid var(--accent-cyan)',
              marginBottom: '2rem',
            }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic' }}>
                "{volunteeringStatement}"
              </p>
            </div>

            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(45,212,191,0.08)',
                border: '1px solid rgba(45,212,191,0.25)',
                borderRadius: '8px',
                color: 'var(--accent-cyan)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(45,212,191,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(45,212,191,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              I'm open to volunteering - reach out
            </a>
          </div>

          {/* Experiences list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {volunteering.map((v, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 2, 4)}`}
                style={{
                  padding: '1.4rem 1.6rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '0.5rem',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(45,212,191,0.2)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,212,191,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', flexShrink: 0 }} />
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{v.org}</h3>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', marginLeft: '14px' }}>
                    {v.role}
                  </p>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginLeft: '14px' }}>
                    {v.description}
                  </p>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  color: 'var(--text-muted)', letterSpacing: '0.08em',
                  whiteSpace: 'nowrap', paddingTop: '2px',
                }}>
                  {v.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #volunteering > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
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
