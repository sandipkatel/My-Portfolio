'use client';
import { useReveal } from '../useReveal';
import { about } from '@/data/about';

export default function AboutSection() {
  const ref = useReveal();

  return (
    <section id="about" className="py-28 max-w-[1200px] mx-auto px-6">
      <div ref={ref}>
        <div className="reveal mb-14">
          <p className="section-eyebrow mb-3">01 - About</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">A quiet melody behind the models</h2>
        </div>

        <div className="grid" style={{ gridTemplateColumns: '340px 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Photo column */}
          <div className="reveal reveal-delay-1">
            {/* Photo placeholder */}
            <div className="w-full aspect-[4/5] rounded-[12px] relative overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #12121e 0%, #1a1a2e 50%, #0f0f18 100%)', border: '1px solid var(--border)' }}>
              {/* Grid lines for dark aesthetic */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }} viewBox="0 0 340 425">
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 35} x2="340" y2={i * 35} stroke="#7c6ef5" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 38} y1="0" x2={i * 38} y2="425" stroke="#7c6ef5" strokeWidth="0.5" />
                ))}
              </svg>
              {/* Silhouette placeholder */}
              <div className="relative z-10 text-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ opacity: 0.25 }}>
                  <circle cx="40" cy="28" r="18" fill="#7c6ef5" />
                  <ellipse cx="40" cy="72" rx="30" ry="20" fill="#7c6ef5" />
                </svg>
                <p className="font-[var(--font-mono)] text-[0.65rem] text-[var(--text-muted)] mt-4 tracking-[0.1em]">PHOTO</p>
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-[40px] h-[40px] rounded-[12px_0_0_0]" style={{ borderTop: '2px solid var(--accent-violet)', borderLeft: '2px solid var(--accent-violet)' }} />
              <div className="absolute bottom-0 right-0 w-[40px] h-[40px] rounded-[0_0_12px_0]" style={{ borderBottom: '2px solid var(--accent-violet)', borderRight: '2px solid var(--accent-violet)' }} />
            </div>

            {/* Location badge */}
            <div className="flex items-center gap-2 mt-5 font-[var(--font-mono)] text-[0.75rem] text-[var(--text-muted)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {about.location}
            </div>
          </div>

          {/* Bio column */}
          <div>
            <div className="reveal reveal-delay-2">
              <div className="flex flex-col gap-5 mb-10">
                {about.bio.map((para, i) => (
                  <p key={i} className="text-[0.97rem] text-[var(--text-secondary)] leading-[1.8]">
                    {para}
                  </p>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3 flex-wrap">
                {[
                  { href: about.github, label: 'GitHub', icon: githubIcon },
                  { href: about.linkedin, label: 'LinkedIn', icon: linkedinIcon },
                  { href: about.medium, label: 'Medium', icon: mediumIcon },
                  { href: `mailto:${about.email}`, label: 'Email', icon: emailIcon },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 border rounded text-[0.8rem] font-[var(--font-mono)] text-[var(--text-secondary)] bg-transparent transition-all"
                    style={{ border: '1px solid var(--border)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.color = 'var(--accent-violet)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: s.icon }} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="reveal reveal-delay-3 mt-10 p-6 rounded-[12px]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="font-[var(--font-mono)] text-[0.7rem] text-[var(--text-muted)] tracking-[0.12em] mb-5 uppercase">// currently_working_on</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Focus', val: 'LLM interpretability & RAG systems' },
                  { label: 'Reading', val: 'Anthropic mechanistic interp papers' },
                  { label: 'Building', val: 'A lightweight feature store' },
                  { label: 'Learning', val: 'JAX internals + Triton kernels' },
                ].map(f => (
                  <div key={f.label}>
                    <p className="font-[var(--font-mono)] text-[0.68rem] text-[var(--text-muted)] tracking-[0.08em] mb-1">{f.label}</p>
                    <p className="text-[0.84rem] text-[var(--text-primary)]">{f.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #about > div > div:last-child > div:first-child {
            max-width: 280px !important;
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

const socialBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  padding: '0.45rem 0.9rem',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '0.8rem',
  fontFamily: 'var(--font-mono)',
  color: 'var(--text-secondary)',
  transition: 'all 0.2s ease',
  background: 'transparent',
};

const githubIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
const linkedinIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const mediumIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`;
const emailIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
