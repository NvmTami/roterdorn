import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    this.reviewService.getReviews().pipe(takeUntilDestroyed()).subscribe({
      next: (reviews) => { if (reviews.length > 0) this.reviews.set(reviews); },
      error: () => { /* Fallback-Daten bleiben */ },
    });
  }
}
