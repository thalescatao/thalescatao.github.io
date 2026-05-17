(function () {
  const isFile = window.location.protocol === 'file:';
  const isNestedFile = isFile && /\/(workout|nutrition|music-theory|software|law|contact)\/index\.html$/i.test(window.location.pathname.replace(/\\/g, '/'));
  const rootPrefix = isNestedFile ? '../' : '';

  const routes = isFile
    ? {
      home: rootPrefix + 'index.html',
      portfolio: isNestedFile ? rootPrefix + 'index.html#portfolio' : '#portfolio',
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

  // Shared navigation translations (so pages don't need to repeat these)
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
      <a class="nav-logo" href="${routes.home}">Thales Catão</a>
      <ul class="nav-center" id="nav-center">
        <li><a href="${routes.portfolio}" data-k="nav.portfolio">Portfólio</a></li>
        <li class="has-dropdown" id="dd-item">
          <a id="dd-btn" tabindex="0">
            <span data-k="nav.personal">Pessoal</span>
            <span class="chevron">▾</span>
          </a>
          <div class="dropdown-menu">
            <a href="${routes.workout}">🏋️ <span data-k="nav.workout">Treino</span></a>
            <a href="${routes.nutrition}">🥗 <span data-k="nav.nutrition">Nutrição</span></a>
            <a href="${routes.music}">🎵 <span data-k="nav.music">Teoria Musical</span></a>
            <div class="more-container" id="more-container">
              <div class="more-menu" id="more-menu">
                <a href="${routes.software}">💻 <span data-k="nav.software">Software</span></a>
                <a href="${routes.law}">⚖️ <span data-k="nav.law">Direito Natural</span></a>
              </div>
              <div class="more-toggle" id="more-toggle" tabindex="0">
                <span class="chevron">▾</span>
              </div>
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
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>
  `;

  function closeMobileMenu() {
    const navCenter = document.getElementById('nav-center');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    navCenter?.classList.remove('open');
    mobileBtn?.classList.remove('active');
    mobileBtn?.setAttribute('aria-expanded', 'false');
  }

  function setupNav() {
    const mount = document.getElementById('site-nav') || document.body.insertBefore(document.createElement('div'), document.body.firstChild);
    mount.id = 'site-nav';
    mount.innerHTML = navHtml;

    // Inject structural grid background once globally
    if (!document.getElementById('structural-bg')) {
      const bg = document.createElement('div');
      bg.id = 'structural-bg';
      bg.className = 'structural-bg';
      bg.innerHTML = `
        <!-- Dynamic Ambient Blobs (Concept 1) -->
        <div class="ambient-blob blob-orange"></div>
        <div class="ambient-blob blob-clay"></div>

        <svg class="structural-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Isometric guidelines -->
          <path d="M-200,200 L1600,1100 M400,-200 L1800,500" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="2,8" />
          
          <!-- Dynamic coordinate node 1 (Top Left) -->
          <circle r="2.5" fill="var(--accent)" opacity="0.6">
            <animateMotion dur="50s" repeatCount="indefinite" path="M100,150 L500,350 L200,450 Z" />
          </circle>
          
          <!-- Dynamic coordinate node 2 (Top Right) -->
          <circle r="2" fill="var(--accent)" opacity="0.4">
            <animateMotion dur="75s" repeatCount="indefinite" path="M850,120 L550,420 L750,300 Z" />
          </circle>
          
          <!-- Dynamic coordinate node 3 (Upper Middle) -->
          <circle r="2" fill="var(--accent)" opacity="0.55">
            <animateMotion dur="65s" repeatCount="indefinite" path="M200,600 L800,850 L350,950 Z" />
          </circle>
          
          <!-- Dynamic coordinate node 4 (Middle) -->
          <circle r="2.5" fill="var(--accent)" opacity="0.5">
            <animateMotion dur="90s" repeatCount="indefinite" path="M750,1100 L950,1400 L500,1300 Z" />
          </circle>
          
          <!-- Dynamic coordinate node 5 (Lower Middle) -->
          <circle r="2" fill="var(--accent)" opacity="0.45">
            <animateMotion dur="70s" repeatCount="indefinite" path="M150,1550 L450,1850 L300,1700 Z" />
          </circle>
          
          <!-- Dynamic coordinate node 6 (Lower Section) -->
          <circle r="2.5" fill="var(--accent)" opacity="0.5">
            <animateMotion dur="85s" repeatCount="indefinite" path="M800,2000 L550,2300 L850,2200 Z" />
          </circle>
          
          <!-- Dynamic coordinate node 7 (Bottom Left) -->
          <circle r="2" fill="var(--accent)" opacity="0.55">
            <animateMotion dur="80s" repeatCount="indefinite" path="M150,2500 L500,2800 L250,2700 Z" />
          </circle>
          
          <!-- Dynamic coordinate node 8 (Bottom Right) -->
          <circle r="2.5" fill="var(--accent)" opacity="0.4">
            <animateMotion dur="100s" repeatCount="indefinite" path="M750,2900 L900,3200 L650,3100 Z" />
          </circle>
        </svg>
      `;
      document.body.appendChild(bg);
    }

    document.querySelectorAll('[data-route]').forEach(link => {
      const route = link.getAttribute('data-route');
      if (routes[route]) link.setAttribute('href', routes[route]);
    });

    const ddItem = document.getElementById('dd-item');
    const ddBtn = document.getElementById('dd-btn');
    const navCenter = document.getElementById('nav-center');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const moreToggle = document.getElementById('more-toggle');
    const moreContainer = document.getElementById('more-container');

    mobileBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = navCenter.classList.toggle('open');
      mobileBtn.classList.toggle('active', isOpen);
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    ddBtn?.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      ddItem.classList.toggle('open');
    });

    moreToggle?.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      moreContainer.classList.toggle('open');
    });

    document.addEventListener('click', e => {
      if (ddItem && !ddItem.contains(e.target)) {
        ddItem.classList.remove('open');
        moreContainer?.classList.remove('open');
      }
      if (navCenter && !navCenter.contains(e.target) && mobileBtn && !mobileBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Fix: Added :not(#dd-btn) to prevent the dropdown button from closing the mobile menu
    document.querySelectorAll('#nav-center a:not(#dd-btn)').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Global setLang — merges nav translations with page-specific ones
    window.setLang = function (lang) {
      try { localStorage.setItem('siteLang', lang); } catch (e) { }
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

      document.getElementById('btn-pt')?.classList.toggle('active', lang === 'pt');
      document.getElementById('btn-en')?.classList.toggle('active', lang === 'en');

      // Merge nav translations with page-specific translations
      const pageT = window.pageTranslations || {};
      const merged = Object.assign({}, navTranslations[lang] || {}, pageT[lang] || {});

      document.querySelectorAll('[data-k]').forEach(el => {
        const key = el.getAttribute('data-k');
        if (merged[key]) {
          el.innerHTML = merged[key];
        }
      });

      // Call page-specific handler if defined (e.g. contact page's reveal logic)
      if (typeof window.onLangChange === 'function') {
        window.onLangChange(lang);
      }
    };

    const savedLang = (() => {
      try { return localStorage.getItem('siteLang') || 'pt'; } catch (e) { return 'pt'; }
    })();
    window.setLang(savedLang);

    // ── Scroll Reveal (IntersectionObserver) ──
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      // Fallback: show everything if IntersectionObserver is not supported
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNav);
  } else {
    setupNav();
  }
})();