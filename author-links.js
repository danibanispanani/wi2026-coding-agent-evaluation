(() => {
  const profiles = {
    'Chris David Kaufmann': 'https://www.linkedin.com/in/chris-david-kaufmann-5072b331b/',
    'Luca di Siro': 'https://www.linkedin.com/in/luca-di-siro-b426933b9/',
    'Daniel Ertel': 'https://www.linkedin.com/in/daniel-ertel-63858b2aa/',
    'Richard Beser': 'https://www.linkedin.com/in/richard-beser-8b8373323/'
  };

  document.querySelectorAll('.person').forEach(card => {
    const name = card.querySelector('h3')?.textContent.trim();
    const linkedin = card.querySelector('.linkedin');
    if (name && linkedin && profiles[name]) linkedin.href = profiles[name];
  });
})();
