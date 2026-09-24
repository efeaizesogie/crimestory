import React from 'react';
import { X, TrendingUp, ShieldAlert, Award } from 'lucide-react';
import { formatNumber, formatRate, formatPercent, formatDivergence } from '../../utils/formatting';

export function StateProfileCard({ state, onClose, onCategoryClick }) {
  if (!state) return null;

  return (
    <div className="state-profile-card">
      <div className="profile-header">
        <div>
          <span className="profile-eyebrow">STATE SIGNATURE</span>
          <h3 className="profile-title">{state.name}</h3>
        </div>
        <button className="profile-close-btn" onClick={onClose} aria-label="Close profile">
          <X size={16} />
        </button>
      </div>

      <div className="profile-stats-grid">
        <div className="profile-stat-box">
          <span className="stat-label">TOTAL CASES</span>
          <span className="stat-value font-mono">{formatNumber(state.total_cases)}</span>
          <span className="stat-sub">{formatPercent(state.share_of_national)} of national total</span>
        </div>

        <div className="profile-stat-box">
          <span className="stat-label">CRIME RATE</span>
          <span className="stat-value font-mono">{formatRate(state.crime_rate)}</span>
          <span className="stat-sub">per 100,000 residents</span>
        </div>
      </div>

      {/* Composition Bar */}
      <div className="composition-section">
        <div className="composition-label-row">
          <span className="section-label">OFFENCE COMPOSITION</span>
          <span className="dominant-tag" style={{
            color: state.dominant_category === 'Persons' ? 'var(--cat-persons)' : 'var(--cat-property)'
          }}>
            Dominant: {state.dominant_category}
          </span>
        </div>

        <div className="stacked-bar-container">
          <div
            className="stacked-bar-segment"
            style={{
              width: `${state.property_pct}%`,
              backgroundColor: 'var(--cat-property)'
            }}
            title={`Property: ${state.property_pct}%`}
          />
          <div
            className="stacked-bar-segment"
            style={{
              width: `${state.persons_pct}%`,
              backgroundColor: 'var(--cat-persons)'
            }}
            title={`Persons: ${state.persons_pct}%`}
          />
          <div
            className="stacked-bar-segment"
            style={{
              width: `${state.authority_pct}%`,
              backgroundColor: 'var(--cat-authority)'
            }}
            title={`Lawful Authority: ${state.authority_pct}%`}
          />
          <div
            className="stacked-bar-segment"
            style={{
              width: `${state.local_acts_pct}%`,
              backgroundColor: 'var(--cat-local)'
            }}
            title={`Local Acts: ${state.local_acts_pct}%`}
          />
        </div>

        {/* Detailed Breakdown List */}
        <div className="categories-breakdown-list">
          <div className="cat-breakdown-item" onClick={() => onCategoryClick && onCategoryClick('PROPERTY_RATE')}>
            <div className="cat-header-item">
              <span className="cat-dot" style={{ backgroundColor: 'var(--cat-property)' }} />
              <span className="cat-name">Property</span>
            </div>
            <div className="cat-numbers">
              <span className="font-mono">{formatNumber(state.property)}</span>
              <span className="font-mono text-muted">({formatPercent(state.property_pct)})</span>
              <span className="rate-badge font-mono">{formatRate(state.property_rate)}/100k</span>
            </div>
          </div>

          <div className="cat-breakdown-item" onClick={() => onCategoryClick && onCategoryClick('PERSONS_RATE')}>
            <div className="cat-header-item">
              <span className="cat-dot" style={{ backgroundColor: 'var(--cat-persons)' }} />
              <span className="cat-name">Persons</span>
            </div>
            <div className="cat-numbers">
              <span className="font-mono">{formatNumber(state.persons)}</span>
              <span className="font-mono text-muted">({formatPercent(state.persons_pct)})</span>
              <span className="rate-badge font-mono">{formatRate(state.persons_rate)}/100k</span>
            </div>
          </div>

          <div className="cat-breakdown-item" onClick={() => onCategoryClick && onCategoryClick('AUTHORITY_RATE')}>
            <div className="cat-header-item">
              <span className="cat-dot" style={{ backgroundColor: 'var(--cat-authority)' }} />
              <span className="cat-name">Lawful Authority</span>
            </div>
            <div className="cat-numbers">
              <span className="font-mono">{formatNumber(state.authority)}</span>
              <span className="font-mono text-muted">({formatPercent(state.authority_pct)})</span>
              <span className="rate-badge font-mono">{formatRate(state.authority_rate)}/100k</span>
            </div>
          </div>

          <div className="cat-breakdown-item" onClick={() => onCategoryClick && onCategoryClick('LOCAL_ACTS_RATE')}>
            <div className="cat-header-item">
              <span className="cat-dot" style={{ backgroundColor: 'var(--cat-local)' }} />
              <span className="cat-name">Local Acts</span>
            </div>
            <div className="cat-numbers">
              <span className="font-mono">{formatNumber(state.local_acts)}</span>
              <span className="font-mono text-muted">({formatPercent(state.local_acts_pct)})</span>
              <span className="rate-badge font-mono">{formatRate(state.local_acts_rate)}/100k</span>
            </div>
          </div>
        </div>

        {/* Benchmark Divergence Note */}
        <div className="benchmark-divergence-box">
          <span className="divergence-label">National Benchmark Comparison:</span>
          <span className="divergence-val font-mono">
            {formatDivergence(state.property_divergence)}
          </span>
          <span className="divergence-desc">
            {state.property_divergence > 0
              ? 'more property-heavy than the 52.0% national profile'
              : 'less property-heavy than the 52.0% national profile'}
          </span>
        </div>
      </div>
    </div>
  );
}
