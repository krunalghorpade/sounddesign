# Music Producer Gymkhana 🎧

**Kratex™** presents the **Music Producer Gymkhana** – a curated collection of premium web‑based tools for music producers, sound designers, and creative technologists.  The project lives in a single, self‑contained folder that can be opened directly in a browser (no server required) and is ready to be hosted on GitHub Pages.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Demo](#demo)
- [Installation & Usage](#installation--usage)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Customization & Theming](#customization--theming)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview
The **Music Producer Gymkhana** is a lightweight web suite that provides daily inspiration, practical tips, and interactive utilities for music creation:
- **Knowledge Flash Cards** – Daily wisdom extracted from classic music production books, with random and sequential navigation.
- **Sound Design Coach** (placeholder for future expansion) – A structured 100‑day challenge to master synthesis and effects.
- **About Kratex** – A stylish modal that introduces the creator and showcases a hero image.
- **Theme Switcher** – Light/Dark mode persisted via `localStorage`.

All tools share a common design language based on the premium CSS variables defined in `style.css`.

---

## Features
- **Responsive UI** – Works on desktop and mobile with graceful degradation.
- **Dynamic Card Rendering** – Cards are loaded from `flashcards.json` with a fallback dataset for offline usage.
- **Seeded Daily Card** – Guarantees the same “Daily Wisdom” for a given date across all users.
- **Theme Persistence** – Light/Dark mode saved in `localStorage` (`kratexTheme`).
- **Clean, modular code** – Separate HTML, CSS, and JavaScript files for each app.
- **No external dependencies** – Apart from a single optional `html2canvas` script for image export (can be removed).

---

## Demo
Open the project locally by opening `index.html` in a browser.  If you host the repository on GitHub Pages, the root URL will automatically serve the landing page.

---

## Installation & Usage
1. **Clone or download the repository**
   ```bash
   git clone https://github.com/your‑username/music‑producer‑gymkhana.git
   cd music‑producer‑gymkhana
   ```
2. **Open the landing page**
   - Double‑click `sounddesign/index.html` (or open it via `file://` in your browser).
   - The site works without a server; all assets are relative paths.
3. **Navigate to tools**
   - Click any tool card (e.g., *Knowledge Flash Cards*) to launch the app.
   - Use the navigation arrows or the **Random** button to explore cards.
4. **Theme switching**
   - Toggle the switch in the top‑right corner; the choice is saved for future visits.

> **Tip:** For a production‑ready deployment, push the repository to GitHub and enable GitHub Pages on the `main` branch.

---

## Project Structure
```
sounddesign/
├── index.html            # Landing page – lists all tools
├── style.css             # Global design tokens & utilities
├── about.html            # About Kratex modal content
├── apps/
│   └── flash-cards/
│       ├── index.html    # Flash‑cards UI
│       ├── script.js     # Core logic (rendering, navigation)
│       ├── flashcards.json # Card data (fallback data embedded in script)
│       └── ... (future apps)
└── README.md            # ← this file
```

---

## Technology Stack
- **HTML5** – Semantic markup and modular components.
- **CSS3** – Custom properties (`--color-primary`, `--radius-l`, etc.) for a premium look; dark‑mode support.
- **Vanilla JavaScript (ES6+)** – No framework; uses modern APIs (`fetch`, `localStorage`).
- **Optional**: `html2canvas` for exporting cards as images.

---

## Customization & Theming
All visual aspects are driven by CSS variables defined at the `:root` level in `style.css`.  To adjust the look:
1. Edit the variable values (colors, radii, shadows).
2. Add new themes by extending the `[data‑theme="dark"]` block.
3. The theme toggle automatically reads/writes `kratexTheme` to `localStorage`.

---

## Contributing
Contributions are welcome!  Feel free to:
- Add new tools (e.g., **Frequency Trainer**, **Chord Progressor**).
- Improve the UI/UX or fix visual bugs.
- Extend the flash‑card dataset with more books.

**How to contribute:**
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature‑awesome‑tool`).
3. Commit your changes and push.
4. Open a Pull Request describing the changes.

Please follow the existing code style (indentation, variable naming) and keep the design consistent with the premium aesthetic.

---

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

*Built with ❤️ by **Kratex™** – empowering music creators through elegant web tools.*
