import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

const RATING_MIN = 0;
const RATING_MAX = 10;

interface Pip {
  readonly filled: boolean;
}

const clampRating = (raw: number): number => {
  if (Number.isNaN(raw)) return RATING_MIN;
  return Math.max(RATING_MIN, Math.min(RATING_MAX, Math.round(raw)));
};

/**
 * Compact rating used on cards, hero, and search results.
 *
 * Renders the brand triangle as a unit pip, mirroring the logo so the
 * rating reads as a brand signature rather than a generic star bar.
 */
@Component({
  selector: 'app-card-rating',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card-rating" [attr.aria-label]="ariaLabel()">
      <span class="card-rating__pips" aria-hidden="true">
        @for (pip of pips(); track $index) {
          <span
            [ngClass]="{
              'card-rating__pip': true,
              'card-rating__pip--empty': !pip.filled
            }"
          ></span>
        }
      </span>
      <span class="card-rating__text">{{ clampedRating() }}/{{ maxRating }}</span>
    </div>
  `,
  /* Styles for `.card-rating*` live globally in styles.scss
     so the same look applies wherever the component is dropped. */
})
export class CardRatingComponent {
  /** Rating value on a 0-10 scale. Out-of-range values are clamped. */
  readonly rating = input<number>(0);

  protected readonly maxRating = RATING_MAX;

  protected readonly clampedRating = computed(() => clampRating(this.rating()));

  protected readonly pips = computed<readonly Pip[]>(() => {
    const filledCount = this.clampedRating();
    return Array.from({ length: RATING_MAX }, (_, position) => ({
      filled: position < filledCount,
    }));
  });

  protected readonly ariaLabel = computed(
    () => `Bewertung ${this.clampedRating()} von ${RATING_MAX}`,
  );
}
