import React, { useState, useEffect, useCallback } from 'react';
import geojsonData from './data/nigeria-states.json';
import crimeData from './data/nigeria-crime.json';
import chaptersData from './data/story-chapters.json';

import EditorialNav from './components/navigation/EditorialNav';
import HeroSection from './components/story/HeroSection';
import ScrollySection from './components/story/ScrollySection';
import StateProfileDrawer from './components/story/StateProfileDrawer';
import ArchivalCartographyModal from './components/story/ArchivalCartographyModal';
import MethodologySection from './components/story/MethodologySection';
import { soundscape } from './utils/soundscape';

export default function App() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [mapMode, setMapMode] = useState('total_cases');
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  // Sync map mode when active chapter changes during scrolling
  const handleChapterChange = useCallback((index) => {
    setActiveChapterIndex(index);
    const chapter = chaptersData[index];
    if (chapter && chapter.mapConfig && chapter.mapConfig.mapMode) {
      setMapMode(chapter.mapConfig.mapMode);
    }
  }, []);

  // Jump to specific chapter from navigation table of contents
  const handleSelectChapter = useCallback((index) => {
    setActiveChapterIndex(index);
    const targetChapter = chaptersData[index];
    if (targetChapter) {
      const el = document.getElementById(targetChapter.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      if (targetChapter.mapConfig && targetChapter.mapConfig.mapMode) {
        setMapMode(targetChapter.mapConfig.mapMode);
      }
    }
  }, []);

  const handleStartStory = useCallback(() => {
    handleSelectChapter(0);
  }, [handleSelectChapter]);

  const handleToggleAudio = useCallback(() => {
    const newState = soundscape.toggle();
    setAudioActive(newState);
  }, []);

  return (
    <div className="editorial-app" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
      {/* Subtle atmospheric film grain */}
      <div className="ambient-grain" />

      {/* Editorial Top Navigation */}
      <EditorialNav
        chapters={chaptersData}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={handleSelectChapter}
        onOpenArchive={() => setIsArchiveOpen(true)}
        audioActive={audioActive}
        onToggleAudio={handleToggleAudio}
      />

      {/* Chapter 00: Cinematic Hero */}
      <HeroSection onStartStory={handleStartStory} />

      {/* Main Scrollytelling Investigation Container */}
      <main>
        <ScrollySection
          chapters={chaptersData}
          activeChapterIndex={activeChapterIndex}
          onChapterChange={handleChapterChange}
          mapMode={mapMode}
          setMapMode={setMapMode}
          geojson={geojsonData}
          crimeData={crimeData}
          selectedState={selectedState}
          onSelectState={setSelectedState}
          hoveredState={hoveredState}
          onHoverState={setHoveredState}
          onClearHover={() => setHoveredState(null)}
          onOpenArchive={() => setIsArchiveOpen(true)}
        />
      </main>

      {/* Chapter 12: Methodological Integrity & Provenance Footer */}
      <MethodologySection />

      {/* Interactive State Profile Inspection Drawer */}
      {selectedState && (
        <StateProfileDrawer
          stateData={selectedState}
          onClose={() => setSelectedState(null)}
        />
      )}

      {/* Archival Cartography Modal (Author's Reference Maps) */}
      <ArchivalCartographyModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
    </div>
  );
}
