import React from 'react';
import { formatNumber, formatPercent } from '../../utils/formatting';

export function CategoryBreakdown({ activeCategory, onSelectCategory }) {
  const categories = [
    {
      id: 'PROPERTY_RATE',
      name: 'Property',
      cases: 65397,
      pct: 52.0,
      color: 'var(--cat-property)',
      desc: 'Stealing, burglary, robbery, housebreaking, false pretence'
    },
    {
      id: 'PERSONS_RATE',
      name: 'Persons',
      cases: 45554,
      pct: 36.2,
      color: 'var(--cat-persons)',
      desc: 'Murder, manslaughter, rape, assault, physical abuse'
    },
    {
      id: 'AUTHORITY_RATE',
      name: 'Lawful Authority',
      cases: 12144,
      pct: 9.7,
      color: 'var(--cat-authority)',
      desc: 'Infractions against legal institutions, tax statutes'
    },
    {
      id: 'LOCAL_ACTS_RATE',
      name: 'Local Acts',
      cases: 2695,
      pct: 2.1,
      color: 'var(--cat-local)',
      desc: 'Nigeria-specific legislation (Liquor Act, Firearms Act)'
    }
  ];

  return (
    <div className="category-breakdown-card">
      <div className="cat-breakdown-header">
        <span className="eyebrow">NATIONAL TOTAL CLASSIFICATION</span>
        <h4 className="card-headline">125,790 CASES IN FOUR CATEGORIES</h4>
      </div>

      <div className="cat-bars-list">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              className={`cat-bar-interactive-item ${isActive ? 'cat-bar-active' : ''}`}
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="cat-bar-meta">
                <div className="cat-title-group">
                  <span className="cat-bullet" style={{ backgroundColor: cat.color }} />
                  <span className="cat-name-label">{cat.name}</span>
                </div>
                <div className="cat-stat-group font-mono">
                  <span className="cat-count">{formatNumber(cat.cases)}</span>
                  <span className="cat-pct-badge">{formatPercent(cat.pct)}</span>
                </div>
              </div>

              {/* Horizontal Bar */}
              <div className="cat-bar-track">
                <div
                  className="cat-bar-fill"
                  style={{
                    width: `${cat.pct}%`,
                    backgroundColor: cat.color
                  }}
                />
              </div>

              <div className="cat-desc-sub">{cat.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
