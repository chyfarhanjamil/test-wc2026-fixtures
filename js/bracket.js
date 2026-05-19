/**
 * bracket.js — Knockout stage bracket view
 * Depends on: WC2026 (data.js)
 */

'use strict';

const Bracket = (() => {

  const STAGE_ORDER = ['r32', 'r16', 'qf', 'sf', '3rd', 'final'];
  const STAGE_LABEL = {
    r32: 'Round of 32', r16: 'Round of 16', qf: 'Quarter-Finals',
    sf: 'Semi-Finals', '3rd': '3rd Place', final: 'Final'
  };
  const STAGE_ICON = {
    r32: '⚽', r16: '🎯', qf: '⚡', sf: '🔥', '3rd': '🥉', final: '🏆'
  };

  /* Human-friendly display name: strip internal codes, keep readable part */
  function displayName(raw) {
    // Already a real team name (no placeholder codes) — return as-is
    if (!raw.match(/\b(W|L)\d{2,3}\b/) &&
        !raw.match(/\b(Winner|Loser|Best)\b/i) &&
        !raw.match(/\b(1st|2nd|3rd)\b/)) return raw;

    // Shorten internal labels to readable short-forms
    return raw
      .replace('Best 3rd', 'Best 3rd 🔀')
      .replace(/Winner R32 Match (\d+)/i, 'Winner M$1')
      .replace(/Winner R16 Match (\d+)/i, 'Winner M$1')
      .replace(/Winner QF Match (\d+)/i,  'Winner M$1')
      .replace(/Loser SF Match (\d+)/i,   'Loser M$1')
      .replace(/Winner SF Match (\d+)/i,  'Winner M$1');
  }

  function render() {
    const container = document.getElementById('bracketContent');
    container.innerHTML = '';

    // Legend banner
    const legend = document.createElement('div');
    legend.className = 'bracket-legend';
    legend.innerHTML = `
      <span>ℹ️</span>
      <span>Hover or tap any team slot to see which group teams are involved.</span>`;
    container.appendChild(legend);

    STAGE_ORDER.forEach(stage => {
      const matches = WC2026.FIXTURES.filter(f => f.stage === stage);
      if (!matches.length) return;

      const section = document.createElement('div');
      section.className = 'bracket-section';

      section.innerHTML = `
        <div class="bracket-stage-label">
          <span class="bracket-stage-icon">${STAGE_ICON[stage]}</span>
          ${STAGE_LABEL[stage]}
        </div>`;

      const grid = document.createElement('div');
      grid.className = 'bracket-grid';

      matches.forEach(f => {
        const isFinal = stage === 'final';
        const card = document.createElement('div');
        card.className = `bracket-card${isFinal ? ' bracket-final' : ''}`;

        const homeLabel = displayName(f.home);
        const awayLabel = displayName(f.away);
        const homeDesc  = f.homeDesc || '';
        const awayDesc  = f.awayDesc || '';

        card.innerHTML = `
          <div class="bracket-date">${f.tzDate} · ${f.tzTime} · ${f.venue}</div>
          <div class="bracket-matchup">
            <div class="bracket-team-slot ${homeDesc ? 'has-tooltip' : ''}" ${homeDesc ? `data-desc="${homeDesc.replace(/"/g,"'")}"` : ''}>
              <span class="bracket-team-name">${homeLabel}</span>
              ${homeDesc ? '<span class="bracket-info-icon">ⓘ</span>' : ''}
              ${homeDesc ? `<div class="bracket-tooltip">${homeDesc.replace(/\n/g,'<br>')}</div>` : ''}
            </div>
            <span class="bracket-vs">vs</span>
            <div class="bracket-team-slot ${awayDesc ? 'has-tooltip' : ''}" ${awayDesc ? `data-desc="${awayDesc.replace(/"/g,"'")}"` : ''}>
              <span class="bracket-team-name">${awayLabel}</span>
              ${awayDesc ? '<span class="bracket-info-icon">ⓘ</span>' : ''}
              ${awayDesc ? `<div class="bracket-tooltip right">${awayDesc.replace(/\n/g,'<br>')}</div>` : ''}
            </div>
          </div>`;
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  return { render };
})();
