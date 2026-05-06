# Schritt 1

```
Original-Website analysiert: roterdorn.de
```

### Seitenstruktur:
- Startseite: Navigation → "Neues" → je ein Abschnitt pro Medientyp → Sidebar → Footer
- Detailseite: Titel + Datum + Autor → Cover + Fließtext → Autor-Bio → Kommentare → Sidebar

### Erhalten:
- arbschema: Schwarz / Weiß / Rot
- Weißes SVG-Logo als Asset übernehmen
- Karten-Layout: Cover + Typ-Badge + Titel + Datum + Autor
- Getrennte Sektionen pro Medientyp auf der Startseite

### Weglassen:
- Sidebar (überladen, kein Mehrwert)
- Kommentarfunktion (zu aufwendig)
- Tiefe Kategorien-Taxonomie (Belletristik, Comic etc.)

### MVP — genau 3 Seiten:

- `/` — Startseite mit Filter + Karten-Grid
- `/reviews/:id` — Detailseite mit Metadaten
- `/search?q=...` — Suchergebnisse

### Bewusste Verbesserung gegenüber Original:
- Rating sichtbar auf den Karten einbauen (im Original nirgendwo angezeigt) → guter Präsentationspunkt

---

# Schritt 2

```
MVP brutal definiert: genau 3 Seiten
```

- `/` — Startseite mit Filter-Buttons (Alle / Bücher / Filme / Musik / Spiele) und Karten-Grid
- `/reviews/:id` — Detailseite mit Cover, Volltext, typ-spezifischen Metadaten
- `/search?q=...` — Suchergebnisse mit gleichen Karten wie Startseite

### Explizit gestrichen:
- Kommentare, Registrierung, Social-Media-Workflow, KI-SEO
- Sidebar, Pagination, tiefe Kategorien-Taxonomie
- Tags-Tabellen (als `Phase 2` auskommentiert, nicht gelöscht)

### Schema-Cleanup durchgeführt:
- `published BOOLEAN` entfernt → nur noch `published_at NULL` als Source-of-Truth
- `tracklist JSON` aus `music_details` entfernt
- Tags-Tabellen auskommentiert

### Daten-Strategie: Option B (Hand-geschriebene Seed-Daten)
- 20 Einträge geplant: 5 pro Medientyp
- HTML im `content`-Feld bleibt erhalten → Frontend mit `[innerHTML]` + `DomSanitizer`
- Apostrophe in SQL-Strings müssen verdoppelt werden (`'` → `''`)

### Geliefert: `dorn_db_new.sql`
- 3 Autoren (Marcus Pohlmann, Joanna Müller-Lenz, roterdorn)
- 27 vollständige Reviews aus dem Original roterdorn.de
- Cover-URLs: Live-Links auf roterdorn.de/wp-content/uploads
- Ratings vergeben (Skala 1–5, ×2 = /10 im Frontend) basierend auf Rezensions-Tenor
- Schema + Seed-Daten + Ratings in einer einzigen Datei
- Import: `mysql --default-character-set=utf8mb4 -u root roterdorn -e "SOURCE database/dorn_db_new.sql"`

### Bewusste Verbesserung gegenüber Original:
- Rating-Feld sichtbar auf jeder Karte (im WP-Original gar nicht angezeigt)

---

*Aktualisierter Plan bis zur Präsentation am 21.05. — Stand: 06.05.2026*

---

# Schritt 3

```
Wireframes / Mockups erstellt ✅
```

### Erledigt:
- Statt Papier-Wireframes wurden vollständige HTML/CSS-Mockups für alle 3 Seiten gebaut.
- Dateien: `mockups/roterdorn_homepage_mockup.html`, `roterdorn_review_detail_book_mockup.html`, `roterdorn_search_mockup.html`
- Design-Sprache festgelegt: Schwarz/Rot/Weiß, CSS Custom Properties, Card-Grid, Filter-Tabs.

---

# Schritt 4

```
API-Vertrag definiert und implementiert ✅
```

