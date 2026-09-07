const metrics = {
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
    description: 'Claude und Codex erfüllen die Vorgaben in allen fairen Läufen. Gemini erreicht 75,7 %; 17 Verstöße gehen auf Veränderungen der vorgegebenen Testdatei zurück.',
    values: [
      { name: 'Claude', value: 100, label: '100 %', winner: true },
      { name: 'Codex', value: 100, label: '100 %', winner: true },
      { name: 'Gemini', value: 75.7, label: '75,7 %' }
    ]
  }
};

const chart = document.getElementById('barChart');
const metricWinner = document.getElementById('metricWinner');
const metricTitle = document.getElementById('metricTitle');
const metricDescription = document.getElementById('metricDescription');

function renderMetric(key) {
  const metric = metrics[key];
  metricWinner.textContent = metric.winner;
  metricTitle.textContent = metric.title;
  metricDescription.textContent = metric.description;
  chart.innerHTML = '';

  const max = Math.max(...metric.values.map(item => item.value));
  metric.values.forEach(item => {
    const width = metric.invert ? (max / item.value) * 100 : (item.value / max) * 100;
    const row = document.createElement('div');
    row.className = `bar-row${item.winner ? ' winner' : ''}`;
    row.innerHTML = `
      <div class="bar-name">${item.name}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.min(width, 100)}%"></div></div>
      <div class="bar-value">${item.label}</div>
    `;
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

renderMetric('robustness');

const translations = {
  en: {
    heroKicker: 'Multidimensional evaluation of LLM-based coding agents',
    heroLine1: 'FUNCTIONAL CORRECT',
    heroLine2: 'IS NOT ENOUGH.',
    heroLead: 'Visible unit tests show an almost complete tie. Additional metrics for robustness, maintainability, minimality, constraint compliance and efficiency reveal the differences between coding agents.',
    ctaResults: 'Explore results', ctaPoster: 'Open poster', visibleTests: 'visible tests', ceiling: 'ceiling effect', hiddenTests: 'hidden tests', robustDiff: 'significant robustness differences', tokensPerTest: 'tokens / test case', efficiencySpread: 'almost 2× efficiency spread',
    researchQuestionKicker: 'The core question', researchQuestionTitle: 'What happens when pass/fail stops separating systems?', researchQuestionBody: 'Our evaluation does not replace unit tests. It complements them with six perspectives so agents can still be differentiated once functional success rates approach the ceiling.',
    resultsKicker: 'Key results', resultsTitle: 'There is no universal ranking.', resultsCopy: 'Different objectives produce different winners. The fair artifact basis contains 70 configurations for which all three agents produced genuine code artifacts.',
    claudeTitle: 'Best artifact quality', qualityScore: 'Qualitative overall score', codexTitle: 'Best resource efficiency', tokensPerPassedTest: 'Tokens per passed test case', geminiTitle: 'Operationally stable', completedRuns: 'regularly completed runs',
    scorecardKicker: 'Agent scorecard', scorecardTitle: 'Depends on what you measure.', methodKicker: 'Study design', methodTitle: '288 paired runs. Same tasks. Same conditions.', methodCopy: 'Three coding agents solve the same configurations across four tasks, four variants, three prompt levels and two modes. This keeps the task setup controlled so remaining differences can be attributed to the agent systems.',
    agents: 'agents', taskVariants: 'tasks × variants', promptLevels: 'prompt levels', modes: 'modes', pairedRuns: 'experimental runs', fairBasisTitle: 'Fair artifact basis: n = 70', fairBasisText: 'Claude produced evaluable artifacts in 70 configurations; 26 later runs ended without output because the usage limit was reached. Quality comparisons therefore use only the 70 configurations for which all three agents produced genuine artifacts. Codex and Gemini regularly completed all 96 runs.',
    hypKicker: 'Hypotheses', hypTitle: 'Four tests, two clear effects.', hypCopy: 'More compute does not automatically mean better results. In our task space, more precise prompts reduce token use without a measurable quality gain.', accepted: 'SUPPORTED', accepted2: 'SUPPORTED', rejected: 'REJECTED', rejected2: 'REJECTED', h1Title: 'More tokens do not explain a higher test pass rate.', h2Title: 'Self-refining does not measurably improve robustness.', h3Title: 'Better prompts reduce token consumption.', h4Title: 'Better prompts do not simultaneously improve quality.',
    takeawayKicker: 'Take-away', takeawayTitle: 'Passing tests ≠ good code.', takeawayBody: 'Evaluation priorities shift from functional correctness alone toward robustness, code quality, rule compliance and resource efficiency. For operational decisions, that profile view is what matters.',
    resourcesKicker: 'Resources', resourcesTitle: 'Take the paper and poster with you.', resourcesCopy: 'The site is designed as a mobile companion to the conference stand: first the take-away, then the details.', paperTitle: 'Extended abstract / Paper', paperDesc: 'Method, operationalization, statistical analysis, results and limitations.', openPaper: 'Open paper ↗', posterTitle: 'WI2026 Student Challenge Poster', posterDesc: 'Study design, scorecard, hypotheses and key numbers on one page.', openPoster: 'Open poster ↗', authorsKicker: 'Authors', authorsAffiliation: 'Baden-Württemberg Cooperative State University Mosbach · Business Information Systems'
  }
};

let language = 'de';
const langToggle = document.getElementById('langToggle');
const originals = {};
document.querySelectorAll('[data-i18n]').forEach(el => originals[el.dataset.i18n] = el.textContent.trim());

langToggle.addEventListener('click', () => {
  language = language === 'de' ? 'en' : 'de';
  document.documentElement.lang = language;
  langToggle.textContent = language === 'de' ? 'EN' : 'DE';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = language === 'en' && translations.en[key] ? translations.en[key] : originals[key];
  });
});
