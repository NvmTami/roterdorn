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

### Geliefert: `seed_data.sql`
- 4 Autoren (echte Namen aus dem Original)
- 8 vollständig ausgefüllte Reviews (2 pro Medientyp) mit Content aus dem Original
- 12 TODO-Skelette (auskommentiert, 3 pro Medientyp) zum Selbst-Ausfüllen
- Cover-URLs: 6 Live-Links auf roterdorn.de + 2 placehold.co Platzhalter

> [!WARNING]
> **Offene TODOs für das Team:**
> - 12 Skelett-Einträge füllen
> - Erfundene Felder (ISBN, Verlage, Regie) bei Showcase-Einträgen recherchieren
> - Umlaute-Strategie entscheiden (aktuell `ae/oe/ue/ss`, ggf. zurück auf UTF-8)
> - Optional: Cover-Bilder lokal in Angular-Assets speichern

### Bewusste Verbesserung gegenüber Original:
- Rating-Feld sichtbar (im WP-Original gar nicht vorhanden)

---

*Aktualisierter Plan bis zur Präsentation am 21.05. — Stand: 05.05.2026*

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
Backend gegen die DB testen ⏳
```

### Voraussetzungen:
- Flask-Code ist vorhanden (`app.py`, `routes/reviews.py`, `db.py`).
- Seed-Daten liegen bereit (`database/seed_data.sql`).

### Aufgabe:
- MySQL-Instanz lokal aufsetzen, `seed_data.sql` einspielen, alle Endpoints mit curl/Postman testen und Bugs fixen.

### Ergebnis:
- Ein laufendes Backend, das auf echten Daten antwortet.

---

# Schritt 9

```
Frontend an Backend anschließen ⏳
```

> **Nächster aktiver Schritt** — setzt Schritt 8 (laufendes Backend) voraus.

### Aufgaben:
- `ReviewService.getReviews()` und `getReview(id)` in die Komponenten einbinden (ersetzen die Mock-Arrays).
- `ReviewListComponent`: Mock-`signal` durch `toSignal(reviewService.getReviews())` ersetzen.
- `ReviewDetailComponent`: `ActivatedRoute`-Param auslesen, `getReview(id)` aufrufen.
- `SearchComponent`: Suchparameter aus URL lesen, Backend-Endpoint mit `?q=` anbinden (oder clientseitiges Filter auf den geladenen Daten).
- Loading- und Error-State in den Templates einfügen.

---

# Schritt 10

```
Polishing ⏳
```

### Aufgaben:
- Responsive auf Smartphone testen (breakpoints bei 680px / 480px prüfen).
- Loading-Spinner / Skeleton-States.
- Error-State: „Keine Verbindung zum Server" Meldung.
- Leere Zustände: „Keine Ergebnisse für diesen Filter".
- `[innerHTML]` + `DomSanitizer` für den Review-Volltext auf der Detailseite.
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