(() => {
  const DOCS = {
    expose: 'public/Neue_Metriken_für_LLM_basierte_Coding_Agenten_final (1) (1).pdf',
    paper: 'public/Doku Schalles (1).pdf',
    posterDe: 'public/poster-de.pdf',
    posterEn: 'public/StudentChallenge_ID476_EN.pdf'
  };

  const AUTHORS = [
    ['CK', 'Chris David Kaufmann', 'chriskaufmann11@gmail.com', 'https://www.linkedin.com/in/chris-david-kaufmann-5072b331b/'],
    ['LS', 'Luca di Siro', 'luca.di.siro@web.de', 'https://www.linkedin.com/in/luca-di-siro-b426933b9/'],
    ['DE', 'Daniel Ertel', 'danielertel2002@gmail.com', 'https://www.linkedin.com/in/daniel-ertel-63858b2aa/'],
    ['RB', 'Richard Beser', 'richardbeser@gmail.com', 'https://www.linkedin.com/in/richard-beser-8b8373323/']
  ];

  const DATA = {
    agents: {
      hidden: ['Hidden-Pass-Rate', '%', true, { Claude: 92.9, Codex: 79.3, Gemini: 83.3 }],
      visible: ['Visible Test-Pass-Rate', '%', true, { Claude: 100, Codex: 99.7, Gemini: 100 }],
      quality: ['Qualitative Score', 'score', true, { Claude: 0.972, Codex: 0.942, Gemini: 0.881 }],
      tokens: ['Tokens / Test', 'n', false, { Claude: 6998, Codex: 3870, Gemini: 7489 }],
      runtime: ['Runtime', 's', false, { Claude: 30.23, Codex: 35.52, Gemini: 51.23 }],
      complexity: ['Cyclomatic Complexity', 'n', false, { Claude: 6.48, Codex: 5.72, Gemini: 6.83 }],
      compliance: ['Constraint Compliance', '%', true, { Claude: 100, Codex: 100, Gemini: 75.7 }]
    },
    modes: {
      hidden: ['Hidden-Pass-Rate', '%', true, { Direct: 85.6, 'Self-Refining': 84.8 }],
      visible: ['Visible Test-Pass-Rate', '%', true, { Direct: 99.8, 'Self-Refining': 100 }],
      quality: ['Qualitative Score', 'score', true, { Direct: 0.935, 'Self-Refining': 0.929 }],
      tokens: ['Tokens / Test', 'n', false, { Direct: 8652, 'Self-Refining': 8579 }],
      context: ['Context Tokens', 'n', false, { Direct: 143722, 'Self-Refining': 143773 }],
      runtime: ['Runtime', 's', false, { Direct: 39.3, 'Self-Refining': 38.69 }]
    },
    prompts: {
      context: ['Context Tokens', 'n', false, { Low: 107045, Medium: 101888, High: 93262 }]
    }
  };

  const COPY = {
    de: {
      explorer: 'Explorer', expose: 'JKU Exposé', heroExpose: 'JKU Exposé öffnen', heroPoster: 'Deutsches Poster öffnen ↗',
      labTitle: 'Die Ergebnisse selbst explorieren.',
      labIntro: 'Wechsle zwischen Agentenvergleich, Direct vs. Self-Refining und Prompt-Effekt. Angezeigt werden ausschließlich berichtete Aggregatwerte.',
      view: 'Ansicht', metric: 'Metrik', agent: 'Agent', all: 'Alle Agenten',
      agents: 'Agentenvergleich', modes: 'Direct vs. Self-Refining', prompts: 'Prompt-Level',
      higher: 'höher ist besser', lower: 'niedriger ist besser', standout: 'Was fällt auf?',
      basisAgents: 'Faire Artefaktbasis · n = 70 je Agent', basisModes: 'Faire Modusbasis · n = 105 je Modus', basisPrompts: 'Prompt-Analyse · n = 66 Blöcke je Stufe',
      noteAgents: 'Faire Artefaktbasis: n = 70 Konfigurationen je Agent.',
      noteModes: 'Modusergebnisse sind über alle Agenten gepoolt. Ohne Rohdaten werden keine Agent × Modus-Werte erfunden.',
      notePrompts: 'Prompt-Ergebnisse sind über vollständig gepaarte Blöcke je Stufe aggregiert.',
      resourcesTitle: 'Alle vier Projektdokumente an einem Ort.',
      resourcesCopy: 'Das JKU-Exposé ist der schnelle Einstieg, das Full Paper enthält die finale Auswertung. Das Poster folgt automatisch der gewählten Seitensprache.',
      current: 'Poster passend zur Seitensprache', currentName: 'Deutsch · WI2026 Poster', currentOpen: 'Aktuelles Poster öffnen ↗',
      teamTitle: 'Vier Perspektiven. Ein gemeinsames Experiment.', teamAff: 'DHBW Mosbach · Wirtschaftsinformatik – Angewandte KI', repo: 'Reproduktionsartefakt', role: 'Student Researcher · DHBW Mosbach',
      supervision: 'Entstanden im Integrationsseminar unter Leitung von <strong>Prof. Dr. Christian Schalles</strong>.',
      doc: {
        expose: ['PDF · JKU Exposé', 'JKU Student Challenge Exposé', 'Kernidee, Problemstellung und Metrikschicht in kompakter Form.', 'Exposé öffnen ↗'],
        paper: ['PDF · Full Paper', 'Finale wissenschaftliche Ausarbeitung', 'Studiendesign, Statistik, finale Ergebnisse, Limitationen und Fazit.', 'Full Paper öffnen ↗'],
        de: ['PDF · Deutsch', 'Student Challenge Poster · DE', 'Die deutschsprachige Posterfassung mit Scorecard, Hypothesen und Take-away.', 'Poster DE öffnen ↗'],
        en: ['PDF · English', 'Student Challenge Poster · EN', 'Die englischsprachige Posterfassung für die internationale Konferenz.', 'Poster EN öffnen ↗']
      },
      insights: {
        agents_hidden: ['Hidden Tests trennen die Systeme.', 'Claude 92,9 %, Gemini 83,3 %, Codex 79,3 % – trotz nahezu identischer sichtbarer Tests.', 'Spread · 13,6 pp'],
        agents_visible: ['Sichtbare Tests zeigen fast Gleichstand.', 'Claude und Gemini erreichen 100 %, Codex 99,7 %. Erst zusätzliche Metriken trennen die Systeme.', 'Ceiling'],
        agents_quality: ['Claude liefert die höchste Artefaktqualität.', 'Der qualitative Gesamtscore kombiniert Robustheit, Interface, Constraint und Minimality.', '0,972'],
        agents_tokens: ['Codex ist am effizientesten.', 'Mit 3.870 Tokens je bestandenem Testfall liegt Codex deutlich vor Claude und Gemini.', '3.870 Tokens/Test'],
        agents_runtime: ['Gemini benötigt die meiste Laufzeit.', 'Claude ist im Mittel am schnellsten, Gemini am langsamsten.', '30,23–51,23 s'],
        agents_complexity: ['Codex erzeugt die einfachsten Kontrollflüsse.', 'Die niedrigste zyklomatische Komplexität liegt bei Codex.', '5,72'],
        agents_compliance: ['Gemini schwächelt bei der Compliance.', 'Claude und Codex erreichen 100 %, Gemini 75,7 % Constraint Compliance.', '−24,3 pp'],
        modes_hidden: ['Self-Refining bringt keinen robusten Vorteil.', 'Direct liegt bei Hidden Tests mit 85,6 % leicht vor Self-Refining mit 84,8 %.', 'p = 0,179'],
        modes_visible: ['Beide Modi sind funktional fast gleich.', 'Visible Tests unterscheiden Direct und Self-Refining praktisch nicht.', '99,8 % vs. 100 %'],
        modes_quality: ['Der Qualitätsgewinn bleibt aus.', 'Auch der qualitative Gesamtscore verbessert sich durch Self-Refining nicht belastbar.', '0,935 vs. 0,929'],
        modes_tokens: ['Die Tokendifferenz bleibt klein.', 'Self-Refining erzeugt hier keinen relevanten Effizienzgewinn.', '8.652 vs. 8.579'],
        modes_context: ['Der Kontextverbrauch bleibt praktisch gleich.', 'Direct und Self-Refining liegen bei normalisierten Kontexttokens nahezu gleichauf.', '143.722 vs. 143.773'],
        modes_runtime: ['Auch operativ kaum ein Unterschied.', 'Bei der Laufzeit liegen beide Modi eng beieinander.', '39,30 s vs. 38,69 s'],
        prompts_context: ['Bessere Prompts senken die Kosten.', 'Von Low über Medium zu High sinken die normalisierten Kontexttokens deutlich.', '−12,9 %']
      }
    },
    en: {
      explorer: 'Explorer', expose: 'JKU Exposé', heroExpose: 'Open JKU Exposé', heroPoster: 'Open English poster ↗',
      labTitle: 'Explore the results yourself.',
      labIntro: 'Switch between agent comparison, Direct vs. Self-Refining and the prompt effect. Only reported aggregate values are visualized.',
      view: 'View', metric: 'Metric', agent: 'Agent', all: 'All agents',
      agents: 'Agent comparison', modes: 'Direct vs. Self-Refining', prompts: 'Prompt level',
      higher: 'higher is better', lower: 'lower is better', standout: 'What stands out?',
      basisAgents: 'Fair artifact basis · n = 70 per agent', basisModes: 'Fair mode basis · n = 105 per mode', basisPrompts: 'Prompt analysis · n = 66 blocks per level',
      noteAgents: 'Fair artifact basis: n = 70 configurations per agent.',
      noteModes: 'Mode results are pooled across agents. Without raw data, no agent × mode values are fabricated.',
      notePrompts: 'Prompt results are aggregated across fully paired blocks per level.',
      resourcesTitle: 'All four project documents in one place.',
      resourcesCopy: 'The JKU exposé is the quick entry point, the full paper contains the final analysis. The poster automatically follows the selected site language.',
      current: 'Poster matching the site language', currentName: 'English · WI2026 Poster', currentOpen: 'Open current poster ↗',
      teamTitle: 'Four perspectives. One shared experiment.', teamAff: 'DHBW Mosbach · Business Information Systems – Applied AI', repo: 'Reproduction artifact', role: 'Student Researcher · DHBW Mosbach',
      supervision: 'Created as part of the integration seminar led by <strong>Prof. Dr. Christian Schalles</strong>.',
      doc: {
        expose: ['PDF · JKU Exposé', 'JKU Student Challenge Exposé', 'Core idea, problem statement and metric layer in compact form.', 'Open exposé ↗'],
        paper: ['PDF · Full Paper', 'Final scientific paper', 'Study design, statistics, final results, limitations and conclusion.', 'Open full paper ↗'],
        de: ['PDF · German', 'Student Challenge Poster · DE', 'German poster version with scorecard, hypotheses and take-away.', 'Open poster DE ↗'],
        en: ['PDF · English', 'Student Challenge Poster · EN', 'English poster version for the international conference.', 'Open poster EN ↗']
      },
      insights: {
        agents_hidden: ['Hidden tests separate the systems.', 'Claude 92.9%, Gemini 83.3%, Codex 79.3% – despite nearly identical visible tests.', 'Spread · 13.6 pp'],
        agents_visible: ['Visible tests show an almost complete tie.', 'Claude and Gemini reach 100%, Codex 99.7%. Additional metrics are needed to separate the systems.', 'Ceiling'],
        agents_quality: ['Claude delivers the highest artifact quality.', 'The qualitative overall score combines robustness, interface, constraint and minimality.', '0.972'],
        agents_tokens: ['Codex is the most efficient.', 'At 3,870 tokens per passed test case, Codex clearly leads Claude and Gemini.', '3,870 tokens/test'],
        agents_runtime: ['Gemini needs the most runtime.', 'Claude is fastest on average, Gemini slowest.', '30.23–51.23 s'],
        agents_complexity: ['Codex produces the simplest control flows.', 'The lowest cyclomatic complexity is achieved by Codex.', '5.72'],
        agents_compliance: ['Gemini weakens on compliance.', 'Claude and Codex reach 100%, Gemini 75.7% constraint compliance.', '−24.3 pp'],
        modes_hidden: ['Self-Refining shows no robust advantage.', 'Direct slightly leads Self-Refining on hidden tests, 85.6% vs. 84.8%.', 'p = 0.179'],
        modes_visible: ['Both modes are functionally almost identical.', 'Visible tests hardly differentiate Direct and Self-Refining.', '99.8% vs. 100%'],
        modes_quality: ['The quality gain does not materialize.', 'The qualitative overall score also does not improve reliably through Self-Refining.', '0.935 vs. 0.929'],
        modes_tokens: ['The token difference stays small.', 'Self-Refining does not create a relevant efficiency gain here.', '8,652 vs. 8,579'],
        modes_context: ['Context usage is practically identical.', 'Direct and Self-Refining are nearly equal on normalized context tokens.', '143,722 vs. 143,773'],
        modes_runtime: ['Operationally, there is hardly a difference.', 'Both modes are also close on runtime.', '39.30 s vs. 38.69 s'],
        prompts_context: ['Better prompts reduce cost.', 'Normalized context tokens decline clearly from low to medium to high.', '−12.9%']
      }
    }
  };

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'de';
  const c = () => COPY[lang()];
  const poster = () => lang() === 'en' ? DOCS.posterEn : DOCS.posterDe;
  const li = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 7.8H1.6V22h3.6V7.8ZM3.4 2A2.1 2.1 0 1 0 3.4 6.2 2.1 2.1 0 0 0 3.4 2ZM22 13.9c0-4.3-2.3-6.3-5.4-6.3-2.5 0-3.6 1.4-4.2 2.3V7.8H8.8V22h3.6v-7c0-1.8.35-3.6 2.65-3.6 2.26 0 2.29 2.12 2.29 3.72V22H22v-8.1Z"/></svg>';
  const gh = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.3 11.3 0 0 0-3.6 22c.57.1.78-.25.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3 0 0 .95-.3 3.11 1.16A10.8 10.8 0 0 1 12 6.02a10.8 10.8 0 0 1 2.84.38c2.16-1.46 3.11-1.16 3.11-1.16.62 1.55.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.33-2.68 5.3-5.23 5.58.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55A11.3 11.3 0 0 0 12 .7Z"/></svg>';

  function addStyle() {
    if ($('#wi-final-style')) return;
    const style = document.createElement('style');
    style.id = 'wi-final-style';
    style.textContent = `
      .hero{position:relative;overflow:hidden;isolation:isolate}.hero .container{position:relative;z-index:2}.hero-ai-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.88}.hero-extra{position:relative;z-index:2}.results-lab{margin-top:28px;background:linear-gradient(145deg,#fff,#f3f0ec);border:1px solid var(--line);border-radius:28px;padding:30px;box-shadow:var(--shadow)}.lab-head{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start}.lab-head h3{font-size:clamp(1.85rem,3.4vw,3rem);line-height:1;letter-spacing:-.05em;margin:.15rem 0 .65rem}.lab-head p{margin:0;color:var(--muted)}.basis{white-space:nowrap}.lab-body{display:grid;grid-template-columns:1.5fr .72fr;gap:16px}.resource-grid.docs4{grid-template-columns:repeat(2,minmax(0,1fr))}.resource-card.lang-current{border-color:rgba(167,25,48,.5);box-shadow:0 12px 34px rgba(167,25,48,.1)}.section-authors{background:#ece8e2!important}.team-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.person{box-shadow:0 5px 28px rgba(15,27,45,.04)}.repo svg,.ico svg{width:18px;height:18px;fill:currentColor}.hero-extra{display:inline-flex;align-items:center;min-height:48px;padding:0 7px;color:#d2d9e3;font-weight:800}.hero-extra:hover{color:#fff}@media(max-width:950px){.lab-body{grid-template-columns:1fr}.team-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:800px){.lab-head{grid-template-columns:1fr}.resource-grid.docs4{grid-template-columns:1fr}}@media(max-width:560px){.results-lab{padding:19px}.team-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function fmt(v, unit) {
    const locale = lang() === 'en' ? 'en-US' : 'de-DE';
    if (unit === '%') return v.toLocaleString(locale, { maximumFractionDigits: 1 }) + ' %';
    if (unit === 'score') return v.toLocaleString(locale, { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    if (unit === 's') return v.toLocaleString(locale, { maximumFractionDigits: 2 }) + ' s';
    return v.toLocaleString(locale, { maximumFractionDigits: 2 });
  }

  function updateNavHero() {
    const top = $('.nav-actions .button');
    if (top) { top.href = DOCS.expose; top.target = '_blank'; top.rel = 'noopener'; top.textContent = c().expose; }
    const nav = $('.desktop-nav');
    if (nav && !nav.querySelector('[href="#explorer"]')) {
      const a = document.createElement('a'); a.href = '#explorer'; a.textContent = c().explorer;
      nav.insertBefore(a, nav.querySelector('[href="#method"]') || nav.lastElementChild);
    }
    const ghost = $('.hero-actions .button-ghost');
    if (ghost) { ghost.href = DOCS.expose; ghost.target = '_blank'; ghost.rel = 'noopener'; ghost.textContent = c().heroExpose; }
    const actions = $('.hero-actions');
    let p = actions?.querySelector('[data-current-poster]');
    if (actions && !p) { p = document.createElement('a'); p.className = 'hero-extra'; p.dataset.currentPoster = '1'; p.target = '_blank'; p.rel = 'noopener'; actions.appendChild(p); }
    if (p) { p.href = poster(); p.textContent = c().heroPoster; }
  }

  function rebuildResources() {
    const sec = $('#resources'); if (!sec) return;
    const h2 = sec.querySelector('.section-heading h2'); const copy = sec.querySelector('.section-copy');
    if (h2) h2.textContent = c().resourcesTitle; if (copy) copy.textContent = c().resourcesCopy;
    const grid = sec.querySelector('.resource-grid'); if (!grid) return;
    const d = c().doc;
    const card = (kind, href, active = false) => `<a class="resource-card${active ? ' lang-current' : ''}" href="${href}" target="_blank" rel="noopener"><div class="resource-preview"><div class="doc-mock"><span>WI2026</span><strong>${d[kind][0]}</strong><small>PDF</small></div></div><div class="resource-content"><span class="resource-type">${d[kind][0]}</span><h3>${d[kind][1]}</h3><p>${d[kind][2]}</p><span class="resource-link">${d[kind][3]}</span></div></a>`;
    grid.classList.add('docs4');
    grid.innerHTML = card('expose', DOCS.expose) + card('paper', DOCS.paper) + card('de', DOCS.posterDe, lang() === 'de') + card('en', DOCS.posterEn, lang() === 'en');
    let current = sec.querySelector('.current-doc');
    if (!current) { current = document.createElement('div'); current.className = 'current-doc'; grid.insertAdjacentElement('afterend', current); }
    current.innerHTML = `<div><small>${c().current}</small><strong>${c().currentName}</strong></div><a class="button button-outline" href="${poster()}" target="_blank" rel="noopener">${c().currentOpen}</a>`;
  }

  function rebuildAuthors() {
    const box = $('.section-authors .container'); if (!box) return;
    box.innerHTML = `<div class="team-head"><div><p class="section-kicker">Research Team</p><h2>${c().teamTitle}</h2><p>${c().teamAff}</p></div><a class="repo" href="https://github.com/Chris-laws/Agent_SoftwareEngineering" target="_blank" rel="noopener">${gh}<span>${c().repo}</span></a></div><div class="team-grid">${AUTHORS.map(a => `<article class="person"><div class="avatar">${a[0]}</div><h3>${a[1]}</h3><p>${c().role}</p><div class="person-actions"><a class="ico" href="mailto:${a[2]}" aria-label="Mail ${a[1]}">✉</a><a class="ico linkedin" href="${a[3]}" target="_blank" rel="noopener" aria-label="${a[1]} on LinkedIn">${li}</a></div></article>`).join('')}</div><div class="supervision">${c().supervision}</div>`;
  }

  function rebuildExplorer() {
    const old = $('#explorer'); if (!old) return;
    old.innerHTML = `<div class="lab-head"><div><p class="section-kicker">Interactive Results Lab</p><h3>${c().labTitle}</h3><p>${c().labIntro}</p></div><span class="basis" id="fxBasis"></span></div><div class="lab-controls"><label><span>${c().view}</span><select id="fxView"><option value="agents">${c().agents}</option><option value="modes">${c().modes}</option><option value="prompts">${c().prompts}</option></select></label><label><span>${c().metric}</span><select id="fxMetric"></select></label><label id="fxAgentBox"><span>${c().agent}</span><select id="fxAgent"><option value="all">${c().all}</option><option value="Claude">Claude</option><option value="Codex">Codex</option><option value="Gemini">Gemini</option></select></label></div><div class="lab-body"><div class="chartbox"><div class="chart-head"><div><small id="fxOver"></small><h4 id="fxTitle"></h4></div><span class="direction" id="fxDirection"></span></div><div class="xchart" id="fxChart"></div></div><aside class="insight"><small>${c().standout}</small><strong id="fxInsightTitle"></strong><p id="fxInsightText"></p><b id="fxInsightStat"></b></aside></div><p class="lab-note" id="fxNote"></p>`;
    const view = $('#fxView'), metric = $('#fxMetric'), agent = $('#fxAgent'), agentBox = $('#fxAgentBox');
    function options() { const defs = DATA[view.value]; metric.innerHTML = Object.entries(defs).map(([k, v]) => `<option value="${k}">${v[0]}</option>`).join(''); agentBox.classList.toggle('hide', view.value !== 'agents'); draw(); }
    function draw() {
      const mode = view.value, key = metric.value, def = DATA[mode][key], values = Object.entries(def[3]); if (!def) return;
      const nums = values.map(x => x[1]), best = def[2] ? Math.max(...nums) : Math.min(...nums), max = Math.max(...nums), min = Math.min(...nums);
      $('#fxBasis').textContent = mode === 'agents' ? c().basisAgents : mode === 'modes' ? c().basisModes : c().basisPrompts;
      $('#fxOver').textContent = def[0]; $('#fxTitle').textContent = mode === 'agents' ? c().agents : mode === 'modes' ? c().modes : c().prompts; $('#fxDirection').textContent = def[2] ? c().higher : c().lower;
      $('#fxChart').innerHTML = values.map(([name, value]) => { const width = def[2] ? (value / (def[1] === '%' ? 100 : def[1] === 'score' ? 1 : max)) * 100 : (min / value) * 100; const dim = mode === 'agents' && agent.value !== 'all' && agent.value !== name; return `<div class="xrow${value === best ? ' best' : ''}${dim ? ' dim' : ''}"><div class="xlabel">${name}${value === best ? '<em>best</em>' : ''}</div><div class="track"><div class="fill" style="width:${Math.max(4, Math.min(100, width))}%"></div></div><div class="xval">${fmt(value, def[1])}</div></div>`; }).join('');
      const insight = c().insights[`${mode}_${key}`] || c().insights.agents_hidden; $('#fxInsightTitle').textContent = insight[0]; $('#fxInsightText').textContent = insight[1]; $('#fxInsightStat').textContent = insight[2]; $('#fxNote').textContent = mode === 'agents' ? c().noteAgents : mode === 'modes' ? c().noteModes : c().notePrompts;
    }
    view.addEventListener('change', options); metric.addEventListener('change', draw); agent.addEventListener('change', draw); options();
  }

  function heroAnimation() {
    const hero = $('.hero'); if (!hero || $('.hero-ai-canvas')) return;
    const canvas = document.createElement('canvas'); canvas.className = 'hero-ai-canvas'; hero.prepend(canvas); const ctx = canvas.getContext('2d');
    let w = 1, h = 1, dpr = 1; const mouse = { x: -1000, y: -1000, on: false }; const nodes = [];
    function resize() { const r = hero.getBoundingClientRect(); w = r.width; h = r.height; dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); nodes.length = 0; const n = Math.max(18, Math.min(34, Math.round(w / 42))); for (let i = 0; i < n; i++) nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1 + Math.random() * 1.8 }); }
    hero.addEventListener('mousemove', e => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; }); hero.addEventListener('mouseleave', () => mouse.on = false); window.addEventListener('resize', resize); resize();
    function frame() { ctx.clearRect(0, 0, w, h); for (const p of nodes) { if (mouse.on) { const dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.hypot(dx, dy) || 1; if (dist < 180) { const f = (1 - dist / 180) * .035; p.vx += dx / dist * f; p.vy += dy / dist * f; } } p.x += p.vx; p.y += p.vy; p.vx *= .989; p.vy *= .989; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i], b = nodes[j], dist = Math.hypot(a.x - b.x, a.y - b.y); if (dist < 125) { ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 125) * .22})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      if (mouse.on) { const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 135); g.addColorStop(0, 'rgba(134,255,197,.15)'); g.addColorStop(.55, 'rgba(167,25,48,.08)'); g.addColorStop(1, 'rgba(15,27,45,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 135, 0, Math.PI * 2); ctx.fill(); }
      for (let i = 0; i < nodes.length; i++) { const p = nodes[i]; ctx.fillStyle = i % 5 === 0 ? 'rgba(134,255,197,.9)' : i % 4 === 0 ? 'rgba(205,81,104,.75)' : 'rgba(255,255,255,.78)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
      requestAnimationFrame(frame); }
    frame();
  }

  function apply() { addStyle(); updateNavHero(); rebuildResources(); rebuildAuthors(); rebuildExplorer(); heroAnimation(); }
  apply();
  new MutationObserver(() => requestAnimationFrame(apply)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();