/**
 * app.js — Main controller: manages UI state and wires modules together
 * Depends on: WC2026, TeamGrid, Calendar, Bracket, Export
 */

'use strict';

const App = (() => {

  let currentMode    = 'teams';
  let activeGroup    = null;
  let activeTimeSlot = null;

  /* ── Init ────────────────────────────────────────────────────────────── */
  function init() {
    // Build group chips
    const groupPanel = document.getElementById('groupPanel');
    WC2026.groups.forEach(g => {
      const btn = document.createElement('button');
      btn.className = 'filter-chip';
      btn.textContent = `Group ${g}`;
      btn.onclick = () => setGroup(g, btn);
      groupPanel.appendChild(btn);
    });

    // Build time chips
    const timePanel = document.getElementById('timePanel');
    WC2026.TIME_SLOTS.forEach(slot => {
      const btn = document.createElement('button');
      btn.className = 'filter-chip';
      btn.textContent = slot;
      btn.onclick = () => setTimeSlot(slot, btn);
      timePanel.appendChild(btn);
    });

    // Build team cards
    TeamGrid.init();

    // Build bracket
    Bracket.render();

    // Initial render
    setMode('teams');
  }

  /* ── Mode ────────────────────────────────────────────────────────────── */
  function setMode(mode) {
    currentMode = mode;

    // Update mode buttons
    ['teams','group','time','calendar','bracket'].forEach(m => {
      const btn = document.getElementById(`mode${capitalise(m)}`);
      if (btn) btn.classList.toggle('active', m === mode);
    });

    // Show/hide panels
    toggle('groupPanel',      mode === 'group',    'flex');
    toggle('timePanel',       mode === 'time',     'flex');
    toggle('calendarSection', mode === 'calendar', 'block');
    toggle('exportBar',       mode === 'calendar', 'block');
    toggle('bracketSection',  mode === 'bracket',  'block');

    const grid = document.getElementById('grid');
    grid.style.display = (mode === 'calendar' || mode === 'bracket') ? 'none' : 'grid';

    // Reset sub-filters when switching mode
    activeGroup    = null;
    activeTimeSlot = null;
    document.querySelectorAll('#groupPanel .filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
    document.querySelectorAll('#timePanel .filter-chip').forEach((c, i) => c.classList.toggle('active', i === 0));

    if (mode === 'calendar') {
      Calendar.render();
    }

    if (mode !== 'calendar' && mode !== 'bracket') {
      TeamGrid.render({ mode, activeGroup, activeTimeSlot });
    }
  }

  function setGroup(g, btn) {
    activeGroup = g;
    document.querySelectorAll('#groupPanel .filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    TeamGrid.render({ mode: currentMode, activeGroup, activeTimeSlot });
  }

  function setTimeSlot(slot, btn) {
    activeTimeSlot = slot;
    document.querySelectorAll('#timePanel .filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    TeamGrid.render({ mode: currentMode, activeGroup, activeTimeSlot });
  }

  function onSearch() {
    if (currentMode === 'calendar') {
      Calendar.onSearchChange();
    } else if (currentMode !== 'bracket') {
      TeamGrid.render({ mode: currentMode, activeGroup, activeTimeSlot });
    }
  }

  /* ── Utils ───────────────────────────────────────────────────────────── */
  function toggle(id, show, displayVal = 'block') {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? displayVal : 'none';
  }

  function capitalise(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* ── Public API ──────────────────────────────────────────────────────── */
  return { init, setMode, setGroup, setTimeSlot, onSearch };
})();

document.addEventListener('DOMContentLoaded', App.init);
