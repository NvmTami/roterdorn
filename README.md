# RoterDorn — Medienportal

Schulprojekt: Migration der WordPress-basierten Website roterdorn.de zu einem modernen Stack mit Angular, Flask und MySQL.

**Präsentation:** 21.05.2026

---

## Tech Stack

| Schicht | Technologie | Version |
|--------|-------------|---------|
| Frontend | Angular + SSR (Server-Side Rendering) | 21.x |
| Backend | Python Flask (REST API) | 3.x |
| Datenbank | MySQL | 8.0 |
| Laufzeit (Frontend) | Node.js | LTS (≥ 20) |
| Paketmanager | npm | 11.x |
| Containerisierung | Docker / Podman | — |

**Frontend-Bibliotheken:** `@angular/router`, `@angular/forms`, `rxjs`, `express` (SSR)  
**Backend-Bibliotheken:** `flask`, `flask-cors`, `mysql-connector-python`

---

## Projektstruktur

```
roterdorn/
├── frontend/           ← Angular 21 Anwendung (SSR)
│   ├── src/app/
│   │   ├── components/ ← Seiten-Komponenten (review-list, add-review, …)
│   │   ├── layout/     ← Strukturelle UI (header)
│   │   ├── shared/     ← Wiederverwendbare Teile (pipes, branding)
│   │   └── core/       ← Routing, Services
│   └── package.json
├── backend/            ← Flask REST API
│   ├── app.py          ← Einstiegspunkt
│   ├── config.py       ← Konfiguration via Umgebungsvariablen
│   ├── db.py           ← Datenbankverbindung
│   ├── routes/
│   │   ├── reviews.py  ← /api/reviews, /api/stats, /api/search
│   │   └── authors.py  ← /api/authors
│   └── requirements.txt
├── database/
│   ├── schema.sql      ← Tabellenstruktur
│   ├── dorn_db.sql     ← Exportierter Datenbestand
│   └── migrate.sql     ← Migrationsskripte
├── mockups/            ← UI-Mockups und UML-Diagramme
└── docker-compose.yml  ← MySQL-Container
```

---

## Voraussetzungen

- [Node.js](https://nodejs.org/) (LTS ≥ 20) inkl. npm
- [Python](https://www.python.org/) 3.11+
- MySQL 8.0 **oder** Docker / Podman

---

## Projekt starten

### 1. Datenbank

**Option A — Docker/Podman (empfohlen)**

```bash
docker compose up -d
```

Startet MySQL 8.0 auf Port **3307** mit Datenbank `roterdorn` und führt die SQL-Skripte automatisch aus.

**Option B — lokales MySQL**

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p roterdorn < database/dorn_db.sql
mysql -u root -p roterdorn < database/migrate.sql
```

> Reihenfolge beachten: `authors` → `reviews` → `*_details` (Fremdschlüssel)

---

### 2. Backend (Flask API)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

API läuft auf **http://localhost:5000**

**Umgebungsvariablen (optional, Defaults in Klammern):**

| Variable | Default | Beschreibung |
|----------|---------|--------------|
| `DB_HOST` | `localhost` | MySQL-Host |
| `DB_PORT` | `3307` | MySQL-Port |
| `DB_USER` | `roterdorn` | Datenbankbenutzer |
| `DB_PASSWORD` | `roterdorn` | Passwort |
| `DB_NAME` | `roterdorn` | Datenbankname |
| `PORT` | `5000` | API-Port |
| `FLASK_DEBUG` | `false` | Debug-Modus |
| `CORS_ORIGINS` | `http://localhost:4200` | Erlaubte CORS-Origins |

---

### 3. Frontend (Angular)

```bash
cd frontend
npm install
npm start
```

App läuft auf **http://localhost:4200** — aktualisiert sich bei jeder Code-Änderung automatisch.

Weitere Befehle:

```bash
npm run build    # Produktions-Build
npm test         # Tests via Vitest
```

---

## API-Endpunkte

Alle Endpunkte unter dem Präfix `/api`.

| Methode | Pfad | Beschreibung |
|---------|------|--------------|
| `GET` | `/api/reviews` | Reviews auflisten — optional `?type=buch\|film\|musik\|spiel`, `?limit=N`, `?page=N` |
| `GET` | `/api/reviews/<id>` | Einzelne Review inkl. typ-spezifischer Details |
| `POST` | `/api/reviews` | Review hinzufügen (`title`, `category`, `rating`, `comment`) |
| `GET` | `/api/stats` | Anzahl und Durchschnittsbewertung je Medientyp |
| `GET` | `/api/search?q=` | Volltextsuche (mind. 2 Zeichen) |
| `GET` | `/api/authors` | Autorenliste |

---

## Datenbankschema

```
authors          ← Autoren der Reviews
reviews          ← Zentrale Tabelle (media_type: buch|film|musik|spiel)
book_details     ← Buchspezifische Felder (ISBN, Seitenanzahl, …)
film_details     ← Filmspezifische Felder (Regisseur, Laufzeit, FSK, …)
music_details    ← Musikspezifische Felder (Künstler, Label, …)
game_details     ← Spielspezifische Felder (Entwickler, Platform, …)
```

`reviews.published_at IS NULL` bedeutet Entwurf — die API gibt nur veröffentlichte Reviews zurück.
