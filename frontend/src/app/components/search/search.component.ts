import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
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
    this.route.queryParamMap.pipe(
      takeUntilDestroyed(),
      switchMap((params) => {
        const q = params.get('q') ?? '';
        this.query = q;
        if (q.length >= 2) {
          this.lastQuery.set(q);
          return this.reviewService.search(q);
        }
        return of([]);
      }),
    ).subscribe({
      next: (r) => { this.results.set(r); this.searched.set(true); this.error.set(false); },
      error: () => this.error.set(true),
    });
  }

  onSearch(): void {
    const q = this.query.trim();
    if (q.length >= 2) {
      this.router.navigate(['/suche'], { queryParams: { q } });
    }
  }
}
