# RoterDorn — Modernisierung Medienportal

Schulprojekt: Migration der WordPress-basierten Website roterdorn.de
zu einem modernen Stack mit Angular, Flask und MySQL.

**Präsentation:** 21.05.2026  
**Team:** Monika, Tamara, Vanessa, Lewis

## Tech Stack
- **Frontend:** Angular 19 (TypeScript, Standalone Components, Signals)
- **Backend:** Python 3.11 / Flask 3 (REST API)
- **Datenbank:** MariaDB 10.4 via XAMPP

## Projektstruktur
```
roterdorn/
├── backend/        ← Flask REST API (app.py, routes/, db.py, config.py)
├── frontend/       ← Angular Anwendung (src/app/)
├── database/       ← SQL-Schema und Seed-Daten
├── mockups/        ← HTML/CSS-Mockups aller drei Seiten
└── docs/           ← Arbeitsplan, SETUP.md, API-Doku
```

## Setup
Siehe [docs/SETUP.md](docs/SETUP.md)

## Aufgabenverteilung
- **Monika:** Dokumentation / Präsentation
- **Tamara:** Frontend / UI
- **Vanessa:** Datenbank / Migration
- **Lewis:** Backend / API

