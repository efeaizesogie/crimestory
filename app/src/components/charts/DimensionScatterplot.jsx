import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { NATIONAL_TOTALS, formatRate, formatPercent, formatNumber } from '../../utils/calculations';
import { CATEGORY_COLORS } from '../../utils/colors';

export default function DimensionScatterplot({
  crimeData,
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  onClearHover
}) {
  const [tooltip, setTooltip] = useState(null);

  // SVG Dimensions
  const width = 640;
  const height = 340;
  const margin = { top: 30, right: 30, bottom: 48, left: 54 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // X scale: Crimerate per 100k (0 to 370)
  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, 370])
      .range([0, innerWidth]);
  }, [innerWidth]);

  // Y scale: PersonsPct (15% to 65%)
  const yScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([15, 65])
      .range([innerHeight, 0]);
  }, [innerHeight]);

  const xTicks = [0, 50, 100, 150, 200, 250, 300, 350];
  const yTicks = [20, 30, 40, 50, 60];

  // Key states with permanent annotation labels
  const keyAnnotatedStates = ['Lagos', 'Federal Capital Territory', 'Delta', 'Plateau', 'Kano', 'Yobe'];

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '6px',
      padding: '1.25rem',
      position: 'relative'
    }}>
      {/* Chart Title & Subtitle */}
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="editorial-eyebrow">BIVARIATE ANALYSIS</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
            The Two Dimensions of the Story
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Reported Crime Rate (X) vs Share of Violence / Persons-related Crime (Y)
          </div>
        </div>

        {/* Legend Chips */}
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CATEGORY_COLORS['Property'] }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>Property Dominant</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: CATEGORY_COLORS['Persons'] }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>Persons Dominant</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Gridlines */}
            {xTicks.map(t => (
              <line
                key={`gx-${t}`}
                x1={xScale(t)}
                x2={xScale(t)}
                y1={0}
                y2={innerHeight}
                stroke="var(--color-border)"
                strokeDasharray="2 3"
                opacity="0.6"
              />
            ))}
            {yTicks.map(t => (
              <line
                key={`gy-${t}`}
                x1={0}
                x2={innerWidth}
                y1={yScale(t)}
                y2={yScale(t)}
                stroke="var(--color-border)"
                strokeDasharray="2 3"
                opacity="0.6"
              />
            ))}

            {/* National Benchmark Reference Lines */}
            <line
              x1={xScale(NATIONAL_TOTALS.crimeRatePer100k)}
              x2={xScale(NATIONAL_TOTALS.crimeRatePer100k)}
              y1={0}
              y2={innerHeight}
              stroke="var(--color-crime-red-light)"
              strokeDasharray="4 3"
              strokeWidth="1.2"
              opacity="0.4"
            />
            <text
              x={xScale(NATIONAL_TOTALS.crimeRatePer100k) + 4}
              y={12}
              fill="var(--color-crime-red-light)"
              fontFamily="var(--font-mono)"
              fontSize="9px"
              opacity="0.8"
            >
              Natl Avg Rate: 63.1/100k
            </text>

            <line
              x1={0}
              x2={innerWidth}
              y1={yScale(NATIONAL_TOTALS.persons.pct)}
              y2={yScale(NATIONAL_TOTALS.persons.pct)}
              stroke="var(--color-crime-red-light)"
              strokeDasharray="4 3"
              strokeWidth="1.2"
              opacity="0.4"
            />
            <text
              x={innerWidth - 120}
              y={yScale(NATIONAL_TOTALS.persons.pct) - 4}
              fill="var(--color-crime-red-light)"
              fontFamily="var(--font-mono)"
              fontSize="9px"
              opacity="0.8"
            >
              Natl Persons Avg: 36.2%
            </text>

            {/* Axes */}
            {/* X-axis ticks & labels */}
            {xTicks.map(t => (
              <g key={`xt-${t}`} transform={`translate(${xScale(t)}, ${innerHeight})`}>
                <line y2={5} stroke="var(--color-border)" />
                <text
                  y={18}
                  fill="var(--color-text-muted)"
                  fontSize="10px"
                  fontFamily="var(--font-mono)"
                  textAnchor="middle"
                >
                  {t}
                </text>
              </g>
            ))}

            {/* Y-axis ticks & labels */}
            {yTicks.map(t => (
              <g key={`yt-${t}`} transform={`translate(0, ${yScale(t)})`}>
                <line x2={-5} stroke="var(--color-border)" />
                <text
                  x={-10}
                  y={3}
                  fill="var(--color-text-muted)"
                  fontSize="10px"
                  fontFamily="var(--font-mono)"
                  textAnchor="end"
                >
                  {t}%
                </text>
              </g>
            ))}

            {/* Axis Titles */}
            <text
              x={innerWidth / 2}
              y={innerHeight + 38}
              fill="var(--color-text-secondary)"
              fontFamily="var(--font-mono)"
              fontSize="11px"
              textAnchor="middle"
            >
              Crime Rate per 100,000 population →
            </text>

            <text
              transform="rotate(-90)"
              x={-innerHeight / 2}
              y={-38}
              fill="var(--color-text-secondary)"
              fontFamily="var(--font-mono)"
              fontSize="11px"
              textAnchor="middle"
            >
              ← % Offences Against Persons
            </text>

            {/* Scatterplot Data Points */}
            {crimeData.map(d => {
              const cx = xScale(d.crime_rate_per_100k);
              const cy = yScale(d.categories.persons.pct);
              const isSelected = selectedState && selectedState.state === d.state;
              const isHovered = hoveredState && hoveredState.state === d.state;
              const color = CATEGORY_COLORS[d.dominant_category] || '#EF4444';
              const isKey = keyAnnotatedStates.includes(d.state);

              return (
                <g key={d.state}>
                  {/* Glowing ring if hovered or selected */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={11}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Primary State Point */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected || isHovered ? 6.5 : 4.5}
                    fill={color}
                    stroke={isSelected || isHovered ? '#FFFFFF' : 'var(--color-surface)'}
                    strokeWidth={1.5}
                    style={{
                      cursor: 'pointer',
                      transition: 'r 180ms ease, stroke 180ms ease'
                    }}
                    onMouseEnter={(e) => {
                      onHoverState(d);
                      const rect = e.target.getBoundingClientRect();
                      setTooltip({
                        x: cx + margin.left,
                        y: cy + margin.top,
                        state: d
                      });
                    }}
                    onMouseLeave={() => {
                      onClearHover();
                      setTooltip(null);
                    }}
                    onClick={() => onSelectState(isSelected ? null : d)}
                  />

                  {/* Key State Label Annotations */}
                  {isKey && (
                    <text
                      x={cx + (d.state === 'Lagos' ? -8 : 7)}
                      y={cy - 7}
                      fill={isSelected || isHovered ? '#FFFFFF' : 'var(--color-text-secondary)'}
                      fontFamily="var(--font-sans)"
                      fontSize="10px"
                      fontWeight={isSelected || isHovered ? 700 : 500}
                      textAnchor={d.state === 'Lagos' ? 'end' : 'start'}
                      style={{ pointerEvents: 'none' }}
                    >
                      {d.state === 'Federal Capital Territory' ? 'FCT' : d.state}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Linked Dot Tooltip */}
      {tooltip && (
        <div style={{
          position: 'absolute',
          left: `${tooltip.x + 12}px`,
          top: `${tooltip.y - 40}px`,
          backgroundColor: 'rgba(11, 13, 16, 0.95)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '6px 10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          pointerEvents: 'none',
          zIndex: 20,
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
        }}>
          <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{tooltip.state.state}</div>
          <div style={{ color: 'var(--color-crime-red-light)' }}>
            Rate: {formatRate(tooltip.state.crime_rate_per_100k)}/100k
          </div>
          <div style={{ color: 'var(--color-text-secondary)' }}>
            Persons: {formatPercent(tooltip.state.categories.persons.pct)}
          </div>
        </div>
      )}

      {/* Explanatory Editorial Footnote */}
      <div style={{
        marginTop: '10px',
        paddingTop: '8px',
        borderTop: '1px solid var(--color-border)',
        fontSize: '11px',
        color: 'var(--color-text-muted)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Click any dot to isolate the state across the entire report.</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>37 STATES PLOTTED</span>
      </div>
    </div>
  );
}
