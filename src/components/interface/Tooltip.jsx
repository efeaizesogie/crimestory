import React from 'react';
import { formatNumber, formatRate, formatPercent } from '../../utils/formatting';

export function Tooltip({ hoveredState, position, mode }) {
  if (!hoveredState) return null;

  const s = hoveredState;

  return (
    <div
      className="editorial-tooltip"
      style={{
        position: 'absolute',
        left: `${position.x + 14}px`,
        top: `${position.y - 12}px`,
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      <div className="tooltip-header">
        <span className="tooltip-state-name">{s.name}</span>
        <span className="tooltip-code">{s.code}</span>
      </div>

      <div className="tooltip-body">
        <div className="tooltip-stat-row primary-stat">
          <span className="tooltip-num font-mono">{formatNumber(s.total_cases)}</span>
          <span className="tooltip-label">reported offences</span>
        </div>

        <div className="tooltip-stat-row">
          <span className="tooltip-num font-mono">{formatRate(s.crime_rate)}</span>
          <span className="tooltip-label">per 100,000</span>
        </div>

        <div className="tooltip-divider" />

        <div className="tooltip-categories">
          <div className="tooltip-cat-row">
            <span className="cat-bullet" style={{ backgroundColor: 'var(--cat-property)' }} />
            <span className="cat-name">Property</span>
            <span className="cat-pct font-mono">{formatPercent(s.property_pct)}</span>
          </div>
          <div className="tooltip-cat-row">
            <span className="cat-bullet" style={{ backgroundColor: 'var(--cat-persons)' }} />
            <span className="cat-name">Persons</span>
            <span className="cat-pct font-mono">{formatPercent(s.persons_pct)}</span>
          </div>
          <div className="tooltip-cat-row">
            <span className="cat-bullet" style={{ backgroundColor: 'var(--cat-authority)' }} />
            <span className="cat-name">Lawful Auth.</span>
            <span className="cat-pct font-mono">{formatPercent(s.authority_pct)}</span>
          </div>
          <div className="tooltip-cat-row">
            <span className="cat-bullet" style={{ backgroundColor: 'var(--cat-local)' }} />
            <span className="cat-name">Local Acts</span>
            <span className="cat-pct font-mono">{formatPercent(s.local_acts_pct)}</span>
          </div>
        </div>

        <div className="tooltip-footer">
          <span className="tooltip-pop">Pop: {formatNumber(s.population)}</span>
          <span className="tooltip-dom">Dominant: <strong>{s.dominant_category}</strong></span>
        </div>
      </div>
    </div>
  );
}
