'use client';
import { useState, useEffect } from 'react';
import { projects } from '@/data/projects';

const ALL_TAGS = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

const ACCENT = {
  violet: { bg: 'rgba(124,110,245,0.08)', border: 'rgba(124,110,245,0.2)', text: '#7c6ef5', glow: 'rgba(124,110,245,0.15)' },
  cyan:   { bg: 'rgba(45,212,191,0.08)',  border: 'rgba(45,212,191,0.2)',  text: '#2dd4bf', glow: 'rgba(45,212,191,0.15)' },
  amber:  { bg: 'rgba(245,166,35,0.08)',  border: 'rgba(245,166,35,0.2)',  text: '#f5a623', glow: 'rgba(245,166,35,0.15)' },
  rose:   { bg: 'rgba(240,98,146,0.08)',  border: 'rgba(240,98,146,0.2)',  text: '#f06292', glow: 'rgba(240,98,146,0.15)' },
};

function DetailPanel({ project, onClose }) {
  const a = ACCENT[project.accent] || ACCENT.violet;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const sections = [
    { label: '// problem', content: project.problem },
    { label: '// approach', content: project.approach },
    { label: '// what broke', content: project.whatBroke },
    { label: '// what I learned', content: project.learned },
    { label: '// what I\'d do differently', content: project.different },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '2rem 1rem',
        overflowY: 'auto',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${a.border}`,
          borderRadius: '16px',
          maxWidth: '760px',
          width: '100%',
          overflow: 'hidden',
          marginTop: '2rem',
          marginBottom: '2rem',
          boxShadow: `0 40px 80px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '2rem 2rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          background: `linear-gradient(135deg, var(--bg-card) 60%, ${a.bg})`,
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${a.text}, transparent)` }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {project.tags.map(t => (
                  <span key={t} style={{
                    padding: '0.15rem 0.55rem', borderRadius: '4px',
                    background: a.bg, border: `1px solid ${a.border}`,
                    fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: a.text,
                  }}>{t}</span>
                ))}
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                {project.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {project.description}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.4rem 0.65rem', fontSize: '0.9rem', flexShrink: 0, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.color = 'var(--accent-violet)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >✕</button>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={linkBtnStyle(a)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" style={linkBtnStyle(a)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Engineering story */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {sections.map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: a.text, letterSpacing: '0.1em', marginBottom: '0.6rem', textTransform: 'lowercase' }}>
                {s.label}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeIn { from{opacity:0} to{opacity:1} }`}</style>
    </div>
  );
}

const linkBtnStyle = (a) => ({
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  padding: '0.4rem 0.9rem',
  background: a.bg, border: `1px solid ${a.border}`,
  borderRadius: '6px',
  color: a.text,
  textDecoration: 'none',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.78rem',
  transition: 'all 0.2s',
});

function ProjectCard({ project, onSelect }) {
  const a = ACCENT[project.accent] || ACCENT.violet;
  return (
    <div
      onClick={() => onSelect(project)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '1.75rem',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = a.border; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${a.glow}`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${a.text}, transparent)`, opacity: 0.6 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{project.year}</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {project.featured && (
            <span style={{ padding: '0.12rem 0.5rem', background: a.bg, border: `1px solid ${a.border}`, borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: a.text, letterSpacing: '0.06em' }}>
              Featured
            </span>
          )}
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: a.text, boxShadow: `0 0 6px ${a.text}` }} />
        </div>
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
        {project.title}
      </h3>
      <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
        {project.tagline}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
        {project.tags.slice(0, 4).map(t => (
          <span key={t} style={{ padding: '0.18rem 0.55rem', borderRadius: '4px', background: a.bg, border: `1px solid ${a.border}`, fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: a.text }}>
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textDecoration: 'none', padding: '0.2rem 0', borderBottom: '1px solid var(--border)', transition: 'color 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = a.text; e.currentTarget.style.borderColor = a.text; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            GitHub ↗
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textDecoration: 'none', padding: '0.2rem 0', borderBottom: '1px solid var(--border)', transition: 'color 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = a.text; e.currentTarget.style.borderColor = a.text; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            Demo ↗
          </a>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Read story →
        </span>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const project = projects.find(p => p.id === hash);
        if (project) setSelected(project);
      }
    }
  }, []);

  const filtered = activeTag === 'All' ? projects : projects.filter(p => p.tags.includes(activeTag));

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>All work</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Projects
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.7 }}>
            Every project has an engineering story behind it - not just what was built, but what broke,
            what I learned, and what I'd do differently. Click any card to read the full story.
          </p>
        </div>

        {/* Tag filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: activeTag === tag ? 'var(--accent-violet)' : 'var(--border)',
                background: activeTag === tag ? 'rgba(124,110,245,0.1)' : 'transparent',
                color: activeTag === tag ? 'var(--accent-violet)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Count */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '0.08em' }}>
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeTag !== 'All' ? ` tagged "${activeTag}"` : ''}
        </p>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {selected && <DetailPanel project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
