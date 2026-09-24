import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { formatRate, formatPercent } from '../../utils/formatting';

export function ScatterPlot({
  statesData,
  hoveredState,
  setHoveredState,
  selectedState,
  setSelectedState
}) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 540, height: 320 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          setDims({
            width: entry.contentRect.width,
            height: Math.max(Math.min(entry.contentRect.width * 0.6, 340), 260)
          });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const margin = { top: 30, right: 35, bottom: 45, left: 45 };
  const innerWidth = dims.width - margin.left - margin.right;
  const innerHeight = dims.height - margin.top - margin.bottom;

  const { xScale, yScale, xTicks, yTicks } = useMemo(() => {
    const x = d3.scaleLinear()
      .domain([0, 370])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([18, 70])
      .range([innerHeight, 0]);

    return {
      xScale: x,
      yScale: y,
      xTicks: [0, 50, 100, 150, 200, 250, 300, 350],
      yTicks: [20, 30, 40, 50, 60, 70]
    };
  }, [innerWidth, innerHeight]);

  const prominentNames = ['Lagos', 'FCT', 'Delta', 'Edo', 'Plateau', 'Kano', 'Ondo'];

  return (
    <div ref={containerRef} className="editorial-scatterplot-container">
      <div className="chart-header-block">
        <span className="eyebrow" style={{ marginBottom: 4 }}>CORRELATION ANALYSIS</span>
        <h4 className="chart-title">THE TWO DIMENSIONS OF THE STORY</h4>
        <p className="caption">
          Rate per 100k (X) vs. Share of offences against persons (Y). Colored by dominant offence category.
        </p>
      </div>

      <svg width={dims.width} height={dims.height} className="scatterplot-svg">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Horizontal Gridlines */}
          {yTicks.map(tick => (
            <g key={'y-' + tick} transform={`translate(0, ${yScale(tick)})`}>
              <line
                x1={0}
                x2={innerWidth}
                stroke="#2A2F36"
                strokeWidth={0.7}
                strokeDasharray="2,2"
              />
              <text
                x={-10}
                y={4}
                textAnchor="end"
                fill="#7B858F"
                fontFamily="var(--font-mono)"
                fontSize="10px"
              >
                {tick}%
              </text>
            </g>
          ))}

          {/* Vertical Gridlines */}
          {xTicks.map(tick => (
            <g key={'x-' + tick} transform={`translate(${xScale(tick)}, 0)`}>
              <line
                y1={0}
                y2={innerHeight}
                stroke="#2A2F36"
                strokeWidth={0.7}
                strokeDasharray="2,2"
              />
              <text
                y={innerHeight + 16}
                textAnchor="middle"
                fill="#7B858F"
                fontFamily="var(--font-mono)"
                fontSize="10px"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Axis Labels */}
          <text
            x={innerWidth / 2}
            y={innerHeight + 34}
            textAnchor="middle"
            fill="#9AA3AD"
            fontFamily="var(--font-sans)"
            fontSize="11px"
            fontWeight="500"
          >
            Reported offences per 100,000 population →
          </text>

          <text
            transform="rotate(-90)"
            x={-innerHeight / 2}
            y={-30}
            textAnchor="middle"
            fill="#9AA3AD"
            fontFamily="var(--font-sans)"
            fontSize="11px"
            fontWeight="500"
          >
            ↑ Persons share of total cases (%)
          </text>

          {/* Scatter Points */}
          {statesData?.map(s => {
            const cx = xScale(s.crime_rate);
            const cy = yScale(s.persons_pct);
            const isHovered = hoveredState?.name === s.name;
            const isSelected = selectedState?.name === s.name;
            const isProminent = prominentNames.includes(s.name);
            const dotColor = s.dominant_category === 'Persons' ? 'var(--cat-persons)' : 'var(--cat-property)';

            const r = isHovered || isSelected ? 6.5 : (isProminent ? 4.5 : 3.5);

            return (
              <g
                key={s.name}
                className="scatter-point-group"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedState(s)}
                onMouseEnter={() => setHoveredState(s)}
                onMouseLeave={() => setHoveredState(null)}
              >
                {/* Glow ring on hover/selected */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r * 2.2}
                    fill={dotColor}
                    opacity={0.25}
                  />
                )}

                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={dotColor}
                  stroke={isHovered || isSelected ? '#FFFFFF' : '#12161B'}
                  strokeWidth={isHovered || isSelected ? 1.5 : 1}
                  opacity={isSelected ? 1.0 : (selectedState ? 0.35 : (isHovered ? 1.0 : 0.85))}
                  style={{ transition: 'all 200ms ease' }}
                />

                {/* State Label on prominent or active items */}
                {(isProminent || isHovered || isSelected) && (
                  <text
                    x={cx + (cx > innerWidth - 50 ? -8 : 8)}
                    y={cy - 6}
                    textAnchor={cx > innerWidth - 50 ? 'end' : 'start'}
                    fill={isHovered || isSelected ? '#FFFFFF' : '#9AA3AD'}
                    fontFamily="var(--font-sans)"
                    fontSize="10px"
                    fontWeight={isHovered || isSelected ? '600' : '400'}
                  >
                    {s.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
