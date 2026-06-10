'use client';
import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll('.reveal');
    if (targets.length === 0) {
      // The element itself is the reveal target
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
        { threshold: 0.12 }
      );
      if (el.classList.contains('reveal')) obs.observe(el);
      return () => obs.disconnect();
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return ref;
}

export function RevealSection({ children, className = '', style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
