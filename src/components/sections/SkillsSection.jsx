'use client';
import { useReveal } from '../useReveal';
import { skills, levelMeta } from '@/data/about';

export default function SkillsSection() {
  const ref = useReveal();

  return (
    <section id="skills" style={{ padding: '7rem 1.5rem', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>02 - Skills</p>
          <h2 style={headingStyle}>Tools I think with</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '520px' }}>
            Grouped by how I actually use them - not alphabetically, not by coolness, but by the mental model they belong to.
          </p>
        </div>

        {/* Legend */}
        <div className="reveal reveal-delay-1" style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {Object.entries(levelMeta).map(([key, meta]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: i < meta.dots ? meta.color : 'var(--border)',
                    transition: 'all 0.2s',
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                {meta.label}
              </span>
            </div>
          ))}
        </div>

        {/* Skill clusters grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {skills.map((cluster, ci) => (
            <div
              key={cluster.cluster}
              className={`reveal reveal-delay-${Math.min(ci + 1, 4)}`}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,110,245,0.3)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(124,110,245,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Cluster header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '32px', height: '32px',
                  background: 'rgba(124,110,245,0.1)',
                  border: '1px solid rgba(124,110,245,0.2)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                  color: 'var(--accent-violet)',
                }}>
                  {cluster.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                  {cluster.cluster}
                </h3>
              </div>

              {/* Skills list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {cluster.items.map(skill => {
                  const meta = levelMeta[skill.level];
                  return (
                    <div key={skill.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {skill.name}
                      </span>
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: i < meta.dots ? meta.color : 'var(--border)',
                          }} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
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
