import React, { useMemo } from 'react';
import { getStateValue, formatNumber, formatRate, formatPercent, CLASSIFICATIONS } from '../../utils/calculations';
import { getStateFillColor } from '../../utils/colors';

export default function HorizontalBarChart({
  crimeData,
  mapMode = 'total_cases',
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  onClearHover,
  limit = 10
}) {
  const classification = CLASSIFICATIONS[mapMode] || CLASSIFICATIONS['total_cases'];
  const isRate = mapMode.includes('rate') || mapMode === 'crime_rate';

  const sortedData = useMemo(() => {
    if (!crimeData) return [];
    return [...crimeData]
      .sort((a, b) => getStateValue(b, mapMode) - getStateValue(a, mapMode))
      .slice(0, limit);
  }, [crimeData, mapMode, limit]);

  const maxVal = sortedData.length > 0 ? getStateValue(sortedData[0], mapMode) : 1;

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '6px',
      padding: '1.25rem',
      marginTop: '1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
        <div>
          <div className="editorial-eyebrow">RANKING ARCHIVE</div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Top {limit} States by {classification.title}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
          HOVER BAR TO LOCATE ON MAP
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sortedData.map((item, idx) => {
          const val = getStateValue(item, mapMode);
          const pctWidth = Math.max((val / maxVal) * 100, 2);
          const isSelected = selectedState && selectedState.state === item.state;
          const isHovered = hoveredState && hoveredState.state === item.state;
          const barColor = getStateFillColor(item, mapMode, selectedState, hoveredState);

          return (
            <div
              key={item.state}
              onMouseEnter={() => onHoverState(item)}
              onMouseLeave={onClearHover}
              onClick={() => onSelectState(isSelected ? null : item)}
              style={{
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: '26px 100px 1fr 70px',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 6px',
                borderRadius: '4px',
                backgroundColor: isSelected ? 'var(--color-card)' : isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
                transition: 'background-color 150ms ease'
              }}
            >
              {/* Rank Number */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: idx < 3 ? 'var(--color-crime-red-light)' : 'var(--color-text-muted)',
                fontWeight: idx < 3 ? 700 : 400
              }}>
                #{idx + 1}
              </span>

              {/* State Name */}
              <span style={{
                fontSize: '13px',
                fontWeight: isSelected || isHovered ? 600 : 400,
                color: isSelected ? '#FFFFFF' : isHovered ? 'var(--color-text-highlight)' : 'var(--color-text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.state === 'Federal Capital Territory' ? 'FCT (Abuja)' : item.state}
              </span>

              {/* Proportional Bar */}
              <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${pctWidth}%`,
                    backgroundColor: barColor,
                    borderRadius: '2px',
                    transition: 'width 400ms ease, background-color 300ms ease',
                    boxShadow: isSelected || isHovered ? '0 0 8px rgba(239, 68, 68, 0.6)' : 'none'
                  }}
                />
              </div>

              {/* Numerical Value */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textAlign: 'right',
                color: isSelected || isHovered ? 'var(--color-text-highlight)' : 'var(--color-text-secondary)',
                fontWeight: 600
              }}>
                {isRate ? formatRate(val) : formatNumber(val)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
