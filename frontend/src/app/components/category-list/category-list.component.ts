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
