import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ArchivalCartographyModal({ isOpen, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const archiveItems = [
    {
      id: 'total-cases',
      title: '01. Where Was Crime Reported?',
      subtitle: '125,790 reported offences across Nigeria · 2016',
      image: '/assets/Total cases.png',
      description: 'Original choropleth map showing total reported offences categorized via Natural Breaks (Jenks). Features the authoritative callout of Lagos recording 45,385 cases.'
    },
    {
      id: 'crime-rate',
      title: '02. Reported Crime Rate',
      subtitle: 'Offences reported per 100,000 population',
      image: '/assets/Crimerate.png',
      description: 'Standardizes raw counts by state population. Lagos (351.2/100k) and FCT (337.0/100k) stand out dramatically from the national baseline.'
    },
    {
      id: 'dominant-states',
      title: '03. The Dominant States (Concentration)',
      subtitle: 'Lagos, FCT, and Delta account for 52.81% of all cases',
      image: '/assets/dominant states.png',
      description: 'Proportional symbol cartography highlighting the three centers that hold more than half of all national reported crime.'
    },
    {
      id: 'against-persons',
      title: '04. Offences Against Persons',
      subtitle: 'Assault, violence, and homicide rates per 100k',
      image: '/assets/AgainstPersons.png',
      description: 'Choropleth analysis of violence against individuals. Shows divergence in northern and central states where persons offences predominate.'
    },
    {
      id: 'against-properties',
      title: '05. Offences Against Property',
      subtitle: 'The largest category in Nigeria (51.99% of all cases)',
      image: '/assets/AgainstProperties.png',
      description: 'The single most voluminous crime category in Nigeria, heavily concentrated in commercial and urban centers.'
    },
    {
      id: 'against-authority',
      title: '06. Offences Against Lawful Authority',
      subtitle: 'Resisting arrest, contempt of court, public order infractions',
      image: '/assets/AgainstAuthority.png',
      description: 'Institutional infractions against security agencies, judicial processes, and state governance.'
    },
    {
      id: 'local-acts',
      title: '07. Offences Against Local Acts',
      subtitle: 'State-specific and municipal bylaws',
      image: '/assets/Localact.png',
      description: 'Specialized local statutory violations, demonstrating unique regional legislative enforcement.'
    },
    {
      id: 'dominant-case',
      title: '08. Dominant Category by State',
      subtitle: 'Property dominant (28 states) vs Persons dominant (9 states)',
      image: '/assets/Dominate case.png',
      description: 'Categorical map isolating the primary crime classification for each administrative division.'
    },
    {
      id: 'dimension-crime',
      title: '09. The Dimension of Crime (Scatterplot)',
      subtitle: 'Crimerate (X) vs Persons % (Y)',
      image: '/assets/dimension of crime.png',
      description: 'Original analytical scatterplot comparing crime incidence rate against personal violence share.'
    }
  ];

  // Esc key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx(i => (i + 1) % archiveItems.length);
      if (e.key === 'ArrowLeft') setActiveIdx(i => (i - 1 + archiveItems.length) % archiveItems.length);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, archiveItems.length]);

  if (!isOpen) return null;

  const currentItem = archiveItems[activeIdx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 9, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        animation: 'fadeIn 200ms ease'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Top Modal Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '1rem'
      }}>
        <div>
          <div className="editorial-eyebrow">CARTOGRAPHIC ARCHIVE & REFERENCES</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-highlight)', marginTop: '2px' }}>
            {currentItem.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            {currentItem.subtitle} · Item {activeIdx + 1} of {archiveItems.length}
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close archive gallery"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Exhibition Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Previous Button */}
        <button
          onClick={() => setActiveIdx(i => (i - 1 + archiveItems.length) % archiveItems.length)}
          style={{
            position: 'absolute',
            left: '1rem',
            background: 'rgba(18, 22, 27, 0.85)',
            border: '1px solid var(--color-border)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* High Resolution Image View */}
        <div style={{
          maxHeight: '100%',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={currentItem.image}
            alt={currentItem.title}
            style={{
              maxHeight: 'calc(100vh - 240px)',
              maxWidth: '85vw',
              objectFit: 'contain',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.8)'
            }}
          />
          <div style={{
            maxWidth: '680px',
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-sans)'
          }}>
            {currentItem.description}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => setActiveIdx(i => (i + 1) % archiveItems.length)}
          style={{
            position: 'absolute',
            right: '1rem',
            background: 'rgba(18, 22, 27, 0.85)',
            border: '1px solid var(--color-border)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingTop: '1rem',
        borderTop: '1px solid var(--color-border)',
        marginTop: '0.75rem'
      }}>
        {archiveItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIdx(idx)}
            style={{
              flexShrink: 0,
              width: '100px',
              height: '60px',
              borderRadius: '4px',
              overflow: 'hidden',
              border: idx === activeIdx ? '2px solid var(--color-crime-red)' : '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              cursor: 'pointer',
              padding: 0,
              opacity: idx === activeIdx ? 1 : 0.6,
              transition: 'opacity 150ms ease, border-color 150ms ease'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
