import React, { useRef, useLayoutEffect, useState } from 'react';
import { formatNumber, formatRate, formatPercent } from '../../utils/formatting';
import crimeData from '../../data/nigeria-crime.json';

// Pre-compute national rankings across all 37 entities for instant lookups
const statesList = crimeData?.states || [];

const rankMaps = {
  total_cases: {},
  crime_rate: {},
  persons_rate: {},
  property_rate: {},
  authority_rate: {},
  local_acts_rate: {},
  property_divergence: {}
};

['total_cases', 'crime_rate', 'persons_rate', 'property_rate', 'authority_rate', 'local_acts_rate', 'property_divergence'].forEach(key => {
  const sorted = [...statesList].sort((a, b) => (b[key] ?? 0) - (a[key] ?? 0));
  sorted.forEach((item, idx) => {
    rankMaps[key][item.code] = idx + 1;
    rankMaps[key][item.name] = idx + 1;
  });
});

export function Tooltip({ hoveredState, position, mode, containerDimensions }) {
  const tooltipRef = useRef(null);
  const [measuredSize, setMeasuredSize] = useState({ width: 250, height: 220 });

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
  }, [hoveredState, mode]);

  if (!hoveredState) return null;

  const s = hoveredState;
  const getRank = (metricKey) => rankMaps[metricKey]?.[s.code] || rankMaps[metricKey]?.[s.name] || '–';

  const containerW = containerDimensions?.width || (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 800);
  const containerH = containerDimensions?.height || (typeof window !== 'undefined' ? window.innerHeight : 700);

  const tooltipW = tooltipRef.current?.offsetWidth || measuredSize.width || 250;
  const tooltipH = tooltipRef.current?.offsetHeight || measuredSize.height || 220;

  const margin = 16;
  const cursorGap = 16;

  // Horizontal calculation: default to right of cursor (+16px)
  let left = position.x + cursorGap;
  if (left + tooltipW > containerW - margin) {
    left = position.x - tooltipW - cursorGap;
  }
  left = Math.max(margin, Math.min(left, containerW - tooltipW - margin));

  // Vertical calculation: default slightly above cursor (-12px)
  let top = position.y - 12;
  if (top + tooltipH > containerH - margin) {
    top = position.y - tooltipH - cursorGap;
  }
  top = Math.max(margin, Math.min(top, containerH - tooltipH - margin));

  const nationalShare = ((s.total_cases / 125790) * 100).toFixed(2);

  // Render context-specific body based on the active map mode
  const renderModeContent = () => {
    switch (mode) {
      case 'TOTAL_CASES':
        return (
          <>
            <div className="tooltip-mode-header">
              <span className="tooltip-badge-pill "></span>
              <span className="tooltip-rank-tag font-mono">Rank #{getRank('total_cases')} of 37</span>
            </div>
            <div className="tooltip-hero-stat">
              <span className="tooltip-hero-num font-mono text-red">{formatNumber(s.total_cases)}</span>
              <span className="tooltip-hero-label">total reported offences (2016)</span>
            </div>
            <div className="tooltip-metrics-grid">
              <div className="tooltip-metric-item">
                <span className="metric-label">Share of Nigeria</span>
                <span className="metric-val font-mono">{nationalShare}%</span>
              </div>
              <div className="tooltip-metric-item">
                <span className="metric-label">State Population</span>
                <span className="metric-val font-mono">{formatNumber(s.population)}</span>
              </div>
            </div>
            <div className="tooltip-divider" />
            <div className="tooltip-context-row">
              <span
                className="cat-bullet"
                style={{
                  backgroundColor: s.dominant_category === 'Property' ? 'var(--cat-property)' : 'var(--cat-persons)'
                }}
              />
              <span className="context-text">
                Dominant: <strong>{s.dominant_category}</strong> (
                {formatPercent(s.dominant_category === 'Property' ? s.property_pct : s.persons_pct)})
              </span>
            </div>
          </>
        );

      case 'CRIME_RATE':
        return (
          <>
            <div className="tooltip-mode-header">
              <span className="tooltip-badge-pill "></span>
              <span className="tooltip-rank-tag font-mono">Rate #{getRank('crime_rate')} of 37</span>
            </div>
            <div className="tooltip-hero-stat">
              <span className="tooltip-hero-num font-mono text-peach">{formatRate(s.crime_rate)}</span>
              <span className="tooltip-hero-label">reported offences per 100,000 residents</span>
            </div>
            <div className="tooltip-metrics-grid">
              <div className="tooltip-metric-item">
                <span className="metric-label">Reported Count</span>
                <span className="metric-val font-mono">{formatNumber(s.total_cases)}</span>
              </div>
              <div className="tooltip-metric-item">
                <span className="metric-label">Population Base</span>
                <span className="metric-val font-mono">{formatNumber(s.population)}</span>
              </div>
            </div>
            <div className="tooltip-divider" />
            <div className="tooltip-comparison-bar">
              <span className="comp-label">vs National Rate (63.1):</span>
              <span className={`comp-val font-mono ${s.crime_rate >= 63.1 ? 'comp-high' : 'comp-low'}`}>
                {s.crime_rate >= 63.1
                  ? `+${(s.crime_rate - 63.1).toFixed(1)} (${((s.crime_rate / 63.1) * 100).toFixed(0)}%)`
                  : `${(s.crime_rate - 63.1).toFixed(1)} (${((s.crime_rate / 63.1) * 100).toFixed(0)}%)`}
              </span>
            </div>
          </>
        );

      case 'CONCENTRATION': {
        const topConcentrationStates = ['Lagos', 'FCT', 'Delta', 'Kano'];
        const isTop = topConcentrationStates.includes(s.name);
        const hubRanks = { Lagos: 1, FCT: 2, Delta: 3, Kano: 4 };

        return (
          <>
            <div className="tooltip-mode-header">
              <span className={`tooltip-badge-pill ${isTop ? 'badge-hub-lead' : 'badge-hub-other'}`}>
                {isTop ? `★ TOP CONCENTRATION HUB #${hubRanks[s.name]}` : 'REGIONAL CRIME VOLUME'}
              </span>
              <span className="tooltip-rank-tag font-mono">Volume #{getRank('total_cases')}</span>
            </div>
            <div className="tooltip-hero-stat">
              <span className="tooltip-hero-num font-mono text-red">{formatNumber(s.total_cases)}</span>
              <span className="tooltip-hero-label">cases ({nationalShare}% of Nigeria's 125,790 total)</span>
            </div>
            <div className="tooltip-metrics-grid">
              <div className="tooltip-metric-item">
                <span className="metric-label">Per-Capita Rate</span>
                <span className="metric-val font-mono">{formatRate(s.crime_rate)} / 100k</span>
              </div>
              <div className="tooltip-metric-item">
                <span className="metric-label">State Population</span>
                <span className="metric-val font-mono">{formatNumber(s.population)}</span>
              </div>
            </div>
            <div className={`tooltip-hub-note ${isTop ? 'top-hub' : 'regular-hub'}`}>
              {isTop
                ? 'Part of the 56.7% national concentration cluster (Lagos, FCT, Delta, Kano).'
                : `Dispersed volume contributing ${nationalShare}% to national total.`}
            </div>
          </>
        );
      }

      case 'PROPERTY_RATE':
        return (
          <>
            <div className="tooltip-mode-header">
              <span className="tooltip-badge-pill "></span>
              <span className="tooltip-rank-tag font-mono">Property Rank #{getRank('property_rate')}</span>
            </div>
            <div className="tooltip-hero-stat">
              <span className="tooltip-hero-num font-mono text-orange">{formatRate(s.property_rate)}</span>
              <span className="tooltip-hero-label">property offences per 100,000 residents</span>
            </div>
            <div className="tooltip-metrics-grid">
              <div className="tooltip-metric-item">
                <span className="metric-label">Property Cases</span>
                <span className="metric-val font-mono">{formatNumber(s.property)}</span>
              </div>
              <div className="tooltip-metric-item">
                <span className="metric-label">State Crime Share</span>
                <span className="metric-val font-mono">{formatPercent(s.property_pct)}</span>
              </div>
            </div>
            <div className="tooltip-divider" />
            <div className="tooltip-comparison-bar">
              <span className="comp-label">vs National Share (52.0%):</span>
              <span className={`comp-val font-mono ${s.property_pct >= 52.0 ? 'comp-high' : 'comp-low'}`}>
                {s.property_pct >= 52.0
                  ? `+${(s.property_pct - 52.0).toFixed(1)}% above avg`
                  : `${(s.property_pct - 52.0).toFixed(1)}% below avg`}
              </span>
            </div>
          </>
        );

      case 'PERSONS_RATE':
        return (
          <>
            <div className="tooltip-mode-header">
              <span className="tooltip-badge-pill "></span>
              <span className="tooltip-rank-tag font-mono">Persons Rank #{getRank('persons_rate')}</span>
            </div>
            <div className="tooltip-hero-stat">
              <span className="tooltip-hero-num font-mono text-crimson">{formatRate(s.persons_rate)}</span>
              <span className="tooltip-hero-label">offences against persons per 100,000</span>
            </div>
            <div className="tooltip-metrics-grid">
              <div className="tooltip-metric-item">
                <span className="metric-label">Persons Cases</span>
                <span className="metric-val font-mono">{formatNumber(s.persons)}</span>
              </div>
              <div className="tooltip-metric-item">
                <span className="metric-label">State Crime Share</span>
                <span className="metric-val font-mono">{formatPercent(s.persons_pct)}</span>
              </div>
            </div>
            <div className="tooltip-divider" />
            <div className="tooltip-comparison-bar">
              <span className="comp-label">vs National Rate (22.9):</span>
              <span className={`comp-val font-mono ${s.persons_rate >= 22.9 ? 'comp-high' : 'comp-low'}`}>
                {(s.persons_rate / 22.9).toFixed(1)}x national rate
              </span>
            </div>
          </>
        );

      case 'AUTHORITY_RATE':
        return (
          <>
            <div className="tooltip-mode-header">
              <span className="tooltip-badge-pill "></span>
              <span className="tooltip-rank-tag font-mono">Authority Rank #{getRank('authority_rate')}</span>
            </div>
            <div className="tooltip-hero-stat">
              <span className="tooltip-hero-num font-mono text-teal">{formatRate(s.authority_rate)}</span>
              <span className="tooltip-hero-label">authority offences per 100,000</span>
            </div>
            <div className="tooltip-metrics-grid">
              <div className="tooltip-metric-item">
                <span className="metric-label">Recorded Offences</span>
                <span className="metric-val font-mono">{formatNumber(s.authority)}</span>
              </div>
              <div className="tooltip-metric-item">
                <span className="metric-label">State Crime Share</span>
                <span className="metric-val font-mono">{formatPercent(s.authority_pct)}</span>
              </div>
            </div>
            <div className="tooltip-divider" />
            <div className="tooltip-context-row">
              <span className="context-text text-muted">
                {s.authority_rate >= 10
                  ? 'Heavy institutional, tax & commercial enforcement concentration.'
                  : 'Low recorded volume of institutional/statutory tax violations.'}
              </span>
            </div>
          </>
        );

      case 'LOCAL_ACTS_RATE':
        return (
          <>
            <div className="tooltip-mode-header">
              <span className="tooltip-badge-pill "></span>
              <span className="tooltip-rank-tag font-mono">Local Acts Rank #{getRank('local_acts_rate')}</span>
            </div>
            <div className="tooltip-hero-stat">
              <span className="tooltip-hero-num font-mono text-purple">{formatRate(s.local_acts_rate)}</span>
              <span className="tooltip-hero-label">local acts offences per 100,000</span>
            </div>
            <div className="tooltip-metrics-grid">
              <div className="tooltip-metric-item">
                <span className="metric-label">Recorded Cases</span>
                <span className="metric-val font-mono">{formatNumber(s.local_acts)}</span>
              </div>
              <div className="tooltip-metric-item">
                <span className="metric-label">State Crime Share</span>
                <span className="metric-val font-mono">{formatPercent(s.local_acts_pct)}</span>
              </div>
            </div>
            <div className="tooltip-divider" />
            <div className="tooltip-context-row">
              <span className="context-text text-muted">
                {s.name === 'Gombe'
                  ? '★ National outlier: Leads Nigeria in local acts enforcement (356 cases).'
                  : s.local_acts > 0
                    ? `${formatNumber(s.local_acts)} statutory jurisdiction-specific offences.`
                    : 'Zero local acts offences recorded in 2016 police records.'}
              </span>
            </div>
          </>
        );

      case 'PROPERTY_DIVERGENCE': {
        const isHigher = s.property_divergence > 0;
        const divColor = isHigher ? '#F97316' : '#38BDF8';
        return (
          <>
            <div className="tooltip-mode-header">
              <span
                className="tooltip-badge-pill"
              >

              </span>
              <span className="tooltip-rank-tag font-mono ">Rank #{getRank('property_divergence')}</span>
            </div>
            <div className="tooltip-hero-stat">
              <span className="tooltip-hero-num font-mono" style={{ color: divColor }}>
                {isHigher ? `+${s.property_divergence.toFixed(1)}%` : `${s.property_divergence.toFixed(1)}%`}
              </span>
              <span className="tooltip-hero-label">shift from 52.0% national property norm</span>
            </div>
            <div className="tooltip-metrics-grid">
              <div className="tooltip-metric-item">
                <span className="metric-label">State Property Share</span>
                <span className="metric-val font-mono">{formatPercent(s.property_pct)}</span>
              </div>
              <div className="tooltip-metric-item">
                <span className="metric-label">Property Cases</span>
                <span className="metric-val font-mono">{formatNumber(s.property)}</span>
              </div>
            </div>
            <div className="tooltip-divider" />
            <div className="tooltip-context-row">
              <span className="context-text text-muted">
                {isHigher
                  ? `Property crimes exceed the national average by ${s.property_divergence.toFixed(1)} points.`
                  : `Property share is ${Math.abs(s.property_divergence).toFixed(1)} points below avg; higher share of crimes against persons.`}
              </span>
            </div>
          </>
        );
      }

      case 'STATE_SIGNATURES':
      case 'DOMINANT_CATEGORY':
      default: {
        const domColor = s.dominant_category === 'Property' ? 'var(--cat-property)' : 'var(--cat-persons)';
        const domShare = s.dominant_category === 'Property' ? s.property_pct : s.persons_pct;

        return (
          <>
            <div className="tooltip-mode-header">
              <span
                className="tooltip-badge-pill"
                style={{ backgroundColor: `${domColor}22`, color: domColor, border: `1px solid ${domColor}55` }}
              >
                DOMINANT: {s.dominant_category.toUpperCase()}
              </span>
              <span className="tooltip-rank-tag font-mono">{formatPercent(domShare)} of total</span>
            </div>

            {/* Visual stacked composition bar */}
            <div className="tooltip-composition-bar">
              <div
                style={{ width: `${s.property_pct}%`, backgroundColor: 'var(--cat-property)' }}
                title={`Property: ${formatPercent(s.property_pct)}`}
              />
              <div
                style={{ width: `${s.persons_pct}%`, backgroundColor: 'var(--cat-persons)' }}
                title={`Persons: ${formatPercent(s.persons_pct)}`}
              />
              <div
                style={{ width: `${s.authority_pct}%`, backgroundColor: 'var(--cat-authority)' }}
                title={`Authority: ${formatPercent(s.authority_pct)}`}
              />
              <div
                style={{ width: `${s.local_acts_pct}%`, backgroundColor: 'var(--cat-local)' }}
                title={`Local: ${formatPercent(s.local_acts_pct)}`}
              />
            </div>

            <div className="tooltip-categories">
              <div className="tooltip-cat-row">
                <span className="cat-bullet" style={{ backgroundColor: 'var(--cat-property)' }} />
                <span className="cat-name">Property</span>
                <span className="cat-count font-mono">{formatNumber(s.property)}</span>
                <span className="cat-pct font-mono">{formatPercent(s.property_pct)}</span>
              </div>
              <div className="tooltip-cat-row">
                <span className="cat-bullet" style={{ backgroundColor: 'var(--cat-persons)' }} />
                <span className="cat-name">Persons</span>
                <span className="cat-count font-mono">{formatNumber(s.persons)}</span>
                <span className="cat-pct font-mono">{formatPercent(s.persons_pct)}</span>
              </div>
              <div className="tooltip-cat-row">
                <span className="cat-bullet" style={{ backgroundColor: 'var(--cat-authority)' }} />
                <span className="cat-name">Authority</span>
                <span className="cat-count font-mono">{formatNumber(s.authority)}</span>
                <span className="cat-pct font-mono">{formatPercent(s.authority_pct)}</span>
              </div>
              <div className="tooltip-cat-row">
                <span className="cat-bullet" style={{ backgroundColor: 'var(--cat-local)' }} />
                <span className="cat-name">Local Acts</span>
                <span className="cat-count font-mono">{formatNumber(s.local_acts)}</span>
                <span className="cat-pct font-mono">{formatPercent(s.local_acts_pct)}</span>
              </div>
            </div>

            <div className="tooltip-footer">
              <span>Total: <strong>{formatNumber(s.total_cases)}</strong></span>
              <span>Rate: <strong>{formatRate(s.crime_rate)}/100k</strong></span>
            </div>
          </>
        );
      }
    }
  };

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
        <div className="tooltip-title-area">
          <span className="tooltip-state-name">{s.name}</span>
          <span className="tooltip-code">{s.code}</span>
        </div>
      </div>

      <div className="tooltip-body">
        {renderModeContent()}
      </div>
    </div>
  );
}
