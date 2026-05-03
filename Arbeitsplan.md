# Schritt 1 — Zusammenfassung

Original-Website analysiert: roterdorn.de

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