(function () {
  try {
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (e) { }

  const isFile = window.location.protocol === 'file:';
  const normPath = window.location.pathname.replace(/\\/g, '/');
  const isNestedFile = isFile && /\/(workout|nutrition|music-theory|software|law|contact)\/index\.html$/i.test(normPath);
  const isRootHome = isFile ? /(^|\/)index\.html$/i.test(normPath) && !isNestedFile : (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html'));
  const rootPrefix = isNestedFile ? '../' : '';

  const routes = isFile
    ? {
      home: rootPrefix + 'index.html',
      portfolio: isRootHome ? '#portfolio' : rootPrefix + 'index.html#portfolio',
      workout: rootPrefix + 'workout/index.html',
      nutrition: rootPrefix + 'nutrition/index.html',
      music: rootPrefix + 'music-theory/index.html',
      software: rootPrefix + 'software/index.html',
      law: rootPrefix + 'law/index.html',
      contact: rootPrefix + 'contact/index.html'
    }
    : {
      home: '/',
      portfolio: '/#portfolio',
      workout: '/workout/',
      nutrition: '/nutrition/',
      music: '/music-theory/',
      software: '/software/',
      law: '/law/',
      contact: '/contact/'
    };

  const navTranslations = {
    pt: {
      'nav.portfolio': 'Portfólio',
      'nav.personal': 'Pessoal',
      'nav.contact': 'Contato',
      'nav.workout': 'Treino',
      'nav.nutrition': 'Nutrição',
      'nav.music': 'Teoria Musical',
      'nav.software': 'Software',
      'nav.law': 'Direito Natural',
      'footer': 'Feito com 🧡 · © 2026 Thales Catão'
    },
    en: {
      'nav.portfolio': 'Portfolio',
      'nav.personal': 'Personal',
      'nav.contact': 'Contact',
      'nav.workout': 'Workout',
      'nav.nutrition': 'Nutrition',
      'nav.music': 'Music Theory',
      'nav.software': 'Software',
      'nav.law': 'Natural Law',
      'footer': 'Built with 🧡 · © 2026 Thales Catão'
    }
  };

  const navHtml = `
    <nav>
      <div class="nav-left">
        <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle theme" type="button">
          <i class="fa-solid fa-sun icon-sun"></i>
          <i class="fa-solid fa-circle-half-stroke icon-moon"></i>
        </button>
        <a class="nav-logo" href="${routes.home}">Thales Catão</a>
      </div>
      <ul class="nav-links" id="nav-links">
        <li><a href="${routes.portfolio}" data-k="nav.portfolio">Portfólio</a></li>
        <li class="nav-dropdown" id="nav-dropdown-item">
          <button id="nav-dropdown-button" type="button">
            <span data-k="nav.personal">Pessoal</span>
            <span class="nav-chevron">▾</span>
          </button>
          <div class="nav-dropdown-panel">
            <a class="nav-dropdown-link" href="${routes.workout}">🏋️ <span data-k="nav.workout">Treino</span></a>
            <a class="nav-dropdown-link" href="${routes.nutrition}">🥗 <span data-k="nav.nutrition">Nutrição</span></a>
            <a class="nav-dropdown-link" href="${routes.music}">🎵 <span data-k="nav.music">Teoria Musical</span></a>
            <div class="nav-more-group" id="nav-more-group">
              <div class="nav-more-menu" id="nav-more-menu">
                <a class="nav-dropdown-link" href="${routes.software}">💻 <span data-k="nav.software">Software</span></a>
                <a class="nav-dropdown-link" href="${routes.law}">⚖️ <span data-k="nav.law">Direito Natural</span></a>
              </div>
              <button class="nav-more-toggle" id="nav-more-toggle" type="button">
                <span class="nav-chevron">▾</span>
              </button>
            </div>
          </div>
        </li>
        <li><a href="${routes.contact}" data-k="nav.contact">Contato</a></li>
      </ul>
      <div class="nav-right">
        <div class="lang-switcher">
          <button class="lang-btn" id="btn-pt" onclick="setLang('pt')">PT</button>
          <button class="lang-btn" id="btn-en" onclick="setLang('en')">EN</button>
        </div>
        <button class="nav-mobile-toggle" id="nav-mobile-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>
  `;

  function closeMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const mobileBtn = document.getElementById('nav-mobile-toggle');
    navLinks?.classList.remove('open');
    mobileBtn?.classList.remove('active');
    mobileBtn?.setAttribute('aria-expanded', 'false');
    document.getElementById('nav-dropdown-item')?.classList.remove('open');
    document.getElementById('nav-more-group')?.classList.remove('open');
  }

  function setupNav() {
    const mount = document.getElementById('site-nav') || document.body.insertBefore(document.createElement('div'), document.body.firstChild);
    mount.id = 'site-nav';
    mount.innerHTML = navHtml;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.getElementById('structural-bg')) {
      const screenWidth = window.innerWidth || 1200;
      const scrollHeight = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0,
        window.innerHeight || 0,
        2500
      );

      let nodesHtml = '';
      const numNodes = 8;
      for (let i = 0; i < numNodes; i++) {
        const yMin = (i * scrollHeight) / numNodes;
        const yMax = ((i + 1) * scrollHeight) / numNodes;

        const x1 = Math.floor(Math.random() * (screenWidth - 80)) + 40;
        const y1 = Math.floor(Math.random() * (yMax - yMin)) + yMin;

        const x2 = Math.floor(Math.random() * (screenWidth - 80)) + 40;
        const y2 = Math.floor(Math.random() * (yMax - yMin)) + yMin;

        const x3 = Math.floor(Math.random() * (screenWidth - 80)) + 40;
        const y3 = Math.floor(Math.random() * (yMax - yMin)) + yMin;

        const path = `M${x1},${y1} L${x2},${y2} L${x3},${y3} Z`;
        const dur = Math.floor(Math.random() * 50) + 50;
        const r = (Math.random() * 1.0 + 1.5).toFixed(1);
        const opacity = (Math.random() * 0.17 + 0.18).toFixed(2);

        nodesHtml += `
          <circle cx="${x1}" cy="${y1}" r="${r}" fill="var(--accent)" opacity="${opacity}">
            ${prefersReducedMotion ? '' : `<animateMotion dur="${dur}s" repeatCount="indefinite" path="${path}" />`}
          </circle>
        `;
      }

      const bg = document.createElement('div');
      bg.id = 'structural-bg';
      bg.className = 'structural-bg';
      bg.innerHTML = `
        <div class="ambient-blob blob-orange"></div>
        <div class="ambient-blob blob-clay"></div>

        <svg class="structural-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="color-mix(in srgb, var(--muted) 50%, transparent)" />
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#dot-grid)" class="grid-rect" />
          
          ${nodesHtml}
        </svg>
      `;
      document.body.appendChild(bg);
    }

    document.querySelectorAll('[data-route]').forEach(link => {
      const route = link.getAttribute('data-route');
      if (routes[route]) link.setAttribute('href', routes[route]);
    });

    const ddItem = document.getElementById('nav-dropdown-item');
    const ddBtn = document.getElementById('nav-dropdown-button');
    const navCenter = document.getElementById('nav-links');
    const mobileBtn = document.getElementById('nav-mobile-toggle');
    const moreToggle = document.getElementById('nav-more-toggle');
    const moreContainer = document.getElementById('nav-more-group');
    const langSwitcher = document.querySelector('.lang-switcher');
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle?.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem('siteTheme', newTheme);
      } catch (e) { }
    });

    mobileBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = navCenter.classList.toggle('open');
      mobileBtn.classList.toggle('active', isOpen);
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    const toggleDropdown = e => {
      e.stopPropagation();
      e.preventDefault();
      ddItem.classList.toggle('open');
    };

    ddBtn?.addEventListener('click', toggleDropdown);
    ddBtn?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleDropdown(e);
      }
    });

    const toggleMore = e => {
      e.stopPropagation();
      e.preventDefault();
      moreContainer.classList.toggle('open');
    };

    moreToggle?.addEventListener('click', toggleMore);
    moreToggle?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleMore(e);
      }
    });

    document.addEventListener('click', e => {
      const clickedLang = langSwitcher?.contains(e.target);
      if (ddItem && !ddItem.contains(e.target) && !clickedLang) {
        ddItem.classList.remove('open');
        moreContainer?.classList.remove('open');
      }
      if (navCenter && !navCenter.contains(e.target) && mobileBtn && !mobileBtn.contains(e.target) && !clickedLang) {
        closeMobileMenu();
      }
    });

    document.querySelectorAll('#nav-links a:not(#nav-dropdown-button)').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.setLang = function (lang) {
      try { localStorage.setItem('siteLang', lang); } catch (e) { }
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

      document.getElementById('btn-pt')?.classList.toggle('active', lang === 'pt');
      document.getElementById('btn-en')?.classList.toggle('active', lang === 'en');
      document.querySelector('.lang-switcher')?.setAttribute('data-lang', lang);

      const pageT = window.pageTranslations || {};
      const merged = Object.assign({}, navTranslations[lang] || {}, pageT[lang] || {});

      document.querySelectorAll('[data-k]').forEach(el => {
        const key = el.getAttribute('data-k');
        if (merged[key]) {
          el.innerHTML = merged[key];
        }
      });

      if (typeof window.onLangChange === 'function') {
        window.onLangChange(lang);
      }
    };

    const savedLang = (() => {
      try { return localStorage.getItem('siteLang') || 'pt'; } catch (e) { return 'pt'; }
    })();
    window.setLang(savedLang);

    const revealEls = document.querySelectorAll('.reveal');
    if (prefersReducedMotion) {
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
    } else if (revealEls.length && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px 80px 0px' });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNav);
  } else {
    setupNav();
  }
})();