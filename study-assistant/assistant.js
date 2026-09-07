(function () {
  'use strict';

  const OUT_OF_SCOPE = 'This question is not covered by the study materials. Please try one of the suggested questions.';
  const INITIAL_QUESTIONS = [
    'What is the main finding?',
    'Why are only 70 runs used in the fair comparison?',
    'Why were hidden tests necessary?',
    'Did Self-Refining improve robustness?',
    'Did better prompts improve quality?',
    'Which agent was most efficient?',
    'Why did Gemini violate constraints?',
    'What are the main limitations?'
  ];

  const STOP_WORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'by', 'did', 'do', 'does',
    'about', 'actually', 'can', 'could', 'for', 'from', 'how', 'i', 'in', 'is', 'it',
    'me', 'more', 'no', 'not', 'of', 'on', 'only', 'or', 'our', 'please', 'tell',
    'the', 'this', 'to', 'was', 'were', 'what', 'when', 'which', 'who', 'why',
    'with', 'would', 'you', 'your', 'auch', 'als', 'am', 'aus', 'bei', 'bitte',
    'das', 'der', 'die', 'drei', 'ein', 'eine', 'einigen', 'ende', 'erklaert', 'etwas', 'eure',
    'basiert', 'bloss', 'fuer', 'ging', 'habt', 'hat', 'haben', 'ihr', 'ist', 'kann', 'konnt', 'kurz', 'mir',
    'mit', 'musste', 'nach', 'nicht', 'noch', 'nur', 'oder', 'sagen', 'sind', 'und',
    'vor', 'war', 'waren', 'was', 'welche', 'welcher', 'welches', 'wie', 'wieso',
    'um', 'warum', 'weshalb', 'wurden', 'zwischen', 'zum', 'zur'
  ]);

  const TOKEN_ALIASES = {
    agenten: 'agent',
    aussagekraftig: 'limitations',
    bewertet: 'score',
    bessere: 'better',
    besseren: 'better',
    durchlaufen: 'run',
    effizient: 'efficiency',
    effizientesten: 'efficiency',
    efficiency: 'efficiency',
    efficient: 'efficiency',
    erkenntnis: 'finding',
    ergebnis: 'result',
    ergebnisse: 'result',
    ergebnissen: 'result',
    faehigkeit: 'capability',
    fail: 'failure',
    failed: 'failure',
    failure: 'failure',
    failures: 'failure',
    fehler: 'failure',
    faire: 'fair',
    fairen: 'fair',
    fairer: 'fair',
    faires: 'fair',
    finden: 'finding',
    funktioniert: 'method',
    geholfen: 'help',
    gebracht: 'help',
    hauptergebnis: 'finding',
    herauskam: 'finding',
    hiddenpass: 'hidden',
    konfigurationen: 'configuration',
    kosten: 'cost',
    laeufe: 'run',
    laufe: 'run',
    leistung: 'performance',
    limiationen: 'limitations',
    limitationen: 'limitations',
    method: 'method',
    methodological: 'method',
    methodology: 'method',
    methode: 'method',
    niedrigsten: 'fewest',
    normalen: 'visible',
    normalisiert: 'normalized',
    qualitaet: 'quality',
    qualitative: 'quality',
    reichen: 'enough',
    ressourcen: 'resource',
    selbstrefining: 'refin',
    selbstverfeinerung: 'refin',
    sichtbar: 'visible',
    sichtbare: 'visible',
    siebzig: '70',
    sparsamsten: 'efficiency',
    statistische: 'statistical',
    stoppen: 'failure',
    stopped: 'failure',
    studie: 'study',
    system: 'agent',
    systemen: 'agent',
    tests: 'test',
    tokens: 'token',
    tool: 'agent',
    tools: 'agent',
    uberarbeitung: 'refin',
    unterschied: 'difference',
    vergleich: 'comparison',
    verbraucht: 'consumption',
    verbesserte: 'improve',
    verbessern: 'improve',
    verglichen: 'comparison',
    vertrauen: 'limitations',
    wenigsten: 'fewest',
    zusatzliche: 'additional'
  };

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/ß/g, 'ss')
      .replace(/n\s*[=:]?\s*70\b/g, '70')
      .replace(/self[\s-]*refin(?:ing|ement)/g, 'self-refining')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function stemToken(token) {
    const alias = TOKEN_ALIASES[token];
    if (alias) return alias;
    if (token.length > 5 && token.endsWith('ies')) return `${token.slice(0, -3)}y`;
    if (token.length > 5 && token.endsWith('ing')) return token.slice(0, -3);
    if (token.length > 4 && token.endsWith('ed')) return token.slice(0, -2);
    if (token.length > 4 && token.endsWith('s')) return token.slice(0, -1);
    return token;
  }

  function tokenize(value) {
    return normalize(value)
      .split(/\s+/)
      .filter(Boolean)
      .filter(token => !STOP_WORDS.has(token))
      .map(stemToken);
  }

  function bigrams(value) {
    const padded = ` ${value} `;
    const result = [];
    for (let index = 0; index < padded.length - 1; index += 1) {
      result.push(padded.slice(index, index + 2));
    }
    return result;
  }

  function similarity(left, right) {
    if (left === right) return 1;
    if (left.length > 3 && right.length > 3 && (left.startsWith(right) || right.startsWith(left))) return 0.86;
    if (left.length < 4 || right.length < 4) return 0;

    const leftPairs = bigrams(left);
    const rightPairs = bigrams(right);
    const remaining = rightPairs.slice();
    let matches = 0;
    leftPairs.forEach(pair => {
      const matchIndex = remaining.indexOf(pair);
      if (matchIndex !== -1) {
        matches += 1;
        remaining.splice(matchIndex, 1);
      }
    });
    return (2 * matches) / (leftPairs.length + rightPairs.length);
  }

  function scoreText(queryNormalized, queryTokens, text, weight) {
    const fieldNormalized = normalize(text);
    if (!fieldNormalized) return { score: 0, matched: 0 };

    const fieldTokens = tokenize(text);
    let score = 0;
    if (fieldNormalized === queryNormalized) score += weight * 5;
    else if (queryNormalized.length >= 4 && fieldNormalized.includes(queryNormalized)) score += weight * 2;

    let matched = 0;
    queryTokens.forEach(queryToken => {
      const best = fieldTokens.reduce((maximum, fieldToken) => Math.max(maximum, similarity(queryToken, fieldToken)), 0);
      if (best >= 0.62) {
        matched += 1;
        score += weight * best / Math.max(queryTokens.length, 1);
      }
    });
    return { score, matched };
  }

  // Keep the strongest match per field group so entries with many aliases do
  // not gain an artificial advantage merely by containing more text.
  function bestFieldScore(queryNormalized, queryTokens, fields, weight) {
    return fields.reduce((best, field) => {
      const result = scoreText(queryNormalized, queryTokens, field, weight);
      return result.score > best.score ? result : best;
    }, { score: 0, matched: 0 });
  }

  function rankEntries(question, entries) {
    const queryNormalized = normalize(question);
    const queryTokens = tokenize(question);
    if (!queryNormalized || !queryTokens.length) return [];

    return entries.map(entry => {
      const groups = [
        bestFieldScore(queryNormalized, queryTokens, [entry.question], 6),
        bestFieldScore(queryNormalized, queryTokens, entry.alternativeQuestions || [], 5),
        bestFieldScore(queryNormalized, queryTokens, entry.keywords || [], 3),
        bestFieldScore(queryNormalized, queryTokens, [entry.category], 1),
        bestFieldScore(queryNormalized, queryTokens, [entry.answer], 0.65)
      ];
      const score = groups.reduce((sum, group) => sum + group.score, 0);
      const matched = Math.max(...groups.map(group => group.matched));
      return { entry, score, coverage: matched / queryTokens.length };
    }).sort((left, right) => right.score - left.score);
  }

  function retrieve(question, entries) {
    const ranked = rankEntries(question, entries || []);
    if (!ranked.length) return null;

    const best = ranked[0];
    const tokenCount = tokenize(question).length;
    // Single-token questions are especially ambiguous and require a stricter
    // score. Coverage also prevents a common-word match from selecting an FAQ.
    const minimumScore = tokenCount === 1 ? 7.5 : 5.2;
    const minimumCoverage = tokenCount <= 2 ? 0.5 : tokenCount <= 4 ? 0.4 : 0.3;
    if (best.score < minimumScore || best.coverage < minimumCoverage) return null;
    return best.entry;
  }

  window.StudyAssistantSearch = Object.freeze({ normalize, tokenize, rankEntries, retrieve });

  if (typeof document === 'undefined') return;

  const knowledgeBase = Array.isArray(window.STUDY_KNOWLEDGE_BASE) ? window.STUDY_KNOWLEDGE_BASE : [];
  const dialog = document.getElementById('studyAssistantDialog');
  const messages = document.getElementById('studyAssistantMessages');
  const suggestions = document.getElementById('studyAssistantSuggestions');
  const form = document.getElementById('studyAssistantForm');
  const input = document.getElementById('studyAssistantInput');
  const resetButton = document.getElementById('studyAssistantReset');
  const closeButton = document.getElementById('studyAssistantClose');
  const openButtons = document.querySelectorAll('[data-open-study-assistant]');
  let lastOpener = null;

  if (!dialog || !messages || !suggestions || !form || !input || !resetButton || !closeButton) return;

  function makeElement(tagName, className, textValue) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (typeof textValue === 'string') element.textContent = textValue;
    return element;
  }

  function appendMessage(role, textValue, entry) {
    const wrapper = makeElement('div', `study-message study-message-${role}`);
    const label = makeElement('span', 'study-message-label', role === 'user' ? 'You' : 'Study assistant');
    const bubble = makeElement('div', 'study-message-bubble');
    const text = makeElement('p', 'study-message-text', textValue);

    bubble.appendChild(text);
    if (entry) {
      const meta = makeElement('div', 'study-answer-meta');
      const category = makeElement('span', 'study-answer-category', entry.category);
      const source = makeElement('p', 'study-answer-source', `Source: ${entry.source}`);
      meta.appendChild(category);
      bubble.insertBefore(meta, text);
      bubble.appendChild(source);
    }
    wrapper.appendChild(label);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  function makeQuestionButton(question, className) {
    const button = makeElement('button', className, question);
    button.type = 'button';
    button.addEventListener('click', () => askQuestion(question));
    return button;
  }

  function showSuggestions(questions, headingText) {
    suggestions.replaceChildren();
    const heading = makeElement('p', 'study-suggestions-label', headingText);
    const list = makeElement('div', 'study-suggestion-list');
    questions.forEach(question => list.appendChild(makeQuestionButton(question, 'study-question-chip')));
    suggestions.appendChild(heading);
    suggestions.appendChild(list);
  }

  function askQuestion(rawQuestion) {
    const question = String(rawQuestion || '').trim();
    if (!question) return;

    appendMessage('user', question);
    const match = retrieve(question, knowledgeBase);
    if (match) {
      appendMessage('assistant', match.answer, match);
      showSuggestions(match.relatedQuestions || INITIAL_QUESTIONS.slice(0, 3), 'Related questions');
    } else {
      appendMessage('assistant', OUT_OF_SCOPE);
      showSuggestions(INITIAL_QUESTIONS.slice(0, 5), 'Try one of these questions');
    }
    input.value = '';
    input.focus({ preventScroll: true });
  }

  function resetConversation() {
    messages.replaceChildren();
    appendMessage('assistant', 'Ask your own question in German or English about the study design, results, methods, or limitations. Every answer is retrieved from the final study knowledge base—nothing is generated.');
    showSuggestions(INITIAL_QUESTIONS, 'Suggested questions');
    input.value = '';
    input.focus({ preventScroll: true });
  }

  function openDialog(event) {
    lastOpener = event.currentTarget;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.classList.add('assistant-open');
    window.setTimeout(() => input.focus({ preventScroll: true }), 0);
  }

  function closeDialog() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  openButtons.forEach(button => button.addEventListener('click', openDialog));
  closeButton.addEventListener('click', closeDialog);
  resetButton.addEventListener('click', resetConversation);
  form.addEventListener('submit', event => {
    event.preventDefault();
    askQuestion(input.value);
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('assistant-open');
    if (lastOpener) lastOpener.focus({ preventScroll: true });
  });

  resetConversation();
})();
