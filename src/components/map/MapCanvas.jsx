import React, { useMemo, useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { getStateFillColor } from '../../utils/colors';
import { MapLegend } from './MapLegend';
import { MapControls } from './MapControls';
import { MapCallouts } from './MapCallouts';
import { ProportionalSymbols } from './ProportionalSymbols';
import { Tooltip } from '../interface/Tooltip';

export function MapCanvas({
  geoData,
  mode,
  activeChapter = 0,
  hoveredState,
  setHoveredState,
  selectedState,
  setSelectedState,
  allowModeSwitch = false,
  onModeChange
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 850, height: 720 });
  const [zoomTransform, setZoomTransform] = useState({ k: 1, x: 0, y: 0 });
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Update dimensions on container resize
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

  // Compute D3 projection fitted to Nigeria bounds with cartographic margins
  const { projection, pathGenerator } = useMemo(() => {
    if (!geoData || !geoData.features?.length) return { projection: null, pathGenerator: null };

    // Standard Web Mercator fitted to Nigeria's geometry
    const horizontalMargin = Math.max(24, dimensions.width * 0.05);
    const verticalMargin = Math.max(28, dimensions.height * 0.08);

    const proj = d3.geoMercator()
      .fitExtent(
        [
          [horizontalMargin, verticalMargin],
          [dimensions.width - horizontalMargin, dimensions.height - verticalMargin]
        ],
        geoData
      );

    const path = d3.geoPath().projection(proj);
    return { projection: proj, pathGenerator: path };
  }, [geoData, dimensions]);

  // Handle Zoom In / Zoom Out / Reset
  const handleZoom = (factor) => {
    setZoomTransform(prev => {
      const nextK = Math.min(Math.max(prev.k * factor, 0.8), 4.5);
      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const nextX = cx - (cx - prev.x) * (nextK / prev.k);
      const nextY = cy - (cy - prev.y) * (nextK / prev.k);
      return { k: nextK, x: nextX, y: nextY };
    });
  };

  const handleReset = () => {
    setZoomTransform({ k: 1, x: 0, y: 0 });
    setSelectedState(null);
  };

  // State interaction handlers
  const handleStateMouseEnter = (feature, e) => {
    setHoveredState(feature.properties);
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleStateMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleStateMouseLeave = () => {
    setHoveredState(null);
  };

  const handleStateClick = (feature) => {
    if (selectedState?.name === feature.properties.name) {
      setSelectedState(null);
    } else {
      setSelectedState(feature.properties);
    }
  };

  // Sync tooltip position when hovered from external lists (e.g. StateRankingsList or ScatterPlot)
  useEffect(() => {
    if (hoveredState && projection && hoveredState.centroid) {
      if (containerRef.current && !containerRef.current.matches(':hover')) {
        const pt = projection(hoveredState.centroid);
        if (pt) {
          const sx = zoomTransform.x + zoomTransform.k * pt[0];
          const sy = zoomTransform.y + zoomTransform.k * pt[1];
          setTooltipPos({ x: sx, y: sy });
        }
      }
    }
  }, [hoveredState, projection, zoomTransform]);

  // Key states that receive prominent labels
  const prominentStates = ['Lagos', 'FCT', 'Delta', 'Kano', 'Ondo', 'Plateau', 'Borno', 'Rivers'];

  return (
    <div
      ref={containerRef}
      className="map-canvas-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#0B0D10',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Editorial Header in Map Corner */}
      <div className="map-corner-header">
        <div className="map-badge">NIGERIA · 2016</div>
        <div className="map-author-credit">Aizesogie Efe</div>
      </div>

      {/* SVG Geographic Canvas */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ display: 'block' }}
      >
        <g
          transform={`translate(${zoomTransform.x}, ${zoomTransform.y}) scale(${zoomTransform.k})`}
          style={{
            transformOrigin: 'center center',
            transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          {/* Base Background Glow for Nigeria */}
          {geoData?.features && pathGenerator && (
            <g className="base-shadow-layer" opacity={0.6}>
              {geoData.features.map(f => (
                <path
                  key={'shadow-' + f.properties.name}
                  d={pathGenerator(f)}
                  fill="#06080A"
                  stroke="#161C22"
                  strokeWidth={2.5}
                />
              ))}
            </g>
          )}

          {/* State Polygons with Morphing Colors */}
          {geoData?.features && pathGenerator && (
            <g className="states-layer">
              {geoData.features.map(f => {
                const p = f.properties;
                const isHovered = hoveredState?.name === p.name;
                const isSelected = selectedState?.name === p.name;
                const fillColor = getStateFillColor(f, mode);

                let strokeColor = '#2F363F';
                let strokeWidth = 0.8;

                if (isHovered) {
                  strokeColor = '#F3F4F6';
                  strokeWidth = 2.0;
                } else if (isSelected) {
                  strokeColor = '#EF4444';
                  strokeWidth = 2.2;
                }

                return (
                  <path
                    key={p.name}
                    d={pathGenerator(f)}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    opacity={isSelected ? 1.0 : (selectedState ? 0.45 : (isHovered ? 1.0 : 0.92))}
                    style={{
                      cursor: 'pointer',
                      transition: 'fill 850ms cubic-bezier(0.22, 1, 0.36, 1), stroke 250ms ease, opacity 400ms ease'
                    }}
                    onMouseEnter={(e) => handleStateMouseEnter(f, e)}
                    onMouseMove={handleStateMouseMove}
                    onMouseLeave={handleStateMouseLeave}
                    onClick={() => handleStateClick(f)}
                  />
                );
              })}
            </g>
          )}

          {/* State Text Labels */}
          {geoData?.features && projection && (
            <g className="state-labels-layer" style={{ pointerEvents: 'none' }}>
              {geoData.features.map(f => {
                const p = f.properties;
                const pt = projection(p.centroid);
                if (!pt) return null;

                const isHovered = hoveredState?.name === p.name;
                const isSelected = selectedState?.name === p.name;
                const isProminent = prominentStates.includes(p.name);

                // Small states label positioning tweaks
                let offsetY = 3;
                let offsetX = 0;
                if (p.name === 'Lagos') { offsetY = -5; offsetX = 2; }
                if (p.name === 'FCT') { offsetY = 3; }

                return (
                  <text
                    key={'lbl-' + p.name}
                    x={pt[0] + offsetX}
                    y={pt[1] + offsetY}
                    textAnchor="middle"
                    fill={isHovered || isSelected || isProminent ? '#FFFFFF' : '#7B858F'}
                    fontFamily="var(--font-sans)"
                    fontSize={isProminent || isHovered ? '11px' : '9.5px'}
                    fontWeight={isProminent || isHovered || isSelected ? '600' : '400'}
                    opacity={isHovered || isSelected ? 1 : (isProminent ? 0.9 : 0.65)}
                    letterSpacing="0.02em"
                    style={{
                      transition: 'fill 200ms ease, opacity 200ms ease',
                      textShadow: '0 1px 3px rgba(0,0,0,0.85)'
                    }}
                  >
                    {p.name}
                  </text>
                );
              })}
            </g>
          )}

          {/* Proportional Symbols (Chapter 03 Concentration) */}
          {mode === 'CONCENTRATION' && projection && (
            <ProportionalSymbols
              projection={projection}
              onSelectState={setSelectedState}
              hoveredState={hoveredState}
              selectedState={selectedState}
            />
          )}

          {/* Leader-Line Callout Annotations matching original reference maps */}
          {/* <MapCallouts
            mode={mode}
            projection={projection}
            hoveredState={hoveredState}
            selectedState={selectedState}
          /> */}
        </g>
      </svg>

      {/* Cartographic Scale Bar & North Arrow in Bottom-Right Corner */}
      <div className="map-carto-meta">
        <div className="scale-bar-wrapper">
          <div className="scale-ticks">
            <span className="scale-num">0</span>
            <span className="scale-num">65</span>
            <span className="scale-num">130</span>
            <span className="scale-num">260 km</span>
          </div>
          <div className="scale-line">
            <div className="scale-segment" />
            <div className="scale-segment active-seg" />
            <div className="scale-segment" />
            <div className="scale-segment active-seg" />
          </div>
          <div className="scale-source">Source: Sambus Geospatial Limited · NBS / NPF</div>
        </div>
        <div className="north-arrow" title="North">
          <span className="north-symbol">▲</span>
          <span className="north-label">N</span>
        </div>
      </div>

      {/* Dynamic Classification Legend in Bottom-Left */}
      <div className="map-legend-dock">
        <MapLegend key={mode} mode={mode} />
      </div>

      {/* Subtle Map Controls (Top-Right / Floating) */}
      <MapControls
        onZoomIn={() => handleZoom(1.3)}
        onZoomOut={() => handleZoom(0.75)}
        onResetView={handleReset}
        mode={mode}
        onModeChange={onModeChange}
        allowModeSwitch={allowModeSwitch}
      />

      {/* Editorial Hover Tooltip */}
      <Tooltip
        hoveredState={hoveredState}
        position={tooltipPos}
        mode={mode}
        containerDimensions={dimensions}
      />
    </div>
  );
}
