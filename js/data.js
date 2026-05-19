/**
 * data.js — Single source of truth for all WC2026 fixtures
 * Source: Official FIFA / Fox Sports / Al Jazeera schedule (verified May 2026)
 * All times stored as UTC ISO strings; UI converts to BST (UTC+6)
 */

'use strict';

const WC2026 = (() => {

  /* ── Flags ─────────────────────────────────────────────────────────────── */
  const FLAGS = {
    'Mexico':'🇲🇽','South Africa':'🇿🇦','Korea Republic':'🇰🇷','Czechia':'🇨🇿',
    'Canada':'🇨🇦','Bosnia & Herzegovina':'🇧🇦','USA':'🇺🇸','Paraguay':'🇵🇾',
    'Qatar':'🇶🇦','Switzerland':'🇨🇭','Brazil':'🇧🇷','Morocco':'🇲🇦',
    'Haiti':'🇭🇹','Scotland':'🏴󠁧󠁢󠁳󠁣󠁴󠁿','Australia':'🇦🇺','Türkiye':'🇹🇷',
    'Germany':'🇩🇪','Curaçao':'🇨🇼','Netherlands':'🇳🇱','Japan':'🇯🇵',
    'Ivory Coast':'🇨🇮','Ecuador':'🇪🇨','Sweden':'🇸🇪','Tunisia':'🇹🇳',
    'Spain':'🇪🇸','Cabo Verde':'🇨🇻','Belgium':'🇧🇪','Egypt':'🇪🇬',
    'Saudi Arabia':'🇸🇦','Uruguay':'🇺🇾','Iran':'🇮🇷','New Zealand':'🇳🇿',
    'France':'🇫🇷','Senegal':'🇸🇳','Iraq':'🇮🇶','Norway':'🇳🇴',
    'Argentina':'🇦🇷','Algeria':'🇩🇿','Austria':'🇦🇹','Jordan':'🇯🇴',
    'Portugal':'🇵🇹','Congo DR':'🇨🇩','England':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','Croatia':'🇭🇷',
    'Ghana':'🇬🇭','Panama':'🇵🇦','Uzbekistan':'🇺🇿','Colombia':'🇨🇴'
  };

  /**
   * Raw fixtures array.
   * Fields:
   *   id       – unique match number (FIFA numbering)
   *   stage    – 'group' | 'r32' | 'r16' | 'qf' | 'sf' | '3rd' | 'final'
   *   group    – group letter for group stage, null for KO
   *   home     – home team name (or placeholder like 'W73' for KO rounds)
   *   away     – away team name (or placeholder)
   *   utc      – kick-off time as UTC ISO string
   *   venue    – city/stadium label
   *
   * BST = UTC+6, so utcHour+6 gives Bangladesh time.
   */
  const FIXTURES_RAW = [
    // ── GROUP STAGE ──────────────────────────────────────────────────────

    // June 11
    {id:1,  stage:'group', group:'A', home:'Mexico',               away:'South Africa',         utc:'2026-06-11T19:00:00Z', venue:'Mexico City'},
    {id:2,  stage:'group', group:'A', home:'Korea Republic',        away:'Czechia',              utc:'2026-06-12T02:00:00Z', venue:'Guadalajara'},

    // June 12
    {id:3,  stage:'group', group:'B', home:'Canada',               away:'Bosnia & Herzegovina', utc:'2026-06-12T19:00:00Z', venue:'Toronto'},
    {id:4,  stage:'group', group:'D', home:'USA',                  away:'Paraguay',             utc:'2026-06-13T01:00:00Z', venue:'Los Angeles'},

    // June 13
    {id:5,  stage:'group', group:'B', home:'Qatar',                away:'Switzerland',          utc:'2026-06-13T19:00:00Z', venue:'San Francisco'},
    {id:6,  stage:'group', group:'C', home:'Brazil',               away:'Morocco',              utc:'2026-06-13T22:00:00Z', venue:'New York/NJ'},
    {id:7,  stage:'group', group:'C', home:'Haiti',                away:'Scotland',             utc:'2026-06-14T01:00:00Z', venue:'Boston'},
    {id:8,  stage:'group', group:'D', home:'Australia',            away:'Türkiye',              utc:'2026-06-14T04:00:00Z', venue:'Vancouver'},

    // June 14
    {id:9,  stage:'group', group:'E', home:'Germany',              away:'Curaçao',              utc:'2026-06-14T17:00:00Z', venue:'Houston'},
    {id:10, stage:'group', group:'F', home:'Netherlands',           away:'Japan',                utc:'2026-06-14T20:00:00Z', venue:'Dallas'},
    {id:11, stage:'group', group:'E', home:'Ivory Coast',          away:'Ecuador',              utc:'2026-06-14T23:00:00Z', venue:'Philadelphia'},
    {id:12, stage:'group', group:'F', home:'Tunisia',              away:'Sweden',               utc:'2026-06-15T02:00:00Z', venue:'Monterrey'},

    // June 15
    {id:13, stage:'group', group:'H', home:'Spain',                away:'Cabo Verde',           utc:'2026-06-15T16:00:00Z', venue:'Atlanta'},
    {id:14, stage:'group', group:'G', home:'Belgium',              away:'Egypt',                utc:'2026-06-15T19:00:00Z', venue:'Seattle'},
    {id:15, stage:'group', group:'H', home:'Saudi Arabia',         away:'Uruguay',              utc:'2026-06-15T22:00:00Z', venue:'Miami'},
    {id:16, stage:'group', group:'G', home:'Iran',                 away:'New Zealand',          utc:'2026-06-16T01:00:00Z', venue:'Los Angeles'},

    // June 16
    {id:17, stage:'group', group:'I', home:'France',               away:'Senegal',              utc:'2026-06-16T19:00:00Z', venue:'New York/NJ'},
    {id:18, stage:'group', group:'I', home:'Iraq',                 away:'Norway',               utc:'2026-06-16T22:00:00Z', venue:'Boston'},
    {id:19, stage:'group', group:'J', home:'Argentina',            away:'Algeria',              utc:'2026-06-17T01:00:00Z', venue:'Kansas City'},
    {id:20, stage:'group', group:'J', home:'Austria',              away:'Jordan',               utc:'2026-06-17T04:00:00Z', venue:'San Francisco'},

    // June 17
    {id:21, stage:'group', group:'K', home:'Portugal',             away:'Congo DR',             utc:'2026-06-17T17:00:00Z', venue:'Houston'},
    {id:22, stage:'group', group:'L', home:'England',              away:'Croatia',              utc:'2026-06-17T20:00:00Z', venue:'Dallas'},
    {id:23, stage:'group', group:'L', home:'Ghana',                away:'Panama',               utc:'2026-06-17T23:00:00Z', venue:'Toronto'},
    {id:24, stage:'group', group:'K', home:'Uzbekistan',           away:'Colombia',             utc:'2026-06-18T02:00:00Z', venue:'Mexico City'},

    // June 18
    {id:25, stage:'group', group:'A', home:'Czechia',              away:'South Africa',         utc:'2026-06-18T16:00:00Z', venue:'Atlanta'},
    {id:26, stage:'group', group:'B', home:'Switzerland',          away:'Bosnia & Herzegovina', utc:'2026-06-18T19:00:00Z', venue:'Los Angeles'},
    {id:27, stage:'group', group:'B', home:'Canada',               away:'Qatar',                utc:'2026-06-18T22:00:00Z', venue:'Vancouver'},
    {id:28, stage:'group', group:'A', home:'Mexico',               away:'Korea Republic',       utc:'2026-06-19T01:00:00Z', venue:'Guadalajara'},

    // June 19
    {id:29, stage:'group', group:'D', home:'USA',                  away:'Australia',            utc:'2026-06-19T19:00:00Z', venue:'Seattle'},
    {id:30, stage:'group', group:'C', home:'Scotland',             away:'Morocco',              utc:'2026-06-19T19:00:00Z', venue:'Boston'},
    {id:31, stage:'group', group:'C', home:'Brazil',               away:'Haiti',                utc:'2026-06-20T01:00:00Z', venue:'Philadelphia'},
    {id:32, stage:'group', group:'D', home:'Türkiye',              away:'Paraguay',             utc:'2026-06-20T04:00:00Z', venue:'San Francisco'},

    // June 20
    {id:33, stage:'group', group:'F', home:'Netherlands',           away:'Sweden',               utc:'2026-06-20T17:00:00Z', venue:'Houston'},
    {id:34, stage:'group', group:'E', home:'Germany',              away:'Ivory Coast',          utc:'2026-06-20T20:00:00Z', venue:'Toronto'},
    {id:35, stage:'group', group:'E', home:'Ecuador',              away:'Curaçao',              utc:'2026-06-21T00:00:00Z', venue:'Kansas City'},
    {id:36, stage:'group', group:'F', home:'Tunisia',              away:'Japan',                utc:'2026-06-21T04:00:00Z', venue:'Monterrey'},

    // June 21
    {id:37, stage:'group', group:'H', home:'Spain',                away:'Saudi Arabia',         utc:'2026-06-21T16:00:00Z', venue:'Atlanta'},
    {id:38, stage:'group', group:'G', home:'Belgium',              away:'Iran',                 utc:'2026-06-21T19:00:00Z', venue:'Los Angeles'},
    {id:39, stage:'group', group:'H', home:'Uruguay',              away:'Cabo Verde',           utc:'2026-06-21T22:00:00Z', venue:'Miami'},
    {id:40, stage:'group', group:'G', home:'New Zealand',          away:'Egypt',                utc:'2026-06-22T01:00:00Z', venue:'Vancouver'},

    // June 22
    {id:41, stage:'group', group:'J', home:'Argentina',            away:'Austria',              utc:'2026-06-22T17:00:00Z', venue:'Dallas'},
    {id:42, stage:'group', group:'I', home:'France',               away:'Iraq',                 utc:'2026-06-22T21:00:00Z', venue:'Philadelphia'},
    {id:43, stage:'group', group:'I', home:'Norway',               away:'Senegal',              utc:'2026-06-23T00:00:00Z', venue:'New York/NJ'},
    {id:44, stage:'group', group:'J', home:'Jordan',               away:'Algeria',              utc:'2026-06-23T03:00:00Z', venue:'San Francisco'},

    // June 23
    {id:45, stage:'group', group:'K', home:'Portugal',             away:'Uzbekistan',           utc:'2026-06-23T17:00:00Z', venue:'Houston'},
    {id:46, stage:'group', group:'L', home:'England',              away:'Ghana',                utc:'2026-06-23T20:00:00Z', venue:'Boston'},
    {id:47, stage:'group', group:'L', home:'Panama',               away:'Croatia',              utc:'2026-06-23T23:00:00Z', venue:'Toronto'},
    {id:48, stage:'group', group:'K', home:'Colombia',             away:'Congo DR',             utc:'2026-06-24T02:00:00Z', venue:'Guadalajara'},

    // June 24
    {id:49, stage:'group', group:'B', home:'Switzerland',          away:'Canada',               utc:'2026-06-24T19:00:00Z', venue:'Vancouver'},
    {id:50, stage:'group', group:'B', home:'Bosnia & Herzegovina', away:'Qatar',                utc:'2026-06-24T19:00:00Z', venue:'Seattle'},
    {id:51, stage:'group', group:'C', home:'Brazil',               away:'Scotland',             utc:'2026-06-24T22:00:00Z', venue:'Miami'},
    {id:52, stage:'group', group:'C', home:'Morocco',              away:'Haiti',                utc:'2026-06-24T22:00:00Z', venue:'Atlanta'},
    {id:53, stage:'group', group:'A', home:'Mexico',               away:'Czechia',              utc:'2026-06-25T01:00:00Z', venue:'Mexico City'},
    {id:54, stage:'group', group:'A', home:'Korea Republic',        away:'South Africa',         utc:'2026-06-25T01:00:00Z', venue:'Monterrey'},

    // June 25
    {id:55, stage:'group', group:'E', home:'Ecuador',              away:'Germany',              utc:'2026-06-25T20:00:00Z', venue:'New York/NJ'},
    {id:56, stage:'group', group:'E', home:'Curaçao',              away:'Ivory Coast',          utc:'2026-06-25T20:00:00Z', venue:'Philadelphia'},
    {id:57, stage:'group', group:'F', home:'Tunisia',              away:'Netherlands',           utc:'2026-06-25T23:00:00Z', venue:'Kansas City'},
    {id:58, stage:'group', group:'F', home:'Japan',                away:'Sweden',               utc:'2026-06-25T23:00:00Z', venue:'Dallas'},
    {id:59, stage:'group', group:'D', home:'USA',                  away:'Türkiye',              utc:'2026-06-26T02:00:00Z', venue:'Los Angeles'},
    {id:60, stage:'group', group:'D', home:'Paraguay',             away:'Australia',            utc:'2026-06-26T02:00:00Z', venue:'San Francisco'},

    // June 26
    {id:61, stage:'group', group:'I', home:'Norway',               away:'France',               utc:'2026-06-26T19:00:00Z', venue:'Boston'},
    {id:62, stage:'group', group:'I', home:'Senegal',              away:'Iraq',                 utc:'2026-06-26T19:00:00Z', venue:'Toronto'},
    {id:63, stage:'group', group:'H', home:'Uruguay',              away:'Spain',                utc:'2026-06-27T00:00:00Z', venue:'Guadalajara'},
    {id:64, stage:'group', group:'H', home:'Cabo Verde',           away:'Saudi Arabia',         utc:'2026-06-27T00:00:00Z', venue:'Houston'},
    {id:65, stage:'group', group:'G', home:'New Zealand',          away:'Belgium',              utc:'2026-06-27T03:00:00Z', venue:'Vancouver'},
    {id:66, stage:'group', group:'G', home:'Egypt',                away:'Iran',                 utc:'2026-06-27T03:00:00Z', venue:'Seattle'},

    // June 27
    {id:67, stage:'group', group:'L', home:'Panama',               away:'England',              utc:'2026-06-27T21:00:00Z', venue:'New York/NJ'},
    {id:68, stage:'group', group:'L', home:'Croatia',              away:'Ghana',                utc:'2026-06-27T21:00:00Z', venue:'Philadelphia'},
    {id:69, stage:'group', group:'K', home:'Colombia',             away:'Portugal',             utc:'2026-06-27T23:30:00Z', venue:'Miami'},
    {id:70, stage:'group', group:'K', home:'Congo DR',             away:'Uzbekistan',           utc:'2026-06-27T23:30:00Z', venue:'Atlanta'},
    {id:71, stage:'group', group:'J', home:'Argentina',            away:'Jordan',               utc:'2026-06-28T02:00:00Z', venue:'Dallas'},
    {id:72, stage:'group', group:'J', home:'Algeria',              away:'Austria',              utc:'2026-06-28T02:00:00Z', venue:'Kansas City'},

    // ── ROUND OF 32 ──────────────────────────────────────────────────────
    // June 28
    {id:73, stage:'r32', group:null, home:'2nd Group A',          away:'2nd Group B',           utc:'2026-06-28T19:00:00Z', venue:'Los Angeles'},

    // June 29
    {id:76, stage:'r32', group:null, home:'1st Group C',          away:'2nd Group F',           utc:'2026-06-29T17:00:00Z', venue:'Houston'},
    {id:74, stage:'r32', group:null, home:'1st Group E',          away:'Best 3rd (A/B/C/D/F)',  utc:'2026-06-29T20:30:00Z', venue:'Boston'},
    {id:75, stage:'r32', group:null, home:'1st Group F',          away:'2nd Group C',           utc:'2026-06-30T01:00:00Z', venue:'Monterrey'},

    // June 30
    {id:78, stage:'r32', group:null, home:'2nd Group E',          away:'2nd Group I',           utc:'2026-06-30T17:00:00Z', venue:'Dallas'},
    {id:77, stage:'r32', group:null, home:'1st Group I',          away:'Best 3rd (C/D/F/G/H)',  utc:'2026-06-30T21:00:00Z', venue:'New York/NJ'},
    {id:79, stage:'r32', group:null, home:'1st Group A',          away:'Best 3rd (C/E/F/H/I)',  utc:'2026-07-01T01:00:00Z', venue:'Mexico City'},

    // July 1
    {id:80, stage:'r32', group:null, home:'1st Group L',          away:'Best 3rd (E/H/I/J/K)',  utc:'2026-07-01T16:00:00Z', venue:'Atlanta'},
    {id:82, stage:'r32', group:null, home:'1st Group G',          away:'Best 3rd (A/E/H/I/J)',  utc:'2026-07-01T20:00:00Z', venue:'Seattle'},
    {id:81, stage:'r32', group:null, home:'1st Group D',          away:'Best 3rd (B/E/F/I/J)',  utc:'2026-07-02T00:00:00Z', venue:'San Francisco'},

    // July 2
    {id:84, stage:'r32', group:null, home:'1st Group H',          away:'2nd Group J',           utc:'2026-07-02T19:00:00Z', venue:'Los Angeles'},
    {id:83, stage:'r32', group:null, home:'2nd Group K',          away:'2nd Group L',           utc:'2026-07-02T23:00:00Z', venue:'Toronto'},
    {id:85, stage:'r32', group:null, home:'1st Group B',          away:'Best 3rd (E/F/G/I/J)',  utc:'2026-07-03T03:00:00Z', venue:'Vancouver'},

    // July 3
    {id:88, stage:'r32', group:null, home:'2nd Group D',          away:'2nd Group G',           utc:'2026-07-03T18:00:00Z', venue:'Dallas'},
    {id:86, stage:'r32', group:null, home:'1st Group J',          away:'2nd Group H',           utc:'2026-07-03T22:00:00Z', venue:'Miami'},
    {id:87, stage:'r32', group:null, home:'1st Group K',          away:'Best 3rd (D/E/I/J/L)',  utc:'2026-07-04T01:30:00Z', venue:'Kansas City'},

    // ── ROUND OF 16 ──────────────────────────────────────────────────────
    // July 4
    {id:90, stage:'r16', group:null, home:'W73 or W75',          away:'W76',                    utc:'2026-07-04T17:00:00Z', venue:'Houston'},
    {id:89, stage:'r16', group:null, home:'W74',                 away:'W77',                    utc:'2026-07-04T21:00:00Z', venue:'Philadelphia'},

    // July 5
    {id:91, stage:'r16', group:null, home:'W75',                 away:'W78',                    utc:'2026-07-05T20:00:00Z', venue:'New York/NJ'},
    {id:92, stage:'r16', group:null, home:'W79',                 away:'W80',                    utc:'2026-07-06T00:00:00Z', venue:'Mexico City'},

    // July 6
    {id:93, stage:'r16', group:null, home:'W81',                 away:'W82',                    utc:'2026-07-06T19:00:00Z', venue:'Dallas'},
    {id:94, stage:'r16', group:null, home:'W83',                 away:'W84',                    utc:'2026-07-07T00:00:00Z', venue:'Seattle'},

    // July 7
    {id:95, stage:'r16', group:null, home:'W85',                 away:'W86',                    utc:'2026-07-07T16:00:00Z', venue:'Atlanta'},
    {id:96, stage:'r16', group:null, home:'W87',                 away:'W88',                    utc:'2026-07-07T20:00:00Z', venue:'New York/NJ'},

    // ── QUARTER-FINALS ───────────────────────────────────────────────────
    // July 9
    {id:97, stage:'qf',  group:null, home:'W89',                 away:'W90',                    utc:'2026-07-09T19:00:00Z', venue:'Dallas'},
    {id:98, stage:'qf',  group:null, home:'W91',                 away:'W92',                    utc:'2026-07-09T23:00:00Z', venue:'Los Angeles'},

    // July 10
    {id:99, stage:'qf',  group:null, home:'W93',                 away:'W94',                    utc:'2026-07-10T19:00:00Z', venue:'New York/NJ'},
    {id:100,stage:'qf',  group:null, home:'W95',                 away:'W96',                    utc:'2026-07-11T01:00:00Z', venue:'Boston'},

    // ── SEMI-FINALS ──────────────────────────────────────────────────────
    // July 14
    {id:101,stage:'sf',  group:null, home:'W97',                 away:'W98',                    utc:'2026-07-14T23:00:00Z', venue:'Dallas'},

    // July 15
    {id:102,stage:'sf',  group:null, home:'W99',                 away:'W100',                   utc:'2026-07-15T21:00:00Z', venue:'New York/NJ'},

    // ── THIRD PLACE ──────────────────────────────────────────────────────
    {id:103,stage:'3rd', group:null, home:'L101',                away:'L102',                   utc:'2026-07-18T19:00:00Z', venue:'Miami'},

    // ── FINAL ────────────────────────────────────────────────────────────
    {id:104,stage:'final',group:null, home:'W101',               away:'W102',                   utc:'2026-07-19T19:00:00Z', venue:'New York/NJ'},
  ];

  /* ── Enrich fixtures ──────────────────────────────────────────────────── */
  const BST_OFFSET = 6; // UTC+6

  function utcToBST(utcStr) {
    const d = new Date(utcStr);
    d.setHours(d.getHours() + BST_OFFSET);
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = ((h % 12) || 12);
    return `${String(h12).padStart(2,'0')}:${String(m).padStart(2,'0')} ${ampm}`;
  }

  function bstDate(utcStr) {
    const d = new Date(utcStr);
    d.setHours(d.getHours() + BST_OFFSET);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
  }

  function bstDateObj(utcStr) {
    const d = new Date(utcStr);
    d.setHours(d.getHours() + BST_OFFSET);
    return { month: d.getUTCMonth() + 1, day: d.getUTCDate(), year: d.getUTCFullYear() };
  }

  function getTimeSlot(utcStr) {
    const d = new Date(utcStr);
    d.setHours(d.getHours() + BST_OFFSET);
    const h = d.getUTCHours();
    if (h >= 0  && h < 6)  return 'Early Morning (12AM–6AM)';
    if (h >= 6  && h < 12) return 'Morning (6AM–12PM)';
    if (h >= 12 && h < 18) return 'Afternoon (12PM–6PM)';
    return 'Evening/Night (6PM–12AM)';
  }

  function stageLabel(stage) {
    return {
      group: 'Group Stage', r32: 'Round of 32', r16: 'Round of 16',
      qf: 'Quarter-Final', sf: 'Semi-Final', '3rd': '3rd Place', final: 'Final'
    }[stage] || stage;
  }

  const FIXTURES = FIXTURES_RAW.map(f => ({
    ...f,
    bstTime:  utcToBST(f.utc),
    bstDate:  bstDate(f.utc),
    bstDateObj: bstDateObj(f.utc),
    slot:     getTimeSlot(f.utc),
    label:    stageLabel(f.stage),
    teams:    f.stage === 'group' ? [f.home, f.away] : [],
    isKO:     f.stage !== 'group',
  }));

  /* ── Derived lookups (group stage only for team cards) ────────────────── */
  const teamMap = {};
  FIXTURES.filter(f => f.stage === 'group').forEach(f => {
    [f.home, f.away].forEach(team => {
      if (!teamMap[team]) teamMap[team] = { group: f.group, matches: [] };
      teamMap[team].matches.push(f);
    });
  });

  const teams    = Object.keys(teamMap).sort();
  const groups   = [...new Set(FIXTURES.filter(f=>f.group).map(f=>f.group))].sort();
  const TIME_SLOTS = [
    'Early Morning (12AM–6AM)',
    'Morning (6AM–12PM)',
    'Afternoon (12PM–6PM)',
    'Evening/Night (6PM–12AM)'
  ];

  /* ── Day map: keyed "YYYY-MM-DD" in BST ──────────────────────────────── */
  const dayMap = {};
  FIXTURES.forEach(f => {
    const { year, month, day } = f.bstDateObj;
    const key = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    if (!dayMap[key]) dayMap[key] = [];
    dayMap[key].push(f);
  });

  return { FIXTURES, FLAGS, teamMap, teams, groups, TIME_SLOTS, dayMap };
})();
