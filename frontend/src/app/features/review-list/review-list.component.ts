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

  reviews = signal<HomeReview[]>([
    {
      id: 0,
      title: 'Spiel mir das Lied vom Goblin',
      media_type: 'buch',
      rating: 5,
      excerpt:
        'Der Tag, an dem Terry Pratchett starb, war ein schwarzer Tag fur die Fantasyliteratur. Der Meister der Fusnoten hat eine grosse Lucke hinterlassen, die niemand fullen kann.',
      published_at: '2026-05-02',
      cover_url: null,
      author_name: 'Joanna Muller-Lenz',
      author: 'Joanna Muller-Lenz',
      date: '02.05.2026',
    },
    {
      id: 0,
      title: '8 Blickwinkel',
      media_type: 'film',
      rating: 4,
      excerpt: 'Perspektivwechsel mit messerscharfem Timing und einem Finale, das nachhallt.',
      published_at: '2026-05-01',
      cover_url: null,
      author_name: 'Leonardo Beckert',
      author: 'Leonardo Beckert',
      date: '01.05.2026',
    },
    {
      id: 0,
      title: 'Fix8Sed8 Secret Gig',
      media_type: 'musik',
      rating: 4,
      excerpt: 'Ein druckvoller Live-Mitschnitt zwischen Industrial und dunklem Pop.',
      published_at: '2026-04-29',
      cover_url: null,
      author_name: 'Marcus Pohlmann',
      author: 'Marcus Pohlmann',
      date: '29.04.2026',
    },
    {
      id: 0,
      title: 'Shadow Cards',
      media_type: 'spiel',
      rating: 4,
      excerpt: 'Deckbuilding mit eleganter Risiko-Mechanik und viel Atmosphare.',
      published_at: '2026-04-26',
      cover_url: null,
      author_name: 'Marcus Pohlmann',
      author: 'Marcus Pohlmann',
      date: '26.04.2026',
    },
    {
      id: 0,
      title: 'Noch funf Tage',
      media_type: 'buch',
      rating: 4,
      excerpt: 'Ein ruhiger Roman uber Aufbruch, Verlust und letzte Chancen.',
      published_at: '2026-04-24',
      cover_url: null,
      author_name: 'Martin Wagner',
      author: 'Martin Wagner',
      date: '24.04.2026',
    },
  ]);

  featuredReview = computed(() => this.reviews()[0]);
  editorialReviews = computed(() => this.reviews().slice(1, 5));

  constructor() {
    this.reviewService.getReviews().subscribe({
      next: (reviews) => {
        if (reviews.length === 0) {
          return;
        }

        const mappedReviews: HomeReview[] = reviews.map((review) => ({
          ...review,
          author: review.author_name,
          date: new Date(review.published_at).toLocaleDateString('de-DE'),
        }));

        this.reviews.set(mappedReviews);
      },
      error: () => {
        // Keep seeded content when backend is not reachable.
      },
    });
  }

}