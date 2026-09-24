import React, { useState, useEffect, useCallback, useRef } from 'react';
import geoData from './data/nigeria-states.json';
import crimeData from './data/nigeria-crime.json';

import { ChapterNavigator } from './components/story/ChapterNavigator';
import { ChapterHero } from './components/story/ChapterHero';
import { StoryChapters } from './components/story/StoryChapters';
import { MapCanvas } from './components/map/MapCanvas';
import { MethodologyModal } from './components/story/MethodologyModal';

import { CHAPTERS } from './data/chaptersData';

export function App() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [mapMode, setMapMode] = useState('TOTAL_CASES');
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const statesData = crimeData?.states || [];

  // Refs for smooth, glitch-free scroll synchronization
  const activeChapterRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef(null);

  // Scrollytelling step observer using requestAnimationFrame and proximity focal line
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;

        // Calculate overall page scroll progress (0.0 to 1.0)
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const progress = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
          setScrollProgress(progress);
        }

        // If currently in a programmatic smooth scroll jump, suppress intermediate updates
        if (isNavigatingRef.current) {
          return;
        }

        const steps = document.querySelectorAll('.story-step');
        if (!steps.length) return;

        // Check if reader is still looking at the Hero section above story steps
        const firstStepRect = steps[0].getBoundingClientRect();
        if (firstStepRect.top > window.innerHeight * 0.72) {
          if (activeChapterRef.current !== 0) {
            activeChapterRef.current = 0;
            setActiveChapter(0);
            if (CHAPTERS[0]?.mode) {
              setMapMode(CHAPTERS[0].mode);
            }
          }
          return;
        }

        // Focal line where reader eye naturally rests (44% of viewport height)
        const triggerY = window.innerHeight * 0.44;
        const currentActive = activeChapterRef.current;

        let bestIndex = currentActive;
        let minDistance = Infinity;

        steps.forEach((step, idx) => {
          const rect = step.getBoundingClientRect();
          const stepCenter = (rect.top + rect.bottom) / 2;
          let distance = Math.abs(stepCenter - triggerY);

          // Hysteresis buffer: 25px affinity for current active card to prevent knife-edge boundary jitter
          if (idx === currentActive) {
            distance -= 25;
          }

          if (distance < minDistance) {
            minDistance = distance;
            bestIndex = idx;
          }
        });

        if (bestIndex !== currentActive) {
          activeChapterRef.current = bestIndex;
          setActiveChapter(bestIndex);
          const targetChapter = CHAPTERS[bestIndex];
          if (targetChapter && targetChapter.mode) {
            setMapMode(targetChapter.mode);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial alignment
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navTimeoutRef.current) {
        clearTimeout(navTimeoutRef.current);
      }
    };
  }, []);

  // Jump smoothly to specific chapter from top navigation or button
  const handleSelectChapter = useCallback((index) => {
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
    }
    isNavigatingRef.current = true;

    activeChapterRef.current = index;
    setActiveChapter(index);

    const targetChapter = CHAPTERS[index];
    if (targetChapter && targetChapter.mode) {
      setMapMode(targetChapter.mode);
    }

    const steps = document.querySelectorAll('.story-step');
    if (steps[index]) {
      steps[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    // Release lock once smooth scrolling settles
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);
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
        scrollProgress={scrollProgress}
      />

      {/* Hero Opening Screen */}
      <ChapterHero onStartScroll={handleStartScroll} />

      {/* Main Scrollytelling Investigation */}
      <main className="story-wrapper">
        <div className="scrolly-container">
          {/* Left Column: Narrative Step Cards */}
          <div className="narrative-col narrative-scroll-col">
            <StoryChapters
              chapters={CHAPTERS}
              activeChapter={activeChapter}
              statesData={statesData}
              hoveredState={hoveredState}
              setHoveredState={setHoveredState}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              onCategoryClick={handleCategoryClick}
              onOpenMethodology={() => setIsMethodologyOpen(true)}
            />
          </div>

          {/* Right Column: Sticky Evolving Vector Map */}
          <div className="map-sticky-col">
            <MapCanvas
              geoData={geoData}
              mode={mapMode}
              activeChapter={activeChapter}
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
