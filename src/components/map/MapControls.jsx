import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export function MapControls({ onZoomIn, onZoomOut, onResetView, mode, onModeChange, allowModeSwitch }) {
  return (
    <div className="map-controls-panel">
      {/* Zoom / Reset Tools */}
      <div className="zoom-button-group">
        <button
          className="map-ctrl-btn"
          onClick={onZoomIn}
          title="Zoom in"
          aria-label="Zoom in"
        >
          <ZoomIn size={15} />
        </button>
        <button
          className="map-ctrl-btn"
          onClick={onZoomOut}
          title="Zoom out"
          aria-label="Zoom out"
        >
          <ZoomOut size={15} />
        </button>
        <button
          className="map-ctrl-btn"
          onClick={onResetView}
          title="Reset map view"
          aria-label="Reset map view"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Optional Mode Switcher (Visible in Explorer mode) */}
      {allowModeSwitch && (
        <div className="quick-mode-pills">
          {[
            { id: 'TOTAL_CASES', label: 'Total' },
            { id: 'CRIME_RATE', label: 'Rate' },
            { id: 'CONCENTRATION', label: 'Dominance' },
            { id: 'PERSONS_RATE', label: 'Persons' },
            { id: 'PROPERTY_RATE', label: 'Property' },
            { id: 'AUTHORITY_RATE', label: 'Authority' },
            { id: 'LOCAL_ACTS_RATE', label: 'Local Acts' },
            { id: 'DOMINANT_CATEGORY', label: 'Dominant' },
            { id: 'PROPERTY_DIVERGENCE', label: 'Divergence' }
          ].map(m => (
            <button
              key={m.id}
              className={`mode-pill ${mode === m.id ? 'active-pill' : ''}`}
              onClick={() => onModeChange(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
