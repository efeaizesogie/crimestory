import React, { useRef, useLayoutEffect, useState } from 'react';
import { formatNumber, formatRate, formatPercent } from '../../utils/formatting';

export function Tooltip({ hoveredState, position, mode, containerDimensions }) {
  const tooltipRef = useRef(null);
  const [measuredSize, setMeasuredSize] = useState({ width: 230, height: 240 });

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (
          Math.abs(rect.width - measuredSize.width) > 2 ||
          Math.abs(rect.height - measuredSize.height) > 2
        ) {
          setMeasuredSize({ width: rect.width, height: rect.height });
        }
      }
    }
  }, [hoveredState]);

  if (!hoveredState) return null;

  const s = hoveredState;

  const containerW = containerDimensions?.width || (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 800);
  const containerH = containerDimensions?.height || (typeof window !== 'undefined' ? window.innerHeight : 700);

  const tooltipW = tooltipRef.current?.offsetWidth || measuredSize.width || 230;
  const tooltipH = tooltipRef.current?.offsetHeight || measuredSize.height || 240;

  const margin = 16;
  const cursorGap = 16;

  // Horizontal calculation: default to right of cursor (+16px)
  let left = position.x + cursorGap;
  // If tooltip exceeds right boundary, flip it to the left side of cursor
  if (left + tooltipW > containerW - margin) {
    left = position.x - tooltipW - cursorGap;
  }
  // Clamp horizontally so it never goes off-screen
  left = Math.max(margin, Math.min(left, containerW - tooltipW - margin));

  // Vertical calculation: default slightly above cursor (-12px)
  let top = position.y - 12;
  // If tooltip exceeds bottom boundary, flip it above the cursor
  if (top + tooltipH > containerH - margin) {
    top = position.y - tooltipH - cursorGap;
  }
  // Clamp vertically so it never clips top or bottom
  top = Math.max(margin, Math.min(top, containerH - tooltipH - margin));

  return (
    <div
      ref={tooltipRef}
      className="editorial-tooltip"
      style={{
        position: 'absolute',
        left: `${Math.round(left)}px`,
        top: `${Math.round(top)}px`,
        pointerEvents: 'none',
        zIndex: 1000,
        maxHeight: `${Math.max(160, containerH - margin * 2)}px`,
        overflowY: 'auto'
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
