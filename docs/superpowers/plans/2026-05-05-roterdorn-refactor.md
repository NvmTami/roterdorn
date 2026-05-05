# RoterDorn Refactor — Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vollständige Modernisierung des RoterDorn-Projekts: Kategorie-Navigation, Detailseiten, Suche, statische Podcast/Redaktions-Seiten — Angular 21 Frontend + Flask Backend, kein Schema-Change.

**Architecture:** Feature-by-Feature, von innen nach außen. Erst Rename + Backend, dann Services, dann Komponenten, dann Routen verdrahten. Jeder Schritt ist sofort sichtbar.

**Tech Stack:** Angular 21 (Standalone, Signals, SSR), Flask 3, mysql-connector-python, TypeScript 5.9

---

## Dateiübersicht

**Umbenannt (Inhalt bleibt):**
- `frontend/src/app/features/review-list/` → `frontend/src/app/components/review-list/`
- `frontend/src/app/features/add-review/` → `frontend/src/app/components/add-review/`

**Geändert:**
- `backend/routes/reviews.py` — search fix, Pagination
- `backend/app.py` — authors_bp registrieren
- `frontend/src/app/core/routes.ts` — alle neuen Routen
- `frontend/src/app/core/services/review.service.ts` — 3 neue Methoden + Interfaces
- `frontend/src/app/layout/header/header.component.ts` — korrekte Routen + routerLinkActive
- `frontend/src/app/components/review-list/review-list.component.html` — Weiterlesen-Link fix
- `frontend/src/app/components/review-list/review-list.component.ts` — Import-Pfad fix
- `frontend/src/app/components/add-review/add-review.component.html` — category-Values fix

**Neu:**
- `backend/routes/authors.py`
- `frontend/src/app/core/services/author.service.ts`
- `frontend/src/app/shared/review-card/review-card.component.ts`
- `frontend/src/app/components/category-list/category-list.component.ts`
- `frontend/src/app/components/review-detail/review-detail.component.ts`
- `frontend/src/app/components/search/search.component.ts`
- `frontend/src/app/components/podcast/podcast.component.ts`
- `frontend/src/app/components/redaktion/redaktion.component.ts`

---

## Task 1: features/ → components/ umbenennen + Header-Routen korrigieren

**Files:**
- Rename: `frontend/src/app/features/` → `frontend/src/app/components/`
- Modify: `frontend/src/app/core/routes.ts`
- Modify: `frontend/src/app/layout/header/header.component.ts`
- Modify: `frontend/src/app/components/add-review/add-review.component.html`

- [ ] **Schritt 1: Verzeichnis umbenennen**

```bash
mv "frontend/src/app/features" "frontend/src/app/components"
```

- [ ] **Schritt 2: Import-Pfade in routes.ts aktualisieren**

Datei: `frontend/src/app/core/routes.ts`

```typescript
import { Routes } from '@angular/router';
import { ReviewListComponent } from '../components/review-list/review-list.component';
import { AddReviewComponent } from '../components/add-review/add-review.component';

export const routes: Routes = [
  { path: '', component: ReviewListComponent },
  { path: 'add', component: AddReviewComponent },
];
```

- [ ] **Schritt 3: Header-Routen korrigieren + routerLinkActive**

Datei: `frontend/src/app/layout/header/header.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandLogoComponent } from '../../shared/branding/brand-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandLogoComponent],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand-link" aria-label="Zur Startseite">
        <app-brand-logo variant="lockup" [height]="20" />
      </a>
      <nav class="primary-nav">
        <a routerLink="/buch" routerLinkActive="active">Bücher</a>
        <a routerLink="/film" routerLinkActive="active">Filme</a>
        <a routerLink="/musik" routerLinkActive="active">Musik</a>
        <a routerLink="/spiel" routerLinkActive="active">Spiele</a>
        <a routerLink="/redaktion" routerLinkActive="active">Redaktion</a>
        <a routerLink="/podcast" routerLinkActive="active">Podcast</a>
        <a routerLink="/suche" routerLinkActive="active">Suche</a>
      </nav>
    </header>
  `,
  styles: [`
    .site-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 0.5px solid #1f1f1f;
    }
    .brand-link { color: inherit; text-decoration: none; }
    .primary-nav {
      display: flex;
      gap: 1.5rem;
      font-size: 0.8rem;
      color: var(--brand-text-muted);
    }
    .primary-nav a { color: inherit; text-decoration: none; }
    .primary-nav a:hover, .primary-nav a.active { color: var(--brand-accent); }
  `],
})
export class HeaderComponent {}
```

- [ ] **Schritt 4: add-review category-Values auf DB-Werte korrigieren**

Datei: `frontend/src/app/components/add-review/add-review.component.html`

```html
<h2>Neue Rezension hinzufügen</h2>
<form [formGroup]="reviewForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="title">Titel:</label>
    <input id="title" type="text" formControlName="title" />
  </div>
  <div>
    <label for="category">Kategorie:</label>
    <select id="category" formControlName="category">
      <option value="">-- Wähle eine Kategorie --</option>
      <option value="buch">Buch</option>
      <option value="film">Film</option>
      <option value="musik">Musik</option>
      <option value="spiel">Spiel</option>
    </select>
  </div>
  <div>
    <label for="rating">Bewertung (1-5):</label>
    <input id="rating" type="number" formControlName="rating" min="1" max="5" />
  </div>
  <div>
    <label for="comment">Kommentar:</label>
    <textarea id="comment" formControlName="comment"></textarea>
  </div>
  <button type="submit" [disabled]="!reviewForm.valid">Hinzufügen</button>
