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

### Offene TODOs für das Team:
- 12 Skelett-Einträge füllen
- Erfundene Felder (ISBN, Verlage, Regie) bei Showcase-Einträgen recherchieren
- Umlaute-Strategie entscheiden (aktuell `ae/oe/ue/ss`, ggf. zurück auf UTF-8)
- Optional: Cover-Bilder lokal in Angular-Assets speichern

### Bewusste Verbesserung gegenüber Original:
- Rating-Feld sichtbar (im WP-Original gar nicht vorhanden)

---

*Aktualisierter Plan bis zur Präsentation am 21.05. — Stand: 05.05.2026*

---

### ✅ Schritt 3 — Wireframes / Mockups
- **Erledigt:** Statt Papier-Wireframes wurden vollständige HTML/CSS-Mockups für alle 3 Seiten gebaut.
- Dateien: `mockups/roterdorn_homepage_mockup.html`, `roterdorn_review_detail_book_mockup.html`, `roterdorn_search_mockup.html`
- Design-Sprache festgelegt: Schwarz/Rot/Weiß, CSS Custom Properties, Card-Grid, Filter-Tabs.

---

### ✅ Schritt 4 — API-Vertrag
- **Erledigt:** Backend-Endpoints sind implementiert und der Angular `ReviewService` nutzt sie bereits.
- Implementierte Endpoints:
  - `GET /api/reviews?type=&limit=` → `{ data: Review[], count: number }`
  - `GET /api/reviews/<id>` → Review-Objekt inkl. typ-spezifischer Details
  - `POST /api/reviews` → `{ message, id }`
- **Noch offen:** `docs/api.md` mit exakter Dokumentation der Request/Response-Shapes schreiben (für die Projektdokumentation wichtig).

---

### 🔄 Schritt 5 — Git-Workflow + Setup-Doku
- **Teilweise erledigt:** Git läuft, `README.md` im Root vorhanden, Commits werden nach Conventional-Commit-Schema gemacht.
- **Noch offen:**
  - `docs/SETUP.md` erstellen (lokale Dev-Umgebung von Null aufsetzen: MySQL, Python venv, `ng serve`)
  - Teamnamen im Root-README eintragen (aktuell noch `[Name1]`–`[Name4]`)

---

### ⏳ Schritt 6 — Backend gegen die DB testen (1–2 Stunden, 1 Person)
- Flask-Code ist vorhanden (`app.py`, `routes/reviews.py`, `db.py`).
- Seed-Daten liegen bereit (`database/seed_data.sql`).
- **Aufgabe:** MySQL-Instanz lokal aufsetzen, `seed_data.sql` einspielen, alle Endpoints mit curl/Postman testen und Bugs fixen.
- **Ergebnis:** Ein laufendes Backend, das auf echten Daten antwortet.

---

### ✅ Schritt 7 — Frontend-Grundgerüst
- **Erledigt:** Angular-Projekt vollständig aufgesetzt.
  - Routing: `/` (ReviewList), `/review/:id` (ReviewDetail), `/search` (Search), `/add` (AddReview)
  - Globales Styling mit CSS Custom Properties (`--accent`, `--bg-base`, `--surface` etc.)
  - Header-Komponente mit SVG-Logo und Navigation
  - `ReviewService` mit `HttpClient` für alle API-Calls vorbereitet

---

### ✅ Schritt 9 — Die drei Seiten ausbauen
- **Erledigt:** Alle 3 Seiten 1:1 aus den Mockups in Angular-Komponenten überführt.
  - `/` — Startseite mit Hero-Card, Filter-Tabs, 4-spaltigem Review-Grid, Pagination-Hint
  - `/review/:id` — Detailseite mit 2-Spalten-Layout, Rating-Balken, Metadaten-Liste, Related-Grid
  - `/search` — Suchseite mit Input, Filter-Pills, Top-Result, Ergebnis-Grid
- Laufen aktuell noch mit **Hardcode-Mock-Daten** im Component — echte API-Anbindung folgt in Schritt 8.

---

### ⏳ Schritt 8 — Frontend an Backend anschließen (1 Tag, 2 Personen)
> **Nächster aktiver Schritt** — setzt Schritt 6 (laufendes Backend) voraus.

- `ReviewService.getReviews()` und `getReview(id)` in die Komponenten einbinden (ersetzen die Mock-Arrays).
- `ReviewListComponent`: Mock-`signal` durch `toSignal(reviewService.getReviews())` ersetzen.
- `ReviewDetailComponent`: `ActivatedRoute`-Param auslesen, `getReview(id)` aufrufen.
- `SearchComponent`: Suchparameter aus URL lesen, Backend-Endpoint mit `?q=` anbinden (oder clientseitiges Filter auf den geladenen Daten).
- Loading- und Error-State in den Templates einfügen.

---

### ⏳ Schritt 10 — Polishing (2 Tage)
- Responsive auf Smartphone testen (breakpoints bei 680px / 480px prüfen).
- Loading-Spinner / Skeleton-States.
- Error-State: "Keine Verbindung zum Server" Meldung.
- Leere Zustände: "Keine Ergebnisse für diesen Filter".
- `[innerHTML]` + `DomSanitizer` für den Review-Volltext auf der Detailseite.
- Footer einbauen.

---

### ⏳ Schritt 11 — Dokumentation + Präsentation (2 Tage, bis 19.05.)
- Projekt-Doku nach _Vorlage_Projektdokumentation_ITBerufe.pdf_.
- `docs/api.md` fertigstellen (aus Schritt 4).
- Slides für die Präsentation.
- Demo-Skript: welche Seiten in welcher Reihenfolge live gezeigt werden.

---

### ⏳ Schritt 12 — Generalprobe (20.05., ganzes Team)
- Komplette Präsentation einmal durchlaufen.
- Bugs aufschreiben, noch am selben Tag fixen.
- **Kein neues Feature mehr ab hier.**