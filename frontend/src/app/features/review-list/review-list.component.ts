import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Review, ReviewService } from '../../core/services/review.service';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';
import { HeaderComponent } from '../../layout/header/header.component';

interface HomeReview extends Review {
  author: string;
  date: string;
}

const FILTER_TO_TYPE: Record<string, string | undefined> = {
  alle:    undefined,
  buecher: 'buch',
  filme:   'film',
  musik:   'musik',
  spiele:  'spiel',
};

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MediaTypePipe, HeaderComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewListComponent {
  private readonly reviewService = inject(ReviewService);

  reviews  = signal<HomeReview[]>([]);
  loading  = signal(true);
  error    = signal(false);

  private readonly PAGE_SIZE = 12;
  visibleCount = signal(this.PAGE_SIZE);

  featuredReview   = computed(() => this.reviews()[0] ?? null);
  editorialReviews = computed(() => this.reviews().slice(1, this.visibleCount() + 1));
  hasMore          = computed(() => this.reviews().length > this.visibleCount() + 1);

  loadMore(): void {
    this.visibleCount.update(n => n + this.PAGE_SIZE);
  }

  readonly activeFilter = signal('alle');

  readonly filterTabs = [
    { label: 'Alle',    value: 'alle'    },
    { label: 'Bücher',  value: 'buecher' },
    { label: 'Filme',   value: 'filme'   },
    { label: 'Musik',   value: 'musik'   },
    { label: 'Spiele',  value: 'spiele'  },
  ];

  setFilter(value: string): void {
    this.activeFilter.set(value);
    this.visibleCount.set(this.PAGE_SIZE);
    this.loadReviews(FILTER_TO_TYPE[value]);
  }

  constructor() {
    this.loadReviews(undefined);
  }

  private loadReviews(mediaType: string | undefined): void {
    this.loading.set(true);
    this.error.set(false);
    this.reviewService.getReviews(mediaType).subscribe({
      next: (reviews) => {
        this.reviews.set(
          reviews.map((r) => ({
            ...r,
            author: r.author_name,
            date: new Date(r.published_at).toLocaleDateString('de-DE'),
          }))
        );
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}