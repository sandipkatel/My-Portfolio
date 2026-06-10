'use client';
import { useState, useEffect } from 'react';

const RSS_API = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@babusandipkatel';

function estimateReadTime(content = '') {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractThumbnail(content = '', thumbnail = '') {
  if (thumbnail && thumbnail !== 'https://cdn-images-1.medium.com/proxy/1*ogGbEfKVFv7VFSxCAIPR6A.gif') {
    return thumbnail;
  }
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

function extractTags(categories = []) {
  return categories.slice(0, 4);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const ACCENT_CYCLE = ['violet', 'cyan', 'amber', 'rose'];
const ACCENT = {
  violet: { bg: 'rgba(124,110,245,0.08)', border: 'rgba(124,110,245,0.2)', text: '#7c6ef5' },
  cyan:   { bg: 'rgba(45,212,191,0.08)',  border: 'rgba(45,212,191,0.2)',  text: '#2dd4bf' },
  amber:  { bg: 'rgba(245,166,35,0.08)',  border: 'rgba(245,166,35,0.2)',  text: '#f5a623' },
  rose:   { bg: 'rgba(240,98,146,0.08)',  border: 'rgba(240,98,146,0.2)',  text: '#f06292' },
};

function PostCard({ post, index }) {
  const accent = ACCENT[ACCENT_CYCLE[index % 4]];
  const readTime = estimateReadTime(post.content);
  const thumb = extractThumbnail(post.content, post.thumbnail);
  const tags = extractTags(post.categories);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = accent.border; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3)`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Thumbnail */}
      <div style={{
        height: '180px',
        background: thumb
          ? `url(${thumb}) center/cover no-repeat`
          : `linear-gradient(135deg, #12121e, #1a1a2e)`,
        position: 'relative',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, ${accent.text}, transparent)`,
        }} />
        {!thumb && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: accent.text, opacity: 0.3 }}>M</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            {formatDate(post.pubDate)}
          </span>
          <span style={{
            padding: '0.15rem 0.55rem',
            background: accent.bg,
            border: `1px solid ${accent.border}`,
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: accent.text,
          }}>
            {readTime} min read
          </span>
        </div>

        <h3 style={{
          fontSize: '0.97rem', fontWeight: 600,
          color: 'var(--text-primary)', lineHeight: 1.45,
          flex: 1,
        }}>
          {post.title}
        </h3>

        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {tags.map(tag => (
              <span key={tag} style={{
                padding: '0.15rem 0.5rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    fetch(RSS_API)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'ok') setPosts(data.items || []);
        else setError('Could not load posts.');
      })
      .catch(() => setError('Network error - could not reach Medium.'))
      .finally(() => setLoading(false));
  }, []);

  const allTags = ['All', ...Array.from(new Set(posts.flatMap(p => p.categories || []).filter(Boolean))).slice(0, 12)];
  const filtered = activeTag === 'All' ? posts : posts.filter(p => (p.categories || []).includes(activeTag));

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>Writing</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Blog
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.7 }}>
            I write about ML research, data engineering, and the occasional thing I had to figure out the hard way. Published on{' '}
            <a href="https://medium.com/@babusandipkatel" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-violet)', textDecoration: 'none' }}>Medium</a>.
          </p>
        </div>

        {/* Tag filter */}
        {!loading && posts.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {allTags.map(tag => (
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
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.04em',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* States */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: '320px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ height: '180px', background: 'var(--bg-secondary)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ height: '12px', width: '60%', background: 'var(--border)', borderRadius: '4px' }} />
                  <div style={{ height: '16px', width: '90%', background: 'var(--border)', borderRadius: '4px' }} />
                  <div style={{ height: '16px', width: '75%', background: 'var(--border)', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ padding: '3rem', textAlign: 'center', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg-card)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{error}</p>
            <a href="https://medium.com/@babusandipkatel" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--accent-violet)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              Read on Medium →
            </a>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            No posts found for "{activeTag}".
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((post, i) => (
              <PostCard key={post.guid || i} post={post} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}
