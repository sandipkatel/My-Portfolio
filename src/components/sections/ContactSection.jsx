'use client';
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { about } from '@/data/about';

export default function ContactSection() {
  const ref = useReveal();
  const [form, setForm] = useState({ email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setStatus('sending');
    // Simulate send - wire to your backend/Formspree/etc.
    await new Promise(r => setTimeout(r, 1200));
    setStatus('sent');
  };

  return (
    <section id="contact" style={{ padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }} ref={ref}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>07 - Contact</p>
          <h2 style={headingStyle}>Let's talk</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.7 }}>
            I read every message. Whether it's about a project, a collaboration, or just a question about something I wrote - I'll get back to you.
          </p>
        </div>

        <div className="reveal reveal-delay-1">
          {status === 'sent' ? (
            <div style={{
              padding: '3rem',
              background: 'var(--bg-card)',
              border: '1px solid rgba(45,212,191,0.25)',
              borderRadius: '16px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>Message sent</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>I'll read it and get back to you.</p>
              <button
                onClick={() => { setStatus('idle'); setForm({ email: '', message: '' }); }}
                style={{ marginTop: '1.5rem', background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.5rem 1.2rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}>
              <div>
                <label style={labelStyle}>Your email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent-violet)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,110,245,0.08)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent-violet)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,110,245,0.08)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  // I read every message.
                </span>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    padding: '0.7rem 2rem',
                    background: status === 'sending' ? 'rgba(124,110,245,0.5)' : 'var(--accent-violet)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: status === 'sending' ? 'wait' : 'pointer',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.03em',
                  }}
                  onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#6a5ce6'; }}
                  onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = 'var(--accent-violet)'; }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send message →'}
                </button>
              </div>
            </form>
          )}

          {/* Direct email link */}
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            or email directly:{' '}
            <a href={`mailto:${about.email}`} style={{ color: 'var(--accent-violet)', textDecoration: 'none' }}>
              {about.email}
            </a>
          </p>
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

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  color: 'var(--text-muted)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};
