import React, { useState } from 'react';
import { formatNumber, formatRate, formatPercent } from '../../utils/formatting';

export function StateRankingsList({
  statesData,
  hoveredState,
  setHoveredState,
  selectedState,
  setSelectedState
}) {
  const [metric, setMetric] = useState('total_cases');

  const metricsConfig = {
    total_cases: {
      label: 'Total Cases',
      valueFn: s => formatNumber(s.total_cases),
      subFn: s => `${formatPercent(s.share_of_national)} share`,
      color: '#EF4444'
    },
    crime_rate: {
      label: 'Rate / 100k',
      valueFn: s => formatRate(s.crime_rate),
      subFn: s => `per 100k`,
      color: '#EAA171'
    },
    property_rate: {
      label: 'Property Rate',
      valueFn: s => formatRate(s.property_rate),
      subFn: s => `per 100k`,
      color: '#F97316'
    },
    persons_rate: {
      label: 'Persons Rate',
      valueFn: s => formatRate(s.persons_rate),
      subFn: s => `per 100k`,
      color: '#EF4444'
    }
  };

  const currentCfg = metricsConfig[metric];

  const sortedStates = [...(statesData || [])]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, 8);

  const maxVal = sortedStates[0] ? sortedStates[0][metric] : 1;

  return (
    <div className="rankings-list-card">
      <div className="rankings-header">
        <h4 className="card-headline">STATE-BY-STATE BENCHMARK</h4>

        {/* Metric Selector Tabs */}
        <div className="rankings-tab-bar">
          {Object.keys(metricsConfig).map(k => (
            <button
              key={k}
              className={`rankings-tab ${metric === k ? 'active-tab' : ''}`}
              onClick={() => setMetric(k)}
            >
              {metricsConfig[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="rankings-rows-container">
        {sortedStates.map((s, idx) => {
          const isHovered = hoveredState?.name === s.name;
          const isSelected = selectedState?.name === s.name;
          const barWidth = Math.max((s[metric] / maxVal) * 100, 3);

          return (
            <div
              key={s.name}
              className={`ranking-row ${isHovered || isSelected ? 'highlighted-row' : ''}`}
              onMouseEnter={() => setHoveredState(s)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => setSelectedState(s)}
              style={{ cursor: 'pointer' }}
            >
              <span className="rank-num font-mono">{idx + 1}</span>
              <span className="rank-name">{s.name}</span>

              <div className="rank-bar-track">
                <div
                  className="rank-bar-fill"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: currentCfg.color
                  }}
                />
              </div>

              <div className="rank-stat font-mono">
                <span className="rank-val">{currentCfg.valueFn(s)}</span>
                <span className="rank-sub text-muted">{currentCfg.subFn(s)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
