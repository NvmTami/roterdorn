# RoterDorn — Modernisierung Medienportal

Schulprojekt: Migration der WordPress-basierten Website roterdorn.de
zu einem modernen Stack mit Angular, Flask und MySQL.

**Präsentation:** 21.05.2026  
**Team:** Monika, Tamara, Vanessa, Lewis

## Tech Stack
- **Frontend:** Angular (TypeScript)
- **Backend:** Python Flask (REST API)
- **Datenbank:** MySQL

## Projektstruktur
```
roterdorn/
├── backend/        ← Flask REST API
├── frontend/       ← Angular Anwendung
├── database/       ← SQL-Schema und Migrationsskripte
└── docs/           ← Dokumentation und Präsentation
```

## Setup
Siehe `docs/SETUP.md`

## Aufgabenverteilung
- **[Name1]:** Backend / API
- **[Name2]:** Frontend / UI
- **[Name3]:** Datenbank / Migration
- **[Name4]:** Dokumentation / Präsentation


##  Frontend
installation:

To install Angular CLI on your local system, you need to `install Node.js`. Angular CLI uses Node and its associated package manager, npm, to install and run JavaScript tools outside the browser.

Download and install Node.js, which will include the npm CLI as well. Angular requires an active LTS or maintenance LTS version of Node.js. See Angular's version compatibility guide for more information.
https://nodejs.org/en/download

- **npm install -g @angular/cli**

Anwendung starten
Um den lokalen Entwicklungsserver zu starten, nutze:

Bash
- **ng serve --open**
Adresse: http://localhost:4200

Auto-Reload: Die Seite aktualisiert sich bei jeder Code-Änderung von selbst.

