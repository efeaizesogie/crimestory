import React from 'react';
import { formatNumber, formatRate, formatPercent, getStateValue, CLASSIFICATIONS } from '../../utils/calculations';
import { CATEGORY_COLORS } from '../../utils/colors';

export default function MapTooltip({ stateData, mapMode, position }) {
  if (!stateData || !position) return null;

  const classification = CLASSIFICATIONS[mapMode] || CLASSIFICATIONS['total_cases'];
  const activeVal = getStateValue(stateData, mapMode);
  
  // Determine tooltip placement so it doesn't overflow edge of viewport
  const left = Math.min(position.x + 18, window.innerWidth - 300);
  const top = Math.max(position.y - 120, 20);

  const { persons, property, lawful_authority, local_acts } = stateData.categories;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        pointerEvents: 'none',
        zIndex: 100,
        backgroundColor: 'rgba(18, 22, 27, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        padding: '12px 16px',
        width: '270px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        transition: 'left 60ms linear, top 60ms linear'
      }}
    >
      {/* State Name & ISO Code */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-highlight)' }}>
          {stateData.state}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
          {stateData.code} · Rank #{stateData.rank_cases}
        </div>
      </div>

      {/* Primary Highlighted Metric */}
      <div style={{
        backgroundColor: 'var(--color-card)',
        padding: '8px 10px',
        borderRadius: '4px',
        border: '1px solid var(--color-border)',
        marginBottom: '10px'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
          {classification.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--color-crime-red-light)' }}>
            {mapMode === 'dominant_category' 
              ? activeVal 
              : mapMode.includes('rate') || mapMode === 'crime_rate' 
                ? formatRate(activeVal) 
                : formatNumber(activeVal)}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            {classification.unit}
          </span>
        </div>
      </div>

      {/* Summary Demographics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
        <div>
          <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '10px' }}>POPULATION</span>
          <span style={{ color: 'var(--color-text-primary)' }}>{formatNumber(stateData.population)}</span>
        </div>
        <div>
          <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '10px' }}>CRIME RATE</span>
          <span style={{ color: 'var(--color-text-primary)' }}>{formatRate(stateData.crime_rate_per_100k)}/100k</span>
        </div>
      </div>

      {/* 4-Category Mini Stacked Bar */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
          <span>CATEGORY SHARE</span>
          <span style={{ color: CATEGORY_COLORS[stateData.dominant_category] }}>
            {stateData.dominant_category} ({formatPercent(stateData.dominant_pct)})
          </span>
        </div>

        <div style={{ display: 'flex', height: '6px', borderRadius: '2px', overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>
          <div style={{ width: `${persons.pct}%`, backgroundColor: CATEGORY_COLORS['Persons'] }} title={`Persons: ${persons.pct}%`} />
          <div style={{ width: `${property.pct}%`, backgroundColor: CATEGORY_COLORS['Property'] }} title={`Property: ${property.pct}%`} />
          <div style={{ width: `${lawful_authority.pct}%`, backgroundColor: CATEGORY_COLORS['Lawful Authority'] }} title={`Authority: ${lawful_authority.pct}%`} />
          <div style={{ width: `${local_acts.pct}%`, backgroundColor: CATEGORY_COLORS['Local Acts'] }} title={`Local Acts: ${local_acts.pct}%`} />
        </div>
      </div>

      <div style={{ marginTop: '8px', fontSize: '10px', color: 'var(--color-text-muted)', textAlign: 'right', fontStyle: 'italic' }}>
        Click state to inspect full dossier
      </div>
    </div>
  );
}
