(() => {
  const profiles = {
    'Chris David Kaufmann': 'https://www.linkedin.com/in/chris-david-kaufmann-5072b331b/',
    'Luca di Siro': 'https://www.linkedin.com/in/luca-di-siro-b426933b9/',
    'Daniel Ertel': 'https://www.linkedin.com/in/daniel-ertel-63858b2aa/',
    'Richard Beser': 'https://www.linkedin.com/in/richard-beser-8b8373323/'
  };

  if (typeof W !== 'undefined') {
    W.paper = 'public/Doku Schalles (1).pdf';
    W.expose = 'public/Neue_Metriken_für_LLM_basierte_Coding_Agenten_final (1) (1).pdf';
    W.de = 'public/poster-de.pdf';
    W.en = 'public/StudentChallenge_ID476_EN.pdf';
  }

  function applyLinks() {
    document.querySelectorAll('.person').forEach(card => {
      const name = card.querySelector('h3')?.textContent.trim();
      const linkedin = card.querySelector('.linkedin');
      if (name && linkedin && profiles[name]) linkedin.href = profiles[name];
    });

    const exposeHref = typeof W !== 'undefined' ? W.expose : 'public/Neue_Metriken_für_LLM_basierte_Coding_Agenten_final (1) (1).pdf';
    const paperHref = typeof W !== 'undefined' ? W.paper : 'public/Doku Schalles (1).pdf';
    const posterDeHref = typeof W !== 'undefined' ? W.de : 'public/poster-de.pdf';
    const posterEnHref = typeof W !== 'undefined' ? W.en : 'public/StudentChallenge_ID476_EN.pdf';

    const top = document.querySelector('.nav-actions .button');
    if (top) top.href = exposeHref;

    document.querySelectorAll('[data-expose]').forEach(link => link.href = exposeHref);

    const expose = document.getElementById('docExpose');
    const paper = document.getElementById('docPaper');
    const posterDe = document.getElementById('docDe');
    const posterEn = document.getElementById('docEn');
    if (expose) expose.href = exposeHref;
    if (paper) paper.href = paperHref;
    if (posterDe) posterDe.href = posterDeHref;
    if (posterEn) posterEn.href = posterEnHref;

    const currentPoster = document.documentElement.lang === 'en' ? posterEnHref : posterDeHref;
    document.querySelectorAll('[data-current-poster]').forEach(link => link.href = currentPoster);
  }

  applyLinks();
  new MutationObserver(() => setTimeout(applyLinks, 0)).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  const finalizer = document.createElement('script');
  finalizer.src = 'finalize.js';
  document.body.appendChild(finalizer);
})();
