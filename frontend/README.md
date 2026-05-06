# RoterDorn — Frontend

Angular 19 Anwendung für das RoterDorn Medienportal.

## Voraussetzungen
- Node.js 18+ (inkl. npm)
- Angular CLI: `npm install -g @angular/cli`

## Starten

```powershell
npm install
ng serve
```

Browser öffnet sich automatisch auf **http://localhost:4200**
Die Seite lädt bei jeder Code-Änderung automatisch neu.

> Das Backend (Flask) muss parallel laufen — siehe [docs/SETUP.md](../docs/SETUP.md)

## Seiten

| Route | Komponente | Beschreibung |
|-------|------------|--------------|
| `/` | `ReviewListComponent` | Startseite mit Hero, Filter-Tabs, 12er-Grid + Load More |
| `/review/:id` | `ReviewDetailComponent` | Volltext, Rating-Balken, typ-spezifische Metadaten |
| `/search` | `SearchComponent` | Volltextsuche mit Top-Result und Ergebnis-Grid |
| `/add` | `AddReviewComponent` | Neue Rezension anlegen |

## Projektstruktur

```
src/app/
├── core/
│   ├── services/review.service.ts   ← HTTP-Client für alle API-Calls
│   └── routes.ts
├── features/
│   ├── review-list/                 ← Startseite
│   ├── review-detail/               ← Detailseite
│   ├── search/                      ← Suche
│   └── add-review/                  ← Formular
├── layout/header/                   ← Header mit Logo + Navigation
└── shared/
    ├── pipes/media-type.pipe.ts     ← 'buch' → 'Buch' etc.
    └── branding/                    ← Logo + Farbkonstanten
```

## Build

```powershell
ng build
```

Build-Artefakte landen in `dist/`.
