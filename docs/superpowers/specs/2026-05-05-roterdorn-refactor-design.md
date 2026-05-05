# RoterDorn Refactor — Design Spec
**Datum:** 2026-05-05  
**Präsentation:** 2026-05-21  
**Stack:** Angular 21 (SSR, Standalone) + Flask + MySQL

---

## Ziel

Vollständige Modernisierung von roterdorn.de: Rezensionsliste, Detailseiten, Kategorie-Navigation, Suche, statischer Podcast-Bereich und echte Redaktions-Seite — alles auf Basis des bestehenden DB-Schemas ohne Änderungen.

---

## 1. Routing-Struktur

```
/                 → Startseite (Featured + aktuelle Reviews aller Typen)
/buch             → Buchrezensionen (gefiltert)
/film             → Filmrezensionen
/musik            → Musikrezensionen
/spiel            → Spielrezensionen
/buch/:id         → Buchdetail  (:id = reviews.id aus der DB)
/film/:id         → Filmdetail
/musik/:id        → Musikdetail
/spiel/:id        → Spieldetail
/suche            → Suchergebnisse (?q=...)
/redaktion        → Team (Daten aus DB)
/podcast          → Podcast (statisch/gemockt)
/add              → Rezension hinzufügen (bereits vorhanden)
```

---

## 2. Frontend-Struktur

```
src/app/
├── components/
│   ├── review-list/       (bestehend — Startseite)
│   ├── add-review/        (bestehend — umgezogen aus features/)
│   ├── category-list/     (neu — generische Kategorieseite)
│   ├── review-detail/     (neu — Vollansicht einer Rezension)
│   ├── search/            (neu — Suchfeld + Ergebnisse)
│   ├── podcast/           (neu — statisch)
│   └── redaktion/         (neu — Autoren aus DB)
├── layout/
│   ├── header/            (bestehend)
│   └── nav/               (neu — Haupt-Navigation)
├── shared/
│   ├── review-card/       (neu — aus review-list extrahiert)
│   └── pipes/             (bestehend)
└── core/
    ├── services/
    │   ├── review.service.ts   (bestehend — erweitert)
    │   └── author.service.ts   (neu)
    └── routes.ts               (bestehend — erweitert)
```

### Komponenten-Verantwortlichkeiten

| Komponente | Zweck |
|---|---|
| `review-card` | Wiederverwendbare Karte: Titel, Medientyp, Rating, Excerpt, Cover. Genutzt in `review-list` und `category-list`. |
| `category-list` | Liest `type` aus Route-Params, ruft `getReviewsByType()` auf, zeigt paginierte Liste via `review-card`. |
| `review-detail` | Vollansicht: Rezensionstext, alle Basis-Felder, typ-spezifisches `details`-Objekt (ISBN, Regisseur, Spieleranzahl etc.). |
| `search` | Liest `q` aus Query-Params, ruft `search()` auf, zeigt Ergebnisse via `review-card`. |
| `nav` | Links zu `/buch`, `/film`, `/musik`, `/spiel`, `/redaktion`, `/podcast`. Aktiver Link wird hervorgehoben. |
| `podcast` | Statische Episodenliste (gemockt, kein API-Call). |
| `redaktion` | Lädt Autoren via `AuthorService`, zeigt Name, Bio, E-Mail. |

### State-Management
Durchgehend Angular Signals (konsistent mit bestehendem `review-list`). Kein zusätzlicher State-Layer.

---

## 3. Backend-Änderungen

Alle Änderungen in `backend/routes/`. Kein neuer Blueprint-Eintrag in `app.py` nötig außer für Authors.

### Geänderte Endpoints

**GET `/api/reviews`**
- Bestehend: `?type=`, `?limit=`
- Neu: `?page=` (optional, Default 1, Schritte à 20) für Pagination in Kategorielisten

**GET `/api/search`**
- Ergänzung: `cover_url` und `published_at` in der Antwort (aktuell fehlend)

### Neue Endpoints

**GET `/api/authors`** — in neuer Datei `routes/authors.py`
```json
{
  "authors": [
    { "id": 1, "name": "Joanna Mueller-Lenz", "bio": "...", "email": "..." }
  ]
}
```

### Registrierung in app.py
```python
from routes.authors import authors_bp
app.register_blueprint(authors_bp)
```

---

## 4. Service-Erweiterungen

### ReviewService (erweitert)
```typescript
getReviews(): Observable<Review[]>                    // bestehend
addReview(r: ReviewInput): Observable<...>            // bestehend
getReviewsByType(type: string, page?: number): Observable<Review[]>  // neu
getReviewById(id: number): Observable<ReviewDetail>  // neu
search(q: string): Observable<Review[]>              // neu
```

### ReviewDetail Interface (neu)
```typescript
interface ReviewDetail extends Review {
  content: string;
  created_at: string;
  details?: Record<string, unknown>;  // typ-spezifische Felder
}
```

### AuthorService (neu)
```typescript
getAuthors(): Observable<Author[]>
```

---

## 5. Fehlerbehandlung

- Backend-Fehler: bestehende Try/Catch-Struktur bleibt, gibt `{"error": "..."}` mit HTTP-Status zurück
- Frontend: Fallback-Daten bei API-Fehler (wie bereits in `review-list`), Fehlermeldung im Template bei Detailseite (Review nicht gefunden → 404-Text)
- Suche: Eingabe unter 2 Zeichen wird client-seitig abgefangen (kein API-Call)

---

## 6. Statische Inhalte

**Podcast-Seite:** Gemockte Episodenliste mit Titel, Datum, Kurzbeschreibung — kein API-Aufruf, Daten direkt im Component.

**Redaktions-Seite:** Echte Daten aus `GET /api/authors`, ergänzt durch statischen Einleitungstext im Template.

---

## 7. Umbenennungen

- `src/app/features/` → `src/app/components/` (alle bestehenden Komponenten umziehen)
- `app.routes.ts` bleibt als Re-Export, echte Routen in `core/routes.ts` (bereits so)
