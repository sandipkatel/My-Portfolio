'use client';
import { useEffect, useState } from 'react';

const TYPED_STRINGS = [
  'builds systems that learn.',
  'thinks about how intelligence works.',
  'ships research that runs in prod.',
  'reads every paper twice.',
];

export default function LeftPanel() {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const phrase = TYPED_STRINGS[phraseIdx];
    let timeout;

    if (typing) {
      if (displayed.length < phrase.length) {
        timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      } else {
        setPhraseIdx(i => (i + 1) % TYPED_STRINGS.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, phraseIdx]);

  return (
      <div className=" max-w-lg">
        <p className="section-eyebrow mb-5">
          &lt; AI · ML · Software Engineer /&gt;
        </p>

        <h1 className="mb-5 text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[1.1]">
          Sandip <br />
          <span className="text-[var(--accent-violet)]">Katel</span>
        </h1>

        <div className="mb-8 flex min-h-8 items-center gap-2 font-mono text-[var(--text-secondary)]">
          <span className="text-[var(--text-muted)]">// someone who</span>
          <span className="text-[var(--text-primary)]">{displayed}</span>
          <span className="inline-block h-4 w-1 animate-[blink_1s_step-end_infinite] bg-[var(--accent-violet)]" />
        </div>

        <p className="mb-10 text-[0.95rem] leading-7 text-[var(--text-secondary)]">
          I build data-driven systems at the intersection of software engineering and AI/ML - 
          turning research insights into scalable production solution.
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="inline-block rounded-[8px] bg-[var(--accent-violet)] px-6 py-[0.65rem] font-mono text-[0.85rem] font-semibold tracking-[0.03em] text-white transition-all duration-200 ease-in-out hover:opacity-90">
            View Projects
          </a>
          <a href="#contact" className="inline-block rounded-[8px] border border-[var(--border)] bg-transparent px-6 py-[0.65rem] font-mono text-[0.85rem] tracking-[0.03em] text-[var(--text-secondary)] transition-all duration-200 ease-in-out hover:border-[var(--accent-violet)] hover:text-[var(--text-primary)]">
            Get in Touch
          </a>
        </div>

        
      </div>
  );
}
