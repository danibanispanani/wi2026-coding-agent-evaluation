(() => {
  'use strict';

  const AUTHORS = [
    { key: 'chris', initials: 'CK', name: 'Chris David Kaufmann' },
    { key: 'luca', initials: 'LS', name: 'Luca di Siro' },
    { key: 'daniel', initials: 'DE', name: 'Daniel Ertel' },
    { key: 'richard', initials: 'RB', name: 'Richard Beser' }
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function addStyle() {
    if ($('#wi-polish-v4')) return;
    const style = document.createElement('style');
    style.id = 'wi-polish-v4';
    style.textContent = `
      .current-doc { display: none !important; }
      #resources .resource-preview { display: none !important; }

      .lang-switch {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 3px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: #fff;
      }
      .lang-switch button {
        border: 0;
        background: transparent;
        color: var(--muted);
        font: inherit;
        font-size: .76rem;
        font-weight: 850;
        min-width: 38px;
        height: 34px;
        padding: 0 9px;
        border-radius: 9px;
        cursor: pointer;
      }
      .lang-switch button.active {
        background: var(--navy);
        color: #fff;
      }
      .lang-switch button:focus-visible {
        outline: 2px solid var(--burgundy);
        outline-offset: 2px;
      }

      .avatar {
        position: relative !important;
        overflow: hidden !important;
        border-radius: 50% !important;
        width: 56px !important;
        height: 56px !important;
        background: var(--navy) !important;
      }
      .avatar .avatar-fallback {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: #fff;
        font-weight: 850;
        z-index: 1;
      }
      .avatar img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        z-index: 2;
        display: block;
      }
      .avatar img[hidden] { display: none !important; }
      .person h3 { margin-top: 14px !important; }

      @media (max-width: 600px) {
        .lang-switch button { min-width: 34px; padding: 0 7px; }
      }
    `;
    document.head.appendChild(style);
  }

  function removeDuplicatePosterStrip() {
    $$('.current-doc').forEach(el => el.remove());
  }

  function installProfileImages() {
    $$('.person').forEach((card, index) => {
      const person = AUTHORS[index];
      if (!person) return;
      const avatar = $('.avatar', card);
      if (!avatar || avatar.dataset.photoReady === '1') return;
      avatar.dataset.photoReady = '1';
      avatar.innerHTML = `<span class="avatar-fallback">${person.initials}</span>`;

      const img = document.createElement('img');
      img.alt = `${person.name} – Profilbild`;
      img.src = `public/team/${person.key}.jpg`;
      img.hidden = true;
      img.addEventListener('load', () => { img.hidden = false; });
      img.addEventListener('error', () => { img.remove(); });
      avatar.appendChild(img);
    });
  }

  function syncLanguageSwitch() {
    const switcher = $('#langSwitch');
    if (!switcher) return;
    const current = document.documentElement.lang === 'en' ? 'en' : 'de';
    $$('button[data-lang]', switcher).forEach(btn => {
      const active = btn.dataset.lang === current;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function apply() {
    addStyle();
    removeDuplicatePosterStrip();
    installProfileImages();
    syncLanguageSwitch();
  }

  apply();
  new MutationObserver(() => requestAnimationFrame(apply)).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  const rootObserver = new MutationObserver(() => requestAnimationFrame(apply));
  rootObserver.observe(document.body, { childList: true, subtree: true });
})();
