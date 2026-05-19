/**
 * teamGrid.js — Team card grid module
 * Depends on: WC2026 (data.js)
 */

'use strict';

const TeamGrid = (() => {

  /* Build all team cards — call with reinit=true after timezone change */
  function init(reinit = false) {
    const grid = document.getElementById('grid');

    // Clear old cards on reinit
    if (reinit) {
      grid.querySelectorAll('.team-card').forEach(c => c.remove());
      const old = document.getElementById('noResults');
      if (old) old.remove();
    }

    WC2026.teams.forEach(team => {
      const { group, matches } = WC2026.teamMap[team];
      const flag = WC2026.FLAGS[team] || '🏳️';

      const card = document.createElement('div');
      card.className    = 'team-card';
      card.dataset.team  = team;
      card.dataset.group = group;

      const rows = matches.map(f => {
        const parts = f.home === team
          ? [`<span class="highlight">${f.home}</span>`, f.away]
          : [f.home, `<span class="highlight">${f.away}</span>`];
        return `<div class="match-row" data-slot="${f.slot}" data-group="${f.group}">
          <div class="match-date">${f.tzDate}</div>
          <div class="match-vs">${parts[0]} vs ${parts[1]}</div>
          <div class="match-time">${f.tzTime}</div>
        </div>`;
      }).join('');

      card.innerHTML = `
        <div class="card-header">
          <div class="flag-circle">${flag}</div>
          <div class="team-info">
            <h2>${team}</h2>
            <div class="group-label">Group ${group}
              <span class="count-badge">${matches.length} matches</span>
            </div>
          </div>
        </div>
        <div class="match-list">${rows}</div>
        <div class="no-match-in-filter hidden"></div>`;

      grid.appendChild(card);
    });

    const noRes = document.createElement('div');
    noRes.id        = 'noResults';
    noRes.className = 'no-results hidden';
    grid.appendChild(noRes);
  }

  /* Re-filter cards based on current mode / search / group / time slot */
  function render({ mode, activeGroup, activeTimeSlot }) {
    const q     = (document.getElementById('search').value || '').toLowerCase().trim();
    const cards = document.querySelectorAll('.team-card');
    let visible = 0;

    cards.forEach(card => {
      const teamName  = card.dataset.team.toLowerCase();
      const teamGroup = card.dataset.group;

      const matchesSearch = !q || teamName.includes(q);
      const matchesGroup  = mode !== 'group' || !activeGroup || teamGroup === activeGroup
                            || (q && matchesSearch);

      if (!matchesSearch || !matchesGroup) {
        card.classList.add('hidden');
        return;
      }

      const rows = card.querySelectorAll('.match-row');
      let shownRows = 0;

      rows.forEach(row => {
        const slotOk  = !activeTimeSlot || row.dataset.slot === activeTimeSlot;
        const groupOk = mode !== 'group' || !activeGroup || row.dataset.group === activeGroup
                        || (q && matchesSearch);
        const show = slotOk && groupOk;
        row.style.display = show ? '' : 'none';
        if (show) shownRows++;
      });

      card.classList.remove('hidden');
      visible++;

      const inlineMsg = card.querySelector('.no-match-in-filter');
      if (shownRows === 0) {
        const available = [...new Set([...rows].map(r => r.dataset.slot))];
        inlineMsg.textContent = activeTimeSlot
          ? `No matches in this slot. ${card.dataset.team} plays in: ${available.join(', ')}.`
          : 'No matches match filters.';
        inlineMsg.classList.remove('hidden');
      } else {
        inlineMsg.classList.add('hidden');
      }
    });

    const noResults = document.getElementById('noResults');
    if (visible === 0) {
      noResults.textContent = q
        ? `No team found matching "${q}".`
        : 'No teams match the current filters.';
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  }

  return { init, render };
})();
