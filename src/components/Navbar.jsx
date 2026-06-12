'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Volunteering', href: '#volunteering' },
  { label: 'Awards', href: '#awards' },
  { label: 'Contact', href: '#contact' },
];

const PAGE_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observers = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [isHome]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(10,10,15,0.92)] backdrop-blur-md border-b border-[var(--border-subtle)]' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center h-15 justify-between" style={{height: '60px'}}>
        {/* Logo */}
        <Link href="/" className="no-underline">
          <span className="font-[var(--font-mono)] text-[0.9rem] text-[var(--text-primary)] tracking-[0.05em]">
            <span className="text-[var(--accent-violet)]">sk</span>
            <span className="text-[var(--text-muted)]">()</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 desktop-nav">
          {isHome && NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-md text-[0.82rem] no-underline font-[var(--font-mono)] transition-all duration-200 tracking-[0.02em] ${activeSection === link.href.replace('#', '') ? 'text-[var(--accent-violet)] bg-[rgba(124,110,245,0.08)]' : 'text-[var(--text-secondary)]'}`}
              onMouseEnter={e => { if (activeSection !== link.href.replace('#', '')) e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = activeSection === link.href.replace('#', '') ? 'var(--accent-violet)' : 'var(--text-secondary)'; }}
            >
              {link.label}
            </a>
          ))}
          {PAGE_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-md text-[0.82rem] no-underline font-[var(--font-mono)] transition-all duration-200 tracking-[0.02em] ${pathname === link.href ? 'text-[var(--accent-violet)] bg-[rgba(124,110,245,0.08)]' : 'text-[var(--text-secondary)]'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-transparent border-0 cursor-pointer text-[var(--text-secondary)] p-2 mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen
              ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(10,10,15,0.98)] border-t border-[var(--border)] p-4 flex flex-col gap-2 mobile-menu">
          {isHome && NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className={`py-2 text-[0.9rem] no-underline font-[var(--font-mono)] ${activeSection === link.href.replace('#', '') ? 'text-[var(--accent-violet)]' : 'text-[var(--text-secondary)]'}`}>
              {link.label}
            </a>
          ))}
          {PAGE_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className={`py-2 text-[0.9rem] no-underline font-[var(--font-mono)] ${pathname === link.href ? 'text-[var(--accent-violet)]' : 'text-[var(--text-secondary)]'}`}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
      
    </nav>
  );
}
