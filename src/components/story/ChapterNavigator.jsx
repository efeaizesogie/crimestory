import React from 'react';
import { BookOpen } from 'lucide-react';

export function ChapterNavigator({
  activeChapter,
  onSelectChapter,
  onOpenMethodology,
  chapters,
  scrollProgress = 0
}) {
  return (
    <nav className="editorial-navbar" aria-label="Story chapters navigation">
      <div className="nav-brand">
        <span className="brand-dot" />
        <span className="brand-title">NIGERIA · 2016</span>
      </div>

      {/* Numeric Progress Bar */}
      <div className="nav-chapters-list">
        {chapters.map((ch, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          const isActive = activeChapter === idx;

          return (
            <button
              key={ch.id}
              className={`nav-chapter-dot ${isActive ? 'active-dot' : ''}`}
              onClick={() => onSelectChapter(idx)}
              title={`${numStr}: ${ch.title}`}
              aria-label={`Jump to chapter ${numStr}: ${ch.title}`}
            >
              <span className="chapter-num font-mono">{numStr}</span>
              <span className="chapter-label-tooltip">{ch.title}</span>
            </button>
          );
        })}
      </div>

      <div className="nav-actions">
        <button
          className="nav-action-btn"
          onClick={onOpenMethodology}
          title="Data sources and methodology"
        >
          <BookOpen size={14} />
          <span>METHODOLOGY</span>
        </button>
      </div>

      {/* Fine-lined Editorial Scroll Progress Bar */}
      <div className="nav-scroll-progress-track" aria-hidden="true">
        <div
          className="nav-scroll-progress-bar"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>
    </nav>
  );
}
