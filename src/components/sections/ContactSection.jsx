'use client';
import { useReveal } from '../useReveal';
import { about } from '@/data/about';

export default function ContactSection() {
  const ref = useReveal();

  return (
    <section id="contact" style={{ padding: '7rem 1.5rem' }}>
      <div className="reveal max-w-2xl mx-auto text-center flex-col items-center justify-center gap-12" ref={ref}>

          <p className="section-eyebrow">07 - Contact</p>
          <h2 className='text-5xl font-bold'>Let's talk</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            I'm open to collaborations, project ideas, and thoughtful conversations. If you want to connect, reach out and I’ll get back to you as soon as I can.
          </p>
            <a
              href={`mailto:${about.email}`}
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                background: 'var(--accent-violet)',
                borderRadius: '8px',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Say Hello!
            </a>
      </div>
    </section>
  );
}

