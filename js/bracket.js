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

  function render() {
    const container = document.getElementById('bracketContent');
    container.innerHTML = '';

    STAGE_ORDER.forEach(stage => {
      const matches = WC2026.FIXTURES.filter(f => f.stage === stage);
      if (!matches.length) return;

      const section = document.createElement('div');
      section.className = 'bracket-section';

      section.innerHTML = `<div class="bracket-stage-label">${STAGE_LABEL[stage]}</div>`;

      const grid = document.createElement('div');
      grid.className = 'bracket-grid';

      matches.forEach(f => {
        const isFinal = stage === 'final';
        const card = document.createElement('div');
        card.className = `bracket-card${isFinal ? ' bracket-final' : ''}`;
        card.innerHTML = `
          <div class="bracket-date">${f.bstDate} · ${f.bstTime} · ${f.venue}</div>
          <div class="bracket-matchup">
            <span class="bracket-team">${f.home}</span>
            <span class="bracket-vs">vs</span>
            <span class="bracket-team">${f.away}</span>
          </div>`;
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  return { render };
})();
