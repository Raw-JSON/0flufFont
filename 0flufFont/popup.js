const FONT_DATA = {
  "System": ["system-ui", "Arial", "Segoe UI", "Roboto"],
  "Reading": ["Inter", "Lexend", "IBM Plex Sans", "Source Sans 3"],
  "Coding": ["JetBrains Mono", "Fira Code", "Cascadia Code", "Iosevka"],
  "Unique": ["Comic Neue", "VT323", "Orbitron", "Press Start 2P"]
};

document.addEventListener('DOMContentLoaded', async () => {
  const selector = document.getElementById('fontSelect');
  const toggle = document.getElementById('excludeToggle');

  // 1. Setup Dropdown
  for (const [category, fonts] of Object.entries(FONT_DATA)) {
    const group = document.createElement('optgroup');
    group.label = category;
    fonts.forEach(f => {
      const opt = document.createElement('option');
      opt.value = opt.textContent = f;
      group.appendChild(opt);
    });
    selector.appendChild(group);
  }

  // 2. Identify Current Site
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return;
  const domain = new URL(tab.url).hostname;

  // 3. Load Saved State
  chrome.storage.local.get(['activeFont', 'excludedSites'], (data) => {
    if (data.activeFont) selector.value = data.activeFont;
    
    const blacklist = data.excludedSites || [];
    toggle.checked = blacklist.includes(domain);
  });

  // 4. Handle Font Selection
  selector.addEventListener('change', () => {
    chrome.storage.local.set({ activeFont: selector.value });
  });

  // 5. Handle Exclusion Toggle
  toggle.addEventListener('change', () => {
    chrome.storage.local.get(['excludedSites'], (data) => {
      let list = data.excludedSites || [];
      if (toggle.checked) {
        if (!list.includes(domain)) list.push(domain);
      } else {
        list = list.filter(d => d !== domain);
      }
      chrome.storage.local.set({ excludedSites: list });
    });
  });
});