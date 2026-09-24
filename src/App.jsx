import React, { useState, useEffect, useCallback, useRef } from 'react';
import geoData from './data/nigeria-states.json';
import crimeData from './data/nigeria-crime.json';

import { ChapterNavigator } from './components/story/ChapterNavigator';
import { ChapterHero } from './components/story/ChapterHero';
import { StoryChapters } from './components/story/StoryChapters';
import { MapCanvas } from './components/map/MapCanvas';
import { MethodologyModal } from './components/story/MethodologyModal';

const CHAPTERS = [
  { id: 'ch-01', title: 'The Big Picture', mode: 'TOTAL_CASES' },
  { id: 'ch-02', title: 'Population & Rates', mode: 'CRIME_RATE' },
  { id: 'ch-03', title: 'Top 3 Concentration', mode: 'CONCENTRATION' },
  { id: 'ch-04', title: 'Four Categories', mode: 'PROPERTY_RATE' },
  { id: 'ch-05', title: 'Offences vs Persons', mode: 'PERSONS_RATE' },
  { id: 'ch-06', title: 'Offences vs Property', mode: 'PROPERTY_RATE' },
  { id: 'ch-07', title: 'Lawful Authority', mode: 'AUTHORITY_RATE' },
  { id: 'ch-08', title: 'Local Acts', mode: 'LOCAL_ACTS_RATE' },
  { id: 'ch-09', title: 'State Signatures', mode: 'STATE_SIGNATURES' },
  { id: 'ch-10', title: 'Property Divergence', mode: 'PROPERTY_DIVERGENCE' },
  { id: 'ch-11', title: 'Synthesis & Scatter', mode: 'DOMINANT_CATEGORY' },
  { id: 'ch-12', title: 'Data Limitations', mode: 'TOTAL_CASES' },
];

export function App() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [mapMode, setMapMode] = useState('TOTAL_CASES');
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const statesData = crimeData?.states || [];

  // Scrollytelling step observer
  useEffect(() => {
    const handleScroll = () => {
      const steps = document.querySelectorAll('.story-step');
      const triggerY = window.innerHeight * 0.45;

      let currentStepIndex = 0;
      steps.forEach((step) => {
        const rect = step.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= triggerY) {
          const idx = parseInt(step.getAttribute('data-chapter-index'), 10);
          if (!isNaN(idx)) {
            currentStepIndex = idx;
          }
        }
      });

      if (currentStepIndex !== activeChapter) {
        setActiveChapter(currentStepIndex);
        const targetChapter = CHAPTERS[currentStepIndex];
        if (targetChapter && targetChapter.mode) {
          setMapMode(targetChapter.mode);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeChapter]);

  // Jump to specific chapter from top navigation
  const handleSelectChapter = useCallback((index) => {
    setActiveChapter(index);
    const steps = document.querySelectorAll('.story-step');
    if (steps[index]) {
      steps[index].scrollIntoView({ behavior: 'smooth' });
    }
    const targetChapter = CHAPTERS[index];
    if (targetChapter && targetChapter.mode) {
      setMapMode(targetChapter.mode);
    }
  }, []);

  const handleStartScroll = useCallback(() => {
    handleSelectChapter(0);
  }, [handleSelectChapter]);

  const handleCategoryClick = useCallback((categoryMode) => {
    setMapMode(categoryMode);
  }, []);

  return (
    <div className="app-root">
      {/* Editorial Top Navigation */}
      <ChapterNavigator
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        chapters={CHAPTERS}
      />

      {/* Hero Opening Screen */}
      <ChapterHero onStartScroll={handleStartScroll} />

      {/* Main Scrollytelling Investigation */}
      <main className="story-wrapper">
        <div className="scrolly-container">
          {/* Left Column: Narrative Step Cards */}
          <div className="narrative-col narrative-scroll-col">
            <StoryChapters
              activeChapter={activeChapter}
              statesData={statesData}
              hoveredState={hoveredState}
              setHoveredState={setHoveredState}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              onCategoryClick={handleCategoryClick}
            />
          </div>

          {/* Right Column: Sticky Evolving Vector Map */}
          <div className="map-sticky-col">
            <MapCanvas
              geoData={geoData}
              mode={mapMode}
              hoveredState={hoveredState}
              setHoveredState={setHoveredState}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              allowModeSwitch={true}
              onModeChange={(newMode) => setMapMode(newMode)}
            />
          </div>
        </div>
      </main>

      {/* Research & Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
export default App;
