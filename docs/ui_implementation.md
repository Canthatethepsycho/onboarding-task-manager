# 5.2 Implementierung der Benutzeroberfläche

Dieser Abschnitt dokumentiert die Umsetzung der Benutzeroberfläche (UI) der Onboarding‑Anwendung. Er richtet sich an Anwendungentwickler, die die Oberfläche verstehen, anpassen oder erweitern sollen. Enthalten sind Beschreibungen von Komponenten, Styling, Responsiveness, Accessibility, Corporate Design Umsetzung und Hinweise zum Erstellen von Screenshots für die Abschlussdokumentation.

---

## 1. Architektur der Benutzeroberfläche

Die UI‑Implementierung folgt einem komponentenbasierten Ansatz mit React (TSX). Die Ordnerstruktur im Frontend ist bewusst flach und leicht navigierbar:

```
src/
├─ pages/                # Page‑Level Komponenten (Routing Targets)
│  ├─ Home.tsx
│  ├─ login.tsx
│  ├─ Register.tsx
│  └─ Users.tsx
├─ components/           # Wiederverwendbare UI Komponenten
│  ├─ MainLayout.tsx
│  ├─ Navbar.tsx
│  ├─ Toast.tsx
│  └─ DotGridBackground.tsx
├─ utils/                # Utilities (API, Validation)
│  └─ authUtils.ts
└─ index.css / App.css    # Globale Styles
```

- Pages enthalten die Seitenspezifische Layout‑ und Business‑Logik.
- Components sind klein, rein visueller bzw. UI‑logischer Natur (Präsentationskomponenten).
- Utilities kapseln API‑Aufrufe, Token‑Handling und Validierung.

Diese Trennung hält Präsentationslogik und Geschäftslogik getrennt und erleichtert Tests sowie Wiederverwendung.

---

## 2. Implementationsdetails

### 2.1 Komponenten‑Design

- MainLayout.tsx: Wrapper für alle Seiten mit `Navbar` und `Footer`. Akzeptiert `children` und stellt das gemeinsame Layout sicher.
- Navbar.tsx: Navigationslinks. Implementiert bedingte Links (z. B. Login/Logout) abhängig vom Auth‑State.
- Toast.tsx: Einfache, zugängliche Notification‑Komponente. Zustand wird über Hook `useToast()` verwaltet.
- DotGridBackground.tsx: Dekorativer Hintergrund mit CSS/Canvas; hält sich visuell getrennt von Interaktionskomponenten.

Jede Komponente ist in TypeScript getypt (Props‑Schnittstelle), enthält kompakte Styles (meist CSS Klassen) und ist so geschrieben, dass sie unabhängig testbar ist.

### 2.2 Styling / CSS

- Styling erfolgt aktuell mit klassischen CSS‑Dateien (`src/index.css`, komponentenspezifische CSS Dateien). Kein CSS‑Framework im MVP.
- Konventionen:
  - Klassen‑Prefix: `.auth-`, `.users-`, `.nav-` für klare Namensräume.
  - Farbvariablen und Baseline‑Typographie sind in `:root` (index.css) definiert, z. B. `--color-primary`, `--color-accent`, `--font-base`.
  - Responsive Breakpoints werden als CSS Custom Properties dokumentiert und in Media Queries benutzt.

Beispiel (index.css):

```css
:root {
  --color-primary: #282c34;
  --color-accent: #3b82f6;
  --bg: #f0f2f5;
  --font-base: 'Inter', system-ui, sans-serif;
}

body {
  font-family: var(--font-base);
  background: var(--bg);
  color: #111;
}

@media (max-width: 768px) {
  .auth-container { padding: 16px; }
}
```

### 2.3 Responsiveness

- Das Layout verwendet flexible Container (Flexbox) und Media Queries für Breakpoints (mobile / tablet / desktop).
- Formulare skalieren auf schmale Viewports; Buttons und Input‑Felder sind mindestens 44px hoch für gute Bedienbarkeit.

### 2.4 Accessibility (a11y)

- Formulare haben `label` oder `aria-label` für jede Eingabe.
- Buttons und interaktive Elemente sind per Tastatur erreichbar (Focus‑Styles sichtbar).
- Toasts nutzen `role="alert"` für Screenreader.
- Farben erfüllen grundsätzlich Kontrastanforderungen (AA) — bitte vor Release mit Contrast‑Checker prüfen.

---

## 3. Umsetzung des Corporate Designs

Wenn ein Corporate Design (CD) vorhanden ist, wurde die Umsetzung nach folgenden Prinzipien geplant und teilweise umgesetzt:

### 3.1 Farbpalette

- Primärfarbe: `--color-primary` (Navbar, Footer)
- Akzentfarbe: `--color-accent` (Buttons, Links)
- Neutrale Hintergründe: `--bg`, `--surface` für Karten

Diese Variablen befinden sich in `index.css` und ermöglichen schnelles Anpassungen an CD‑Vorgaben.

### 3.2 Typographie

