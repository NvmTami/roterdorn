import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReviewDetail, ReviewService } from '../../core/services/review.service';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RatingVineComponent } from '../../shared/components/rating-vine/rating-vine.component';
import { CoverPlaceholderComponent } from '../../shared/components/cover-placeholder/cover-placeholder.component';

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
    CoverPlaceholderComponent,
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
  coverBroken = signal(false);

  onCoverError(): void {
    this.coverBroken.set(true);
  }

  displayRating = computed(() => toDisplayRating(this.review()?.rating));

  safeContent = computed((): SafeHtml =>
    this.sanitizer.bypassSecurityTrustHtml(
      this.addDropCap(this.review()?.content ?? '')
    )
  );

  /**
   * Injects `class="drop-cap"` on the first *body* paragraph so the
   * editorial drop-cap style fires on the right letter.
   *
   * Three cases:
   *  1. Plain text (no <p> tags) – entire content is the body; wrap it.
   *  2. HTML with a heading: first <p> after the heading gets the class.
   *  3. HTML without a heading: the second <p> gets the class.
   */
  private addDropCap(html: string): string {
    const s = html.trim();
    if (!s) return s;

    // Case 1: plain text — the content itself is the main body
    if (!/<p[\s>]/i.test(s)) {
      return `<p class="drop-cap">${s}</p>`;
    }

    // Case 2: first <p> after a heading element
    let found = false;
    const afterHeading = s.replace(
      /(<\/h[2-6]>)([\s]*)(<p)([\s>])/i,
      (_m, close, gap, _p, tail) => {
        found = true;
        return `${close}${gap}<p class="drop-cap"${tail}`;
      }
    );
    if (found) return afterHeading;

    // Case 3: second <p>
    let nth = 0;
    return s.replace(/<p([\s>])/gi, (_m, tail) => {
      nth++;
      return nth === 2 ? `<p class="drop-cap"${tail}` : `<p${tail}`;
    });
  }

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
