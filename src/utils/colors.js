// Color scales and classification matching the authoritative reference maps

export const PALETTES = {
  TOTAL_CASES: {
    name: 'Total Reported Offences',
    unit: 'cases',
    breaks: [120, 1581, 3494, 7868, 13182, 45385],
    labels: ['120', '1581', '3494', '7868', '13182', '45385'],
    colors: ['#222D35', '#422F38', '#93383E', '#DC3E42', '#F05151'],
    accent: '#EF4444'
  },
  CRIME_RATE: {
    name: 'Crime Rate (per 100k)',
    unit: 'per 100k',
    breaks: [1.5, 23.1, 46.4, 72.8, 134.9, 351.2],
    labels: ['1.5', '23.1', '46.4', '72.8', '134.9', '351.2'],
    colors: ['#1A2D35', '#264955', '#3E6977', '#9A9180', '#EAA171'],
    accent: '#EAA171'
  },
  CONCENTRATION: {
    name: 'Top Concentration Units',
    unit: 'cases',
    accent: '#EF4444',
    dimLand: '#141A20',
    highlightLand: '#2A1F24'
  },
  PERSONS_RATE: {
    name: 'Crimes Against Persons (per 100k)',
    unit: 'per 100k',
    breaks: [0.63, 7.0, 12.0, 17.9, 26.2, 119.4],
    labels: ['0.63', '7.0', '12.0', '17.9', '26.2', '119.4'],
    colors: ['#221618', '#4D1E22', '#8F2C33', '#C8373D', '#F04D4D'],
    accent: '#EF4444'
  },
  PROPERTY_RATE: {
    name: 'Crimes Against Property (per 100k)',
    unit: 'per 100k',
    breaks: [0.8, 8.4, 17.6, 30.0, 45.0, 239.0],
    labels: ['0.8', '8.4', '17.6', '30.0', '45.0', '239.0'],
    colors: ['#241913', '#5A2C18', '#99451B', '#D95B16', '#FF7A1A'],
    accent: '#F97316'
  },
  AUTHORITY_RATE: {
    name: 'Offences Against Lawful Authority (per 100k)',
    unit: 'per 100k',
    breaks: [0.0, 2.0, 5.0, 10.0, 20.0, 52.4],
    labels: ['0.0', '2.0', '5.0', '10.0', '20.0', '52.4'],
    colors: ['#112523', '#1A413D', '#20655E', '#259388', '#2CD8C5'],
    accent: '#14B8A6'
  },
  LOCAL_ACTS_RATE: {
    name: 'Offences Against Local Acts (per 100k)',
    unit: 'per 100k',
    breaks: [0.0, 0.5, 1.5, 3.0, 5.0, 10.6],
    labels: ['0.0', '0.5', '1.5', '3.0', '5.0', '10.6'],
    colors: ['#1C1625', '#392254', '#5C318C', '#8842CC', '#B762FF'],
    accent: '#A855F7'
  },
  DOMINANT_CATEGORY: {
    name: 'Dominant Offence Category',
    categories: {
      'Property': '#F97316',
      'Persons': '#EF4444',
      'Lawful Authority': '#14B8A6',
      'Local Acts': '#A855F7'
    },
    accent: '#F97316'
  },
  PROPERTY_DIVERGENCE: {
    name: 'Divergence from National Property Share (52.0%)',
    unit: '% difference',
    breaks: [-30, -15, -5, 5, 15, 30],
    labels: ['-30%', '-15%', '-5%', '+5%', '+15%', '+30%'],
    colors: ['#24424D', '#365C6B', '#222932', '#944E1C', '#E66912'],
    accent: '#F97316'
  }
};

/**
 * Returns fill color for a given state feature based on active map mode
 */
export function getStateFillColor(feature, mode) {
  const p = feature.properties || feature;
  
  if (mode === 'TOTAL_CASES') {
    const val = p.total_cases;
    const { breaks, colors } = PALETTES.TOTAL_CASES;
    if (val <= breaks[1]) return colors[0];
    if (val <= breaks[2]) return colors[1];
    if (val <= breaks[3]) return colors[2];
    if (val <= breaks[4]) return colors[3];
    return colors[4];
  }

  if (mode === 'CRIME_RATE') {
    const val = p.crime_rate;
    const { breaks, colors } = PALETTES.CRIME_RATE;
    if (val <= breaks[1]) return colors[0];
    if (val <= breaks[2]) return colors[1];
    if (val <= breaks[3]) return colors[2];
    if (val <= breaks[4]) return colors[3];
    return colors[4];
  }

  if (mode === 'CONCENTRATION') {
    const dominantStates = ['Lagos', 'FCT', 'Delta', 'Kano'];
    if (dominantStates.includes(p.name)) {
      return '#261619';
    }
    return PALETTES.CONCENTRATION.dimLand;
  }

  if (mode === 'PERSONS_RATE') {
    const val = p.persons_rate;
    const { breaks, colors } = PALETTES.PERSONS_RATE;
    if (val <= breaks[1]) return colors[0];
    if (val <= breaks[2]) return colors[1];
    if (val <= breaks[3]) return colors[2];
    if (val <= breaks[4]) return colors[3];
    return colors[4];
  }

  if (mode === 'PROPERTY_RATE') {
    const val = p.property_rate;
    const { breaks, colors } = PALETTES.PROPERTY_RATE;
    if (val <= breaks[1]) return colors[0];
    if (val <= breaks[2]) return colors[1];
    if (val <= breaks[3]) return colors[2];
    if (val <= breaks[4]) return colors[3];
    return colors[4];
  }

  if (mode === 'AUTHORITY_RATE') {
    const val = p.authority_rate;
    const { breaks, colors } = PALETTES.AUTHORITY_RATE;
    if (val <= breaks[1]) return colors[0];
    if (val <= breaks[2]) return colors[1];
    if (val <= breaks[3]) return colors[2];
    if (val <= breaks[4]) return colors[3];
    return colors[4];
  }

  if (mode === 'LOCAL_ACTS_RATE') {
    const val = p.local_acts_rate;
    const { breaks, colors } = PALETTES.LOCAL_ACTS_RATE;
    if (val <= breaks[1]) return colors[0];
    if (val <= breaks[2]) return colors[1];
    if (val <= breaks[3]) return colors[2];
    if (val <= breaks[4]) return colors[3];
    return colors[4];
  }

  if (mode === 'DOMINANT_CATEGORY' || mode === 'STATE_SIGNATURES') {
    return PALETTES.DOMINANT_CATEGORY.categories[p.dominant_category] || '#F97316';
  }

  if (mode === 'PROPERTY_DIVERGENCE') {
    const val = p.property_divergence;
    const { breaks, colors } = PALETTES.PROPERTY_DIVERGENCE;
    if (val <= breaks[1]) return colors[0];
    if (val <= breaks[2]) return colors[1];
    if (val <= breaks[3]) return colors[2];
    if (val <= breaks[4]) return colors[3];
    return colors[4];
  }

  return '#182027';
}