- Basisfont: System‑Fallback + Webfont (z. B. Inter). Font‑Stack in `:root` definiert.
- Headings und Body haben klare Skalierung (z. B. 16px base, h1 = 32px).

### 3.3 Komponenten‑Tokens

- Buttons, Inputs, Badges etc. verwenden wiederverwendbare CSS‑Klassen, die durch Variablen gesteuert werden.
- Beispiel: `btn`, `btn--primary`, `btn--secondary`.

### 3.4 Umsetzungsempfehlungen

- Centralize the tokens: Bei größeren CD‑Änderungen die Variablen in `index.css` anpassen.
- Erzeuge ein `design-tokens.json` wenn das Projekt wächst, um Tokens in Code/Design‑Tools zu teilen.

---

## 4. Screenshots (für Abschlussdokumentation)

Screenshots sind wichtig, um die UI in der Abschlussdokumentation zu belegen. Lege die Bilder ins Verzeichnis `docs/screenshots/` mit folgenden empfohlenen Dateinamen:

- `01_home.png` – Startseite / Hero
- `02_register.png` – Registrierungsformular (mit sichtbarem Toast beim Erfolg)
- `03_login.png` – Login Formular (Fehlermeldung sichtbar)
- `04_users.png` – Users Listing (nach Login)
- `05_onboarding_flow.png` – Beispiel Onboarding Schritt (falls vorhanden)

Empfehlungen für Aufnahmen:
- Auflösung: 1280×720 oder 1920×1080 (Desktop), zusätzlich 375×812 für Mobile‑Ansicht.
- Browser: Chrome/Edge/Firefox — Developer Tools → Responsive → wähle Gerät und mache Screenshot.
- Beschrifte Screenshots kurz und aussagekräftig.

### Beispiel Markdown‑Einbindung

Füge in deine Dokumentation die Screenshots so ein:

```markdown
![Home](/docs/screenshots/01_home.png)

![Register](/docs/screenshots/02_register.png)
```

### Hinweise zum Erstellen (manuell)

1. Starte Frontend: `npm run dev` → http://localhost:5173
2. Öffne die gewünschte Seite
3. Öffne DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
4. Wähle Auflösung → Rechtsklick auf die Seite → "Screenshot" oder verwende das Drei‑Punkte Menü → "Capture screenshot"
5. Speichere die Datei in `docs/screenshots/` mit oben vorgeschlagenen Namen

### Hinweise zum Erstellen (automatisiert)
Für automatisierte Screenshots für Tests/CI empfehle Tools wie Playwright oder Puppeteer. Beispiel (Playwright, lokal):

```bash
npx playwright open http://localhost:5173
# oder für automatisches capture
npx playwright screenshot http://localhost:5173 --output=docs/screenshots/01_home.png --width=1280 --height=720
```

(Playwright/Tools müssen bei Bedarf installiert werden.)

---

## 5. Beispiele: Code‑Snippets

### 5.1 Button Komponente (React + CSS)

```tsx
// src/components/Button.tsx
export default function Button({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return (
    <button className={`btn btn--${variant}`}>
      {children}
    </button>
  )
}
```

```css
/* index.css */
.btn { padding: 10px 16px; border-radius: 8px; font-weight: 600; }
.btn--primary { background: var(--color-accent); color: white; }
.btn--secondary { background: transparent; border: 1px solid #ccc; color: #111; }
```

### 5.2 Formular mit Validation (Register.tsx Auszug)

```tsx
<input type="email" value={email} onChange={e => setEmail(e.target.value)} aria-label="E-Mail" required />
{!validateEmail(email) && <p className="error">Bitte gültige E‑Mail eingeben</p>}
```

---

## 6. Wartung & Erweiterung

- Zentralisiere Designtokens (Farben, Abstände, Typo) in einer Datei.
- Ersetze CSS durch ein Utility‑Framework (Tailwind) oder CSS‑in‑JS wenn das Projekt wächst.
- Erweitere `useToast()` zu einem globalen Provider, wenn mehrere Seiten Toasts nutzen sollen.
- Dokumentiere Komponenten‑API (Props) mit kurzen Beispielen.

---

## 7. Checkliste für die Dokumentation (Screenshots & CD)

- [ ] Screenshots in `docs/screenshots/` abgelegt und verlinkt
- [ ] Farbvariablen mit Corporate Design abgestimmt
- [ ] Accessibility Checks (Kontrast, Keyboard Nav) durchgeführt
- [ ] Breakpoint Screenshots (Desktop, Mobile) vorhanden
- [ ] Komponenten‑Dokumentation vorhanden (Props, Beispiele)

---

Wenn du möchtest, kann ich jetzt:
- Die Markdown‑Datei an einer bestimmten Stelle in `docs/entwurf.md` einfügen, oder
- Beispiel‑Screenshots‑Platzhalter (README + .gitkeep) im Ordner `docs/screenshots/` anlegen und Einträge in `entwurf.md` automatisch verlinken.

Welche Option bevorzugst du?