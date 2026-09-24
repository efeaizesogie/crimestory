import React, { useState } from 'react';
import { Volume2, VolumeX, Map, List, X, ChevronRight } from 'lucide-react';

export default function EditorialNav({ 
  chapters, 
  activeChapterIndex, 
  onSelectChapter, 
  onOpenArchive,
  audioActive,
  onToggleAudio 
}) {
  const [indexOpen, setIndexOpen] = useState(false);
  const currentChapter = chapters[activeChapterIndex] || chapters[0];
  const progressPercent = ((activeChapterIndex + 1) / chapters.length) * 100;

  return (
    <>
      <header className="editorial-nav-bar" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        backgroundColor: 'rgba(11, 13, 16, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem'
      }}>
        {/* Left: Branding & Chapter Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-crime-red)',
              boxShadow: '0 0 8px var(--color-crime-red)'
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--color-text-primary)'
            }}>
              NIGERIA <span style={{ color: 'var(--color-text-muted)' }}>/</span> 2016
            </span>
          </div>

          <div style={{ width: '1px', height: '18px', backgroundColor: 'var(--color-border)' }} />

          {/* Current chapter pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-surface)',
              padding: '2px 8px',
              borderRadius: '2px',
              border: '1px solid var(--color-border)'
            }}>
              {currentChapter?.tag || '01'} / {String(chapters.length).padStart(2, '0')}
            </span>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              maxWidth: '320px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {currentChapter?.headline}
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Audio soundscape toggle */}
          <button
            onClick={onToggleAudio}
            title={audioActive ? "Mute ambient audio" : "Enable atmospheric soundscape"}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '6px 10px',
              color: audioActive ? 'var(--color-crime-red-light)' : 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              transition: 'var(--transition-fast)'
            }}
          >
            {audioActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span style={{ display: 'none', md: 'inline' }}>{audioActive ? 'SOUND ON' : 'MUTE'}</span>
          </button>

          {/* Archival cartography maps gallery */}
          <button
            onClick={onOpenArchive}
            title="View original authoritative cartographic maps"
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '6px 12px',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              transition: 'var(--transition-fast)'
            }}
          >
            <Map size={14} />
            <span>Map Archive</span>
          </button>

          {/* Table of contents / chapters index */}
          <button
            onClick={() => setIndexOpen(!indexOpen)}
            style={{
              background: indexOpen ? 'var(--color-crime-red)' : 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '6px 12px',
              color: indexOpen ? '#FFFFFF' : 'var(--color-text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              transition: 'var(--transition-fast)'
            }}
          >
            <List size={14} />
            <span>Chapters</span>
          </button>
        </div>

        {/* Top Slim Scroll Progress Line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: `${progressPercent}%`,
          backgroundColor: 'var(--color-crime-red)',
          transition: 'width 250ms ease-out'
        }} />
      </header>

      {/* Chapters Index Drawer / Overlay */}
      {indexOpen && (
        <div style={{
          position: 'fixed',
          top: 'var(--nav-height)',
          right: 0,
          width: '380px',
          maxWidth: '90vw',
          bottom: 0,
          backgroundColor: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
          zIndex: 60,
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div className="editorial-eyebrow">TABLE OF CONTENTS</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '4px' }}>
                Investigation Chapters
              </div>
            </div>
            <button
              onClick={() => setIndexOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {chapters.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(idx);
                    setIndexOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: '4px',
                    marginBottom: '6px',
                    background: isActive ? 'var(--color-card)' : 'transparent',
                    border: isActive ? '1px solid var(--color-crime-red-light)' : '1px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: isActive ? 'var(--color-crime-red)' : 'var(--color-text-muted)',
                    marginTop: '2px'
                  }}>
                    {ch.tag}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: isActive ? 'var(--color-text-highlight)' : 'var(--color-text-primary)'
                    }}>
                      {ch.headline}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'var(--color-text-muted)',
                      marginTop: '2px',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {ch.eyebrow}
                    </div>
                  </div>
                  {isActive && <ChevronRight size={16} color="var(--color-crime-red)" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
