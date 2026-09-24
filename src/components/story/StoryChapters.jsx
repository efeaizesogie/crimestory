import React from 'react';
import { StoryChapter } from './StoryChapter';
import { CHAPTERS } from '../../data/chaptersData';

/**
 * StoryChapters
 * Renders the sequence of narrative chapters using a single, unified StoryChapter component.
 * Chapters and their data can be passed in directly via the `chapters` prop.
 */
export function StoryChapters({
  chapters = CHAPTERS,
  activeChapter,
  onStepVisible,
  statesData,
  hoveredState,
  setHoveredState,
  selectedState,
  setSelectedState,
  onCategoryClick,
  onOpenMethodology
}) {
  return (
    <div className="narrative-steps-flow">
      {chapters.map((chapter, index) => (
        <StoryChapter
          key={chapter.id || `chapter-${index}`}
          index={index}
          chapter={chapter}
          isActive={activeChapter === index}
          statesData={statesData}
          hoveredState={hoveredState}
          setHoveredState={setHoveredState}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          onCategoryClick={onCategoryClick}
          onOpenMethodology={onOpenMethodology}
        />
      ))}
    </div>
  );
}

export { StoryChapter };
