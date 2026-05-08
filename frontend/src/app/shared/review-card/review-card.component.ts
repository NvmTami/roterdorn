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
        <div class="card-body">
          <p class="card-category">{{ review().media_type | mediaType }}</p>
          <h3>{{ review().title }}</h3>
          <p class="card-author">{{ review().author_name }}</p>
        </div>
      </a>
    </article>
  `,
  styles: [`
    .card {
      border-radius: 8px;
      overflow: hidden;
      background: var(--brand-surface-card);
      border: 1px solid var(--brand-border);
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      border-color: #2e2e2e;
    }
    .card-link {
      text-decoration: none;
      color: inherit;
      display: block;
      padding: 0;
    }
    .card-cover {
      aspect-ratio: 3 / 4;
      width: 100%;
      object-fit: cover;
      display: block;
      transition: opacity 0.2s ease;
    }
    .card:hover .card-cover { opacity: 0.9; }
    .card-cover-placeholder { display: block; }
    .category-film  { background: linear-gradient(160deg, #1a2440, #0a1224); }
    .category-musik { background: linear-gradient(160deg, #2a1a30, #100818); }
    .category-spiel { background: linear-gradient(160deg, #1a3028, #08180e); }
    .category-buch  { background: linear-gradient(160deg, #302418, #18100a); }
    .card-body {
      padding: 0.65rem 0.75rem 0.75rem;
    }
    .card-category {
      margin: 0;
      color: var(--brand-accent);
      font-size: 0.64rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .card h3 {
      margin: 0.22rem 0 0.2rem;
      font-size: 0.78rem;
      line-height: 1.3;
      transition: color 0.15s ease;
    }
    .card:hover h3 { color: var(--brand-accent); }
    .card-author { margin: 0; color: #666; font-size: 0.68rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardComponent {
  review = input.required<Review>();
}
