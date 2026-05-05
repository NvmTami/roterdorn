# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RoterDorn** — A school project migrating the WordPress-based site roterdorn.de to Angular 21 + Flask + MySQL. Presentation: 21.05.2026.

## Commands

### Frontend (run from `frontend/`)
```bash
npm install          # install dependencies
npm start            # dev server at http://localhost:4200
npm run build        # production build
npm test             # run tests via Vitest
ng serve --open      # alternative to npm start, opens browser
```

### Backend (run from `backend/`)
```bash
pip install -r requirements.txt
python app.py        # API at http://localhost:5000
```

Backend config via environment variables: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (default: `roterdorn`), `FLASK_DEBUG`, `PORT`, `CORS_ORIGINS`.

### Database
```bash
mysql -u root -p < database/schema_new.sql   # create tables
mysql -u root -p < database/seed_data.sql    # insert sample data
```
Insert order matters due to foreign keys: `authors` → `reviews` → `*_details`.

## Architecture

### Frontend (Angular 21, SSR enabled)
- Uses **standalone components** throughout — no NgModule
- `src/app/core/routes.ts` defines the routes (not `app.routes.ts`, which is unused/legacy)
- `src/environments/environment.ts` holds `apiUrl` (`http://localhost:5000/api`) — change here for production
- `ReviewService` (`core/services/`) is the single HTTP abstraction; all components use it via `inject()`
- `ReviewListComponent` seeds hardcoded fallback reviews so the page renders even without a running backend; it replaces them with live data on success

**Directory layout:**
- `components/` — page-level components (`review-list`, `add-review`)
- `layout/` — structural UI (`header`)
- `shared/` — reusable pieces (`MediaTypePipe`, `BrandLogoComponent`, brand constants)
- `core/` — routes, services

### Backend (Flask)
- Single entry point: `backend/app.py` — registers one blueprint and configures CORS
- All routes live in `backend/routes/reviews.py` under prefix `/api`
- No ORM — raw `mysql-connector-python` connections via `db.get_db()`, closed in `finally` blocks
- SQL injection is prevented by a `DETAIL_TABLES` whitelist dict (detail table names never come from user input)

**API endpoints:**
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/reviews` | List reviews; optional `?type=buch\|film\|musik\|spiel` and `?limit=N` |
| GET | `/api/reviews/<id>` | Single review with type-specific `details` object |
| POST | `/api/reviews` | Add review (fields: `title`, `category`, `rating`, `comment`) |
| GET | `/api/stats` | Counts and average ratings per media type |
| GET | `/api/search?q=` | Full-text search (min 2 chars) |

### Database Schema
`reviews` is the central table with `media_type ENUM('buch','film','musik','spiel')`. Each type has a companion detail table (`book_details`, `film_details`, `music_details`, `game_details`) linked 1:1 via `review_id`. `published_at IS NULL` means draft — all API queries filter for published reviews only.
