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

  const navCss = `
    nav{
      position:fixed;top:16px;left:50%;transform:translateX(-50%);
      width:min(820px,calc(100% - 32px));
      padding:0 22px;height:52px;display:flex;align-items:center;justify-content:space-between;
      z-index:100;
    }
    nav::before{
      content:'';position:absolute;inset:0;
      background:var(--nav-bg);
      backdrop-filter:blur(22px) saturate(1.7);-webkit-backdrop-filter:blur(22px) saturate(1.7);
      border:0.5px solid var(--border);border-radius:999px;
      box-shadow:var(--shadow);z-index:-1;
    }
    .nav-logo{font-family:'Instrument Serif',serif;font-size:17px;color:var(--text);text-decoration:none;letter-spacing:-0.02em;white-space:nowrap;}
    .nav-center{display:flex;gap:2px;list-style:none;align-items:center;}
    .nav-center>li>a{text-decoration:none;font-size:13px;color:var(--muted);padding:6px 12px;border-radius:999px;transition:background .15s,color .15s;cursor:pointer;display:flex;align-items:center;gap:4px;}
    .nav-center>li>a:hover{background:var(--surface);color:var(--text);}
    .has-dropdown{position:relative;}
    .chevron{font-size:9px;transition:transform .2s;display:inline-block;margin-top:1px;}
    .has-dropdown.open > #dd-btn .chevron{transform:rotate(180deg);}
    .dropdown-menu{
      position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%);
      background:var(--nav-bg);backdrop-filter:blur(22px) saturate(1.7);-webkit-backdrop-filter:blur(22px) saturate(1.7);
      border:0.5px solid var(--border);border-radius:20px;padding:12px 12px 0 12px;
      min-width:190px;display:none;flex-direction:column;gap:6px;box-shadow:var(--shadow);
    }
    .has-dropdown.open .dropdown-menu{display:flex;}
    .dropdown-menu a{padding:12px 16px;border-radius:12px;font-size:14px;color:var(--muted);text-decoration:none;transition:background .15s,color .15s;display:flex;align-items:center;gap:12px;white-space:nowrap;}
    .dropdown-menu a:hover{background:var(--surface);color:var(--text);}
    .more-container{display:flex;flex-direction:column;}
    .more-menu{display:none;flex-direction:column;gap:6px;margin-bottom:6px;}
    .more-container.open .more-menu{display:flex;}
    .more-toggle{
      display:flex;justify-content:center;align-items:center;
      margin:0 -12px;height:24px;cursor:pointer;
      border-bottom-left-radius:20px;border-bottom-right-radius:20px;
      color:var(--muted);transition:background .15s,color .15s;
    }
    .more-toggle:hover{background:var(--surface);color:var(--text);}
    .more-container.open .more-toggle .chevron{transform:rotate(180deg);}
    .lang-switcher{display:flex;background:var(--surface);padding:2px;border-radius:999px;}
    .lang-btn{border:none;background:none;font-size:11px;font-weight:600;padding:4px 10px;border-radius:999px;cursor:pointer;color:var(--muted);transition:all .2s;}
    .lang-btn.active{background:var(--card-bg);color:var(--text);box-shadow:0 2px 8px rgba(0,0,0,0.05);}
    .nav-right{display:flex;align-items:center;gap:8px;}
    .mobile-menu-btn{display:none;position:relative;width:28px;height:28px;background:none;border:none;color:var(--text);cursor:pointer;padding:0;}
    .mobile-menu-btn span{position:absolute;left:5px;width:18px;height:1.5px;background:currentColor;border-radius:999px;transition:transform .22s ease,opacity .16s ease,top .22s ease;}
    .mobile-menu-btn span:nth-child(1){top:8px;}
    .mobile-menu-btn span:nth-child(2){top:13px;}
    .mobile-menu-btn span:nth-child(3){top:18px;}
    .mobile-menu-btn.active span:nth-child(1){top:13px;transform:rotate(45deg);}
    .mobile-menu-btn.active span:nth-child(2){opacity:0;transform:scaleX(0);}
    .mobile-menu-btn.active span:nth-child(3){top:13px;transform:rotate(-45deg);}
    @media(max-width:650px){
      .mobile-menu-btn{display:block;}
      .nav-center{
        display:none;
        position:absolute;top:calc(100% + 12px);left:auto;right:0;
        width:max-content;min-width:190px;max-width:calc(100vw - 32px);
        background:var(--nav-bg);backdrop-filter:blur(22px) saturate(1.7);-webkit-backdrop-filter:blur(22px) saturate(1.7);
        border:0.5px solid var(--border);border-radius:20px;padding:12px;
        flex-direction:column;align-items:stretch;box-shadow:var(--shadow);
      }
      .nav-center.open{display:flex;}
      .nav-center>li{width:100%;}
      .nav-center>li>a{width:100%;justify-content:space-between;padding:12px 16px;font-size:14px;border-radius:12px;}
      .dropdown-menu{position:relative;top:0;left:0;transform:none;align-self:stretch;width:100%;max-width:100%;box-shadow:none;border:none;background:transparent;padding:4px 0 0;display:none;min-width:0;gap:6px;align-items:stretch;}
      .dropdown-menu a{width:100%;justify-content:flex-start;}
      .has-dropdown.open .dropdown-menu{display:flex;}
      .more-container{width:100%;}
      .more-toggle{width:100%;margin:0;border-radius:0 0 12px 12px;height:24px;align-self:stretch;}
    }
  `;

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
    if (!document.getElementById('site-nav-style')) {
      const style = document.createElement('style');
      style.id = 'site-nav-style';
      style.textContent = navCss;
      document.head.appendChild(style);
    }

    const mount = document.getElementById('site-nav') || document.body.insertBefore(document.createElement('div'), document.body.firstChild);
    mount.id = 'site-nav';
    mount.innerHTML = navHtml;

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

    const savedLang = (() => {
      try { return localStorage.getItem('siteLang') || 'pt'; } catch (e) { return 'pt'; }
    })();

    if (typeof window.setLang === 'function') {
      window.setLang(savedLang);
    } else {
      document.getElementById('btn-pt')?.classList.toggle('active', savedLang === 'pt');
      document.getElementById('btn-en')?.classList.toggle('active', savedLang === 'en');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNav);
  } else {
    setupNav();
  }
})();