import React from 'react';
import { Download, FileText, ShieldAlert, Database, BookOpen, Layers } from 'lucide-react';
import { NATIONAL_TOTALS, formatNumber } from '../../utils/calculations';

export default function MethodologySection() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: '5rem 2rem 4rem 2rem',
      marginTop: '6rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        {/* Eyebrow & Title */}
        <div className="editorial-eyebrow" style={{ marginBottom: '1rem' }}>
          DATA INTEGRITY & CARTOGRAPHIC METHODOLOGY
        </div>

        <h2 className="section-headline" style={{ maxWidth: '780px', marginBottom: '2rem' }}>
          A map of reported crime is not a map of all crime.
        </h2>

        {/* Investigative Disclaimers & Methodological Breakdown */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-crime-red-light)', marginBottom: '0.75rem', fontWeight: 600 }}>
              <ShieldAlert size={18} />
              <span>Reporting Density vs Actual Occurrence</span>
            </div>
            <p className="body-narrative" style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
              The 125,790 cases in this investigation reflect criminal offences officially recorded by the Nigeria Police Force (NPF) commands in 2016. High numbers in commercial capitals like Lagos (45,385) or the Federal Capital Territory (13,181) reflect not merely crime volume, but substantial institutional density: a higher ratio of police stations, greater civilian trust or willingness to file formal reports, commercial insurance mandates requiring police documentation, and structured record-keeping.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-cat-property)', marginBottom: '0.75rem', fontWeight: 600 }}>
              <Layers size={18} />
              <span>The Shadow of Unrecorded Offences</span>
            </div>
            <p className="body-narrative" style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
              Conversely, lower totals in rural, agrarian, or northern states should not be simplistically interpreted as absence of crime. In regions where formal police posts are sparse, distances to police divisions are vast, or community and traditional dispute resolution mechanisms are preferred, significant volumes of infractions never enter official state crime ledgers.
            </p>
          </div>
        </div>

        {/* Data Provenance & Download Panel */}
        <div style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <div className="editorial-eyebrow" style={{ marginBottom: '6px' }}>SOURCE PROVENANCE</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              National Bureau of Statistics (NBS) & Nigeria Police Force
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Extracted from official annual crime statistics and administrative state boundaries (GRCh / WGS84 Web Mercator).
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="/assets/Nigeria_Crime_Data.csv"
              download="Nigeria_Crime_Data.csv"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: '10px 16px',
                color: 'var(--color-text-primary)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-crime-red)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <Download size={14} />
              <span>Download CSV (37 States)</span>
            </a>

            <a
              href="/assets/nigeria-states.geojson"
              download="nigeria-states.geojson"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: '10px 16px',
                color: 'var(--color-text-primary)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-crime-red)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <Database size={14} />
              <span>Download GeoJSON</span>
            </a>
          </div>
        </div>

        {/* Colophon & Credits */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)'
        }}>
          <div>
            TYPOGRAPHY: IBM PLEX SANS & IBM PLEX MONO · ENGINE: D3.JS VECTOR CARTOGRAPHY & REACT
          </div>
          <div>
            2016 NIGERIA CRIME INVESTIGATION · AN EDITORIAL DIGITAL STORY
          </div>
        </div>
      </div>
    </footer>
  );
}
