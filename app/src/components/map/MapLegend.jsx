import React from 'react';
import { CLASSIFICATIONS } from '../../utils/calculations';
import { JENKS_COLORS, CATEGORY_COLORS } from '../../utils/colors';

export default function MapLegend({ mapMode }) {
  const classification = CLASSIFICATIONS[mapMode] || CLASSIFICATIONS['total_cases'];

  return (
    <div style={{
      position: 'absolute',
      bottom: '1.25rem',
      left: '1.5rem',
      zIndex: 10,
      background: 'rgba(18, 22, 27, 0.94)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid var(--color-border)',
      borderRadius: '4px',
      padding: '10px 14px',
      maxWidth: '340px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--color-text-secondary)',
        marginBottom: '6px'
      }}>
        {classification.title} ({classification.unit})
      </div>

      {/* Categorical Legend for Dominant Category Mode */}
      {mapMode === 'dominant_category' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '14px',
              height: '14px',
              backgroundColor: CATEGORY_COLORS['Property'],
              borderRadius: '2px',
              display: 'inline-block'
            }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
              Property Dominant (28 states — 75.7%)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '14px',
              height: '14px',
              backgroundColor: CATEGORY_COLORS['Persons'],
              borderRadius: '2px',
              display: 'inline-block'
            }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
              Persons Dominant (9 states — 24.3%)
            </span>
          </div>
        </div>
      ) : mapMode === 'concentration' ? (
        /* Concentration Proportional Symbols Legend */
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.4)',
            border: '1.5px solid #EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Lagos (45,385), FCT (13,181), Delta (7,867)
            </div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              Represent 52.81% of all reported offences nationally
            </div>
          </div>
        </div>
      ) : classification.breaks ? (
        /* Sequential 5-Class Jenks Legend */
        <div>
          <div style={{ display: 'flex', height: '8px', borderRadius: '2px', overflow: 'hidden' }}>
            {JENKS_COLORS.map((c, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: c
                }}
              />
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--color-text-muted)',
            marginTop: '4px'
          }}>
            <span>LOW ({classification.labels[0]})</span>
            <span>HIGH ({classification.labels[classification.labels.length - 1]})</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
