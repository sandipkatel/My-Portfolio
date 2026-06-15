'use client';
import { useState, useEffect, useRef } from 'react';
import { projects } from '@/data/projects';

const ALL_TAGS = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

// Each card's footprint is derived from how much content it's carrying —
// a project with an image and a long pitch earns more room than a bare entry.
function getCardSpan(project) {
  const hasImage = Boolean(project.image);
  const tagCount = project.tags?.length || 0;
  const taglineLen = project.tagline?.length || 0;

  // sm:-prefixed so mobile always falls back to a single-column landscape card
  if (project.featured && hasImage) return 'sm:col-span-2 sm:row-span-2'; // large
  if (project.featured) return 'sm:col-span-2'; // wide
  if (hasImage && taglineLen > 70) return 'sm:col-span-2'; // wide
  if (hasImage) return 'sm:row-span-2'; // tall
  if (taglineLen > 90 || tagCount > 4) return 'sm:col-span-2'; // wide
  return ''; // square
}

// Reveals an element once it scrolls into view, then stops watching.
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function ProjectCard({ project, index }) {
  const span = getCardSpan(project);
  const primaryLink = project.github || project.demo;
  const [ref, inView] = useInView();

  const goToPrimary = () => {
    if (primaryLink) window.open(primaryLink, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && primaryLink) {
      e.preventDefault();
      goToPrimary();
    }
  };

  return (
    <div
      ref={ref}
      role={primaryLink ? 'link' : undefined}
      tabIndex={primaryLink ? 0 : undefined}
      onClick={goToPrimary}
      onKeyDown={handleKeyDown}
      style={{ transitionDelay: inView ? `${(index % 4) * 80}ms` : '0ms' }}
      className={`group relative flex flex-col justify-between overflow-hidden border-b border-r border-white/10 bg-white/[0.02] p-5 transition-all duration-500 ease-out hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/40 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${span} ${
        primaryLink ? 'cursor-pointer' : ''
      } ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
    >
      {project.image && (
        <>
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-30 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
        </>
      )}

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40">{project.year}</span>
        {project.featured && (
          <span className="border border-white/20 px-2 py-0.5 font-mono text-[0.6rem] tracking-wide text-white/70">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="relative z-10 mt-4">
        <h3 className="mb-1.5 text-base font-semibold leading-snug text-white">{project.title}</h3>
        <p className="mb-3 text-[0.83rem] leading-relaxed text-white/60 line-clamp-3">{project.tagline}</p>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="border border-white/15 px-2 py-0.5 font-mono text-[0.65rem] text-white/50"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-white/40">
          {project.github && (
            <span className="border-b border-white/20 transition-colors group-hover:border-white group-hover:text-white">
              GitHub ↗
            </span>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="border-b border-white/20 transition-colors hover:border-white hover:text-white"
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectSection() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All' ? projects : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="min-h-screen pt-[100px]">
      <div className="mx-auto max-w-[1200px] px-6 pb-24" >
        {/* Header */}
        <div className="mb-12">
          <p className="section-eyebrow mb-3">2 — All work</p>
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white">
            Projects
          </h1>
          <p className="max-w-[520px] text-[0.95rem] leading-relaxed text-white/60">
            A wall of everything I&apos;ve built. Each card opens straight to the source on GitHub.
          </p>
        </div>

        {/* Tag filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`border px-3 py-1 font-mono text-xs tracking-wide transition-colors ${
                activeTag === tag
                  ? 'border-white bg-white text-black'
                  : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="mb-6 font-mono text-[0.72rem] tracking-[0.08em] text-white/40">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeTag !== 'All' ? ` tagged "${activeTag}"` : ''}
        </p>

        {/* Brick-wall grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[12rem] sm:auto-rows-[14rem] grid-flow-dense border-l border-t border-white/10">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View more */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/babusandipkatel?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 px-6 py-2.5 font-mono text-xs tracking-[0.08em] text-white/60 transition-colors hover:border-white hover:text-white"
          >
            View more projects on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
