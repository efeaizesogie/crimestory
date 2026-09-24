import React from 'react';
import { PALETTES } from '../../utils/colors';

export function MapLegend({ mode }) {
  if (mode === 'CONCENTRATION') {
    return (
      <div className="map-legend-box">
        <div className="legend-title">PROPORTIONAL SYMBOLS</div>
        <div className="legend-subtitle">Concentration of reported offences</div>
        <div className="symbols-scale">
          {[
            { label: '> 1,000', r: 5 },
            { label: '> 5,000', r: 8 },
            { label: '> 10,000', r: 12 },
            { label: '> 20,000', r: 16 }
          ].map(item => (
            <div key={item.label} className="symbol-item">
              <div
                className="symbol-circle"
                style={{
                  width: item.r * 2,
                  height: item.r * 2,
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.85)',
                  border: '1px solid #F87171'
                }}
              />
              <span className="symbol-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'DOMINANT_CATEGORY' || mode === 'STATE_SIGNATURES') {
    const cats = [
      { name: 'Property', color: '#F97316', desc: 'Dominates in 28 states' },
      { name: 'Persons', color: '#EF4444', desc: 'Dominates in 9 states' },
      { name: 'Lawful Authority', color: '#14B8A6', desc: 'Institutional offences' },
      { name: 'Local Acts', color: '#A855F7', desc: 'Local jurisdiction statutes' }
    ];

    return (
      <div className="map-legend-box">
        <div className="legend-title">DOMINANT CRIME CATEGORY</div>
        <div className="legend-subtitle">Largest share of reported cases per state</div>
        <div className="category-legend-list">
          {cats.map(c => (
            <div key={c.name} className="cat-legend-row">
              <span className="cat-dot" style={{ backgroundColor: c.color }} />
              <div className="cat-info">
                <span className="cat-name">{c.name}</span>
                <span className="cat-desc">{c.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const palette = PALETTES[mode] || PALETTES.TOTAL_CASES;

  return (
    <div className="map-legend-box">
      <div className="legend-title">{palette.name.toUpperCase()}</div>
      <div className="legend-subtitle">{palette.unit}</div>

      {/* 5-class color bar */}
      <div className="legend-ramp">
        {palette.colors.map((col, idx) => (
          <div
            key={idx}
            className="legend-ramp-swatch"
            style={{ backgroundColor: col }}
          />
        ))}
      </div>

      {/* Break tick labels */}
      <div className="legend-ticks">
        {palette.labels.map((lbl, idx) => (
          <span key={idx} className="legend-tick-label">
            {lbl}
          </span>
        ))}
      </div>
    </div>
  );
}
