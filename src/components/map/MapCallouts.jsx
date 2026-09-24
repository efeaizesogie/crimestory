import React from 'react';
import { formatNumber, formatRate } from '../../utils/formatting';

/**
 * Editorial callout leader-lines and annotations matching the original cartographic references
 */
export function MapCallouts({ mode, projection, hoveredState, selectedState }) {
  if (!projection) return null;

  // Specific callout configurations per mode
  let callouts = [];

  if (mode === 'TOTAL_CASES') {
    callouts = [
      {
        name: 'Lagos',
        coords: [3.55, 6.55],
        linePoints: [[3.55, 6.55], [2.2, 6.55], [0.9, 6.55]],
        val: '45,385',
        sub: 'reported offences',
        color: '#EF4444',
        align: 'right'
      },
      {
        name: 'FCT',
        coords: [7.35, 8.95],
        linePoints: [[7.35, 8.95], [6.2, 10.4], [3.2, 10.4]],
        val: '13,181',
        sub: 'reported offences',
        color: '#EF4444',
        align: 'right'
      },
      {
        name: 'Delta',
        coords: [6.00, 5.70],
        linePoints: [[6.00, 5.70], [5.2, 4.4], [3.2, 4.4]],
        val: '7,867',
        sub: 'reported offences',
        color: '#EF4444',
        align: 'right'
      },
      {
        name: 'Kano',
        coords: [8.55, 11.75],
        linePoints: [[8.55, 11.75], [8.9, 13.5], [9.8, 13.5]],
        val: '4,917',
        sub: 'reported offences',
        color: '#EF4444',
        align: 'left'
      }
    ];
  } else if (mode === 'CRIME_RATE') {
    callouts = [
      {
        name: 'Lagos',
        coords: [3.55, 6.55],
        linePoints: [[3.55, 6.55], [2.2, 6.55], [0.9, 6.55]],
        val: '351',
        sub: 'reported offences / 100k',
        color: '#EAA171',
        align: 'right'
      },
      {
        name: 'FCT',
        coords: [7.35, 8.95],
        linePoints: [[7.35, 8.95], [6.2, 10.4], [3.2, 10.4]],
        val: '337',
        sub: 'reported offences / 100k',
        color: '#EAA171',
        align: 'right'
      },
      {
        name: 'Delta',
        coords: [6.00, 5.70],
        linePoints: [[6.00, 5.70], [5.2, 4.4], [3.2, 4.4]],
        val: '135',
        sub: 'reported offences / 100k',
        color: '#EAA171',
        align: 'right'
      },
      {
        name: 'Abia',
        coords: [7.55, 5.45],
        linePoints: [[7.55, 5.45], [9.2, 4.9], [11.0, 4.9]],
        val: '72',
        sub: 'reported offences / 100k',
        color: '#9A9180',
        align: 'left'
      }
    ];
  } else if (mode === 'CONCENTRATION') {
    callouts = [
      {
        name: 'Lagos',
        coords: [3.55, 6.55],
        linePoints: [[3.55, 6.55], [2.2, 6.55], [0.8, 6.55]],
        val: '45,385',
        sub: '36.1% of national total',
        color: '#EF4444',
        align: 'right'
      },
      {
        name: 'FCT',
        coords: [7.35, 8.95],
        linePoints: [[7.35, 8.95], [6.0, 10.4], [2.8, 10.4]],
        val: '13,181',
        sub: '10.5% of national total',
        color: '#EF4444',
        align: 'right'
      },
      {
        name: 'Delta',
        coords: [6.00, 5.70],
        linePoints: [[6.00, 5.70], [5.2, 4.4], [3.2, 4.4]],
        val: '7,867',
        sub: '6.3% of national total',
        color: '#EF4444',
        align: 'right'
      },
      {
        name: 'Kano',
        coords: [8.55, 11.75],
        linePoints: [[8.55, 11.75], [9.0, 13.6], [10.2, 13.6]],
        val: '4,917',
        sub: '3.9% of national total',
        color: '#EF4444',
        align: 'left'
      }
    ];
  } else if (mode === 'PERSONS_RATE') {
    callouts = [
      {
        name: 'Lagos',
        coords: [3.55, 6.55],
        linePoints: [[3.55, 6.55], [2.2, 6.55], [0.8, 6.55]],
        val: '119.4 / 100k',
        sub: 'Crimes against persons',
        color: '#EF4444',
        align: 'right'
      },
      {
        name: 'FCT',
        coords: [7.35, 8.95],
        linePoints: [[7.35, 8.95], [6.0, 10.4], [3.2, 10.4]],
        val: '76.3 / 100k',
        sub: 'Crimes against persons',
        color: '#EF4444',
        align: 'right'
      },
      {
        name: 'Delta',
        coords: [6.00, 5.70],
        linePoints: [[6.00, 5.70], [5.2, 4.4], [3.2, 4.4]],
        val: '67.1 / 100k',
        sub: 'Crimes against persons',
        color: '#EF4444',
        align: 'right'
      }
    ];
  } else if (mode === 'PROPERTY_RATE') {
    callouts = [
      {
        name: 'FCT',
        coords: [7.35, 8.95],
        linePoints: [[7.35, 8.95], [6.0, 10.0], [2.8, 10.0]],
        val: '239.0 / 100k',
        sub: 'Highest property rate',
        color: '#F97316',
        align: 'right'
      },
      {
        name: 'Lagos',
        coords: [3.55, 6.55],
        linePoints: [[3.55, 6.55], [2.2, 6.55], [0.8, 6.55]],
        val: '177.1 / 100k',
        sub: '22,885 property cases',
        color: '#F97316',
        align: 'right'
      }
    ];
  } else if (mode === 'AUTHORITY_RATE') {
    callouts = [
      {
        name: 'Lagos',
        coords: [3.55, 6.55],
        linePoints: [[3.55, 6.55], [2.2, 6.55], [0.8, 6.55]],
        val: '52.4 / 100k',
        sub: '6,768 cases',
        color: '#14B8A6',
        align: 'right'
      },
      {
        name: 'FCT',
        coords: [7.35, 8.95],
        linePoints: [[7.35, 8.95], [6.0, 10.0], [3.0, 10.0]],
        val: '21.6 / 100k',
        sub: '843 cases',
        color: '#14B8A6',
        align: 'right'
      },
      {
        name: 'Delta',
        coords: [6.00, 5.70],
        linePoints: [[6.00, 5.70], [5.2, 4.4], [3.2, 4.4]],
        val: '20.6 / 100k',
        sub: '1,202 cases',
        color: '#14B8A6',
        align: 'right'
      }
    ];
  } else if (mode === 'LOCAL_ACTS_RATE') {
    callouts = [
      {
        name: 'Gombe',
        coords: [11.17, 10.28],
        linePoints: [[11.17, 10.28], [13.2, 8.8], [14.6, 8.8]],
        val: '10.6 / 100k',
        sub: '356 local acts cases',
        color: '#A855F7',
        align: 'left'
      }
    ];
  }

  return (
    <g className="map-callouts-layer" style={{ pointerEvents: 'none' }}>
      {callouts.map((c, idx) => {
        const pStart = projection(c.linePoints[0]);
        const pMid = projection(c.linePoints[1]);
        const pEnd = projection(c.linePoints[2]);

        if (!pStart || !pMid || !pEnd) return null;

        const polylinePoints = `${pStart[0]},${pStart[1]} ${pMid[0]},${pMid[1]} ${pEnd[0]},${pEnd[1]}`;
        const isHovered = hoveredState?.name === c.name;
        const isSelected = selectedState?.name === c.name;
        const activeHighlight = isHovered || isSelected;

        return (
          <g key={c.name + idx} className="callout-group" opacity={activeHighlight ? 1 : 0.95}>
            {/* Dot at state centroid */}
            <circle
              cx={pStart[0]}
              cy={pStart[1]}
              r={activeHighlight ? 5 : 3.5}
              fill={c.color}
              stroke="#0B0D10"
              strokeWidth={1.5}
            />

            {/* Leader line */}
            <polyline
              points={polylinePoints}
              fill="none"
              stroke={c.color}
              strokeWidth={activeHighlight ? 1.5 : 1}
              strokeOpacity={0.85}
            />

            {/* Value and Label at end of line */}
            <text
              x={pEnd[0] + (c.align === 'right' ? -8 : 8)}
              y={pEnd[1] - 4}
              textAnchor={c.align === 'right' ? 'end' : 'start'}
              fill={c.color}
              fontFamily="var(--font-mono)"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="-0.02em"
            >
              {c.val}
            </text>

            <text
              x={pEnd[0] + (c.align === 'right' ? -8 : 8)}
              y={pEnd[1] + 12}
              textAnchor={c.align === 'right' ? 'end' : 'start'}
              fill="#9AA3AD"
              fontFamily="var(--font-sans)"
              fontSize="10px"
              fontWeight="400"
              letterSpacing="0.02em"
            >
              {c.sub}
            </text>
          </g>
        );
      })}
    </g>
  );
}