</form>
```

- [ ] **Schritt 5: review-list SCSS-Schritte umbenennen (intern)**

*(keine Änderung nötig — Schrittnummern in Task 4 wurden angepasst)*

- [ ] **Schritt 6: Dev-Server starten und prüfen**

```bash
cd frontend && npm start
```

Erwartung: Startseite lädt, keine Konsol-Fehler, Header zeigt 7 Links.

- [ ] **Schritt 7: Commit**

```bash
git add frontend/src/app/components frontend/src/app/core/routes.ts frontend/src/app/layout/header/header.component.ts
git commit -m "refactor: rename features/ to components/, fix header nav routes"
```

---

## Task 2: Backend — Search fix + Pagination + /api/authors

**Files:**
- Modify: `backend/routes/reviews.py`
- Create: `backend/routes/authors.py`
- Modify: `backend/app.py`

- [ ] **Schritt 1: /api/search um cover_url und published_at ergänzen**

Datei: `backend/routes/reviews.py`, Funktion `search()` — SELECT ersetzen:

```python
@reviews_bp.get("/search")
def search():
    q = request.args.get("q", "").strip()
    if len(q) < 2:
        return jsonify({"error": "Suchbegriff zu kurz"}), 400

    db = None
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute("""
            SELECT r.id, r.title, r.media_type, r.rating,
                   r.excerpt, r.cover_url, r.published_at, a.name AS author_name
            FROM reviews r
            JOIN authors a ON r.author_id = a.id
            WHERE r.published_at IS NOT NULL
              AND (r.title LIKE %s OR r.content LIKE %s)
            LIMIT 20
        """, (f"%{q}%", f"%{q}%"))
        rows = cur.fetchall()
        result = [row_to_dict(cur, r) for r in rows]
        for item in result:
            if item.get("published_at"):
                item["published_at"] = str(item["published_at"])
        return jsonify({"data": result})
    except Error as e:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()
```

- [ ] **Schritt 2: /api/reviews um ?page= ergänzen**

Datei: `backend/routes/reviews.py`, Funktion `get_reviews()` — limit/offset-Logik:

```python
@reviews_bp.get("/reviews")
def get_reviews():
    media_type = request.args.get("type")
    limit      = int(request.args.get("limit", 20))
    page       = int(request.args.get("page", 1))
    offset     = (page - 1) * limit

    query = """
        SELECT r.id, r.title, r.media_type, r.rating,
               r.excerpt, r.published_at, r.cover_url,
               a.name AS author_name
        FROM reviews r
        JOIN authors a ON r.author_id = a.id
        WHERE r.published_at IS NOT NULL
    """
    params = []

    if media_type and media_type in VALID_MEDIA_TYPES:
        query += " AND r.media_type = %s"
        params.append(media_type)

    query += " ORDER BY r.published_at DESC LIMIT %s OFFSET %s"
    params.extend([limit, offset])

    db = None
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute(query, params)
        rows   = cur.fetchall()
        result = [row_to_dict(cur, r) for r in rows]
        for item in result:
            if item.get("published_at"):
                item["published_at"] = str(item["published_at"])
        return jsonify({"data": result, "count": len(result)})
    except Error as e:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()
```

- [ ] **Schritt 3: routes/authors.py erstellen**

Datei: `backend/routes/authors.py`

```python
from flask import Blueprint, jsonify
from mysql.connector import Error
from db import get_db, row_to_dict

authors_bp = Blueprint("authors", __name__, url_prefix="/api")

@authors_bp.get("/authors")
def get_authors():
    db = None
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute("""
            SELECT id, name, email, bio, created_at
            FROM authors
            ORDER BY name
        """)
        rows = cur.fetchall()
        result = [row_to_dict(cur, r) for r in rows]
        for item in result:
            if item.get("created_at"):
                item["created_at"] = str(item["created_at"])
        return jsonify({"authors": result})
    except Error:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()
```

- [ ] **Schritt 4: authors_bp in app.py registrieren**

Datei: `backend/app.py`

```python
from flask import Flask
from flask_cors import CORS
from config import CORS_ORIGINS, DEBUG, PORT
from routes.reviews import reviews_bp
from routes.authors import authors_bp

app = Flask(__name__)
CORS(app, origins=CORS_ORIGINS)

app.register_blueprint(reviews_bp)
app.register_blueprint(authors_bp)

if __name__ == "__main__":
    print(f"RoterDorn API läuft auf http://localhost:{PORT}")
    app.run(debug=DEBUG, port=PORT)
```

- [ ] **Schritt 5: Backend testen**

```bash
cd backend && python app.py
```

In neuem Terminal:
```bash
curl "http://localhost:5000/api/search?q=goblin"
# Erwartung: cover_url und published_at im JSON

curl "http://localhost:5000/api/reviews?type=buch&page=1"
# Erwartung: max 20 Bücher, OFFSET 0