### Implementierte Endpoints:
- `GET /api/reviews?type=&limit=` → `{ data: Review[], count: number }`
- `GET /api/reviews/<id>` → Review-Objekt inkl. typ-spezifischer Details
- `POST /api/reviews` → `{ message, id }`

> [!WARNING]
> **Noch offen:**
> - `docs/api.md` mit exakter Dokumentation der Request/Response-Shapes schreiben (für die Projektdokumentation wichtig).

---

# Schritt 5

```
Git-Workflow eingerichtet 🔄
```

### Erledigt:
- Git läuft, `README.md` im Root vorhanden, Commits werden nach Conventional-Commit-Schema gemacht.

> [!WARNING]
> **Noch offen:**
> - `docs/SETUP.md` erstellen (lokale Dev-Umgebung von Null aufsetzen: MySQL, Python venv, `ng serve`)
> - Teamnamen im Root-README eintragen (aktuell noch `[Name1]`–`[Name4]`)

---

# Schritt 6

```
Frontend-Grundgerüst aufgesetzt ✅
```

### Erledigt:
- Routing: `/` (ReviewList), `/review/:id` (ReviewDetail), `/search` (Search), `/add` (AddReview)
- Globales Styling mit CSS Custom Properties (`--accent`, `--bg-base`, `--surface` etc.)
- Header-Komponente mit SVG-Logo und Navigation
- `ReviewService` mit `HttpClient` für alle API-Calls vorbereitet

---

# Schritt 7

```
Alle drei Seiten aus Mockups überführt ✅
```

### Erledigt:
- Alle 3 Seiten 1:1 aus den Mockups in Angular-Komponenten überführt.
  - `/` — Startseite mit Hero-Card, Filter-Tabs, 4-spaltigem Review-Grid, Pagination-Hint
  - `/review/:id` — Detailseite mit 2-Spalten-Layout, Rating-Balken, Metadaten-Liste, Related-Grid
  - `/search` — Suchseite mit Input, Filter-Pills, Top-Result, Ergebnis-Grid

> [!WARNING]
> **Noch offen:**
> - Laufen aktuell noch mit **Hardcode-Mock-Daten** im Component — echte API-Anbindung folgt in Schritt 9.

---

# Schritt 8

```
Backend gegen die DB testen ✅
```

### Erledigt:
- MariaDB via XAMPP lokal eingerichtet, `dorn_db_new.sql` eingespielt.
- Alle Endpoints getestet und verifiziert:
  - `GET /api/reviews` → 27 Reviews mit korrekten Umlauten
  - `GET /api/reviews/<id>` → Detaildaten inkl. typ-spezifischer Join-Felder
  - `GET /api/stats` → Anzahl + Durchschnittsbewertung pro Medientyp
- UTF-8/Umlaut-Problem gelöst: Import mit `--default-character-set=utf8mb4`
- Backend läuft auf `http://localhost:5000`

---

# Schritt 9

```
Frontend an Backend anschließen ✅
```

### Erledigt:
- `ReviewService` mit `HttpClient` vollständig implementiert (`getReviews()`, `getReview(id)`, `search()`).
- `ReviewListComponent`: lädt echte Daten via API, signals-basiert (`reviews`, `loading`, `error`).
- `ReviewDetailComponent`: liest Route-Param, ruft `getReview(id)` auf, zeigt typ-spezifische Metadaten.
- `SearchComponent`: Suche per `?q=` gegen Backend-Endpoint angebunden.
- Loading-State (`Lädt…`) und Error-State (`Keine Verbindung zum Server`) in allen Templates vorhanden.
- Cover-Bilder mit `object-fit: cover` normiert — kein Layout-Bruch durch unterschiedliche Bildgrößen.
- Ratings überall sichtbar (Stern + `X/10`-Anzeige).
- Startseite zeigt 12 Karten initial, „Weitere Rezensionen laden"-Button für je 12 weitere.
- Filter-Tabs (Alle / Bücher / Filme / Musik / Spiele) funktionieren und setzen Paginierung zurück.

---

# Schritt 10

```
Polishing 🔄
```

### Erledigt:
- Error-State „Keine Verbindung zum Server" in allen Komponenten vorhanden.
- `[innerHTML]` + `DomSanitizer` für Review-Volltext auf der Detailseite implementiert.
- Cover-Images normiert (`object-fit: cover`, festes `aspect-ratio: 3/4`).

