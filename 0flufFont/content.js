(() => {
  const GOOGLE_FONTS = ["Inter", "Lexend", "IBM Plex Sans", "Source Sans 3", "JetBrains Mono", "Fira Code", "Cascadia Code", "Iosevka", "Comic Neue", "VT323", "Orbitron", "Press Start 2P"];
  const DOMAIN = window.location.hostname;
  
  const STYLE_ID = '0fluf-engine';
  const LINK_ID = '0fluf-google';

  function update() {
    chrome.storage.local.get(['activeFont', 'excludedSites'], (data) => {
      const isExcluded = (data.excludedSites || []).includes(DOMAIN);
      if (isExcluded || !data.activeFont) {
        cleanup();
        return;
      }
      apply(data.activeFont);
    });
  }

  function cleanup() {
    document.getElementById(STYLE_ID)?.remove();
    document.getElementById(LINK_ID)?.remove();
  }

  function apply(font) {
    cleanup();

    if (GOOGLE_FONTS.includes(font)) {
      const link = document.createElement('link');
      link.id = LINK_ID;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
      document.head?.appendChild(link);
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    
    style.textContent = `
      /* 1. Global text override - carefully avoiding potential icon containers */
      body, p, li, td, th, h1, h2, h3, h4, h5, h6, 
      input, textarea, article, section, blockquote, strong, em, b {
        font-family: "${font}", sans-serif !important;
      }

      /* 2. Target divs and spans ONLY if they are likely pure text */
      div:not([class*="icon"]):not([class*="symbol"]):not([class*="material"]):not([role="img"]):not([aria-hidden="true"]),
      span:not([class*="icon"]):not([class*="symbol"]):not([class*="material"]):not([role="img"]):not([aria-hidden="true"]) {
        font-family: "${font}", sans-serif !important;
      }

      /* 3. GEMINI ICON SAVER - This is the critical fix for 'send', 'mic', and 'plus' */
      /* We explicitly tell the browser: if an element looks like an icon font, 
         NEVER let 0flufFont touch its font-family. */
      [class*="symbols"],
      [class*="icon"],
      [class*="material"],
      .google-symbols,
      mat-icon,
      i, 
      svg, 
      svg *,
      button span,
      [role="img"],
      [aria-hidden="true"],
      [data-icon] {
        font-family: inherit !important;
        font-feature-settings: "liga" 1 !important; /* Forces icons to stay icons */
        font-variant-ligatures: disk !important;
        text-transform: none !important;
      }

      /* 4. Protection for specific Gemini elements that use ligatures */
      .material-symbols-outlined,
      .material-symbols-rounded,
      .material-symbols-sharp {
        font-family: 'Material Symbols Outlined', 'Material Symbols Rounded', 'Material Symbols Sharp' !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  chrome.storage.onChanged.addListener(update);
  update();
})();