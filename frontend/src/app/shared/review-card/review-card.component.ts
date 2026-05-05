import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaTypePipe } from '../pipes/media-type.pipe';
import { Review } from '../../core/services/review.service';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [RouterLink, MediaTypePipe],
  template: `
    <article class="card">
      <a [routerLink]="['/' + review().media_type, review().id]" class="card-link">
        @if (review().cover_url) {
          <img class="card-cover" [src]="review().cover_url" [alt]="'Cover von ' + review().title" />
        } @else {
          <div class="card-cover card-cover-placeholder" [class]="'category-' + review().media_type"></div>
        }
        <p class="card-category">{{ review().media_type | mediaType }}</p>
        <h3>{{ review().title }}</h3>
        <p class="card-author">{{ review().author_name }}</p>
      </a>
    </article>
  `,
  styles: [`
    .card-link { text-decoration: none; color: inherit; display: block; }
    .card-cover {
      aspect-ratio: 2 / 3;
      border-radius: 4px;
      margin-bottom: 0.65rem;
      width: 100%;
      object-fit: cover;
    }
    .card-cover-placeholder { display: block; }
    .category-film  { background: linear-gradient(135deg, #1a2440, #0a1224); }
    .category-musik { background: linear-gradient(135deg, #2a1a30, #100818); }
    .category-spiel { background: linear-gradient(135deg, #1a3028, #08180e); }
    .category-buch  { background: linear-gradient(135deg, #302418, #18100a); }
    .card-category {
      margin: 0;
      color: #e24b4a;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .card h3 { margin: 0.25rem 0 0.2rem; font-size: 0.8rem; line-height: 1.3; }
    .card-author { margin: 0; color: #777; font-size: 0.72rem; }
    .card-link:hover h3 { color: var(--brand-accent); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardComponent {
  review = input.required<Review>();
}
