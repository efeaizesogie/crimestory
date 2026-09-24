import { CLASSIFICATIONS, getStateValue } from './calculations';

// Jenks 5-class sequential palette matching author's maps
export const JENKS_COLORS = [
  '#1e2630', // Class 1 (lowest, muted dark slate)
  '#451a1a', // Class 2
  '#7f1d1d', // Class 3
  '#b91c1c', // Class 4
  '#ef4444'  // Class 5 (highest, vibrant crime signal red)
];

// Crime category colors
export const CATEGORY_COLORS = {
  'Property': '#F97316',
  'Persons': '#EF4444',
  'Lawful Authority': '#14B8A6',
  'Local Acts': '#A855F7'
};

// Returns polygon fill color based on state properties, active mode, and selection
export function getStateFillColor(props, mode, selectedState, hoveredState) {
  if (!props) return '#182027';

  const isSelected = selectedState && selectedState.state === props.state;
  const isHovered = hoveredState && hoveredState.state === props.state;

  // Chapter 03 Concentration Mode: Highlight only Lagos, FCT, Delta
  if (mode === 'concentration') {
    if (props.state === 'Lagos') return '#EF4444';
    if (props.state === 'Federal Capital Territory') return '#F87171';
    if (props.state === 'Delta') return '#B91C1C';
    return '#141A20'; // Dimmed background geography
  }

  // Chapter 09 Dominant Category Mode (Categorical)
  if (mode === 'dominant_category') {
    const cat = props.dominant_category;
    return CATEGORY_COLORS[cat] || '#EF4444';
  }

  // Sequential Choropleth Modes
  const classification = CLASSIFICATIONS[mode];
  if (!classification || !classification.breaks) {
    return '#1e2630';
  }

  const val = getStateValue(props, mode);
  const breaks = classification.breaks;

  let colorIdx = 0;
  for (let i = 0; i < breaks.length; i++) {
    if (val <= breaks[i]) {
      colorIdx = i;
      break;
    }
    colorIdx = breaks.length - 1;
  }

  return JENKS_COLORS[colorIdx];
}