curl "http://localhost:5000/api/authors"
# Erwartung: {"authors": [...]} mit 4 Einträgen
```

- [ ] **Schritt 6: Commit**

```bash
git add backend/routes/reviews.py backend/routes/authors.py backend/app.py
git commit -m "feat(backend): fix search fields, add pagination, add /api/authors"
```

---

## Task 3: ReviewService erweitern + AuthorService erstellen

**Files:**
- Modify: `frontend/src/app/core/services/review.service.ts`
- Create: `frontend/src/app/core/services/author.service.ts`

- [ ] **Schritt 1: review.service.ts mit neuen Interfaces und Methoden**

Datei: `frontend/src/app/core/services/review.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Review {
  id: number;
  title: string;
  media_type: string;
  rating: number;
  excerpt: string;
  published_at: string;
  cover_url: string | null;
  author_name: string;
}

export interface ReviewDetail extends Review {
  content: string;
  created_at: string;
  details?: Record<string, unknown>;
}

export interface ReviewInput {
  title: string;
  category: string;
  rating: number;
  comment: string;
}

interface ReviewsResponse {
  data: Review[];
  count: number;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/reviews`;

  getReviews(): Observable<Review[]> {
    return this.http.get<ReviewsResponse>(this.base).pipe(map((r) => r.data));
  }

  getReviewsByType(type: string, page = 1): Observable<Review[]> {
    return this.http
      .get<ReviewsResponse>(this.base, { params: { type, page: String(page) } })
      .pipe(map((r) => r.data));
  }

  getReviewById(id: number): Observable<ReviewDetail> {
    return this.http.get<ReviewDetail>(`${this.base}/${id}`);
  }

  search(q: string): Observable<Review[]> {
    return this.http
      .get<{ data: Review[] }>(`${environment.apiUrl}/search`, { params: { q } })
      .pipe(map((r) => r.data));
  }

  addReview(review: ReviewInput): Observable<{ message: string; id: number }> {
    return this.http.post<{ message: string; id: number }>(this.base, review);
  }
}
```

- [ ] **Schritt 2: author.service.ts erstellen**

Datei: `frontend/src/app/core/services/author.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string;
}

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private http = inject(HttpClient);

  getAuthors(): Observable<Author[]> {
    return this.http
      .get<{ authors: Author[] }>(`${environment.apiUrl}/authors`)
      .pipe(map((r) => r.authors));
  }
}
```

- [ ] **Schritt 3: Commit**

```bash
git add frontend/src/app/core/services/
git commit -m "feat(services): extend ReviewService, add AuthorService"
```

---

## Task 4: review-card Komponente extrahieren + review-list aktualisieren

**Files:**
- Create: `frontend/src/app/shared/review-card/review-card.component.ts`
- Modify: `frontend/src/app/components/review-list/review-list.component.html`
- Modify: `frontend/src/app/components/review-list/review-list.component.ts`
- Modify: `frontend/src/app/components/review-list/review-list.component.scss`

- [ ] **Schritt 1: review-card Komponente erstellen**

Datei: `frontend/src/app/shared/review-card/review-card.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaTypePipe } from '../pipes/media-type.pipe';
import { Review } from '../../core/services/review.service';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [RouterLink, MediaTypePipe],
  template: `
    <article class="card">
      <a [routerLink]="['/' + review().media_type, review().id]" class="card-link">
        @if (review().cover_url) {
          <img class="card-cover" [src]="review().cover_url" [alt]="'Cover von ' + review().title" />
        } @else {
          <div class="card-cover card-cover-placeholder" [class]="'category-' + review().media_type"></div>
        }
        <p class="card-category">{{ review().media_type | mediaType }}</p>
        <h3>{{ review().title }}</h3>
        <p class="card-author">{{ review().author_name }}</p>
      </a>
    </article>
  `,
  styles: [`
    .card-link { text-decoration: none; color: inherit; display: block; }
    .card-cover {
      aspect-ratio: 2 / 3;
      border-radius: 4px;
      margin-bottom: 0.65rem;
      width: 100%;
      object-fit: cover;
    }
    .card-cover-placeholder { display: block; }
    .category-film  { background: linear-gradient(135deg, #1a2440, #0a1224); }
    .category-musik { background: linear-gradient(135deg, #2a1a30, #100818); }
    .category-spiel { background: linear-gradient(135deg, #1a3028, #08180e); }
    .category-buch  { background: linear-gradient(135deg, #302418, #18100a); }
    .card-category {
      margin: 0;
      color: #e24b4a;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .card h3 { margin: 0.25rem 0 0.2rem; font-size: 0.8rem; line-height: 1.3; }
    .card-author { margin: 0; color: #777; font-size: 0.72rem; }
    .card-link:hover h3 { color: var(--brand-accent); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardComponent {
  review = input.required<Review>();
}
```

- [ ] **Schritt 2: review-list.component.ts aktualisieren**

Datei: `frontend/src/app/components/review-list/review-list.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Review, ReviewService } from '../../core/services/review.service';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';
import { HeaderComponent } from '../../layout/header/header.component';
import { ReviewCardComponent } from '../../shared/review-card/review-card.component';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [RouterLink, DatePipe, MediaTypePipe, HeaderComponent, ReviewCardComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewListComponent {
  private readonly reviewService = inject(ReviewService);

  reviews = signal<Review[]>([
    { id: 1, title: 'Spiel mir das Lied vom Goblin', media_type: 'buch', rating: 3, excerpt: 'Oliver Darkshires Versuch, in Pratchetts Fußstapfen zu treten, bleibt blass.', published_at: '2026-05-02', cover_url: 'https://www.roterdorn.de/wp-content/uploads/2026/05/SpielMirDasLiedVomGoblin-188x300.jpg', author_name: 'Joanna Mueller-Lenz' },
    { id: 3, title: '8 Blickwinkel', media_type: 'film', rating: 3.5, excerpt: 'Spannungs-Thriller mit interessantem Konzept, dessen Wiederholungen aber mehr ermüden als fesseln.', published_at: '2026-04-13', cover_url: 'https://www.roterdorn.de/wp-content/uploads/2026/04/99378_poster_gross-208x300.jpg', author_name: 'Leonardo Beckert' },
    { id: 5, title: 'Fix8:Sed8 – Secret Gig', media_type: 'musik', rating: 4.5, excerpt: 'Nach vier Jahren Pause kehrt das deutsche Industrial-Duo mit voller Wucht zurück.', published_at: '2025-09-21', cover_url: 'https://www.roterdorn.de/wp-content/uploads/2025/09/Fix_01-150x243.jpg', author_name: 'Marcus Pohlmann' },
    { id: 7, title: 'Shadow Cards', media_type: 'spiel', rating: 4, excerpt: 'Cleveres Stichspiel mit kurzer Spielzeit. Eine echte Alternative zu Wizard.', published_at: '2026-04-17', cover_url: 'https://www.roterdorn.de/wp-content/uploads/2026/04/Shadow-Cards-234x300.jpg', author_name: 'Marcus Pohlmann' },
    { id: 2, title: 'Der Fall Charles Dexter Ward', media_type: 'buch', rating: 4.5, excerpt: 'LPL Records vertont Lovecrafts längste Erzählung mit David Nathan als Sprecher.', published_at: '2016-02-17', cover_url: null, author_name: 'Joanna Mueller-Lenz' },
  ]);

  featuredReview = computed(() => this.reviews()[0]);
  editorialReviews = computed(() => this.reviews().slice(1, 5));

  constructor() {
    this.reviewService.getReviews().subscribe({
      next: (reviews) => { if (reviews.length > 0) this.reviews.set(reviews); },
      error: () => { /* Fallback-Daten bleiben */ },
    });
  }
}
```

- [ ] **Schritt 3: review-list.component.html aktualisieren**

Datei: `frontend/src/app/components/review-list/review-list.component.html`

```html
<div class="homepage-shell">
  <app-header />

  <main class="home-content">
    @if (featuredReview(); as featured) {
      <section class="hero" aria-label="Neueste Rezension">
        @if (featured.cover_url) {
          <img class="hero-cover" [src]="featured.cover_url" [alt]="'Cover von ' + featured.title" />
        } @else {
          <div class="hero-cover hero-cover-placeholder" [class]="'category-' + featured.media_type">
            <span>Cover</span>
          </div>
        }
        <article class="hero-text">
          <span class="hero-tag">Rezension · {{ featured.media_type | mediaType }}</span>
          <h1>{{ featured.title }}</h1>
          <p class="hero-meta">{{ featured.author_name }} · {{ featured.published_at | date:'dd.MM.yyyy' }}</p>
          <p>{{ featured.excerpt }}</p>
          <a [routerLink]="['/' + featured.media_type, featured.id]" class="read-more">Weiterlesen →</a>
        </article>
      </section>
    } @else {
      <section class="hero hero-empty" aria-label="Neueste Rezension">
        <p>Noch keine Rezensionen vorhanden.</p>
      </section>
    }

    <section class="editorial" aria-label="Aktuell aus der Redaktion">
      <div class="editorial-head">
        <h2>Aktuell aus der Redaktion</h2>
      </div>
      <div class="editorial-grid">
        @for (review of editorialReviews(); track review.id) {
          <app-review-card [review]="review" />
        }
      </div>
    </section>
  </main>
</div>
```

- [ ] **Schritt 4: review-list.component.scss — card-cover Styles entfernen (jetzt in review-card)**

Die folgenden Klassen aus `review-list.component.scss` entfernen (werden von review-card gehandhabt):
`.card-cover`, `.category-film`, `.category-musik`, `.category-spiel`, `.category-buch`, `.category-default`, `.card-category`, `.card h3`, `.card-author`

Die Klasse `.card` bleibt, wird aber in `review-card` verwendet. Die `editorial-grid` und `hero`-Styles bleiben alle.

Ergebnis `review-list.component.scss`:

```scss
.homepage-shell {
  padding: 1.4rem;
}

.hero {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 1.4rem;
  align-items: start;
  margin-bottom: 1.25rem;
}

.hero-cover {
  aspect-ratio: 2 / 3;
  border-radius: 5px;
  width: 180px;
  object-fit: cover;
}

.hero-cover-placeholder {
  display: flex;
  align-items: flex-end;
  padding: 0.7rem;
  color: #c4806a;
  font-size: 0.72rem;
  background: linear-gradient(135deg, #5a2818 0%, #2a1208 100%);
}

.hero-text h1 {
  margin: 0.8rem 0 0.45rem;
  font-size: clamp(1.45rem, 3.3vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background: #e24b4a;
  color: #2a0808;
  font-size: 0.72rem;
  font-weight: 600;
}

.hero-meta {
  margin: 0 0 0.9rem;
  color: #888;
  font-size: 0.78rem;
}

.hero-text p {
  color: #c4c4c4;
  line-height: 1.6;
}

.read-more {
  color: #e24b4a;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.8rem;
}

.hero-empty {
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1f1f1f;
  border-radius: 8px;
}

.editorial {
  border-top: 1px solid #1f1f1f;
  padding-top: 0.9rem;
}

.editorial-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.9rem;
}

.editorial-head h2 {
  margin: 0;
  font-size: 0.85rem;
  color: #b4b4b4;
  font-weight: 600;
}

.editorial-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.9rem;
}

@media (max-width: 980px) {
  .editorial-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 760px) {
  .hero { grid-template-columns: 1fr; }
  .hero-cover { max-width: 260px; width: 100%; }
}

@media (max-width: 520px) {
  .homepage-shell { margin: 0; border-radius: 0; }
  .editorial-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Schritt 6: Startseite im Browser prüfen**

```bash
cd frontend && npm start
```

Erwartung: Hero-Rezension mit Cover-Bild, 4 Karten unten, alle klickbar.

- [ ] **Schritt 7: Commit**

```bash
git add frontend/src/app/shared/review-card/ frontend/src/app/components/review-list/
git commit -m "feat(frontend): extract review-card, update review-list with real covers and links"
```

---

## Task 5: category-list Komponente

**Files:**
- Create: `frontend/src/app/components/category-list/category-list.component.ts`

- [ ] **Schritt 1: category-list.component.ts erstellen**

Datei: `frontend/src/app/components/category-list/category-list.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService, Review } from '../../core/services/review.service';
import { ReviewCardComponent } from '../../shared/review-card/review-card.component';
import { HeaderComponent } from '../../layout/header/header.component';

const CATEGORY_TITLES: Record<string, string> = {
  buch: 'Bücher',
  film: 'Filme',
  musik: 'Musik',
  spiel: 'Spiele',
};

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ReviewCardComponent, HeaderComponent],
  template: `
    <div class="category-shell">
      <app-header />
      <main class="category-content">
        <h1 class="category-title">{{ categoryTitle() }}</h1>

        @if (error()) {
          <p class="state-msg">Fehler beim Laden der Rezensionen.</p>
        } @else if (loading()) {
          <p class="state-msg">Lädt…</p>
        } @else {
          <div class="category-grid">
            @for (review of reviews(); track review.id) {
              <app-review-card [review]="review" />
            }
            @empty {
              <p class="state-msg">Keine Rezensionen gefunden.</p>
            }
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .category-shell { padding: 1.4rem; }
    .category-content { padding-top: 1.2rem; }
    .category-title { margin: 0 0 1.2rem; font-size: 1.5rem; letter-spacing: -0.02em; }
    .state-msg { color: #888; }
    .category-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.9rem;
    }
    @media (max-width: 980px) { .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 520px) { .category-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  private route = inject(ActivatedRoute);
  private reviewService = inject(ReviewService);

  reviews = signal<Review[]>([]);
  loading = signal(true);
  error = signal(false);
  categoryTitle = signal('');

  constructor() {
    this.route.data.subscribe((data) => {
      const type: string = data['type'];
      this.categoryTitle.set(CATEGORY_TITLES[type] ?? type);
      this.loading.set(true);
      this.reviewService.getReviewsByType(type).subscribe({
        next: (reviews) => { this.reviews.set(reviews); this.loading.set(false); },
        error: () => { this.error.set(true); this.loading.set(false); },
      });
    });
  }
}
```

- [ ] **Schritt 2: Commit**

```bash
git add frontend/src/app/components/category-list/
git commit -m "feat(frontend): add category-list component"
```

---

## Task 6: review-detail Komponente

**Files:**
- Create: `frontend/src/app/components/review-detail/review-detail.component.ts`

- [ ] **Schritt 1: review-detail.component.ts erstellen**

Datei: `frontend/src/app/components/review-detail/review-detail.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReviewService, ReviewDetail } from '../../core/services/review.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [HeaderComponent, MediaTypePipe, DatePipe],
  template: `
    <div class="detail-shell">
      <app-header />

      @if (notFound()) {
        <main class="detail-content">
          <p class="state-msg">Rezension nicht gefunden.</p>
        </main>
      } @else if (loading()) {
        <main class="detail-content">
          <p class="state-msg">Lädt…</p>
        </main>
      } @else if (review(); as r) {
        <main class="detail-content">
          <span class="detail-tag">{{ r.media_type | mediaType }}</span>
          <h1 class="detail-title">{{ r.title }}</h1>
          <p class="detail-meta">
            {{ r.author_name }} · {{ r.published_at | date:'dd.MM.yyyy' }}
            · Bewertung: <strong>{{ r.rating }}/5</strong>
          </p>

          <div class="detail-body">
            @if (r.cover_url) {
              <img class="detail-cover" [src]="r.cover_url" [alt]="'Cover von ' + r.title" />
            }
            <div class="detail-text" [innerHTML]="r.content"></div>
          </div>

          @if (r.details) {
            <aside class="detail-facts">
              <h2 class="facts-title">Details</h2>
              <dl class="facts-list">
                @for (entry of detailEntries(r.details); track entry.key) {
                  <div class="fact-row">
                    <dt>{{ entry.label }}</dt>
                    <dd>{{ entry.value }}</dd>
                  </div>
                }
              </dl>
            </aside>
          }
        </main>
      }
    </div>
  `,
  styles: [`
    .detail-shell { padding: 1.4rem; }
    .detail-content { padding-top: 1.2rem; max-width: 720px; }
    .detail-tag {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      background: #e24b4a;
      color: #2a0808;
      font-size: 0.72rem;
      font-weight: 600;
      margin-bottom: 0.6rem;
    }
    .detail-title { margin: 0.4rem 0 0.3rem; font-size: clamp(1.4rem, 3vw, 2rem); line-height: 1.15; letter-spacing: -0.02em; }
    .detail-meta { color: #888; font-size: 0.8rem; margin-bottom: 1.2rem; }
    .detail-meta strong { color: #ccc; }
    .detail-body { display: grid; grid-template-columns: 160px 1fr; gap: 1.4rem; align-items: start; }
    .detail-cover { width: 160px; border-radius: 4px; aspect-ratio: 2/3; object-fit: cover; }
    .detail-text { color: #c4c4c4; line-height: 1.7; }
    .detail-text :is(h2, h3) { color: #fff; font-size: 1rem; margin-top: 1.2rem; }
    .detail-facts { margin-top: 2rem; border-top: 1px solid #1f1f1f; padding-top: 1rem; }
    .facts-title { font-size: 0.85rem; color: #b4b4b4; margin: 0 0 0.8rem; }
    .facts-list { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem 1.2rem; }
    .fact-row { display: contents; }
    dt { color: #888; font-size: 0.78rem; }
    dd { margin: 0; font-size: 0.78rem; color: #ccc; }
    .state-msg { color: #888; }
    @media (max-width: 600px) {
      .detail-body { grid-template-columns: 1fr; }
      .detail-cover { width: 140px; }
      .facts-list { grid-template-columns: 1fr; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDetailComponent {
  private route = inject(ActivatedRoute);
  private reviewService = inject(ReviewService);

  review = signal<ReviewDetail | null>(null);
  loading = signal(true);
  notFound = signal(false);

  private readonly FIELD_LABELS: Record<string, Record<string, string>> = {
    buch:  { isbn: 'ISBN', page_count: 'Seiten', publisher: 'Verlag', release_date: 'Erschienen', language: 'Sprache', format: 'Format', price: 'Preis' },
    film:  { director: 'Regie', studio: 'Studio', release_year: 'Jahr', runtime_minutes: 'Laufzeit (min)', fsk: 'FSK', language: 'Sprache' },
    musik: { artist: 'Künstler', label: 'Label', release_date: 'Erschienen', runtime_minutes: 'Laufzeit (min)' },
    spiel: { developer: 'Entwickler', publisher: 'Verlag', release_date: 'Erschienen', platform: 'Plattform', genre: 'Genre', min_players: 'Min. Spieler', max_players: 'Max. Spieler' },
  };

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getReviewById(id).subscribe({
      next: (r) => { this.review.set(r); this.loading.set(false); },
      error: (e) => { this.notFound.set(e.status === 404); this.loading.set(false); },
    });
  }

  detailEntries(details: Record<string, unknown>): { key: string; label: string; value: string }[] {
    const type = this.review()?.media_type ?? '';
    const labels = this.FIELD_LABELS[type] ?? {};
    return Object.entries(details)
      .filter(([k, v]) => k !== 'review_id' && v !== null && v !== undefined && v !== '')
      .map(([k, v]) => ({ key: k, label: labels[k] ?? k, value: String(v) }));
  }
}
```

- [ ] **Schritt 2: Commit**

```bash
git add frontend/src/app/components/review-detail/
git commit -m "feat(frontend): add review-detail component with type-specific metadata"
```

---

## Task 7: search Komponente

**Files:**
- Create: `frontend/src/app/components/search/search.component.ts`

- [ ] **Schritt 1: search.component.ts erstellen**

Datei: `frontend/src/app/components/search/search.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReviewService, Review } from '../../core/services/review.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { ReviewCardComponent } from '../../shared/review-card/review-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HeaderComponent, ReviewCardComponent, FormsModule],
  template: `
    <div class="search-shell">
      <app-header />
      <main class="search-content">
        <form class="search-form" (ngSubmit)="onSearch()">
          <input
            class="search-input"
            type="search"
            [(ngModel)]="query"
            name="q"
            placeholder="Rezensionen durchsuchen…"
            autocomplete="off"
          />
          <button class="search-btn" type="submit">Suchen</button>
        </form>

        @if (error()) {
          <p class="state-msg">Fehler bei der Suche.</p>
        } @else if (searched() && results().length === 0) {
          <p class="state-msg">Keine Ergebnisse für „{{ lastQuery() }}".</p>
        } @else if (results().length > 0) {
          <p class="results-info">{{ results().length }} Ergebnis(se) für „{{ lastQuery() }}"</p>
          <div class="results-grid">
            @for (review of results(); track review.id) {
              <app-review-card [review]="review" />
            }
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .search-shell { padding: 1.4rem; }
    .search-content { padding-top: 1.2rem; }
    .search-form { display: flex; gap: 0.6rem; margin-bottom: 1.4rem; }
    .search-input {
      flex: 1;
      padding: 0.55rem 0.8rem;
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 6px;
      color: #fff;
      font-size: 0.9rem;
    }
    .search-input:focus { outline: none; border-color: #e24b4a; }
    .search-btn {
      padding: 0.55rem 1.1rem;
      background: #e24b4a;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }
    .search-btn:hover { background: #c73c3b; }
    .results-info { color: #888; font-size: 0.8rem; margin-bottom: 1rem; }
    .results-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.9rem;
    }
    .state-msg { color: #888; }
    @media (max-width: 980px) { .results-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 520px) { .results-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reviewService = inject(ReviewService);

  query = '';
  results = signal<Review[]>([]);
  searched = signal(false);
  error = signal(false);
  lastQuery = signal('');

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q') ?? '';
      this.query = q;
      if (q.length >= 2) {
        this.lastQuery.set(q);
        this.reviewService.search(q).subscribe({
          next: (r) => { this.results.set(r); this.searched.set(true); this.error.set(false); },
          error: () => this.error.set(true),
        });
      }
    });
  }

  onSearch(): void {
    const q = this.query.trim();
    if (q.length >= 2) {
      this.router.navigate(['/suche'], { queryParams: { q } });
    }
  }
}
```

- [ ] **Schritt 2: Commit**

```bash
git add frontend/src/app/components/search/
git commit -m "feat(frontend): add search component with query-param routing"
```

---

## Task 8: podcast + redaktion Komponenten

**Files:**
- Create: `frontend/src/app/components/podcast/podcast.component.ts`
- Create: `frontend/src/app/components/redaktion/redaktion.component.ts`

- [ ] **Schritt 1: podcast.component.ts erstellen (statisch)**

Datei: `frontend/src/app/components/podcast/podcast.component.ts`

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';

interface Episode {
  number: number;
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <div class="podcast-shell">
      <app-header />
      <main class="podcast-content">
        <h1 class="page-title">Per Anhalter durch die Phantastik</h1>
        <p class="page-desc">Der Podcast der roterdorn-Redaktion über Bücher, Spiele, Filme und Musik aus der phantastischen Welt.</p>

        <div class="episode-list">
          @for (ep of episodes; track ep.number) {
            <article class="episode-card">
              <div class="ep-number">Folge {{ ep.number }}</div>
              <h2 class="ep-title">{{ ep.title }}</h2>
              <p class="ep-date">{{ ep.date }}</p>
              <p class="ep-desc">{{ ep.description }}</p>
            </article>
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    .podcast-shell { padding: 1.4rem; }
    .podcast-content { padding-top: 1.2rem; max-width: 720px; }
    .page-title { font-size: 1.5rem; margin: 0 0 0.4rem; letter-spacing: -0.02em; }
    .page-desc { color: #888; margin: 0 0 1.8rem; font-size: 0.9rem; }
    .episode-list { display: flex; flex-direction: column; gap: 1rem; }
    .episode-card {
      border: 1px solid #1f1f1f;
      border-radius: 8px;
      padding: 1rem 1.2rem;
    }
    .ep-number { color: #e24b4a; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.3rem; }
    .ep-title { margin: 0 0 0.25rem; font-size: 1rem; }
    .ep-date { margin: 0 0 0.5rem; color: #666; font-size: 0.75rem; }
    .ep-desc { margin: 0; color: #aaa; font-size: 0.85rem; line-height: 1.5; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastComponent {
  readonly episodes: Episode[] = [
    { number: 11, title: 'Pile of Shame', date: '09.10.2020', description: 'Welche Bücher, Spiele und Filme liegen bei euch unberührt auf dem Stapel? Die Redaktion gesteht.' },
    { number: 10, title: 'Jubiläumsepisode – Der Lockdown und wie wir damit umgehen', date: '2020', description: 'Eine besondere Episode in besonderen Zeiten: Wie verändert der Lockdown unsere Mediengewohnheiten?' },
    { number: 9, title: 'Kommunikation am Spieltisch', date: '2020', description: 'Wie redet man beim Spielen miteinander? Über Regelerklärungen, Konflikte und gute Spielkultur.' },
    { number: 8, title: 'Immersion im Rollenspiel', date: '2019', description: 'Wie taucht man tief in eine Rollenspielsitzung ein und was reißt einen heraus?' },
    { number: 7, title: 'Der erste Con-Besuch', date: '2019', description: 'Tipps, Erfahrungen und Anekdoten für alle, die zum ersten Mal auf eine Spieleconvention gehen.' },
    { number: 1, title: 'Pilot', date: '2018', description: 'Die erste Folge des roterdorn-Podcasts: Wer sind wir, was machen wir hier und warum?' },
  ];
}
```

- [ ] **Schritt 2: redaktion.component.ts erstellen**

Datei: `frontend/src/app/components/redaktion/redaktion.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthorService, Author } from '../../core/services/author.service';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-redaktion',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <div class="redaktion-shell">
      <app-header />
      <main class="redaktion-content">
        <h1 class="page-title">Die Redaktion</h1>
        <p class="page-desc">roterdorn.de wird von einem kleinen Team aus Enthusiasten betrieben. Wir schreiben über das, was uns bewegt.</p>

        @if (error()) {
          <p class="state-msg">Autoren konnten nicht geladen werden.</p>
        } @else {
          <div class="author-grid">
            @for (author of authors(); track author.id) {
              <article class="author-card">
                <div class="author-avatar" [attr.aria-label]="author.name">
                  {{ initial(author.name) }}
                </div>
                <h2 class="author-name">{{ author.name }}</h2>
                @if (author.bio) {
                  <p class="author-bio">{{ author.bio }}</p>
                }
                @if (author.email) {
                  <a class="author-email" [href]="'mailto:' + author.email">{{ author.email }}</a>
                }
              </article>
            }
            @empty {
              <p class="state-msg">Keine Autoren gefunden.</p>
            }
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .redaktion-shell { padding: 1.4rem; }
    .redaktion-content { padding-top: 1.2rem; }
    .page-title { font-size: 1.5rem; margin: 0 0 0.4rem; letter-spacing: -0.02em; }
    .page-desc { color: #888; margin: 0 0 1.8rem; font-size: 0.9rem; max-width: 560px; }
    .author-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .author-card {
      border: 1px solid #1f1f1f;
      border-radius: 8px;
      padding: 1.2rem;
    }
    .author-avatar {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: #e24b4a;
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; font-weight: 700;
      margin-bottom: 0.8rem;
    }
    .author-name { margin: 0 0 0.5rem; font-size: 1rem; }
    .author-bio { color: #aaa; font-size: 0.82rem; line-height: 1.5; margin: 0 0 0.6rem; }
    .author-email { color: #e24b4a; font-size: 0.78rem; text-decoration: none; }
    .author-email:hover { text-decoration: underline; }
    .state-msg { color: #888; }
    @media (max-width: 600px) { .author-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedaktionComponent {
  private authorService = inject(AuthorService);

  authors = signal<Author[]>([]);
  error = signal(false);

  constructor() {
    this.authorService.getAuthors().subscribe({
      next: (authors) => this.authors.set(authors),
      error: () => this.error.set(true),
    });
  }

  initial(name: string): string {
    return name.charAt(0).toUpperCase();
  }
}
```

- [ ] **Schritt 3: Commit**

```bash
git add frontend/src/app/components/podcast/ frontend/src/app/components/redaktion/
git commit -m "feat(frontend): add podcast (static) and redaktion components"
```

---

## Task 9: Alle Routen verdrahten

**Files:**
- Modify: `frontend/src/app/core/routes.ts`

- [ ] **Schritt 1: routes.ts mit allen Routen**

Datei: `frontend/src/app/core/routes.ts`

```typescript
import { Routes } from '@angular/router';
import { ReviewListComponent } from '../components/review-list/review-list.component';
import { AddReviewComponent } from '../components/add-review/add-review.component';
import { CategoryListComponent } from '../components/category-list/category-list.component';
import { ReviewDetailComponent } from '../components/review-detail/review-detail.component';
import { SearchComponent } from '../components/search/search.component';
import { PodcastComponent } from '../components/podcast/podcast.component';
import { RedaktionComponent } from '../components/redaktion/redaktion.component';

export const routes: Routes = [
  { path: '', component: ReviewListComponent },

  { path: 'buch',  component: CategoryListComponent, data: { type: 'buch' } },
  { path: 'film',  component: CategoryListComponent, data: { type: 'film' } },
  { path: 'musik', component: CategoryListComponent, data: { type: 'musik' } },
  { path: 'spiel', component: CategoryListComponent, data: { type: 'spiel' } },

  { path: 'buch/:id',  component: ReviewDetailComponent, data: { type: 'buch' } },
  { path: 'film/:id',  component: ReviewDetailComponent, data: { type: 'film' } },
  { path: 'musik/:id', component: ReviewDetailComponent, data: { type: 'musik' } },
  { path: 'spiel/:id', component: ReviewDetailComponent, data: { type: 'spiel' } },

  { path: 'suche',     component: SearchComponent },
  { path: 'podcast',   component: PodcastComponent },
  { path: 'redaktion', component: RedaktionComponent },
  { path: 'add',       component: AddReviewComponent },

  { path: '**', redirectTo: '' },
];
```

- [ ] **Schritt 2: Vollständig testen**

Backend starten: `cd backend && python app.py`
Frontend starten: `cd frontend && npm start`

Checkliste:
- [ ] `/` → Startseite mit Hero + 4 Karten, Hero-Cover-Bild sichtbar
- [ ] `/buch` → Buchrezensionen (gefiltert aus DB oder Fehlermeldung)
- [ ] `/buch/1` → Detailseite "Spiel mir das Lied vom Goblin" mit ISBN, Seiten, Verlag
- [ ] `/film/3` → Detailseite "8 Blickwinkel" mit Regie, Studio, Laufzeit
- [ ] `/suche?q=goblin` → Suchergebnis mit Cover
- [ ] `/suche` → Leere Suchseite, Eingabe möglich
- [ ] `/podcast` → 6 Episoden sichtbar
- [ ] `/redaktion` → 4 Autoren (bei laufendem Backend) oder Fehlermeldung
- [ ] `/add` → Formular mit korrekten Kategorie-Werten (buch/film/musik/spiel)
- [ ] Header-Links aktiv-hervorgehoben bei aktiver Route

- [ ] **Schritt 3: Final Commit**

```bash
git add frontend/src/app/core/routes.ts
git commit -m "feat(frontend): wire all routes — category, detail, search, podcast, redaktion"
```

---

## Abschluss

```bash
git log --oneline -10
```

Erwartete Commits (in Reihenfolge):
1. `refactor: rename features/ to components/, fix header nav routes`
2. `feat(backend): fix search fields, add pagination, add /api/authors`
3. `feat(services): extend ReviewService, add AuthorService`
4. `feat(frontend): extract review-card, update review-list with real covers and links`
5. `feat(frontend): add category-list component`
6. `feat(frontend): add review-detail component with type-specific metadata`
7. `feat(frontend): add search component with query-param routing`
8. `feat(frontend): add podcast (static) and redaktion components`
9. `feat(frontend): wire all routes — category, detail, search, podcast, redaktion`
