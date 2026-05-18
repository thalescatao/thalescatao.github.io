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
      // Determine screen dimensions dynamically
      const screenWidth = window.innerWidth || 1200;
      const scrollHeight = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0,
        window.innerHeight || 0,
        2500
      );

      // Generate 8 dynamic coordinate nodes with random triangular paths and subtle opacities
      let nodesHtml = '';
      const numNodes = 8;
      for (let i = 0; i < numNodes; i++) {
        const yMin = (i * scrollHeight) / numNodes;
        const yMax = ((i + 1) * scrollHeight) / numNodes;

        // Generate three random points for the triangular loop (spawns within browser margins)
        const x1 = Math.floor(Math.random() * (screenWidth - 80)) + 40;
        const y1 = Math.floor(Math.random() * (yMax - yMin)) + yMin;

        const x2 = Math.floor(Math.random() * (screenWidth - 80)) + 40;
        const y2 = Math.floor(Math.random() * (yMax - yMin)) + yMin;

        const x3 = Math.floor(Math.random() * (screenWidth - 80)) + 40;
        const y3 = Math.floor(Math.random() * (yMax - yMin)) + yMin;

        const path = `M${x1},${y1} L${x2},${y2} L${x3},${y3} Z`;
        const dur = Math.floor(Math.random() * 50) + 50; // 50s to 100s duration (extremely slow & fluid)
        const r = (Math.random() * 1.0 + 1.5).toFixed(1); // 1.5px to 2.5px radius
        const opacity = (Math.random() * 0.17 + 0.18).toFixed(2); // Subtle opacity: 0.18 to 0.35

        nodesHtml += `
          <circle r="${r}" fill="var(--accent)" opacity="${opacity}">
            <animateMotion dur="${dur}s" repeatCount="indefinite" path="${path}" />
          </circle>
        `;
      }

      const bg = document.createElement('div');
      bg.id = 'structural-bg';
      bg.className = 'structural-bg';
      bg.innerHTML = `
        <!-- Dynamic Ambient Blobs (Concept 1) -->
        <div class="ambient-blob blob-orange"></div>
        <div class="ambient-blob blob-clay"></div>

        <svg class="structural-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="var(--border)" />
            </pattern>
          </defs>
          
          <!-- Fill background with hardware-accelerated dot grid pattern -->
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
      }, { threshold: 0.1, rootMargin: '0px 0px 80px 0px' });

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