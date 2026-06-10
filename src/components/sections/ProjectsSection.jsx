'use client';
import Link from 'next/link';
import { useReveal } from '../useReveal';
import { featuredProjects } from '@/data/projects';

const ACCENT_COLORS = {
  violet: { bg: 'rgba(124,110,245,0.08)', border: 'rgba(124,110,245,0.2)', text: '#7c6ef5', glow: 'rgba(124,110,245,0.15)' },
  cyan:   { bg: 'rgba(45,212,191,0.08)',  border: 'rgba(45,212,191,0.2)',  text: '#2dd4bf', glow: 'rgba(45,212,191,0.15)' },
  amber:  { bg: 'rgba(245,166,35,0.08)',  border: 'rgba(245,166,35,0.2)',  text: '#f5a623', glow: 'rgba(245,166,35,0.15)' },
  rose:   { bg: 'rgba(240,98,146,0.08)',  border: 'rgba(240,98,146,0.2)',  text: '#f06292', glow: 'rgba(240,98,146,0.15)' },
};

export default function ProjectsSection() {
  const ref = useReveal();

  return (
    <section id="projects" style={{ padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        {/* Header */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
          <div>
            <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>03 - Projects</p>
            <h2 style={headingStyle}>Things I've built</h2>
          </div>
          <Link href="/projects" style={viewAllStyle}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.color = 'var(--accent-violet)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            View all projects →
          </Link>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {featuredProjects.map((project, i) => {
            const accent = ACCENT_COLORS[project.accent] || ACCENT_COLORS.violet;
            return (
              <Link
                key={project.id}
                href={`/projects#${project.id}`}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  display: 'block',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1.75rem',
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = accent.border;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 16px 40px ${accent.glow}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Accent top bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${accent.text}, transparent)`,
                  opacity: 0.7,
                }} />

                {/* Year + accent dot */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    {project.year}
                  </span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent.text, boxShadow: `0 0 8px ${accent.text}` }} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {project.tagline}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      background: accent.bg,
                      border: `1px solid ${accent.border}`,
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: accent.text,
                      letterSpacing: '0.04em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div style={{
                  position: 'absolute', bottom: '1.5rem', right: '1.5rem',
                  color: 'var(--text-muted)', fontSize: '1rem',
                  transition: 'transform 0.2s, color 0.2s',
                }}>
                  →
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 2rem',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.color = 'var(--accent-violet)'; e.currentTarget.style.background = 'rgba(124,110,245,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            View All Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
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

const viewAllStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  border: '1px solid var(--border)',
  padding: '0.4rem 0.9rem',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
};
