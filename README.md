# 0flufFont 🌐

> A minimalist, high-performance font override extension for Chromium browsers. No bloat, no tracking, pure utility.
---
## Key Features
- **Dynamic Font Switching:** Persistently change the typeface across the entire web.
- **Site Exclusion:** One-click disable for complex sites (like Gemini or specialized dashboards) to prevent UI breakage.
- **Zero Configuration:** Ready to use out of the box with curated font categories.
- **Privacy First:** Uses local storage only. No external telemetry.
---
## Installation
1. Download this repository.
2. Open your browser and navigate to `chrome://extensions`.
3. Enable **Developer Mode** using the toggle in the top-right corner.
4. Click the **Load Unpacked** button.
5. **CRITICAL STEP:** Navigate into the project folder and select the **specific sub-folder** that contains the `manifest.json` file. 
   > *Note: Do not select the top-level repository folder if it contains extra documentation or wrappers; the browser needs the folder where the code lives.*
---
## How to Update
If a new version is released:
1. Download/Pull the latest code into the same folder on your computer.
2. Go back to `chrome://extensions`.
3. Find the **0flufFont** card and click the **Refresh (circular arrow)** icon.
4. The extension will reload with the latest logic immediately.
---
## Technical Details
- **Architecture:** Manifest V3
- **Injection:** Real-time CSS variable manipulation with `document_start` execution.
- **Dependencies:** None.

## License
[MIT](LICENSE)
