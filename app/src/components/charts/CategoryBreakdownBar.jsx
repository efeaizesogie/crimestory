import React from 'react';
import { NATIONAL_TOTALS, formatNumber, formatPercent } from '../../utils/calculations';
import { CATEGORY_COLORS } from '../../utils/colors';

export default function CategoryBreakdownBar({
  selectedState,
  activeMode,
  onSelectCategoryMode
}) {
  const data = selectedState ? {
    title: `${selectedState.state} Profile`,
    total: selectedState.total_cases,
    persons: selectedState.categories.persons,
    property: selectedState.categories.property,
    authority: selectedState.categories.lawful_authority,
    local: selectedState.categories.local_acts
  } : {
    title: 'National Distribution (125,790 cases)',
    total: NATIONAL_TOTALS.totalCases,
    persons: NATIONAL_TOTALS.persons,
    property: NATIONAL_TOTALS.property,
    authority: NATIONAL_TOTALS.authority,
    local: NATIONAL_TOTALS.localActs
  };

  const categories = [
    { key: 'property', name: 'Offences Against Property', short: 'Property', mode: 'rate_property', stats: data.property, color: CATEGORY_COLORS['Property'] },
    { key: 'persons', name: 'Offences Against Persons', short: 'Persons', mode: 'rate_persons', stats: data.persons, color: CATEGORY_COLORS['Persons'] },
    { key: 'authority', name: 'Offences Against Lawful Authority', short: 'Authority', mode: 'rate_authority', stats: data.authority, color: CATEGORY_COLORS['Lawful Authority'] },
    { key: 'local', name: 'Offences Against Local Acts', short: 'Local Acts', mode: 'rate_local', stats: data.local, color: CATEGORY_COLORS['Local Acts'] }
  ];

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '6px',
      padding: '1.25rem',
      marginTop: '1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
        <div>
          <div className="editorial-eyebrow">CATEGORY PROPORTIONS</div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {data.title}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
          TOTAL: {formatNumber(data.total)}
        </div>
      </div>

      {/* 100% Stacked Bar */}
      <div style={{
        display: 'flex',
        height: '24px',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        marginBottom: '1rem',
        backgroundColor: 'var(--color-bg)'
      }}>
        {categories.map(cat => (
          <div
            key={cat.key}
            onClick={() => onSelectCategoryMode(cat.mode)}
            title={`${cat.name}: ${formatNumber(cat.stats.count)} (${formatPercent(cat.stats.pct)}) — Click to map`}
            style={{
              width: `${cat.stats.pct}%`,
              backgroundColor: cat.color,
              height: '100%',
              cursor: 'pointer',
              transition: 'opacity 200ms ease, width 400ms ease',
              opacity: activeMode === cat.mode ? 1 : 0.85
            }}
          />
        ))}
      </div>

      {/* Category Grid Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
        {categories.map(cat => {
          const isActive = activeMode === cat.mode;
          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategoryMode(cat.mode)}
              style={{
                textAlign: 'left',
                background: isActive ? 'var(--color-card)' : 'transparent',
                border: isActive ? `1px solid ${cat.color}` : '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: '8px 10px',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  {cat.short}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-highlight)' }}>
                {formatPercent(cat.stats.pct)}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)' }}>
                {formatNumber(cat.stats.count)} cases
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
