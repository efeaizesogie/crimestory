import React, { useEffect } from 'react';
import { X, ArrowUpRight, TrendingUp, Users, Shield, Building, AlertTriangle } from 'lucide-react';
import { NATIONAL_TOTALS, formatNumber, formatRate, formatPercent } from '../../utils/calculations';
import { CATEGORY_COLORS } from '../../utils/colors';

export default function StateProfileDrawer({ stateData, onClose }) {
  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!stateData) return null;

  const { persons, property, lawful_authority, local_acts } = stateData.categories;
  const isHighCrime = stateData.crime_rate_per_100k > NATIONAL_TOTALS.crimeRatePer100k;
  const rateDiffPct = ((stateData.crime_rate_per_100k - NATIONAL_TOTALS.crimeRatePer100k) / NATIONAL_TOTALS.crimeRatePer100k) * 100;

  return (
    <div
      role="dialog"
      aria-label={`${stateData.state} Crime Profile`}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '460px',
        maxWidth: '92vw',
        backgroundColor: 'var(--color-surface)',
        borderLeft: '1px solid var(--color-border)',
        zIndex: 90,
        boxShadow: '-12px 0 40px rgba(0,0,0,0.7)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 240ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(11, 13, 16, 0.5)'
      }}>
        <div>
          <div className="editorial-eyebrow" style={{ marginBottom: '4px' }}>
            STATE DOSSIER · {stateData.code}
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-highlight)' }}>
            {stateData.state}
          </h2>
          <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            National Rank: #{stateData.rank_cases} by volume · #{stateData.rank_rate} by rate
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close dossier"
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
        >
          <X size={18} />
        </button>
      </div>

      {/* Scrollable Dossier Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        {/* Primary Case Count Hero Block */}
        <div style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          position: 'relative'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div className="stat-label">REPORTED OFFENCES</div>
              <div className="stat-numeral" style={{ color: 'var(--color-crime-red-light)', fontSize: '38px', marginTop: '4px' }}>
                {formatNumber(stateData.total_cases)}
              </div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {formatPercent(stateData.national_share_pct)} of national total
              </div>
            </div>

            <div>
              <div className="stat-label">CRIME RATE PER 100K</div>
              <div className="stat-numeral" style={{ fontSize: '38px', marginTop: '4px' }}>
                {formatRate(stateData.crime_rate_per_100k)}
              </div>
              <div style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: isHighCrime ? 'var(--color-crime-red-light)' : 'var(--color-cat-authority)',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <TrendingUp size={12} />
                <span>
                  {rateDiffPct > 0 ? `+${formatRate(rateDiffPct)}% vs national avg` : `${formatRate(rateDiffPct)}% vs national avg`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Demographics & Geographic Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            padding: '10px 12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <Users size={12} />
              <span>POPULATION (2016)</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '4px' }}>
              {formatNumber(stateData.population)}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            padding: '10px 12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <Building size={12} />
              <span>AREA SQ KM</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '4px' }}>
              {formatNumber(stateData.area_sqkm)} km²
            </div>
          </div>
        </div>

        {/* Dominant Category Highlight */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '12px 14px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div className="editorial-eyebrow">DOMINANT CATEGORY</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: CATEGORY_COLORS[stateData.dominant_category], marginTop: '2px' }}>
              {stateData.dominant_category}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: 'var(--color-text-highlight)' }}>
              {formatPercent(stateData.dominant_pct)}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              of state cases
            </div>
          </div>
        </div>

        {/* 4 Category Breakdown Breakdown Cards */}
        <div className="editorial-eyebrow" style={{ marginBottom: '0.75rem' }}>
          FOUR CATEGORY DOSSIER
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* 1. Property */}
          <div style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderLeft: `3px solid ${CATEGORY_COLORS['Property']}`,
            borderRadius: '4px',
            padding: '12px 14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Offences Against Property
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-highlight)' }}>
                {formatNumber(property.count)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              <span>Share: {formatPercent(property.pct)} (Natl: 52.0%)</span>
              <span>Rate: {formatRate(property.rate_per_100k)} / 100k</span>
            </div>
          </div>

          {/* 2. Persons */}
          <div style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderLeft: `3px solid ${CATEGORY_COLORS['Persons']}`,
            borderRadius: '4px',
            padding: '12px 14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Offences Against Persons
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-highlight)' }}>
                {formatNumber(persons.count)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              <span>Share: {formatPercent(persons.pct)} (Natl: 36.2%)</span>
              <span>Rate: {formatRate(persons.rate_per_100k)} / 100k</span>
            </div>
          </div>

          {/* 3. Lawful Authority */}
          <div style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderLeft: `3px solid ${CATEGORY_COLORS['Lawful Authority']}`,
            borderRadius: '4px',
            padding: '12px 14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Against Lawful Authority
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-highlight)' }}>
                {formatNumber(lawful_authority.count)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              <span>Share: {formatPercent(lawful_authority.pct)} (Natl: 9.6%)</span>
              <span>Rate: {formatRate(lawful_authority.rate_per_100k)} / 100k</span>
            </div>
          </div>

          {/* 4. Local Acts */}
          <div style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderLeft: `3px solid ${CATEGORY_COLORS['Local Acts']}`,
            borderRadius: '4px',
            padding: '12px 14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Against Local Acts
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-highlight)' }}>
                {formatNumber(local_acts.count)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              <span>Share: {formatPercent(local_acts.pct)} (Natl: 2.1%)</span>
              <span>Rate: {formatRate(local_acts.rate_per_100k)} / 100k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
