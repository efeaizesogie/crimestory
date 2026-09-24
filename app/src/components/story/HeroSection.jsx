import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { formatNumber } from '../../utils/calculations';

export default function HeroSection({ onStartStory }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'calc(var(--nav-height) + 3rem) 2rem 3rem 2rem',
      maxWidth: '1280px',
      margin: '0 auto',
      zIndex: 10
    }}>
      {/* Hero Background Image with Smooth Multi-Stop Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <img
          src="/hero-image-crime.png"
          alt="Lagos metropolis at dusk overlooking urban crime geography"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            opacity: 0.35,
            filter: 'contrast(1.1) brightness(0.9)'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right, rgba(11, 13, 16, 0.96) 0%, rgba(11, 13, 16, 0.82) 45%, rgba(11, 13, 16, 0.45) 80%, rgba(11, 13, 16, 0.75) 100%),
            linear-gradient(to bottom, rgba(11, 13, 16, 0.8) 0%, rgba(11, 13, 16, 0.15) 30%, rgba(11, 13, 16, 0.6) 75%, #0B0D10 100%)
          `
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '55vw',
          height: '55vh',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, transparent 65%)',
          filter: 'blur(60px)'
        }} />
      </div>

      {/* Hero Header Content */}
      <div style={{ maxWidth: '840px', marginTop: 'auto', marginBottom: 'auto', zIndex: 2, position: 'relative' }}>
        {/* <div className="editorial-eyebrow" style={{ marginBottom: '1.5rem' }}>
          NIGERIA · CRIME DATA · 2016
        </div> */}

        <h1 className="display-title" style={{ marginBottom: '1.75rem' }}>
          125,790 reported offences.
          <br />
          <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>
            One country. Very different crime landscapes.
          </span>
        </h1>

        <p className="body-narrative" style={{ fontSize: '20px', color: 'var(--color-text-secondary)', maxWidth: '720px', marginBottom: '2.5rem' }}>
          A visual investigation into where reported crime was recorded across Nigeria in 2016, how population changes the picture, and why different categories reveal different geographies.
        </p>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={onStartStory}
            style={{
              backgroundColor: 'var(--color-crime-red)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 24px',
              fontSize: '14px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition-fast)',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-crime-red-light)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-crime-red)'}
          >
            <span>Begin Investigation</span>
            <ArrowRight size={16} />
          </button>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Or scroll down to explore
          </span>
        </div>
      </div>

      {/* Key National Headline Metrics Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--color-border)',
        marginTop: '3rem'
      }}>
        <div>
          <div className="stat-numeral" style={{ color: 'var(--color-crime-red-light)' }}>
            125,790
          </div>
          <div className="stat-label">Total Reported Offences</div>
          <div className="caption-text" style={{ marginTop: '2px' }}>Recorded nationally in 2016</div>
        </div>

        <div>
          <div className="stat-numeral">
            36.1%
          </div>
          <div className="stat-label">Lagos Concentration</div>
          <div className="caption-text" style={{ marginTop: '2px' }}>45,385 cases in one state</div>
        </div>

        <div>
          <div className="stat-numeral">
            52.8%
          </div>
          <div className="stat-label">Top 3 Territories</div>
          <div className="caption-text" style={{ marginTop: '2px' }}>Lagos, FCT, & Delta combined</div>
        </div>

        <div>
          <div className="stat-numeral">
            52.0%
          </div>
          <div className="stat-label">Property Offences</div>
          <div className="caption-text" style={{ marginTop: '2px' }}>65,397 cases — #1 category</div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        marginTop: '2rem',
        color: 'var(--color-text-muted)',
        fontSize: '11px',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.12em'
      }}>
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown size={14} className="symbol-pulse" />
      </div>
    </section>
  );
}