### Noch offen:
- Responsive auf Smartphone testen (breakpoints bei 680px / 480px).
- Skeleton-States / Loading-Spinner (aktuell nur Textzeile „Lädt…").
- Leere Zustände: „Keine Ergebnisse für diesen Filter" wenn Grid leer ist.
- Footer einbauen.

---

# Schritt 11

```
Dokumentation + Präsentation ⏳
```

### Aufgaben:
- Projekt-Doku nach _Vorlage_Projektdokumentation_ITBerufe.pdf_.
- `docs/api.md` fertigstellen (aus Schritt 4).
- Slides für die Präsentation.
- Demo-Skript: welche Seiten in welcher Reihenfolge live gezeigt werden.

---

# Schritt 12

```
Generalprobe ⏳
```

### Aufgaben:
- Komplette Präsentation einmal durchlaufen.
- Bugs aufschreiben, noch am selben Tag fixen.

### Hinweis:
- **Kein neues Feature mehr ab hier.**

---

# Glossar

### A

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
ActivatedRoute        | Angular-Objekt, das den aktuellen URL-Parameter ausliest (z. B. die Review-ID)
Angular               | JavaScript-Framework von Google für das Frontend (die sichtbare Website)
API                   | Schnittstelle, über die Frontend und Backend Daten austauschen
```

### B

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
Breakpoint            | Bildschirmbreite, ab der das Layout für Smartphones umschaltet
```

### C

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
Component             | Wiederverwendbarer Baustein einer Angular-Seite (z. B. eine Karte, ein Header)
Conventional Commits  | Einheitliches Schema für Git-Commit-Nachrichten (z. B. feat:, fix:)
CSS Custom Properties | Wiederverwendbare Variablen in CSS, z. B. --accent: red
curl / Postman        | Werkzeuge zum manuellen Testen von API-Endpoints
```

### D

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
DomSanitizer          | Angular-Sicherheitsfilter, der gefährlichen Code in HTML-Inhalten blockiert
```

### E

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
Endpoint              | Eine konkrete URL der API, z. B. /api/reviews
```

### F

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
Flask                 | Leichtgewichtiges Python-Framework zum Bauen von Backends
```

### G

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
GET / POST            | HTTP-Methoden: GET = Daten abrufen, POST = Daten schicken
```

### H

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
HttpClient            | Angular-Werkzeug, das HTTP-Anfragen ans Backend schickt
```

### I

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
[innerHTML]           | Angular-Methode, um HTML-Text direkt als formatiertes HTML darzustellen
```

### J

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
JSON                  | Textformat für strukturierte Daten, das Frontend und Backend verstehen
```

### M

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
Mock-Daten            | Platzhalter-Daten im Code, die echte API-Antworten simulieren
MVP                   | Minimum Viable Product — kleinstmögliche Version, die die Kernfunktion zeigt
MySQL                 | Relationale Datenbank, in der alle Review-Daten gespeichert sind
```

### N

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
ng serve              | Befehl, der den Angular-Entwicklungsserver lokal startet
```

### P

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
Python venv           | Isolierte Python-Umgebung, damit Bibliotheken nicht global installiert werden
```

### R

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
ReviewService         | Angular-Dienst, der alle API-Anfragen an das Backend bündelt
Routing               | Zuordnung von URLs zu den passenden Seiten/Components
```

### S

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
Seed-Daten            | Beispieldatensatz, der beim ersten Start in die Datenbank eingespielt wird
Signal / toSignal     | Angular-Konzept für reaktive Daten — die Ansicht aktualisiert sich automatisch
Skeleton-State        | Lade-Platzhalter (graue Blöcke), der angezeigt wird, bis Daten geladen sind
SQL                   | Sprache zum Abfragen und Bearbeiten von Datenbanken
```

### U

```
Begriff               | Erklärung
----------------------|---------------------------------------------------------------
UTF-8                 | Zeichenkodierung, die Umlaute (ä, ö, ü) direkt speichern kann
```