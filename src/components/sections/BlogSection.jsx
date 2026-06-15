'use client';
import { useState, useEffect } from 'react';
import { useReveal } from '../useReveal';

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

function PostCard({ post }) {
  const readTime = estimateReadTime(post.content);
  const thumb = extractThumbnail(post.content, post.thumbnail);
  const tags = extractTags(post.categories);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:bg-white/[0.05]"
    >
      {/* Thumbnail */}
      <div className="relative h-44 flex-shrink-0 bg-white/[0.03]">
        {thumb ? (
          <img src={thumb} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-3xl text-white/15">M</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.68rem] tracking-[0.08em] text-white/40">
            {formatDate(post.pubDate)}
          </span>
          <span className="border border-white/15 px-2 py-0.5 font-mono text-[0.65rem] text-white/50">
            {readTime} min read
          </span>
        </div>

        <h3 className="flex-1 text-[0.97rem] font-semibold leading-snug text-white">{post.title}</h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/10 px-2 py-0.5 font-mono text-[0.65rem] text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

export default function BlogSection() {
  const ref = useReveal();
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(RSS_API)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'ok') setPosts(data.items || []);
        else setError('Could not load posts.');
      })
      .catch(() => setError('Network error — could not reach Medium.'))
      .finally(() => setLoading(false));
  }, []);

  const latest = posts.slice(0, 3);

  return (
    <section id="blogs" className="min-h-screen pt-[100px]">
      <div className="mx-auto max-w-[1200px] px-6 pb-24" ref={ref}>
        {/* Header */}
        <div className="mb-12">
          <p className="section-eyebrow mb-3">3 — Writing</p>
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white">Blog</h1>
          <p className="max-w-[500px] text-[0.95rem] leading-relaxed text-white/60">
            I write about ML research, data engineering, and the occasional thing I had to figure out the hard way.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="h-44 animate-pulse bg-white/[0.04]" />
                <div className="flex flex-col gap-3 p-5">
                  <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
            <p className="font-mono text-[0.85rem] text-white/40">{error}</p>
            <a
              href="https://medium.com/@babusandipkatel"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-[0.8rem] text-white/60 underline underline-offset-4 transition-colors hover:text-white"
            >
              Read on Medium →
            </a>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && latest.length === 0 && (
          <p className="font-mono text-[0.85rem] text-white/40">No posts found.</p>
        )}

        {/* Posts */}
        {!loading && !error && latest.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.guid || post.link} post={post} />
            ))}
          </div>
        )}

        {/* View more */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://medium.com/@babusandipkatel"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 px-6 py-2.5 font-mono text-xs tracking-[0.08em] text-white/60 transition-colors hover:border-white hover:text-white"
          >
            Read more on Medium ↗
          </a>
        </div>
      </div>
    </section>
  );
}