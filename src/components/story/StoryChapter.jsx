import React from 'react';
import { StateRankingsList } from '../charts/StateRankingsList';
import { CategoryBreakdown } from '../charts/CategoryBreakdown';
import { ScatterPlot } from '../charts/ScatterPlot';
import { StateProfileCard } from '../charts/StateProfileCard';

/**
 * StoryChapter
 * Reusable single component to render an individual chapter card in the scrollytelling flow.
 */
export function StoryChapter({
  chapter,
  index,
  isActive,
  statesData,
  hoveredState,
  setHoveredState,
  selectedState,
  setSelectedState,
  onCategoryClick,
  onOpenMethodology
}) {
  const accentColor = chapter.accentColor || '#EF4444';
  const eyebrowColor = chapter.eyebrowColor || (accentColor !== '#EF4444' ? accentColor : undefined);

  // Render interactive charts or embedded feature blocks
  const renderCustomComponent = () => {
    if (typeof chapter.render === 'function') {
      return chapter.render({
        statesData,
        hoveredState,
        setHoveredState,
        selectedState,
        setSelectedState,
        onCategoryClick,
        onOpenMethodology,
        isActive
      });
    }

    switch (chapter.customType) {
      case 'rankings':
        return (
          <StateRankingsList
            statesData={statesData}
            hoveredState={hoveredState}
            setHoveredState={setHoveredState}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
        );

      case 'concentration':
        return (
          <div className="concentration-cards-grid">
            <div
              className={`conc-card ${selectedState?.name === 'Lagos' ? 'conc-selected' : ''}`}
              onClick={() => setSelectedState(statesData?.find((s) => s.name === 'Lagos'))}
            >
              <span className="conc-name">LAGOS</span>
              <span className="conc-num font-mono">45,385</span>
              <span className="conc-share font-mono">36.1% share</span>
            </div>

            <div
              className={`conc-card ${selectedState?.name === 'FCT' ? 'conc-selected' : ''}`}
              onClick={() => setSelectedState(statesData?.find((s) => s.name === 'FCT'))}
            >
              <span className="conc-name">F.C.T</span>
              <span className="conc-num font-mono">13,181</span>
              <span className="conc-share font-mono">10.5% share</span>
            </div>

            <div
              className={`conc-card ${selectedState?.name === 'Delta' ? 'conc-selected' : ''}`}
              onClick={() => setSelectedState(statesData?.find((s) => s.name === 'Delta'))}
            >
              <span className="conc-name">DELTA</span>
              <span className="conc-num font-mono">7,867</span>
              <span className="conc-share font-mono">6.3% share</span>
            </div>
          </div>
        );

      case 'categories':
        return (
          <CategoryBreakdown
            activeCategory={chapter.activeCategory || 'PROPERTY_RATE'}
            onSelectCategory={onCategoryClick}
          />
        );

      case 'profile':
        return selectedState ? (
          <StateProfileCard
            state={selectedState}
            onClose={() => setSelectedState(null)}
            onCategoryClick={onCategoryClick}
          />
        ) : (
          <div className="select-prompt-box">
            <span className="prompt-text">
              Click any state on the map to reveal its detailed composition signature.
            </span>
          </div>
        );

      case 'divergence':
        return (
          <div className="divergence-explainer-grid">
            <div className="div-exp-item positive-div">
              <span className="div-tag font-mono">+18.9% (FCT)</span>
              <span className="div-text">
                Heavily property-dominant relative to the nation (70.9% property cases).
              </span>
            </div>
            <div className="div-exp-item negative-div">
              <span className="div-tag font-mono">-20.2% (Delta)</span>
              <span className="div-text">
                Significantly more person-centric relative to the nation (49.7% persons cases).
              </span>
            </div>
          </div>
        );

      case 'scatter':
        return (
          <ScatterPlot
            statesData={statesData}
            hoveredState={hoveredState}
            setHoveredState={setHoveredState}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
        );

      case 'methodology':
        return (
          <div
            className="methodology-teaser-card"
            onClick={onOpenMethodology}
            style={onOpenMethodology ? { cursor: 'pointer' } : undefined}
          >
            <h4>RESEARCH & METHODOLOGY</h4>
            <p>
              Examine the full dataset documentation, rate calculation formulas, and geographic classifications.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Render stat highlight (single number or paired values)
  const renderStatBlock = () => {
    if (!chapter.stat) return null;

    if (chapter.stat.type === 'pair') {
      return (
        <div
          className="stat-highlight-block"
          style={chapter.stat.borderColor ? { borderColor: chapter.stat.borderColor } : undefined}
        >
          <div className="stat-pair-row">
            {chapter.stat.items.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="stat-pair-divider" />}
                <div>
                  <span
                    className="stat-jumbo font-mono"
                    style={{ color: item.color || accentColor }}
                  >
                    {item.jumbo}
                  </span>
                  <span className="stat-unit">{item.unit}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }

    const statBorder = chapter.stat.borderColor;
    const statColor = chapter.stat.color || (accentColor !== '#EF4444' ? accentColor : undefined);

    return (
      <div
        className="stat-highlight-block"
        style={statBorder ? { borderColor: statBorder } : undefined}
      >
        <span
          className="stat-jumbo font-mono"
          style={statColor ? { color: statColor } : undefined}
        >
          {chapter.stat.jumbo}
        </span>
        <span className="stat-unit">{chapter.stat.unit}</span>
      </div>
    );
  };

  return (
    <section
      className="story-step"
      data-chapter-index={index}
      data-mode={chapter.mode}
      id={`story-step-${index}`}
    >
      <div
        className={`step-card ${isActive ? 'active-step' : ''}`}
        style={{ '--step-accent': accentColor }}
      >
        {/* Editorial Eyebrow Header & Progress Pill */}
        <div className="step-eyebrow-row">
          <div className="step-eyebrow-left">

          </div>
          <span className="step-index-pill font-mono">
            {String(index + 1).padStart(2, '0')} / 12
          </span>
        </div>

        {/* Section Headline */}
        <h2 className="headline-section">{chapter.headline}</h2>
        {chapter.headlineSub && (
          <h3 className="headline-sub" style={{ color: 'var(--crime-red-light)' }}>
            {chapter.headlineSub}
          </h3>
        )}

        {/* Top Stat Highlight */}
        {!chapter.statAfterParagraphs && renderStatBlock()}

        {/* Editorial Body Paragraphs */}
        {chapter.paragraphs?.map((para, pIdx) => (
          <p
            key={`p-${pIdx}`}
            className="body-editorial"
            dangerouslySetInnerHTML={{ __html: para }}
          />
        ))}

        {/* Interleaved Stat Highlight (e.g. Chapter 02) */}
        {chapter.statAfterParagraphs && renderStatBlock()}

        {/* Paragraphs immediately after stat */}
        {chapter.afterStatParagraphs?.map((para, pIdx) => (
          <p
            key={`after-stat-${pIdx}`}
            className="body-editorial"
            dangerouslySetInnerHTML={{ __html: para }}
          />
        ))}

        {/* Custom Interactive Component */}
        {renderCustomComponent()}

        {/* Paragraphs following custom component */}
        {chapter.afterCustomParagraphs?.map((para, pIdx) => (
          <p
            key={`after-custom-${pIdx}`}
            className="body-editorial"
            style={typeof para === 'object' ? para.style : undefined}
            dangerouslySetInnerHTML={{
              __html: typeof para === 'string' ? para : para.text
            }}
          />
        ))}

        {/* Editorial Footnote / Instructions */}
        {chapter.note && (
          <div
            className="editorial-note"
            dangerouslySetInnerHTML={{ __html: chapter.note }}
          />
        )}
      </div>
    </section>
  );
}
