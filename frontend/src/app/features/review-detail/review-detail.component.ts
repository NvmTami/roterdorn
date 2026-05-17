import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReviewDetail, ReviewService } from '../../core/services/review.service';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RatingVineComponent } from '../../shared/components/rating-vine/rating-vine.component';

const DETAIL_LABELS: Record<string, string> = {
  publisher:    'Verlag',
  isbn:         'ISBN',
  page_count:   'Seiten',
  language:     'Sprache',
  format:       'Format',
  release_date: 'Erschienen',
  price:        'Preis',
  director:     'Regie',
  runtime:      'Laufzeit',
  studio:       'Studio',
  artist:       'Künstler',
  label:        'Label',
  platforms:    'Plattformen',
  developer:    'Entwickler',
  players:      'Spieler',
};

/**
 * Convert a 0-5 stored rating into the 0-10 display scale used across
 * the editorial UI. Returns 0 when the rating is missing.
 */
const toDisplayRating = (storedRating: number | string | undefined): number => {
  const numeric = parseFloat(String(storedRating ?? 0));
  if (Number.isNaN(numeric)) return 0;
  return Math.round(numeric * 2);
};

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MediaTypePipe,
    HeaderComponent,
    FooterComponent,
    RatingVineComponent,
  ],
  templateUrl: './review-detail.component.html',
  styleUrl: './review-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDetailComponent {
  private readonly route     = inject(ActivatedRoute);
  private readonly service   = inject(ReviewService);
  private readonly sanitizer = inject(DomSanitizer);

  review  = signal<ReviewDetail | null>(null);
  loading = signal(true);
  error   = signal(false);

  displayRating = computed(() => toDisplayRating(this.review()?.rating));

  safeContent = computed((): SafeHtml =>
    this.sanitizer.bypassSecurityTrustHtml(this.review()?.content ?? '')
  );

  detailEntries = computed(() => {
    const details = this.review()?.details;
    if (!details) return [];
    return Object.entries(details)
      .filter(([key]) => key !== 'review_id')
      .map(([key, value]) => ({
        label: DETAIL_LABELS[key] ?? key,
        value: String(value),
      }));
  });

  constructor() {
    const reviewId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getReview(reviewId).subscribe({
      next: (loadedReview) => {
        this.review.set(loadedReview);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
