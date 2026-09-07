const metricsByLang = {
  de: {
    robustness: {
      winner: 'Claude führt bei Hidden Tests',
      title: 'Robustheit gegenüber verdeckten Randfällen',
      description: 'Bei sichtbaren Tests sind die Systeme praktisch nicht zu unterscheiden. Hidden Tests erzeugen dagegen eine klare Spreizung.',
      values: [
        { name: 'Claude', value: 92.9, label: '92,9 %', winner: true },
        { name: 'Gemini', value: 83.3, label: '83,3 %' },
        { name: 'Codex', value: 79.3, label: '79,3 %' }
      ]
    },
    quality: {
      winner: 'Claude erzielt den höchsten Gesamtscore',
      title: 'Qualitativer Gesamtscore',
      description: 'Der ungewichtete Score kombiniert Interface Compliance, Constraint Compliance, Minimality und Robustness. Alle drei Paarvergleiche sind Holm-korrigiert signifikant.',
      values: [
        { name: 'Claude', value: 97.2, label: '0,972', winner: true },
        { name: 'Codex', value: 94.2, label: '0,942' },
        { name: 'Gemini', value: 88.1, label: '0,881' }
      ]
    },
    efficiency: {
      winner: 'Codex benötigt die wenigsten Tokens',
      title: 'Tokens je bestandenem Testfall',
      description: 'Niedriger ist besser. Codex liegt mit 3.870 Tokens pro bestandenem Testfall deutlich vor Claude und Gemini.',
      invert: true,
      values: [
        { name: 'Codex', value: 3870, label: '3.870', winner: true },
        { name: 'Claude', value: 6998, label: '6.998' },
        { name: 'Gemini', value: 7489, label: '7.489' }
      ]
    },
    compliance: {
      winner: 'Claude und Codex halten alle Constraints ein',
      title: 'Constraint Compliance',
      description: 'Claude und Codex erfüllen die Vorgaben in allen fairen Läufen. Gemini erreicht 75,7 %.',
      values: [
        { name: 'Claude', value: 100, label: '100 %', winner: true },
        { name: 'Codex', value: 100, label: '100 %', winner: true },
        { name: 'Gemini', value: 75.7, label: '75,7 %' }
      ]
    }
  },
  en: {
    robustness: {
      winner: 'Claude leads on hidden tests',
      title: 'Robustness against hidden edge cases',
      description: 'Visible tests barely separate the systems. Hidden tests reveal a clear spread.',
      values: [
        { name: 'Claude', value: 92.9, label: '92.9 %', winner: true },
        { name: 'Gemini', value: 83.3, label: '83.3 %' },
        { name: 'Codex', value: 79.3, label: '79.3 %' }
      ]
    },
    quality: {
      winner: 'Claude achieves the highest overall score',
      title: 'Qualitative overall score',
      description: 'The unweighted score combines interface compliance, constraint compliance, minimality and robustness.',
      values: [
        { name: 'Claude', value: 97.2, label: '0.972', winner: true },
        { name: 'Codex', value: 94.2, label: '0.942' },
        { name: 'Gemini', value: 88.1, label: '0.881' }
      ]
    },
    efficiency: {
      winner: 'Codex uses the fewest tokens',
      title: 'Tokens per passed test case',
      description: 'Lower is better. At 3,870 tokens per passed test case, Codex clearly leads Claude and Gemini.',
      invert: true,
      values: [
        { name: 'Codex', value: 3870, label: '3,870', winner: true },
        { name: 'Claude', value: 6998, label: '6,998' },
        { name: 'Gemini', value: 7489, label: '7,489' }
      ]
    },
    compliance: {
      winner: 'Claude and Codex satisfy all constraints',
      title: 'Constraint compliance',
      description: 'Claude and Codex satisfy the constraints across the fair artifact basis. Gemini reaches 75.7%.',
      values: [
        { name: 'Claude', value: 100, label: '100 %', winner: true },
        { name: 'Codex', value: 100, label: '100 %', winner: true },
        { name: 'Gemini', value: 75.7, label: '75.7 %' }
      ]
    }
  }
};

const chart = document.getElementById('barChart');
const metricWinner = document.getElementById('metricWinner');
const metricTitle = document.getElementById('metricTitle');
const metricDescription = document.getElementById('metricDescription');
let activeMetric = 'robustness';

