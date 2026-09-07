/*
 * Curated knowledge base for the fully local study assistant.
 * Answers are displayed verbatim. Keep numerical values aligned with the final
 * WI2026 paper when this file is updated.
 */
window.STUDY_KNOWLEDGE_BASE = Object.freeze([
  {
    id: 'main-finding',
    category: 'Empirical finding',
    question: 'What is the main finding?',
    alternativeQuestions: [
      'What did the study find?',
      'What is the central contribution?',
      'Was functional correctness enough?',
      'Was ist das Hauptergebnis?',
      'Was ist die wichtigste Erkenntnis?'
    ],
    keywords: ['main result', 'takeaway', 'ceiling effect', 'visible tests', 'multidimensional evaluation'],
    answer: 'Empirical finding: Visible test pass rates were nearly saturated at 99.7%–100%. Hidden-test robustness, code size, cyclomatic complexity, constraint compliance, runtime, token efficiency, and qualitative score nevertheless revealed meaningful differences. The contribution is therefore not a universal agent ranking: it is evidence that pass/fail evaluation alone loses discriminative power in this bounded task space.',
    source: 'Final WI2026 Paper — Abstract, Results, and Conclusion',
    relatedQuestions: ['What is hidden pass?', 'Which agent was most efficient?', 'What are the main limitations?']
  },
  {
    id: 'fair-n70',
    category: 'Methodological choice',
    question: 'Why are only 70 runs used in the fair comparison?',
    alternativeQuestions: [
      'Why n70?',
      'Warum nur 70?',
      'Warum n 70?',
      'Wieso wurden nur 70 Läufe verglichen?',
      'Why were 26 runs excluded?',
      'Why is the fair artifact basis n = 70?'
    ],
    keywords: ['70 runs', 'fair comparison', 'fair artifact basis', 'Claude limit', '26 failures', 'subset'],
    answer: 'Methodological choice: Claude completed the first 70 of 96 configurations normally. The next 26 runs produced no artifact after the access-tier usage limit was reached. The fair artifact evaluation therefore uses the 70 matched configurations for which all three agents produced real code. This avoids treating missing outputs as code-quality measurements. The subset contains no Caesar Cipher runs, which limits its representativeness.',
    source: 'Final WI2026 Paper — Study Design, Fair Artifact Basis (n = 70)',
    relatedQuestions: ['What happened in the Claude failures?', 'How does the full operational evaluation differ?', 'Why is the absence of Caesar Cipher a limitation?']
  },
  {
    id: 'claude-failures',
    category: 'Limitation',
    question: 'What happened in the Claude failures?',
    alternativeQuestions: [
      'Claude failures',
      'Why did Claude complete only 70 runs?',
      'Did Claude fail because it was less capable?',
      'Warum fehlen Claude Läufe?',
      'Was ist mit Claude passiert?',
      'Warum ist Claude abgebrochen?',
      'What happened after Claude completed the initial runs?'
    ],
    keywords: ['Claude', 'usage limit', 'access tier', '26 runs', 'chronological block', 'missing output'],
    answer: 'Limitation: Claude reached the usage limit of the access tier after 70 normal completions. The remaining 26 configurations then failed as one chronological block without producing code. This is an operational availability result for the evaluated setup, not evidence that the underlying Claude model was less capable.',
    source: 'Final WI2026 Paper — Study Design and Limitations',
    relatedQuestions: ['Why are only 70 runs used in the fair comparison?', 'How does the full operational evaluation differ?', 'What are the main limitations?']
  },
  {
    id: 'operational-vs-fair',
    category: 'Methodological choice',
    question: 'How does the full operational evaluation differ?',
    alternativeQuestions: [
      'What is the difference between n 96 and n 70?',
      'What is full operational evaluation?',
      'Was the full study 96 runs per agent?',
      'Warum ist n=96 auch relevant?',
      'Erklärt mir den Unterschied zwischen den 70 und 96 Durchläufen.'
    ],
    keywords: ['full operational', 'fair artifact', '96 per agent', '70 per agent', 'completed space'],
    answer: 'Methodological choice: The full operational evaluation covers all 96 planned configurations per agent and asks whether each agent system completed the experimental space. The fair artifact evaluation uses 70 matched configurations per agent and compares only real code artifacts produced by all three systems. These answer different questions and should not be mixed.',
    source: 'Final WI2026 Paper — Study Design, Evaluation Bases',
    relatedQuestions: ['Why are only 70 runs used in the fair comparison?', 'What happened in the Claude failures?', 'How was the experiment designed?']
  },
  {
    id: 'hidden-tests',
    category: 'Methodological choice',
    question: 'Why were hidden tests necessary?',
    alternativeQuestions: [
      'What is hidden pass?',
      'What is the hidden pass rate?',
      'Was sind Hidden Tests?',
      'Warum verdeckte Tests?',
      'How did hidden tests separate the agents?'
    ],
    keywords: ['hidden tests', 'hidden pass', 'robustness', 'edge cases', 'visible test ceiling'],
    answer: 'Methodological choice and finding: Hidden tests evaluate edge cases that were not exposed to the agents during generation or Self-Refining. Visible tests were nearly saturated, but hidden pass rates on the fair n = 70 basis were Claude 92.9%, Gemini 83.3%, and Codex 79.3% (global p = 0.0135). Hidden tests therefore restored discrimination in robustness without allowing agents to optimize directly against those cases.',
    source: 'Final WI2026 Paper — Metrics and Results, Hidden Pass Rate',
    relatedQuestions: ['What is the main finding?', 'Did Self-Refining improve robustness?', 'Why are only 70 runs used in the fair comparison?']
  },
  {
    id: 'visible-tests',
    category: 'Empirical finding',
    question: 'How did the agents perform on visible tests?',
    alternativeQuestions: ['What were the visible pass rates?', 'Were visible tests saturated?', 'What caused the ceiling effect?'],
    keywords: ['visible test pass rate', 'ceiling', 'functional success', 'Claude 1.000', 'Codex 0.997', 'Gemini 1.000'],
    answer: 'Empirical finding: On the fair artifact basis, visible test pass rates were Claude 1.000, Codex 0.997, and Gemini 1.000; the global p-value was 0.368. The near-perfect values create a ceiling effect. The result does not prove the systems equal—it shows that these visible tests had little remaining ability to distinguish them.',
    source: 'Final WI2026 Paper — Results, Visible Test Pass Rate (fair n = 70)',
    relatedQuestions: ['What is the main finding?', 'Why were hidden tests necessary?', 'What are the main limitations?']
  },
  {
    id: 'ceiling-effect',
    category: 'Interpretation',
    question: 'What is the ceiling effect?',
    alternativeQuestions: [
      'What does the ceiling effect mean?',
      'Was bedeutet der Ceiling-Effekt?',
      'Was ist ein Ceiling-Effekt?',
      'Why did visible tests lose discriminative power?'
    ],
    keywords: ['ceiling effect', 'saturation', 'near perfect visible tests', 'discriminative power', '99.7 to 100 percent'],
    answer: 'Interpretation: A ceiling effect occurs when results cluster near the maximum, leaving little room for a metric to distinguish systems. Here, visible test pass rates were 99.7%–100%. That saturation does not prove the agents equal; it means visible pass/fail results alone had little discriminative power in this bounded task space.',
    source: 'Final WI2026 Paper — Introduction and Results, Visible-Test Ceiling Effect',
    relatedQuestions: ['What is the main finding?', 'How did the agents perform on visible tests?', 'Why were hidden tests necessary?']
  },
  {
    id: 'friedman',
    category: 'Methodological choice',
    question: 'Why was the Friedman test used?',
    alternativeQuestions: [
      'Warum Friedman?',
      'Why no ANOVA?',
      'Why did you not use ANOVA?',
      'Warum keine ANOVA?',
      'What does the Friedman test do?'
    ],
    keywords: ['Friedman test', 'ANOVA', 'non-parametric', 'paired', 'more than two conditions', 'global difference'],
    answer: 'Methodological choice: The Friedman test is a non-parametric test for a global difference across more than two paired metric or ordinal conditions. The experiment repeatedly measured matched configurations, so observations across agents or prompt levels were paired. It was preferred to an ANOVA because the analysis did not rely on the same parametric distribution assumptions. A significant Friedman result says that at least one condition differs; it does not identify which pair differs.',
    source: 'Final WI2026 Paper — Statistical Methodology',
    relatedQuestions: ['Which statistical tests were used?', 'What does Holm correction do?', 'Does a non-significant result prove equality?']
  },
  {
    id: 'statistical-tests',
    category: 'Methodological choice',
    question: 'Which statistical tests were used?',
    alternativeQuestions: ['How were metrics tested?', 'When was Cochran Q used?', 'When was Wilcoxon used?', 'When was McNemar used?', 'Welche statistische Methode wurde für die drei Agenten genommen?'],
    keywords: ['Friedman', 'Cochran Q', 'Wilcoxon signed-rank', 'McNemar', 'paired conditions', 'alpha 0.05'],
    answer: 'Methodological choice: Friedman was used for more than two paired metric or ordinal conditions, and Cochran Q for more than two paired binary conditions. Wilcoxon signed-rank handled two paired metric or ordinal conditions, including Direct versus Self-Refining and post-hoc comparisons. McNemar handled two paired binary conditions. The significance level was α = 0.05.',
    source: 'Final WI2026 Paper — Statistical Methodology',
    relatedQuestions: ['Why was the Friedman test used?', 'What does Holm correction do?', 'Does a non-significant result prove equality?']
  },
  {
    id: 'holm',
    category: 'Methodological choice',
    question: 'What does Holm correction do?',
    alternativeQuestions: ['Why were p-values Holm corrected?', 'What is multiplicity correction?', 'How were post-hoc comparisons corrected?'],
    keywords: ['Holm correction', 'multiple comparisons', 'post-hoc', 'family-wise error rate', 'pairwise'],
    answer: 'Methodological choice: Holm correction was applied when multiple pairwise post-hoc tests were performed. It adjusts the decision thresholds to control the family-wise error rate and reduce false-positive conclusions across the set of comparisons.',
    source: 'Final WI2026 Paper — Statistical Methodology',
    relatedQuestions: ['Why was the Friedman test used?', 'Which statistical tests were used?', 'Did better prompts improve quality?']
  },
  {
    id: 'non-significance',
    category: 'Interpretation',
    question: 'Does a non-significant result prove equality?',
    alternativeQuestions: ['Does p greater than 0.05 mean equal?', 'Were the agents proven equal?', 'What does not statistically significant mean?'],
    keywords: ['non-significant', 'p value', 'equality', 'absence of evidence', 'interpretation'],
    answer: 'Interpretation: No. A non-significant p-value means that the experiment did not detect a difference at the chosen threshold. It is not proof of equality or proof that an effect never exists. This distinction matters for H1, Self-Refining, prompt quality, and Maintainability Index.',
    source: 'Final WI2026 Paper — Statistical Methodology and Interpretation',
    relatedQuestions: ['Did more tokens improve performance?', 'Did Self-Refining improve robustness?', 'Did better prompts improve quality?']
  },
  {
    id: 'token-normalization',
    category: 'Methodological choice',
    question: 'How were tokens normalized?',
    alternativeQuestions: [
      'What is normalized token consumption?',
      'Wie wurden Tokens normalisiert?',
      'How were cached tokens handled?',
      'Are normalized tokens monetary cost?'
    ],
    keywords: ['T norm', 'prompt tokens', 'cache creation', 'cache reads', 'completion', 'reasoning', 'provider differences'],
    answer: 'Methodological choice: T_norm is the sum of prompt context including cache effects, completion tokens, and reasoning tokens. For Claude, prompt context combines regular input, cache creation, and cache reads. For Codex, cached tokens are already included in input tokens and are not added again. Gemini usage is aggregated across all models involved in its agent run. This is a technical resource-consumption measure, not a monetary-cost measure.',
    source: 'Final WI2026 Paper — Metrics, Token Normalization',
    relatedQuestions: ['Which agent used the fewest tokens?', 'Did more tokens improve performance?', 'Are normalized tokens monetary costs?']
  },
  {
    id: 'token-performance-h1',
    category: 'Empirical finding',
    question: 'Did more tokens improve performance?',
    alternativeQuestions: [
      'Did additional token consumption explain higher performance?',
      'Was H1 supported?',
      'Verbessern mehr Tokens die Leistung?',
      'Bringen mehr Tokens bessere Ergebnisse?',
      'Do more tokens mean better results?'
    ],
    keywords: ['H1', 'token performance relationship', 'coefficient', 'regression', 'R squared', 'functional performance'],
    answer: 'Empirical finding: No measurable positive token–performance relationship was detected within the studied task space. For visible performance, the log(token) coefficient was −0.00037 (p = 0.913, R² = 0.0105). A hidden-pass sensitivity analysis gave coefficient −0.032 (p = 0.476, R² = 0.044). This does not prove that tokens never help in other tasks or settings.',
    source: 'Final WI2026 Paper — Hypothesis H1 and Sensitivity Analysis',
    relatedQuestions: ['How were tokens normalized?', 'Which agent used the fewest tokens?', 'Does a non-significant result prove equality?']
  },
  {
    id: 'self-refining-h2',
    category: 'Empirical finding',
    question: 'Did Self-Refining improve robustness?',
    alternativeQuestions: [
      'Did self refining help?',
      'Was H2 supported?',
      'Hat Self-Refining geholfen?',
      'Hat die zusätzliche Überarbeitung etwas gebracht?',
      'Did the repair iteration improve hidden pass?'
    ],
    keywords: ['H2', 'Self-Refining', 'Direct', 'repair iteration', 'visible feedback', 'hidden robustness'],
    answer: 'Empirical finding: No statistically detectable robustness improvement was observed in this experiment. Direct mode achieved 85.6% hidden pass, compared with 84.8% for Self-Refining (p = 0.179), so H2 was not supported. This result does not claim that Self-Refining never works.',
    source: 'Final WI2026 Paper — Hypothesis H2',
    relatedQuestions: ['How did Self-Refining work?', 'Why were hidden tests necessary?', 'Does a non-significant result prove equality?']
  },
  {
    id: 'self-refining-design',
    category: 'Methodological choice',
    question: 'How did Self-Refining work?',
    alternativeQuestions: ['What was Self-Refining mode?', 'How many repair iterations were allowed?', 'What feedback did agents receive?'],
    keywords: ['Self-Refining', 'mode', 'one iteration', 'repair', 'visible test feedback', 'Direct'],
    answer: 'Methodological choice: The experiment compared Direct mode with Self-Refining mode. Self-Refining added one repair iteration based on feedback from the visible tests. Hidden-test results were not shown to the agent.',
    source: 'Final WI2026 Paper — Study Design, Agent Modes',
    relatedQuestions: ['Did Self-Refining improve robustness?', 'Why were hidden tests necessary?', 'How was the experiment designed?']
  },
  {
    id: 'prompt-efficiency-h3',
    category: 'Empirical finding',
    question: 'Did better prompts reduce token consumption?',
    alternativeQuestions: [
      'Was H3 supported?',
      'How did prompt level affect tokens?',
      'Haben bessere Prompts Tokens gespart?',
      'What was the low to high token reduction?'
    ],
    keywords: ['H3', 'prompt specification', 'Low Medium High', '107045', '101888', '93262', '13 percent reduction'],
    answer: 'Empirical finding: Normalized token use decreased from 107,045 at Low specification to 101,888 at Medium and 93,262 at High—about a 13% Low-to-High reduction. The global Friedman result was significant (p = 0.0409), but no individual post-hoc pair remained significant after Holm correction. The evidence supports a global prompt-level effect, not a robust claim about any specific pair.',
    source: 'Final WI2026 Paper — Hypothesis H3',
    relatedQuestions: ['Did better prompts improve quality?', 'How were prompt levels defined?', 'What does Holm correction do?']
  },
  {
    id: 'prompt-quality-h4',
    category: 'Empirical finding',
    question: 'Did better prompts improve quality?',
    alternativeQuestions: [
      'Was H4 supported?',
      'Did prompt specification improve qualitative score?',
      'Verbessern bessere Prompts die Qualität?',
      'Did high prompts improve code quality?'
    ],
    keywords: ['H4', 'prompt quality', 'qualitative score', 'p 0.990', 'not supported'],
    answer: 'Empirical finding: No statistically significant qualitative-score improvement was detected across prompt levels (p = 0.990), so H4 was not supported. Combined with H3, prompt specification acted primarily as an efficiency lever in this experiment, not as a demonstrated quality lever.',
    source: 'Final WI2026 Paper — Hypothesis H4',
    relatedQuestions: ['Did better prompts reduce token consumption?', 'How is the quality score calculated?', 'Does a non-significant result prove equality?']
  },
  {
    id: 'prompt-levels',
    category: 'Methodological choice',
    question: 'How were prompt levels defined?',
    alternativeQuestions: ['What were Low Medium and High prompts?', 'What changed between prompt levels?', 'Wie unterschieden sich die Prompt-Stufen?'],
    keywords: ['Low prompt', 'Medium prompt', 'High prompt', 'signatures', 'edge cases', 'constraints', 'checking instructions'],
    answer: 'Methodological choice: Low prompts were vague or minimally specified. Medium prompts added explicit signatures and selected edge cases. High prompts added stronger structure, explicit constraints, and checking instructions.',
    source: 'Final WI2026 Paper — Study Design, Prompt Levels',
    relatedQuestions: ['Did better prompts reduce token consumption?', 'Did better prompts improve quality?', 'How was the experiment designed?']
  },
  {
    id: 'gemini-tests',
    category: 'Empirical finding',
    question: 'Why did Gemini violate constraints?',
    alternativeQuestions: [
      'Why did Gemini edit tests?',
      'Why did Gemini modify the test file?',
      'Why was Gemini compliance 75.7 percent?',
      'Warum hat Gemini Tests verändert?'
    ],
    keywords: ['Gemini', '17 runs', 'test modification', 'added tests', 'constraint compliance', '75.7'],
    answer: 'Empirical finding: In 17 fair-comparison runs, Gemini modified the supplied test file or added tests. Those runs were retained because altering the evaluation instrument is itself relevant agent behavior. Gemini’s resulting constraint compliance was 0.757, while Claude and Codex each achieved 1.000. This records observed system behavior; it does not explain the system’s internal reason for making the edits.',
    source: 'Final WI2026 Paper — Results, Constraint Compliance',
    relatedQuestions: ['Why were Gemini’s violating runs retained?', 'Which agent performed best?', 'What are Hallucination Flags?']
  },
  {
    id: 'gemini-retained',
    category: 'Methodological choice',
    question: 'Why were Gemini’s violating runs retained?',
    alternativeQuestions: ['Why not delete the 17 Gemini runs?', 'Were modified tests excluded?', 'How were test-file violations handled?'],
    keywords: ['Gemini runs retained', '17 violations', 'evaluation instrument', 'constraint behavior', 'not deleted'],
    answer: 'Methodological choice: The 17 runs with test-file changes were intentionally retained. Modifying the supplied evaluation instrument was treated as meaningful constraint-compliance behavior, so deleting those observations would have hidden a relevant difference between agent systems.',
    source: 'Final WI2026 Paper — Evaluation Procedure, Constraint Compliance',
    relatedQuestions: ['Why did Gemini violate constraints?', 'What are Hallucination Flags?', 'Which agent performed best?']
  },
  {
    id: 'constraint-compliance',
    category: 'Methodological choice',
    question: 'What does constraint compliance mean?',
    alternativeQuestions: [
      'Was bedeutet Constraint Compliance?',
      'How was constraint compliance measured?',
      'What counts as a constraint violation?',
      'Was ist Regelkonformität?'
    ],
    keywords: ['constraint compliance', 'requirements', 'test file', 'rules', 'compliance metric'],
    answer: 'Methodological choice: Constraint Compliance records whether an artifact respected the explicit task rules, including leaving the supplied evaluation files unchanged. On the fair n = 70 basis, Claude and Codex each scored 1.000, while Gemini scored 0.757 because it modified the supplied test file or added tests in 17 runs. This metric describes rule adherence, not functional correctness.',
    source: 'Final WI2026 Paper — Metrics and Results, Constraint Compliance',
    relatedQuestions: ['Why did Gemini violate constraints?', 'Why were Gemini’s violating runs retained?', 'How is the quality score calculated?']
  },
  {
    id: 'agent-efficiency',
    category: 'Empirical finding',
    question: 'Which agent used the fewest tokens?',
    alternativeQuestions: [
      'Which agent was most efficient?',
      'Welcher Agent nutzte die wenigsten Tokens?',
      'Welcher Agent war am effizientesten?',
      'Who had the best resource efficiency?',
      'What were tokens per passed test case?'
    ],
    keywords: ['Codex efficiency', 'normalized tokens', 'tokens per passed test', 'runtime', 'cache ratio', 'fewest tokens'],
    answer: 'Empirical finding: Codex had the strongest token-efficiency profile. Normalized context tokens were Codex 62,801, Claude 112,121, and Gemini 128,160. Tokens per passed test case were Codex 3,870, Claude 6,998, and Gemini 7,489. Runtime was 35.52 s for Codex, 30.23 s for Claude, and 51.23 s for Gemini. These token measures describe technical resource consumption, not monetary cost.',
    source: 'Final WI2026 Paper — Results, Efficiency Metrics (fair n = 70)',
    relatedQuestions: ['How were tokens normalized?', 'Did more tokens improve performance?', 'Which agent performed best?']
  },
  {
    id: 'agent-comparison',
    category: 'Interpretation',
    question: 'Which agent performed best?',
    alternativeQuestions: ['Which agent won?', 'Was Claude Codex or Gemini best?', 'Welcher Agent war der beste?', 'Is there a universal winner?', 'Who produced the leanest solution while still passing the tests?'],
    keywords: ['agent profiles', 'ranking', 'winner', 'Claude quality', 'Codex efficiency', 'Gemini completion'],
    answer: 'Interpretation: There is no universal winner. Claude had the highest hidden-test robustness and qualitative score and the shortest code in the fair subset, but its access-tier limit prevented full operational completion. Codex used the fewest normalized tokens, had the lowest tokens per passed test, and the lowest cyclomatic complexity. Gemini completed all configurations with high functional success, but had the weakest constraint compliance and higher resource use than Codex. The preferred system depends on the objective.',
    source: 'Final WI2026 Paper — Results and Conclusion, Agent Profiles',
    relatedQuestions: ['What is the main finding?', 'Which agent used the fewest tokens?', 'What happened in the Claude failures?']
  },
  {
    id: 'artifact-metrics',
    category: 'Empirical finding',
    question: 'How did code size and complexity compare?',
    alternativeQuestions: ['What were the SLOC results?', 'Which agent had lowest complexity?', 'What was the Maintainability Index?', 'How maintainable was the code?'],
    keywords: ['SLOC', 'cyclomatic complexity', 'Maintainability Index', 'MI', 'code size', 'p values'],
    answer: 'Empirical finding on the fair n = 70 basis: Mean SLOC was Claude 30.50, Codex 32.70, and Gemini 37.84 (p < 0.001). Mean cyclomatic complexity was Claude 6.48, Codex 5.72, and Gemini 6.83 (p < 0.001). Maintainability Index was Claude 48.89, Codex 48.41, and Gemini 52.30 (p = 0.741); that non-significant result does not prove equal maintainability.',
    source: 'Final WI2026 Paper — Results, Maintainability Metrics (fair n = 70)',
    relatedQuestions: ['How is the Minimality Score calculated?', 'Why is Maintainability Index excluded from the quality score?', 'Does a non-significant result prove equality?']
  },
  {
    id: 'quality-score',
    category: 'Methodological choice',
    question: 'How is the quality score calculated?',
    alternativeQuestions: [
      'What is the qualitative score formula?',
      'How is Q calculated?',
      'Wie wird der Quality Score berechnet?',
      'Why are quality dimensions equally weighted?'
    ],
    keywords: ['qualitative score', 'Interface', 'Constraint', 'Minimality', 'Robustness', 'equal weighting', 'Q formula'],
    answer: 'Methodological choice: Q = (Interface + Constraint + Minimality + Robustness) / 4, with every dimension ranging from 0 to 1. Equal weighting was chosen as a transparent convention because no empirically validated weighting scheme existed. Q is a summary measure and should not replace inspection of its individual dimensions. The fair-basis scores were Claude 0.972, Codex 0.942, and Gemini 0.881.',
    source: 'Final WI2026 Paper — Metrics, Qualitative Overall Score',
    relatedQuestions: ['Why is Maintainability Index excluded from the quality score?', 'How is the Minimality Score calculated?', 'Did better prompts improve quality?']
  },
  {
    id: 'mi-exclusion',
    category: 'Methodological choice',
    question: 'Why is Maintainability Index excluded from the quality score?',
    alternativeQuestions: ['Why is MI not part of Q?', 'Would Maintainability Index double count metrics?', 'Why exclude maintainability from quality?'],
    keywords: ['Maintainability Index', 'quality score', 'double counting', 'SLOC', 'complexity', 'Halstead'],
    answer: 'Methodological choice: Maintainability Index was excluded from the qualitative overall score because MI already combines code size, cyclomatic complexity, and Halstead information. Including it alongside related dimensions would create partial double counting.',
    source: 'Final WI2026 Paper — Metrics, Qualitative Overall Score',
    relatedQuestions: ['How is the quality score calculated?', 'How did code size and complexity compare?', 'How is the Minimality Score calculated?']
  },
  {
    id: 'minimality-score',
    category: 'Methodological choice',
    question: 'How is the Minimality Score calculated?',
    alternativeQuestions: ['What are the minimality thresholds?', 'Is Minimality an industry standard?', 'Wie wird Minimality berechnet?'],
    keywords: ['Minimality Score', 'SLOC thresholds', 'complexity thresholds', 'heuristic', 'project-defined'],
    answer: 'Methodological choice and limitation: Minimality is a project-defined heuristic, not an external industry norm. SLOC below 50 has no deduction, 50–80 deducts 0.2, and above 80 deducts 0.4. Cyclomatic complexity below 9 has no deduction, 9–12 deducts 0.2, and above 12 deducts 0.4. The minimum score is 0.',
    source: 'Final WI2026 Paper — Metrics, Minimality Score',
    relatedQuestions: ['How is the quality score calculated?', 'How did code size and complexity compare?', 'What are the main limitations?']
  },
  {
    id: 'hallucination-flags',
    category: 'Limitation',
    question: 'What are Hallucination Flags?',
    alternativeQuestions: ['Did the study measure hallucinations?', 'How were hallucinations detected?', 'Was hallucination detection complete?'],
    keywords: ['Hallucination Flags', 'AST', 'rule-based', 'imports', 'print statements', 'Markdown remnants', 'test modification'],
    answer: 'Limitation: Hallucination Flags are reproducible AST- and rule-based heuristics for signals such as unnecessary imports, stray print statements, natural-language or Markdown remnants in code, and test-file modification. They are not a complete measurement of hallucination and should not be interpreted as one.',
    source: 'Final WI2026 Paper — Metrics and Limitations, Hallucination Flags',
    relatedQuestions: ['Why did Gemini violate constraints?', 'How is the quality score calculated?', 'What are the main limitations?']
  },
  {
    id: 'study-design',
    category: 'Methodological choice',
    question: 'How was the experiment designed?',
    alternativeQuestions: ['How do you get 96 configurations?', 'Why were there 288 runs?', 'What tasks and factors were studied?', 'Wie war die Studie aufgebaut?'],
    keywords: ['study design', '4 tasks', '4 variants', '3 prompts', '2 modes', '96 configurations', '288 total runs'],
    answer: 'Methodological choice: Each agent received 4 tasks × 4 task variants × 3 prompt levels × 2 modes, giving 96 planned configurations per agent. Across Claude Code, OpenAI Codex, and Gemini CLI, that produced 288 planned runs. The tasks were ISBN validation, FizzBuzz, Remove Duplicates, and Caesar Cipher.',
    source: 'Final WI2026 Paper — Study Design',
    relatedQuestions: ['How were prompt levels defined?', 'How did Self-Refining work?', 'Why are only 70 runs used in the fair comparison?']
  },
  {
    id: 'limitations-summary',
    category: 'Limitation',
    question: 'What are the main limitations?',
    alternativeQuestions: ['What are the study limitations?', 'What limits external validity?', 'Was sind die Limitationen?', 'Welche Limitationen gibt es?', 'What should readers be cautious about?', 'Kann ich den Ergebnissen vertrauen?', 'Wie aussagekräftig sind die Ergebnisse?'],
    keywords: ['limitations', 'external validity', 'simple tasks', 'one run', 'no confidence intervals', 'Caesar Cipher', 'CLI systems'],
    answer: 'Limitations: The study used only four relatively simple programming tasks, contributing to a visible-test ceiling effect. It ran one stochastic observation per configuration, so repeated-run variance and confidence intervals could not be estimated. The matched n = 70 subset excludes Caesar Cipher. Claude’s later missing outputs reflect an access-tier limit. Some measures, including Minimality and Hallucination Flags, are project-defined heuristics. Finally, the comparison concerns complete agentic CLI systems, not isolated base models. External validity is therefore limited.',
    source: 'Final WI2026 Paper — Limitations',
    relatedQuestions: ['Why is task simplicity a limitation?', 'Why is one run per configuration a limitation?', 'Why is the absence of Caesar Cipher a limitation?']
  },
  {
    id: 'simple-tasks',
    category: 'Limitation',
    question: 'Why is task simplicity a limitation?',
    alternativeQuestions: ['Were four simple tasks enough?', 'Did simple tasks cause the ceiling effect?', 'How broad was the task set?'],
    keywords: ['four tasks', 'simple programming tasks', 'ceiling effect', 'task diversity', 'external validity'],
    answer: 'Limitation: Only four relatively simple programming tasks were studied. Their bounded scope likely contributed to near-saturated visible-test performance and may not represent larger, multi-file, domain-specific, or long-horizon software-engineering work. Conclusions should remain within the studied task space.',
    source: 'Final WI2026 Paper — Limitations, Task Scope',
    relatedQuestions: ['What are the main limitations?', 'What is the main finding?', 'Were base models compared directly?']
  },
  {
    id: 'single-run',
    category: 'Limitation',
    question: 'Why is one run per configuration a limitation?',
    alternativeQuestions: ['Were configurations repeated?', 'Could you estimate run variance?', 'Why are there no confidence intervals?', 'How was stochastic variability handled?'],
    keywords: ['one stochastic run', 'repeated runs', 'variance', 'confidence intervals', 'randomness'],
    answer: 'Limitation: Each configuration was run once. Because agent outputs are stochastic, repeated executions could produce different results. Without repeated runs, the study cannot estimate within-configuration variance or provide repeated-run confidence intervals.',
    source: 'Final WI2026 Paper — Limitations, Stochastic Runs',
    relatedQuestions: ['What are the main limitations?', 'How was the experiment designed?', 'Does a non-significant result prove equality?']
  },
  {
    id: 'no-caesar',
    category: 'Limitation',
    question: 'Why is the absence of Caesar Cipher a limitation?',
    alternativeQuestions: ['Why is Caesar Cipher missing from n70?', 'Did the fair subset include all tasks?', 'Welche Aufgabe fehlt im fairen Vergleich?'],
    keywords: ['Caesar Cipher', 'n 70 subset', 'chronological order', 'task coverage', 'missing task'],
    answer: 'Limitation: The fair n = 70 subset contains no Caesar Cipher configurations because those runs appeared after Claude reached its access-tier usage limit. The matched artifact comparison therefore does not cover all four tasks, which narrows how broadly its agent differences can be generalized.',
    source: 'Final WI2026 Paper — Fair Artifact Basis and Limitations',
    relatedQuestions: ['Why are only 70 runs used in the fair comparison?', 'What happened in the Claude failures?', 'What are the main limitations?']
  },
  {
    id: 'tokens-not-cost',
    category: 'Limitation',
    question: 'Are normalized tokens monetary costs?',
    alternativeQuestions: ['Do token numbers equal price?', 'Can token use be read as API cost?', 'Sind normalisierte Tokens Kosten?'],
    keywords: ['tokens not money', 'monetary cost', 'pricing', 'technical consumption', 'provider'],
    answer: 'Limitation and interpretation: No. Normalized tokens are a technical resource-consumption measure designed to make provider accounting more comparable. They are not monetary costs, and the reported token values should not be converted into a price claim without a separate pricing analysis.',
    source: 'Final WI2026 Paper — Token Normalization and Limitations',
    relatedQuestions: ['How were tokens normalized?', 'Which agent used the fewest tokens?', 'What are the main limitations?']
  },
  {
    id: 'agentic-systems',
    category: 'Limitation',
    question: 'Were base models compared directly?',
    alternativeQuestions: ['Are results about isolated models?', 'What exactly was compared?', 'Were Claude Codex and Gemini model benchmarks?', 'Sind das reine Modellvergleiche?'],
    keywords: ['agentic CLI systems', 'base models', 'tools', 'scaffolding', 'system comparison', 'external validity'],
    answer: 'Limitation: The evaluated units were Claude Code, OpenAI Codex, and Gemini CLI as complete agentic systems. Their behavior includes model capabilities plus tool use, orchestration, defaults, and surrounding software. The results should not be presented as a controlled comparison of isolated base models.',
    source: 'Final WI2026 Paper — Study Scope and Limitations',
    relatedQuestions: ['Which agent performed best?', 'What are the main limitations?', 'How was the experiment designed?']
  },
  {
    id: 'cache-ratio',
    category: 'Empirical finding',
    question: 'What were the cache ratios?',
    alternativeQuestions: ['Which agent had the highest cache ratio?', 'How much context was cached?', 'What is the cache ratio result?'],
    keywords: ['cache ratio', 'Claude 0.910', 'Codex 0.830', 'Gemini 0.723', 'efficiency'],
    answer: 'Empirical finding: Cache Ratio was 0.910 for Claude, 0.830 for Codex, and 0.723 for Gemini on the final fair-comparison results. Cache behavior is one resource profile dimension and should be interpreted alongside normalized tokens, runtime, and functional outcomes.',
    source: 'Final WI2026 Paper — Results, Efficiency Metrics (fair n = 70)',
    relatedQuestions: ['How were tokens normalized?', 'Which agent used the fewest tokens?', 'Did more tokens improve performance?']
  }
]);
