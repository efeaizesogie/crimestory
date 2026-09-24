import React, { useMemo, useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { getStateFillColor } from '../../utils/colors';
import { CLASSIFICATIONS, getStateValue, formatNumber, formatRate, formatPercent } from '../../utils/calculations';
import MapLegend from './MapLegend';
import MapTooltip from './MapTooltip';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function MapCanvas({
  geojson,
  crimeData,
  mapMode = 'total_cases',
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  onClearHover
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 700, height: 600 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [tooltipPos, setTooltipPos] = useState(null);

  // Resize observer for responsive canvas
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute D3 projection fitted to Nigeria GeoJSON
  const { pathGenerator, projection } = useMemo(() => {
    if (!geojson || !geojson.features || geojson.features.length === 0) {
      return { pathGenerator: null, projection: null };
    }
    const { width, height } = dimensions;
    const padding = 36;
    const proj = d3.geoMercator()
      .fitExtent([[padding, padding], [width - padding, height - padding]], geojson);
    const pathGen = d3.geoPath().projection(proj);
    return { pathGenerator: pathGen, projection: proj };
  }, [geojson, dimensions]);

  // Selected state centroid for auto-pan or zoom
  useEffect(() => {
    if (selectedState && projection && selectedState.centroid) {
      const [cx, cy] = projection(selectedState.centroid);
      // Subtle center shift
      setPanOffset({
        x: (dimensions.width / 2 - cx) * 0.4,
        y: (dimensions.height / 2 - cy) * 0.4
      });
      setZoomLevel(1.25);
    } else {
      setPanOffset({ x: 0, y: 0 });
      setZoomLevel(1);
    }
  }, [selectedState, projection, dimensions]);

  // Proportional symbols for Chapter 03 Concentration
  const concentrationSymbols = useMemo(() => {
    if (mapMode !== 'concentration' || !projection || !crimeData) return [];
    const topThree = crimeData.filter(s => ['Lagos', 'Federal Capital Territory', 'Delta'].includes(s.state));
    
    // Radius scale proportional to square root of cases
    const rScale = d3.scaleSqrt()
      .domain([0, 50000])
      .range([4, 46]);

    return topThree.map(s => {
      const coords = projection(s.centroid);
      if (!coords) return null;
      return {
        state: s.state,
        cases: s.total_cases,
        share: s.national_share_pct,
        x: coords[0],
        y: coords[1],
        radius: rScale(s.total_cases)
      };
    }).filter(Boolean);
  }, [mapMode, projection, crimeData]);

  // Important state label coordinates
  const stateLabels = useMemo(() => {
    if (!projection || !crimeData) return [];
    const keyStates = ['Lagos', 'Federal Capital Territory', 'Delta', 'Kano', 'Rivers', 'Bauchi', 'Plateau', 'Ondo', 'Borno', 'Sokoto'];
    
    return crimeData
      .filter(s => keyStates.includes(s.state))
      .map(s => {
        const coords = projection(s.centroid);
        if (!coords) return null;
        let [x, y] = coords;
        let displayName = s.state === 'Federal Capital Territory' ? 'FCT (Abuja)' : s.state;
        let offset = { x: 0, y: 0 };
        
        // Manual visual offset adjustments for clarity
        if (s.state === 'Lagos') {
          offset = { x: -32, y: 22 };
        } else if (s.state === 'Federal Capital Territory') {
          offset = { x: 18, y: -8 };
        } else if (s.state === 'Delta') {
          offset = { x: -24, y: 14 };
        }
        
        return {
          state: s.state,
          name: displayName,
          x: x + offset.x,
          y: y + offset.y,
          origX: x,
          origY: y,
          hasCallout: s.state === 'Lagos'
        };
      })
      .filter(Boolean);
  }, [projection, crimeData]);

  if (!geojson || !pathGenerator) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px'
      }}>
        INITIALIZING VECTOR CARTOGRAPHY...
      </div>
    );
  }

  const classification = CLASSIFICATIONS[mapMode] || CLASSIFICATIONS['total_cases'];

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-bg)',
        overflow: 'hidden',
        userSelect: 'none'
      }}
      onMouseLeave={() => {
        onClearHover();
        setTooltipPos(null);
      }}
    >
      {/* Map Header Overlay */}
      <div style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.5rem',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div className="editorial-eyebrow" style={{ marginBottom: '4px' }}>
          {classification.title}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.04em'
        }}>
          NIGERIA · 36 STATES + FCT · 2016
        </div>
      </div>

      {/* Map Zoom Controls */}
      <div style={{
        position: 'absolute',
        top: '1.25rem',
        right: '1.5rem',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        padding: '3px'
      }}>
        <button
          onClick={() => setZoomLevel(z => Math.min(z + 0.25, 2.5))}
          title="Zoom in"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ZoomIn size={14} />
        </button>
        <button
          onClick={() => setZoomLevel(z => Math.max(z - 0.25, 0.8))}
          title="Zoom out"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ZoomOut size={14} />
        </button>
        <button
          onClick={() => {
            setZoomLevel(1);
            setPanOffset({ x: 0, y: 0 });
            onSelectState(null);
          }}
          title="Reset view"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Primary SVG Vector Canvas */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      >
        <defs>
          {/* Subtle drop shadow filters for highlighted states */}
          <filter id="glow-highlight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Radial gradient for proportional pulse symbols */}
          <radialGradient id="symbolGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#EF4444" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}>
          {/* Background Ocean / Surrounding Area */}
          <rect
            width={dimensions.width}
            height={dimensions.height}
            fill="#0B0D10"
            style={{ pointerEvents: 'none' }}
          />

          {/* 37 State Vector Polygons */}
          <g className="states-layer">
            {geojson.features.map(feature => {
              const props = feature.properties;
              const stateName = props.state;
              const isSelected = selectedState && selectedState.state === stateName;
              const isHovered = hoveredState && hoveredState.state === stateName;
              const isDimmed = (selectedState && !isSelected) || (mapMode === 'concentration' && !['Lagos', 'Federal Capital Territory', 'Delta'].includes(stateName));
              
              const fillColor = getStateFillColor(props, mapMode, selectedState, hoveredState);
              const pathD = pathGenerator(feature);

              return (
                <path
                  key={stateName}
                  d={pathD}
                  fill={fillColor}
                  stroke={isSelected ? '#FFFFFF' : isHovered ? 'var(--color-map-boundary-active)' : 'var(--color-map-boundary)'}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                  className={`state-polygon ${isHovered ? 'hovered' : ''} ${isSelected ? 'highlighted' : ''} ${isDimmed ? 'dimmed' : ''}`}
                  style={{
                    cursor: 'pointer',
                    transition: 'fill 500ms ease, stroke 200ms ease, opacity 500ms ease',
                    opacity: isDimmed ? 0.35 : 1
                  }}
                  onMouseEnter={(e) => {
                    onHoverState(props);
                    const rect = containerRef.current.getBoundingClientRect();
                    setTooltipPos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top
                    });
                  }}
                  onMouseMove={(e) => {
                    const rect = containerRef.current.getBoundingClientRect();
                    setTooltipPos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top
                    });
                  }}
                  onClick={() => {
                    if (isSelected) {
                      onSelectState(null);
                    } else {
                      onSelectState(props);
                    }
                  }}
                />
              );
            })}
          </g>

          {/* Chapter 03: Proportional Symbols Layer (Map 03) */}
          {mapMode === 'concentration' && (
            <g className="proportional-symbols-layer">
              {concentrationSymbols.map(sym => {
                const isSelected = selectedState && selectedState.state === sym.state;
                return (
                  <g key={sym.state} style={{ cursor: 'pointer' }} onClick={() => onSelectState(crimeData.find(s => s.state === sym.state))}>
                    {/* Animated Pulse Outer Ring */}
                    <circle
                      cx={sym.x}
                      cy={sym.y}
                      r={sym.radius * 1.3}
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className="symbol-pulse"
                      opacity="0.6"
                    />

                    {/* Proportional Circle Fill */}
                    <circle
                      cx={sym.x}
                      cy={sym.y}
                      r={sym.radius}
                      fill="url(#symbolGradient)"
                      stroke="#EF4444"
                      strokeWidth="2"
                      style={{
                        transition: 'r 600ms cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {/* Center Core Dot */}
                    <circle
                      cx={sym.x}
                      cy={sym.y}
                      r={3}
                      fill="#FFFFFF"
                    />

                    {/* Proportional Symbol Label */}
                    <text
                      x={sym.x}
                      y={sym.y - sym.radius - 8}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontFamily="var(--font-mono)"
                      fontSize="11px"
                      fontWeight="700"
                      style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.9)'
                      }}
                    >
                      {sym.state === 'Federal Capital Territory' ? 'FCT' : sym.state}: {formatNumber(sym.cases)} ({sym.share}%)
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Geographic Labels & Callout Lines */}
          <g className="labels-layer" style={{ pointerEvents: 'none' }}>
            {stateLabels.map(lbl => {
              const isRelevant = !selectedState || selectedState.state === lbl.state;
              if (!isRelevant) return null;

              return (
                <g key={lbl.state}>
                  {lbl.hasCallout && (
                    <polyline
                      points={`${lbl.origX},${lbl.origY} ${lbl.origX - 16},${lbl.y} ${lbl.x + 14},${lbl.y}`}
                      fill="none"
                      stroke="var(--color-crime-red)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.75"
                    />
                  )}
                  <text
                    x={lbl.x}
                    y={lbl.y}
                    fill={lbl.state === 'Lagos' ? 'var(--color-crime-red-light)' : 'var(--color-text-secondary)'}
                    fontFamily="var(--font-sans)"
                    fontSize={lbl.state === 'Lagos' ? '12px' : '10px'}
                    fontWeight={lbl.state === 'Lagos' ? '700' : '500'}
                    textAnchor="middle"
                    style={{
                      textShadow: '0 1px 3px rgba(0,0,0,0.95)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {lbl.name}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Floating Dynamic Map Legend */}
      <MapLegend mapMode={mapMode} />

      {/* Rich Editorial State Tooltip */}
      {hoveredState && tooltipPos && (
        <MapTooltip
          stateData={hoveredState}
          mapMode={mapMode}
          position={tooltipPos}
        />
      )}
    </div>
  );
}
