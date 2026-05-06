import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReviewDetail, ReviewService } from '../../core/services/review.service';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';
import { HeaderComponent } from '../../layout/header/header.component';

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

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, MediaTypePipe, HeaderComponent],
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

  readonly maxRating    = 10;
  readonly ratingMarkers = Array.from({ length: 10 }, (_, i) => i + 1);

  displayRating = computed(() =>
    Math.round(parseFloat(String(this.review()?.rating ?? 0)) * 2)
  );

  safeContent = computed((): SafeHtml =>
    this.sanitizer.bypassSecurityTrustHtml(this.review()?.content ?? '')
  );

  detailEntries = computed(() => {
    const d = this.review()?.details;
    if (!d) return [];
    return Object.entries(d)
      .filter(([k]) => k !== 'review_id')
      .map(([k, v]) => ({
        label: DETAIL_LABELS[k] ?? k,
        value: String(v),
      }));
  });

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getReview(id).subscribe({
      next: (r) => { this.review.set(r); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); },
    });
  }
}