const translations = {
  en: {
    skipLink: 'Skip to content',
    navResults: 'Results',
    navMethod: 'Method',
    navHypotheses: 'Hypotheses',
    navResources: 'Resources',
    heroEyebrow: '21st International Conference on Business Informatics · Linz',
    heroKicker: 'Multidimensional evaluation of LLM-based coding agents',
    heroLine1: 'FUNCTIONAL CORRECT',
    heroLine2: 'IS NOT ENOUGH.',
    heroLead: 'Visible unit tests show an almost complete tie. Additional metrics for robustness, maintainability, minimality, constraint compliance and efficiency reveal the differences between coding agents.',
    ctaResults: 'Explore results', ctaPoster: 'Open poster', visibleRange: '99.7–100%', visibleTests: 'visible tests', ceiling: 'ceiling effect', hiddenRange: '79.3–92.9%', hiddenTests: 'hidden tests', robustDiff: 'significant robustness differences', tokenRange: '3,870–7,489', tokensPerTest: 'tokens / test case', efficiencySpread: 'almost 2× efficiency spread',
    researchQuestionKicker: 'The core question', researchQuestionTitle: 'What happens when pass/fail stops separating systems?', researchQuestionBody: 'Our evaluation does not replace unit tests. It complements them with six perspectives so agents can still be differentiated once functional success rates approach the ceiling.',
    metricFunctionality: 'Functionality', metricRobustness: 'Robustness', metricMaintainability: 'Maintainability', metricMinimality: 'Minimality', metricConstraint: 'Constraints', metricEfficiency: 'Efficiency',
    resultsKicker: 'Key results', resultsTitle: 'There is no universal ranking.', resultsCopy: 'Different objectives produce different winners. The fair artifact basis contains 70 configurations for which all three agents produced genuine code artifacts.',
    claudeTitle: 'Best artifact quality', claudeQualityValue: '0.972', qualityScore: 'Qualitative overall score', hiddenPassLabel: 'Hidden pass', claudeHiddenValue: '92.9%', claudeSlocValue: '30.50', tokensTestLabel: 'Tokens/test', claudeTokenValue: '6,998', codexTitle: 'Best resource efficiency', codexTokenValue: '3,870', tokensPerPassedTest: 'Tokens per passed test case', codexHiddenValue: '79.3%', complexityLabel: 'Complexity', codexComplexityValue: '5.72', codexQualityValue: '0.942', geminiTitle: 'Operationally stable', completedRuns: 'regularly completed runs', geminiHiddenValue: '83.3%', geminiComplianceValue: '75.7%', geminiTokenValue: '7,489',
    scorecardKicker: 'Agent scorecard', scorecardTitle: 'Depends on what you measure.', metricTabRobustness: 'Robustness', metricTabQuality: 'Quality', metricTabEfficiency: 'Efficiency', metricTabCompliance: 'Compliance', methodKicker: 'Study design', methodTitle: '288 paired runs. Same tasks. Same conditions.', methodCopy: 'Three coding agents solve the same configurations across four tasks, four variants, three prompt levels and two modes. This keeps the task setup controlled so remaining differences can be attributed to the agent systems.',
    agents: 'agents', taskVariants: 'tasks × variants', promptLevels: 'prompt levels', modes: 'modes', pairedRuns: 'experimental runs', pipelineConfiguration: 'Configuration', pipelineConfigurationDetail: 'Task · variant · prompt · mode', pipelineAgent: 'Coding agent', pipelineArtifact: 'Code artifact', pipelineArtifactDetail: 'solution.py + run log', pipelineMetrics: 'Metric layer', pipelineProfile: 'Quality profile', pipelineProfileDetail: 'multidimensional rather than pass/fail', fairBasisTitle: 'Fair artifact basis: n = 70', fairBasisText: 'Claude produced evaluable artifacts in 70 configurations; 26 later runs ended without output because the usage limit was reached. Quality comparisons therefore use only the 70 configurations for which all three agents produced genuine artifacts. Codex and Gemini regularly completed all 96 runs.',
    hypKicker: 'Hypotheses', hypTitle: 'Four tests, two clear effects.', hypCopy: 'More compute does not automatically mean better results. In our task space, more precise prompts reduce token use without a measurable quality gain.', accepted: 'SUPPORTED', accepted2: 'SUPPORTED', rejected: 'REJECTED', rejected2: 'REJECTED', h1Title: 'More tokens do not explain a higher test pass rate.', h1Stats: 'p = 0.913 · R² = 0.0105', h2Title: 'Self-refining does not measurably improve robustness.', h2Stats: 'Direct 85.6% vs. Self-Refining 84.8% · p = 0.179', h3Title: 'Better prompts reduce token consumption.', h3Stats: '107,045 → 101,888 → 93,262 · p = 0.0409', h4Title: 'Better prompts do not simultaneously improve quality.', h4Stats: 'p = 0.990',
    takeawayKicker: 'Take-away', takeawayTitle: 'Passing tests ≠ good code.', takeawayBody: 'Evaluation priorities shift from functional correctness alone toward robustness, code quality, rule compliance and resource efficiency. For operational decisions, that profile view is what matters.',
    resourcesKicker: 'Resources', resourcesTitle: 'Take the paper and poster with you.', resourcesCopy: 'The site is designed as a mobile companion to the conference stand: first the take-away, then the details.', paperTitle: 'Extended abstract / Paper', paperDesc: 'Method, operationalization, statistical analysis, results and limitations.', openPaper: 'Open paper ↗', posterTitle: 'WI2026 Student Challenge Poster', posterDesc: 'Study design, scorecard, hypotheses and key numbers on one page.', openPoster: 'Open poster ↗', authorsKicker: 'Authors', authorsAffiliation: 'Baden-Württemberg Cooperative State University Mosbach · Business Information Systems', footerConference: '21st International Conference on Business Informatics · September 6–10, 2026 · Johannes Kepler University Linz'
  }
};

