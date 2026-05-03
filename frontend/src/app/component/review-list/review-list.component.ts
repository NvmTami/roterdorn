import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Review, ReviewService } from '../../review.service';

interface HomeReview extends Review {
  author: string;
  date: string;
}

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewListComponent {
  private readonly reviewService = inject(ReviewService);

  reviews = signal<HomeReview[]>([
    {
      title: 'Spiel mir das Lied vom Goblin',
      category: 'Buch',
      rating: 5,
      comment:
        'Der Tag, an dem Terry Pratchett starb, war ein schwarzer Tag fur die Fantasyliteratur. Der Meister der Fusnoten hat eine grosse Lucke hinterlassen, die niemand fullen kann.',
      author: 'Joanna Muller-Lenz',
      date: '02.05.2026',
    },
    {
      title: '8 Blickwinkel',
      category: 'Film',
      rating: 4,
      comment: 'Perspektivwechsel mit messerscharfem Timing und einem Finale, das nachhallt.',
      author: 'Leonardo Beckert',
      date: '01.05.2026',
    },
    {
      title: 'Fix8Sed8 Secret Gig',
      category: 'Musik',
      rating: 4,
      comment: 'Ein druckvoller Live-Mitschnitt zwischen Industrial und dunklem Pop.',
      author: 'Marcus Pohlmann',
      date: '29.04.2026',
    },
    {
      title: 'Shadow Cards',
      category: 'Spiel',
      rating: 4,
      comment: 'Deckbuilding mit eleganter Risiko-Mechanik und viel Atmosphare.',
      author: 'Marcus Pohlmann',
      date: '26.04.2026',
    },
    {
      title: 'Noch funf Tage',
      category: 'Buch',
      rating: 4,
      comment: 'Ein ruhiger Roman uber Aufbruch, Verlust und letzte Chancen.',
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

        const mappedReviews: HomeReview[] = reviews.map((review, index) => ({
          ...review,
          author: this.authorForCategory(review.category),
          date: this.dateFromIndex(index),
        }));

        this.reviews.set(mappedReviews);
      },
      error: () => {
        // Keep seeded content when backend is not reachable.
      },
    });
  }

  mapCategory(category: string): string {
    const normalized = this.normalizeCategory(category);

    if (normalized === 'buch') {
      return 'Buch';
    }
    if (normalized === 'film') {
      return 'Film';
    }
    if (normalized === 'musik') {
      return 'Musik';
    }
    if (normalized === 'spiel') {
      return 'Spiel';
    }

    return 'Rezension';
  }

  normalizeCategory(category: string): string {
    const value = category.trim().toLowerCase();

    if (value.startsWith('buch')) {
      return 'buch';
    }
    if (value.startsWith('film')) {
      return 'film';
    }
    if (value.startsWith('musik')) {
      return 'musik';
    }
    if (value.startsWith('spiel')) {
      return 'spiel';
    }

    return 'default';
  }

  private authorForCategory(category: string): string {
    const normalized = this.normalizeCategory(category);

    if (normalized === 'film') {
      return 'Leonardo Beckert';
    }
    if (normalized === 'musik' || normalized === 'spiel') {
      return 'Marcus Pohlmann';
    }

    return 'Martin Wagner';
  }

  private dateFromIndex(index: number): string {
    const date = new Date();
    date.setDate(date.getDate() - index * 2);

    return date.toLocaleDateString('de-DE');
  }
}