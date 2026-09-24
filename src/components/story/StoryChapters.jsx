import React from 'react';
import { StateRankingsList } from '../charts/StateRankingsList';
import { CategoryBreakdown } from '../charts/CategoryBreakdown';
import { ScatterPlot } from '../charts/ScatterPlot';
import { StateProfileCard } from '../charts/StateProfileCard';
import { formatNumber, formatRate, formatPercent } from '../../utils/formatting';

export function StoryChapters({
  activeChapter,
  onStepVisible,
  statesData,
  hoveredState,
  setHoveredState,
  selectedState,
  setSelectedState,
  onCategoryClick
}) {
  return (
    <div className="narrative-steps-flow">
      {/* CHAPTER 01: THE BIG PICTURE */}
      <section
        className="story-step"
        data-chapter-index="0"
        data-mode="TOTAL_CASES"
      >
        <div className={`step-card ${activeChapter === 0 ? 'active-step' : ''}`} style={{ '--step-accent': '#EF4444' }}>
          <div className="eyebrow">
            <span className="eyebrow-accent" />
            CHAPTER 01 · THE BIG PICTURE
          </div>
          <h2 className="headline-section">WHERE WAS CRIME REPORTED?</h2>

          <div className="stat-highlight-block">
            <span className="stat-jumbo font-mono">125,790</span>
            <span className="stat-unit">Reported offences across Nigeria · 2016</span>
          </div>

          <p className="body-editorial">
            In 2016, <strong>125,790 criminal offences</strong> were reported across Nigeria’s 36 states and the Federal Capital Territory.
          </p>
          <p className="body-editorial">
            But the national total hides a deeply uneven geography. <strong>Lagos alone accounted for 45,385 reported offences</strong>, more than one-third (36.1%) of all cases recorded nationally.
          </p>
          <p className="body-editorial">
            The Federal Capital Territory followed with 13,181, while Delta recorded 7,867 and Kano recorded 4,917. Together, just these locations accounted for the majority of all reported crime recorded in the country.
          </p>

          <div className="editorial-note">
            <strong>Interactive Instruction:</strong> Hover over any state on the map to explore the exact reported counts, or select a state to view its complete profile.
          </div>

          <StateRankingsList
            statesData={statesData}
            hoveredState={hoveredState}
            setHoveredState={setHoveredState}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
        </div>
      </section>

      {/* CHAPTER 02: POPULATION */}
      <section
        className="story-step"
        data-chapter-index="1"
        data-mode="CRIME_RATE"
      >
        <div className={`step-card ${activeChapter === 1 ? 'active-step' : ''}`} style={{ '--step-accent': '#EAA171' }}>
          <div className="eyebrow" style={{ color: '#EAA171' }}>
            <span className="eyebrow-accent" style={{ backgroundColor: '#EAA171' }} />
            CHAPTER 02 · POPULATION
          </div>
          <h2 className="headline-section">THE DENOMINATOR CHANGES THE STORY</h2>

          <p className="body-editorial">
            Raw counts inherently favor populous places. A massive population creates more opportunities for offences to occur and be reported, so comparing states by total cases alone obscures fundamental differences in scale.
          </p>
          <p className="body-editorial">
            Calculating <strong>rates per 100,000 residents</strong> allows us to ask a different question:
            <em> How many reported offences were recorded relative to the size of the population?</em>
          </p>

          <div className="stat-highlight-block" style={{ borderColor: 'rgba(234, 161, 113, 0.3)' }}>
            <div className="stat-pair-row">
              <div>
                <span className="stat-jumbo font-mono" style={{ color: '#EAA171' }}>351.2</span>
                <span className="stat-unit">Lagos / 100k</span>
              </div>
              <div className="stat-pair-divider" />
              <div>
                <span className="stat-jumbo font-mono" style={{ color: '#EAA171' }}>337.0</span>
                <span className="stat-unit">FCT / 100k</span>
              </div>
            </div>
          </div>

          <p className="body-editorial">
            When normalized by population, Lagos (351.2) and the FCT (337.0) still lead, but the gap narrows dramatically. Meanwhile, states like <strong>Kano</strong>, which had the 4th highest raw count (4,917), drop sharply in rate (36.5 per 100k) due to its population of over 13.4 million.
          </p>

          <div className="editorial-note">
            The geography shifts when population enters the equation. This does not make one measure "correct" and the other "wrong." They answer different questions.
          </div>
        </div>
      </section>

      {/* CHAPTER 03: CONCENTRATION */}
      <section
        className="story-step"
        data-chapter-index="2"
        data-mode="CONCENTRATION"
      >
        <div className={`step-card ${activeChapter === 2 ? 'active-step' : ''}`} style={{ '--step-accent': '#EF4444' }}>
          <div className="eyebrow">
            <span className="eyebrow-accent" />
            CHAPTER 03 · CONCENTRATION
          </div>
          <h2 className="headline-section">THREE PLACES DOMINATE THE COUNT</h2>
          <h3 className="headline-sub" style={{ color: 'var(--crime-red-light)' }}>
            Lagos · Federal Capital Territory · Delta
          </h3>

          <div className="stat-highlight-block">
            <span className="stat-jumbo font-mono">56.7%</span>
            <span className="stat-unit">Of all reported offences in Nigeria</span>
          </div>

          <p className="body-editorial">
            Lagos, the Federal Capital Territory, and Delta together account for more than half (52.8%) of all reported offences in the dataset. Adding Kano brings this cluster to <strong>56.72%</strong> of the national volume.
          </p>

          <div className="concentration-cards-grid">
            <div
              className={`conc-card ${selectedState?.name === 'Lagos' ? 'conc-selected' : ''}`}
              onClick={() => setSelectedState(statesData?.find(s => s.name === 'Lagos'))}
            >
              <span className="conc-name">LAGOS</span>
              <span className="conc-num font-mono">45,385</span>
              <span className="conc-share font-mono">36.1% share</span>
            </div>

            <div
              className={`conc-card ${selectedState?.name === 'FCT' ? 'conc-selected' : ''}`}
              onClick={() => setSelectedState(statesData?.find(s => s.name === 'FCT'))}
            >
              <span className="conc-name">F.C.T</span>
              <span className="conc-num font-mono">13,181</span>
              <span className="conc-share font-mono">10.5% share</span>
            </div>

            <div
              className={`conc-card ${selectedState?.name === 'Delta' ? 'conc-selected' : ''}`}
              onClick={() => setSelectedState(statesData?.find(s => s.name === 'Delta'))}
            >
              <span className="conc-name">DELTA</span>
              <span className="conc-num font-mono">7,867</span>
              <span className="conc-share font-mono">6.3% share</span>
            </div>
          </div>

          <p className="body-editorial" style={{ marginTop: 20 }}>
            Concentration in the raw count does not automatically mean these places had the highest rate of reported offences per resident. The distinction is vital for understanding crime geography.
          </p>
        </div>
      </section>

      {/* CHAPTER 04: FOUR CATEGORIES */}
      <section
        className="story-step"
        data-chapter-index="3"
        data-mode="PROPERTY_RATE"
      >
        <div className={`step-card ${activeChapter === 3 ? 'active-step' : ''}`} style={{ '--step-accent': '#F97316' }}>
          <div className="eyebrow" style={{ color: '#F97316' }}>
            <span className="eyebrow-accent" style={{ backgroundColor: '#F97316' }} />
            CHAPTER 04 · FOUR CATEGORIES
          </div>
          <h2 className="headline-section">FOUR CRIMES. FOUR GEOGRAPHIES.</h2>

          <p className="body-editorial">
            The national total is composed of four broad statutory offence categories. Each category presents a distinctly different geographic footprint across the country.
          </p>

          <CategoryBreakdown
            activeCategory="PROPERTY_RATE"
            onSelectCategory={onCategoryClick}
          />

          <div className="editorial-note">
            The geography of crime changes immediately when the definition of crime changes. Click on any category above to transition the map.
          </div>
        </div>
      </section>

      {/* CHAPTER 05: CRIMES AGAINST PERSONS */}
      <section
        className="story-step"
        data-chapter-index="4"
        data-mode="PERSONS_RATE"
      >
        <div className={`step-card ${activeChapter === 4 ? 'active-step' : ''}`} style={{ '--step-accent': '#EF4444' }}>
          <div className="eyebrow">
            <span className="eyebrow-accent" />
            CHAPTER 05 · PERSONS
          </div>
          <h2 className="headline-section">CRIMES AGAINST PERSONS</h2>

          <div className="stat-highlight-block">
            <span className="stat-jumbo font-mono">45,554</span>
            <span className="stat-unit">Reported offences (36.2% of national total)</span>
          </div>

          <p className="body-editorial">
            <strong>45,554 reported offences</strong> in the national dataset were classified as offences against persons. This category encompasses crimes directly involving human beings, including murder, manslaughter, infanticide, concealment of birth, rape, and severe physical assault.
          </p>
          <p className="body-editorial">
            On the map, <strong>Lagos records 119.4 per 100,000</strong>, while <strong>FCT records 76.3</strong> and <strong>Delta records 67.1</strong>.
          </p>
          <p className="body-editorial">
            Notably, in states like Delta, Cross River, and Edo, offences against persons constitute a significantly higher proportion of total reported cases than they do in northern states.
          </p>
        </div>
      </section>

      {/* CHAPTER 06: PROPERTY CRIME */}
      <section
        className="story-step"
        data-chapter-index="5"
        data-mode="PROPERTY_RATE"
      >
        <div className={`step-card ${activeChapter === 5 ? 'active-step' : ''}`} style={{ '--step-accent': '#F97316' }}>
          <div className="eyebrow" style={{ color: '#F97316' }}>
            <span className="eyebrow-accent" style={{ backgroundColor: '#F97316' }} />
            CHAPTER 06 · PROPERTY
          </div>
          <h2 className="headline-section">PROPERTY OFFENCES DOMINATE THE NATIONAL TOTAL</h2>

          <div className="stat-highlight-block" style={{ borderColor: 'rgba(249, 115, 22, 0.3)' }}>
            <span className="stat-jumbo font-mono" style={{ color: '#F97316' }}>65,397</span>
            <span className="stat-unit">52.0% of all reported offences in Nigeria</span>
          </div>

          <p className="body-editorial">
            Offences against property represent more than half of all reported criminal cases in Nigeria. The category covers infractions involving belongings and assets, including stealing, receiving stolen property, robbery, burglary, housebreaking, and obtaining by false pretence.
          </p>
          <p className="body-editorial">
            While Lagos logged the largest raw count (22,885 property cases), the <strong>Federal Capital Territory had the highest rate in the country: 239.0 per 100,000</strong>, followed by Lagos at 177.1.
          </p>
        </div>
      </section>

      {/* CHAPTER 07: LAWFUL AUTHORITY */}
      <section
        className="story-step"
        data-chapter-index="6"
        data-mode="AUTHORITY_RATE"
      >
        <div className={`step-card ${activeChapter === 6 ? 'active-step' : ''}`} style={{ '--step-accent': '#14B8A6' }}>
          <div className="eyebrow" style={{ color: '#14B8A6' }}>
            <span className="eyebrow-accent" style={{ backgroundColor: '#14B8A6' }} />
            CHAPTER 07 · LAWFUL AUTHORITY
          </div>
          <h2 className="headline-section">OFFENCES AGAINST LAWFUL AUTHORITY</h2>

          <div className="stat-highlight-block" style={{ borderColor: 'rgba(20, 184, 166, 0.3)' }}>
            <span className="stat-jumbo font-mono" style={{ color: '#14B8A6' }}>12,144</span>
            <span className="stat-unit">9.7% of all recorded offences</span>
          </div>

          <p className="body-editorial">
            <strong>12,144 offences</strong> were recorded against lawful authority. These encompass breaches against legal and regulatory establishments, contempt of legal process, and statutory tax-related infractions.
          </p>
          <p className="body-editorial">
            Reporting in this category is heavily concentrated in commercial hubs and administrative centers where tax collection and institutional enforcement mechanisms are most active: <strong>Lagos leads with 52.4 per 100,000</strong>, followed by the FCT (21.6) and Delta (20.6).
          </p>
        </div>
      </section>

      {/* CHAPTER 08: LOCAL ACTS */}
      <section
        className="story-step"
        data-chapter-index="7"
        data-mode="LOCAL_ACTS_RATE"
      >
        <div className={`step-card ${activeChapter === 7 ? 'active-step' : ''}`} style={{ '--step-accent': '#A855F7' }}>
          <div className="eyebrow" style={{ color: '#A855F7' }}>
            <span className="eyebrow-accent" style={{ backgroundColor: '#A855F7' }} />
            CHAPTER 08 · LOCAL ACTS
          </div>
          <h2 className="headline-section">THE SMALLEST CATEGORY, A DISTINCT PATTERN</h2>

          <div className="stat-highlight-block" style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}>
            <span className="stat-jumbo font-mono" style={{ color: '#A855F7' }}>2,695</span>
            <span className="stat-unit">2.1% of national reported offences</span>
          </div>

          <p className="body-editorial">
            Local Acts represent legislation enforceable solely within Nigeria, such as specific liquor control regulations or firearms licensing acts.
          </p>
          <p className="body-editorial">
            Unlike property and authority offences which cluster around Lagos and Abuja, Local Acts offences show an entirely unique spatial pattern, led by <strong>Gombe State at 10.6 per 100,000</strong> (356 cases).
          </p>
        </div>
      </section>

      {/* CHAPTER 09: STATE SIGNATURES */}
      <section
        className="story-step"
        data-chapter-index="8"
        data-mode="STATE_SIGNATURES"
      >
        <div className={`step-card ${activeChapter === 8 ? 'active-step' : ''}`} style={{ '--step-accent': '#F97316' }}>
          <div className="eyebrow">
            <span className="eyebrow-accent" />
            CHAPTER 09 · STATE PROFILES
          </div>
          <h2 className="headline-section">EVERY STATE HAS A DIFFERENT SIGNATURE</h2>

          <p className="body-editorial">
            The national aggregate masks the unique internal composition of each state. Across Nigeria, <strong>28 states are dominated by property offences</strong>, while <strong>9 states are dominated by offences against persons</strong>.
          </p>

          <p className="body-editorial">
            Click on any state in the map or list below to inspect its unique composition fingerprint:
          </p>

          {selectedState ? (
            <StateProfileCard
              state={selectedState}
              onClose={() => setSelectedState(null)}
              onCategoryClick={onCategoryClick}
            />
          ) : (
            <div className="select-prompt-box">
              <span className="prompt-text">Click any state on the map to reveal its detailed composition signature.</span>
            </div>
          )}
        </div>
      </section>

      {/* CHAPTER 10: DIVERGENCE */}
      <section
        className="story-step"
        data-chapter-index="9"
        data-mode="PROPERTY_DIVERGENCE"
      >
        <div className={`step-card ${activeChapter === 9 ? 'active-step' : ''}`} style={{ '--step-accent': '#F97316' }}>
          <div className="eyebrow" style={{ color: '#F97316' }}>
            <span className="eyebrow-accent" style={{ backgroundColor: '#F97316' }} />
            CHAPTER 10 · DIVERGENCE
          </div>
          <h2 className="headline-section">WHERE STATES DEPART FROM THE NATIONAL PROFILE</h2>

          <p className="body-editorial">
            Property offences represented <strong>52.0%</strong> of all reported cases nationally. However, state-level reality departs markedly from this benchmark.
          </p>

          <p className="body-editorial">
            This diverging map illustrates how far each state’s property share swings relative to the 52.0% national norm:
          </p>

          <div className="divergence-explainer-grid">
            <div className="div-exp-item positive-div">
              <span className="div-tag font-mono">+18.9% (FCT)</span>
              <span className="div-text">Heavily property-dominant relative to the nation (70.9% property cases).</span>
            </div>
            <div className="div-exp-item negative-div">
              <span className="div-tag font-mono">-20.2% (Delta)</span>
              <span className="div-text">Significantly more person-centric relative to the nation (49.7% persons cases).</span>
            </div>
          </div>

          <div className="editorial-note">
            Divergence highlights differences in composition, not a safety ranking. It reflects reporting characteristics and regional enforcement emphasis.
          </div>
        </div>
      </section>

      {/* CHAPTER 11: SCATTERPLOT & EXPLORER STUDIO */}
      <section
        className="story-step"
        data-chapter-index="10"
        data-mode="DOMINANT_CATEGORY"
      >
        <div className={`step-card ${activeChapter === 10 ? 'active-step' : ''}`} style={{ '--step-accent': '#EF4444' }}>
          <div className="eyebrow">
            <span className="eyebrow-accent" />
            CHAPTER 11 · SYNTHESIS
          </div>
          <h2 className="headline-section">THERE IS NO SINGLE MAP OF CRIME</h2>

          <p className="body-editorial">
            Raw counts reveal where the highest volume was processed. Rates show where reported cases were highest relative to population size. Category breakdowns expose divergent spatial patterns.
          </p>

          <ScatterPlot
            statesData={statesData}
            hoveredState={hoveredState}
            setHoveredState={setHoveredState}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />

          <p className="body-editorial" style={{ marginTop: 24 }}>
            The map changes because the question changes. The geography of reported crime is not a single map—it is an ensemble of spatial dimensions revealed by the lens we choose.
          </p>
        </div>
      </section>

      {/* CHAPTER 12: LIMITATIONS */}
      <section
        className="story-step"
        data-chapter-index="11"
        data-mode="TOTAL_CASES"
      >
        <div className={`step-card ${activeChapter === 11 ? 'active-step' : ''}`} style={{ '--step-accent': '#6B7280' }}>
          <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>
            <span className="eyebrow-accent" style={{ backgroundColor: 'var(--text-muted)' }} />
            CHAPTER 12 · CRITICAL READING
          </div>
          <h2 className="headline-section">A MAP OF REPORTED CRIME IS NOT A MAP OF ALL CRIME</h2>

          <p className="body-editorial">
            These data describe <strong>reported offences recorded in police records</strong>. They do not capture every crime that occurred.
          </p>
          <p className="body-editorial">
            Differences in reporting willingness, trust in institutions, proximity to police stations, and record-keeping infrastructure all exert a profound influence on the observable data.
          </p>
          <p className="body-editorial">
            A high count or rate should never be naively interpreted as proof of greater danger, nor a low count as proof of safety.
          </p>

          <div className="methodology-teaser-card">
            <h4>RESEARCH & METHODOLOGY</h4>
            <p>
              Examine the full dataset documentation, rate calculation formulas, and geographic classifications.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