const originals = {};
document.querySelectorAll('[data-i18n]').forEach(el => {
  originals[el.dataset.i18n] = el.textContent.trim();
});

function renderMetric(key = activeMetric) {
  activeMetric = key;
  const language = document.documentElement.lang === 'en' ? 'en' : 'de';
  const metric = metricsByLang[language][key];
  if (!metric || !chart) return;
  metricWinner.textContent = metric.winner;
  metricTitle.textContent = metric.title;
  metricDescription.textContent = metric.description;
  chart.innerHTML = '';
  const max = Math.max(...metric.values.map(item => item.value));
  const min = Math.min(...metric.values.map(item => item.value));
  metric.values.forEach(item => {
    const width = metric.invert ? (min / item.value) * 100 : (item.value / max) * 100;
    const row = document.createElement('div');
    row.className = `bar-row${item.winner ? ' winner' : ''}`;
    row.innerHTML = `
      <div class="bar-name">${item.name}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.min(width, 100)}%"></div></div>
      <div class="bar-value">${item.label}</div>`;
    chart.appendChild(row);
  });
}

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderMetric(button.dataset.metric);
  });
});

function translateStaticChrome(language) {
  const nav = document.querySelector('.desktop-nav');
  if (nav) {
    const labels = language === 'en'
      ? { '#results': 'Results', '#explorer': 'Explorer', '#method': 'Method', '#hypotheses': 'Hypotheses', '#resources': 'Resources' }
      : { '#results': 'Ergebnisse', '#explorer': 'Explorer', '#method': 'Methode', '#hypotheses': 'Hypothesen', '#resources': 'Material' };
    Object.entries(labels).forEach(([href, label]) => {
      const a = nav.querySelector(`[href="${href}"]`);
      if (a) a.textContent = label;
    });
  }

  const tabs = document.querySelectorAll('.tab-button');
  const tabLabels = language === 'en'
    ? ['Robustness', 'Quality', 'Efficiency', 'Compliance']
    : ['Robustheit', 'Qualität', 'Effizienz', 'Compliance'];
  tabs.forEach((btn, i) => { if (tabLabels[i]) btn.textContent = tabLabels[i]; });

  const footer = document.querySelectorAll('.site-footer p');
  if (footer.length >= 2) {
    footer[0].textContent = language === 'en'
      ? '21st International Conference on Wirtschaftsinformatik · 6–10 Sep 2026 · Johannes Kepler University Linz'
      : '21. Internationale Konferenz Wirtschaftsinformatik · 6.–10.09.2026 · Johannes Kepler Universität Linz';
    footer[1].textContent = 'Research in Progress · Student Challenge';
  }
}

function setLanguage(language) {
  const next = language === 'en' ? 'en' : 'de';
  document.documentElement.lang = next;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = next === 'en' && translations.en[key] ? translations.en[key] : originals[key];
  });
  translateStaticChrome(next);
  renderMetric(activeMetric);
  document.querySelectorAll('#langSwitch [data-lang]').forEach(btn => {
    const active = btn.dataset.lang === next;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function installLanguageSwitch() {
  const old = document.getElementById('langToggle');
  if (!old) return;
  const wrap = document.createElement('div');
  wrap.id = 'langSwitch';
  wrap.className = 'lang-switch';
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', 'Sprache / Language');
  wrap.innerHTML = `
    <button type="button" data-lang="de" aria-pressed="true">DE</button>
    <button type="button" data-lang="en" aria-pressed="false">EN</button>`;
  old.replaceWith(wrap);
  wrap.addEventListener('click', event => {
    const button = event.target.closest('button[data-lang]');
    if (!button) return;
    setLanguage(button.dataset.lang);
  });
}

installLanguageSwitch();
setLanguage('de');
