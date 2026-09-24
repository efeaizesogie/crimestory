import React from 'react';

/**
 * Animated proportional circles for Chapter 03 Concentration
 */
export function ProportionalSymbols({ projection, onSelectState, hoveredState, selectedState }) {
  if (!projection) return null;

  const symbols = [
    { name: 'Lagos', coords: [3.55, 6.55], cases: 45385, radius: 26 },
    { name: 'FCT', coords: [7.35, 8.95], cases: 13181, radius: 17 },
    { name: 'Delta', coords: [6.00, 5.70], cases: 7867, radius: 12 },
    { name: 'Kano', coords: [8.55, 11.75], cases: 4917, radius: 9 }
  ];

  return (
    <g className="proportional-symbols-layer">
      {symbols.map(s => {
        const pt = projection(s.coords);
        if (!pt) return null;

        const isHovered = hoveredState?.name === s.name;
        const isSelected = selectedState?.name === s.name;
        const scale = isHovered || isSelected ? 1.15 : 1;

        return (
          <g
            key={s.name}
            transform={`translate(${pt[0]}, ${pt[1]}) scale(${scale})`}
            style={{ cursor: 'pointer', transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectState({ name: s.name });
            }}
          >
            {/* Outer soft glowing halo */}
            <circle
              r={s.radius * 1.5}
              fill="#EF4444"
              opacity={isHovered ? 0.35 : 0.18}
            />

            {/* Core shaded circle */}
            <circle
              r={s.radius}
              fill="url(#symbolGradient)"
              stroke="#F87171"
              strokeWidth={1.5}
              strokeOpacity={0.8}
            />

            {/* State label */}
            <text
              y={-s.radius - 8}
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="var(--font-sans)"
              fontSize="12px"
              fontWeight="600"
              letterSpacing="0.04em"
            >
              {s.name}
            </text>

            {/* Count label */}
            <text
              y={-s.radius - 22}
              textAnchor="middle"
              fill="#EF4444"
              fontFamily="var(--font-mono)"
              fontSize="13px"
              fontWeight="700"
            >
              {s.cases.toLocaleString()}
            </text>
          </g>
        );
      })}

      {/* SVG Gradient definition */}
      <defs>
        <radialGradient id="symbolGradient" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F87171" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#DC2626" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0.95" />
        </radialGradient>
      </defs>
    </g>
  );
}
