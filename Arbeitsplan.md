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

Aktualisierter Plan bis zur Präsentation am 21.05.

Schritt 3 — Wireframes auf Papier (1 Stunde, ganzes Team)
Skizzen für alle 3 Seiten. Stift und Papier. Ergebnis: ein Foto im docs/-Ordner, das alle vier sehen.

Schritt 4 — API-Vertrag festlegen (1 Stunde)
Ein docs/api.md mit den Endpoints und exakten JSON-Responses. Sobald das steht, können Frontend und Backend parallel arbeiten ohne sich zu blockieren.

Schritt 5 — Git-Workflow + Setup-Doku (30 Min)
Branch-Strategie festlegen, README.md für Backend, Frontend und Database schreiben. Damit jeder im Team das Projekt von Null aufsetzen kann.

Schritt 6 — Backend gegen die DB testen (2–3 Stunden, 1 Person)
Existierender Flask-Code, neue DB. Endpoints durchprobieren mit curl oder Postman. Bugs fixen. Ergebnis: ein laufendes Backend das auf realen Daten antwortet.

Schritt 7 — Frontend-Grundgerüst (1 Tag, 2 Personen)
Routing aufsetzen, globales Styling (Schwarz/Weiß/Rot), Header-Komponente, Shared-Card-Komponente. Noch keine echten Daten.

Schritt 8 — Frontend an Backend anschließen (1 Tag, 2 Personen)
HTTP-Service in Angular, erste Komponente die echte Reviews lädt. Ab hier wird es konkret.

Schritt 9 — Die drei Seiten ausbauen (3–4 Tage, ganzes Team)

Startseite mit Filter
Detailseite mit [innerHTML]
Suche
Parallel arbeiten möglich.

Schritt 10 — Polishing (2 Tage)
Responsive auf Smartphone testen, Loading-States, Error-Handling, leere Zustände ("Keine Ergebnisse"), Logo einbinden, Footer.

Schritt 11 — Dokumentation + Präsentation (2 Tage)

Projekt-Doku nach der Vorlage _Vorlage_Projektdokumentation_ITBerufe.pdf
Slides für die Präsentation
Demo-Skript: was klickt ihr live, in welcher Reihenfolge

Schritt 12 — Generalprobe (1 Tag, ganzes Team)
Komplette Präsentation einmal durchlaufen. Bugs aufschreiben, am Tag danach fixen. Kein neues Feature mehr ab hier.