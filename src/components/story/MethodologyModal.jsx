import React from 'react';
import { X, ShieldAlert, Database, Scale, Info } from 'lucide-react';

export function MethodologyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="editorial-modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="headline-section" style={{ fontSize: '28px', marginBottom: 6 }}>
              DATA, SOURCES & LIMITATIONS
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body-scroll">
          {/* Important Warning Banner */}
          <div className="caution-banner">
            <div className="caution-icon-col">
              <ShieldAlert size={20} color="var(--crime-red)" />
            </div>
            <div>
              <h4 className="caution-title">CRITICAL INTERPRETIVE NOTE</h4>
              <p className="caution-text">
                These data represent <strong>reported offences</strong> recorded in the 2016 dataset.
                They do not capture every offence that occurred. Differences in reporting behaviour,
                policing infrastructure, access to stations, and local recording practices significantly
                influence the observed geography. A high count or rate is not proof of higher danger,
                nor is a low number proof of safety.
              </p>
            </div>
          </div>

          <div className="modal-grid-sections">
            <div className="modal-info-block">
              <div className="block-title-row">
                <Database size={15} color="var(--rate-peach)" />
                <h4>DATA SOURCE</h4>
              </div>
              <p>
                Authoritative 2016 Crime Dataset sourced from the <strong>National Bureau of Statistics (NBS)</strong> and
                the <strong>Nigeria Police Force (NPF)</strong>, compiled and published in collaboration with <strong>Sambus Geospatial Limited</strong>.
              </p>
            </div>

            <div className="modal-info-block">
              <div className="block-title-row">
                <Scale size={15} color="var(--cat-authority)" />
                <h4>GEOGRAPHIC UNITS</h4>
              </div>
              <p>
                37 administrative entities covering the 36 States of the Federation and the Federal Capital Territory (FCT).
                Boundaries are reconstructed from official ESRI Shapefile vector geometry.
              </p>
            </div>
          </div>

          <div className="modal-section-full">
            <h4>MATHEMATICAL FORMULAS</h4>
            <div className="formula-box font-mono">
              <div className="formula-row">
                <span className="formula-name">Reported Crime Rate:</span>
                <span className="formula-eq">(Total Reported Offences ÷ Population) × 100,000</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">Category Share:</span>
                <span className="formula-eq">(Category Cases ÷ Total State Cases) × 100</span>
              </div>
              <div className="formula-row">
                <span className="formula-name">Property Divergence:</span>
                <span className="formula-eq">State Property Share (%) − 52.0% (National Benchmark)</span>
              </div>
            </div>
          </div>

          <div className="modal-section-full">
            <h4>OFFENCE CATEGORY DEFINITIONS</h4>
            <ul className="category-def-list">
              <li>
                <strong style={{ color: 'var(--cat-property)' }}>Property Offences (52.0%):</strong> Belongs and belongings infractions including stealing, robbery, burglary, housebreaking, false pretence, and receiving stolen property.
              </li>
              <li>
                <strong style={{ color: 'var(--cat-persons)' }}>Crimes Against Persons (36.2%):</strong> Offences against human beings including murder, manslaughter, infanticide, concealment of birth, rape, and severe physical assault.
              </li>
              <li>
                <strong style={{ color: 'var(--cat-authority)' }}>Offences Against Lawful Authority (9.7%):</strong> Breaches of public institution regulations, contempt, and statutory tax-related infractions.
              </li>
              <li>
                <strong style={{ color: 'var(--cat-local)' }}>Offences Against Local Acts (2.1%):</strong> Statutes that cannot be prosecuted outside Nigerian territorial boundaries, such as the Liquor Act and Firearms Act.
              </li>
            </ul>
          </div>

          <div className="modal-footer-colophon">
            <span className="colophon-author">Cartography & Information Design: <strong>Aizesogie Efe</strong></span>
            <span className="colophon-date">National Dataset · 2016</span>
          </div>
        </div>
      </div>
    </div>
  );
}
