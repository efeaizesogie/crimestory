import React from 'react';
import { RotateCcw, BookOpen } from 'lucide-react';

export function ClosingPage({ onRestart, onOpenMethodology }) {
  return (
    <footer className="closing-page-section" aria-label="Concluding analysis and colophon">
      <div className="closing-content-wrapper">
        <h2 className="closing-headline">
          THERE IS NO SINGLE MAP OF CRIME
        </h2>

        <p className="closing-lead-text">
          Raw counts reveal where volume was recorded. Normalizing by population exposes localized pressure.
          Category breakdowns uncover divergent statutory footprints across the federation.
          The geography of crime changes because the analytical question changes.
        </p>

        {/* 3 Core Editorial Insights */}
        <div className="closing-takeaways-grid">
          <div className="closing-takeaway-card">
            <h3 className="takeaway-title">The Denominator Paradox</h3>
            <p className="takeaway-body">
              Lagos accounts for 36.1% of national volume, yet its rate per 100k (351.2) is remarkably close to Abuja’s (337.0).
              Kano ranks 4th in cases (4,917) but drops to 36.5 per 100k due to its 13.4M population.
            </p>
          </div>

          <div className="closing-takeaway-card">
            <h3 className="takeaway-title">Diverging Geographies</h3>
            <p className="takeaway-body">
              While property offences represent 52.0% of cases nationally, state reality splits sharply: 28 states are property-dominant,
              while 9 southern and central states are dominated by offences against persons.
            </p>
          </div>

          <div className="closing-takeaway-card">
            <h3 className="takeaway-title">The Reporting Filter</h3>
            <p className="takeaway-body">
              Police records document recorded crime, not all crime that occurred. Differences in reporting willingness,
              proximity to police stations, and local institutional trust shape the observable map.
            </p>
          </div>
        </div>

        {/* National Benchmark Ribbon */}
        <div className="closing-benchmark-strip">
          <div className="benchmark-stat-item">
            <span className="benchmark-stat-val font-mono">125,790</span>
            <span className="benchmark-stat-lbl">National Offences</span>
          </div>
          <div className="benchmark-divider" />
          <div className="benchmark-stat-item">
            <span className="benchmark-stat-val font-mono">63.1</span>
            <span className="benchmark-stat-lbl">Offences / 100k Population</span>
          </div>
          <div className="benchmark-divider" />
          <div className="benchmark-stat-item">
            <span className="benchmark-stat-val font-mono">56.7%</span>
            <span className="benchmark-stat-lbl">Top 4 Administrative Units</span>
          </div>
          <div className="benchmark-divider" />
          <div className="benchmark-stat-item">
            <span className="benchmark-stat-val font-mono">37</span>
            <span className="benchmark-stat-lbl">Federal Territories</span>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="closing-actions-row">
          <button
            className="closing-action-btn primary-action"
            onClick={onRestart}
            aria-label="Restart visual investigation from beginning"
          >
            <RotateCcw size={15} />
            <span>RESTART INVESTIGATION</span>
          </button>

          <button
            className="closing-action-btn secondary-action"
            onClick={onOpenMethodology}
            aria-label="Open research and methodology documentation"
          >
            <BookOpen size={15} />
            <span>VIEW COMPLETE METHODOLOGY</span>
          </button>
        </div>

        {/* Editorial Colophon & Citation */}
        <div className="closing-colophon-band">
          <div className="colophon-item">
            <span className="colophon-label">RESEARCH & DESIGN</span>
            <span className="colophon-val">Aizesogie Efe</span>
          </div>
          <div className="colophon-divider" />
          <div className="colophon-item">
            <span className="colophon-label">PRIMARY SOURCE</span>
            <span className="colophon-val">National Bureau of Statistics (NBS) · Nigeria Police Force</span>
          </div>
          <div className="colophon-divider" />
          <div className="colophon-item">
            <span className="colophon-label">CARTOGRAPHIC REFERENCE</span>
            <span className="colophon-val">Sambus Geospatial Limited · 2016 Cartographic Series</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
