import React, { useEffect, useRef } from 'react';
import MapCanvas from '../map/MapCanvas';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import CategoryBreakdownBar from '../charts/CategoryBreakdownBar';
import DimensionScatterplot from '../charts/DimensionScatterplot';
import { ExternalLink, Info, CheckCircle2 } from 'lucide-react';

export default function ScrollySection({
  chapters,
  activeChapterIndex,
  onChapterChange,
  mapMode,
  setMapMode,
  geojson,
  crimeData,
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  onClearHover,
  onOpenArchive
}) {
  const chapterRefs = useRef([]);

  // Setup IntersectionObserver for smooth scrollytelling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-chapter-index'));
            if (!isNaN(index)) {
              onChapterChange(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.2
      }
    );

    chapterRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chapters, onChapterChange]);

  return (
    <div className="scrolly-container" style={{
      position: 'relative',
      maxWidth: '1440px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'minmax(420px, 48%) 1fr',
      gap: '2.5rem',
      padding: '0 2rem'
    }}>
      {/* Left Column: Scrolling Editorial Narrative Cards */}
      <div className="narrative-column" style={{ paddingBottom: '15vh' }}>
        {chapters.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;

          return (
            <article
              key={ch.id}
              id={ch.id}
              data-chapter-index={idx}
              ref={(el) => (chapterRefs.current[idx] = el)}
              style={{
                minHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4rem 0',
                opacity: isActive ? 1 : 0.45,
                transition: 'opacity 400ms ease',
                borderBottom: idx < chapters.length - 1 ? '1px solid var(--color-border)' : 'none'
              }}
            >
              {/* Chapter Tag & Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isActive ? 'var(--color-crime-red)' : 'var(--color-text-muted)',
                  backgroundColor: 'var(--color-surface)',
                  padding: '2px 8px',
                  borderRadius: '2px',
                  border: '1px solid var(--color-border)'
                }}>
                  CHAPTER {ch.tag}
                </span>
                <span className="editorial-eyebrow">
                  {ch.eyebrow}
                </span>
              </div>

              {/* Section Headline */}
              <h2 className="section-headline" style={{ marginBottom: '1.5rem' }}>
                {ch.headline}
              </h2>

              {/* Body Narrative Paragraphs */}
              <div className="body-narrative" style={{ marginBottom: '1.75rem' }}>
                {ch.paragraphs && ch.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Key Statistic Card if present */}
              {ch.keyStat && (
                <div style={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderLeft: '3px solid var(--color-crime-red)',
                  borderRadius: '4px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px'
                }}>
                  <div className="stat-numeral" style={{ fontSize: '36px', color: 'var(--color-crime-red-light)' }}>
                    {ch.keyStat.value}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    {ch.keyStat.label}
                  </div>
                </div>
              )}

              {/* Interactive Cue */}
              {ch.instruction && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border-subtle)',
                  marginBottom: '1rem'
                }}>
                  <Info size={14} color="var(--color-text-secondary)" />
                  <span>{ch.instruction}</span>
                </div>
              )}

              {/* Editorial Insight Note */}
              {ch.insight && (
                <div style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  fontStyle: 'italic',
                  borderLeft: '2px solid var(--color-border)',
                  paddingLeft: '12px',
                  marginTop: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {ch.insight}
                </div>
              )}

              {/* Embedded Chapter-Specific Interactive Visualizations */}
              {/* Chapter 01: Top 10 Total Offences Ranking */}
              {ch.number === 1 && (
                <HorizontalBarChart
                  crimeData={crimeData}
                  mapMode="total_cases"
                  selectedState={selectedState}
                  onSelectState={onSelectState}
                  hoveredState={hoveredState}
                  onHoverState={onHoverState}
                  onClearHover={onClearHover}
                  limit={8}
                />
              )}

              {/* Chapter 02: Top Crime Rate Ranking */}
              {ch.number === 2 && (
                <HorizontalBarChart
                  crimeData={crimeData}
                  mapMode="crime_rate"
                  selectedState={selectedState}
                  onSelectState={onSelectState}
                  hoveredState={hoveredState}
                  onHoverState={onHoverState}
                  onClearHover={onClearHover}
                  limit={8}
                />
              )}

              {/* Chapter 04: Four Categories Overview & Selector */}
              {ch.number === 4 && (
                <CategoryBreakdownBar
                  selectedState={selectedState}
                  activeMode={mapMode}
                  onSelectCategoryMode={(newMode) => setMapMode(newMode)}
                />
              )}

              {/* Chapter 05: Offences Against Persons Rate */}
              {ch.number === 5 && (
                <HorizontalBarChart
                  crimeData={crimeData}
                  mapMode="rate_persons"
                  selectedState={selectedState}
                  onSelectState={onSelectState}
                  hoveredState={hoveredState}
                  onHoverState={onHoverState}
                  onClearHover={onClearHover}
                  limit={6}
                />
              )}

              {/* Chapter 06: Offences Against Property Rate */}
              {ch.number === 6 && (
                <HorizontalBarChart
                  crimeData={crimeData}
                  mapMode="rate_property"
                  selectedState={selectedState}
                  onSelectState={onSelectState}
                  hoveredState={hoveredState}
                  onHoverState={onHoverState}
                  onClearHover={onClearHover}
                  limit={6}
                />
              )}

              {/* Chapter 10: 2D Dimension Scatterplot */}
              {ch.number === 10 && (
                <DimensionScatterplot
                  crimeData={crimeData}
                  selectedState={selectedState}
                  onSelectState={onSelectState}
                  hoveredState={hoveredState}
                  onHoverState={onHoverState}
                  onClearHover={onClearHover}
                />
              )}

              {/* Archival Map Reference Link */}
              <div style={{ marginTop: '1.25rem' }}>
                <button
                  onClick={onOpenArchive}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: 0
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                >
                  <ExternalLink size={12} />
                  <span>Inspect author reference cartography</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Right Column: Sticky Evolving Interactive Vector Map */}
      <div className="sticky-map-column" style={{
        position: 'sticky',
        top: 'calc(var(--nav-height) + 1rem)',
        height: 'calc(100vh - var(--nav-height) - 2rem)',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
      }}>
        <MapCanvas
          geojson={geojson}
          crimeData={crimeData}
          mapMode={mapMode}
          selectedState={selectedState}
          onSelectState={onSelectState}
          hoveredState={hoveredState}
          onHoverState={onHoverState}
          onClearHover={onClearHover}
        />
      </div>
    </div>
  );
}
