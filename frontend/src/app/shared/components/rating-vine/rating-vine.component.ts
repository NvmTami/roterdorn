import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

/**
 * Geometry of a single thorn sitting on the vine.
 *
 * A thorn is rendered as a small triangle: it shares a base on the vine
 * and points upward. Each thorn is filled if its index is within the
 * current rating, otherwise drawn as an outline.
 */
interface ThornGeometry {
  readonly path: string;
  readonly filled: boolean;
}

/* ── SVG canvas constants ───────────────────────────────── */

const VIEW_BOX_WIDTH = 400;
const VIEW_BOX_HEIGHT = 40;
const VINE_PADDING_X = 12;
const VINE_BASELINE_Y = 26;
const VINE_WAVE_AMPLITUDE = 4;

const THORN_HEIGHT = 14;
const THORN_BASE_HALF_WIDTH = 4;
const THORN_TIP_OFFSET_X = 2;

const RATING_MIN = 0;
const RATING_MAX = 10;
const TOTAL_THORNS = 10;

const VINE_SEGMENT_COUNT = 6;
const VINE_SEGMENT_WIDTH =
  (VIEW_BOX_WIDTH - 2 * VINE_PADDING_X) / VINE_SEGMENT_COUNT;

/**
 * Builds the cubic-Bezier "d" attribute for the underlying vine.
 *
 * The vine is one continuous wave with subtle vertical movement so it
 * reads as organic growth rather than a fence rail.
 */
const buildVinePath = (): string => {
  const startX = VINE_PADDING_X;
  const segmentCount = VINE_SEGMENT_COUNT;
  const segmentWidth = VINE_SEGMENT_WIDTH;

  const points: string[] = [`M ${startX} ${VINE_BASELINE_Y}`];

  for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex++) {
    const segmentStartX = startX + segmentIndex * segmentWidth;
    const controlX = segmentStartX + segmentWidth / 2;
    const targetX = segmentStartX + segmentWidth;
    const verticalOffset =
      segmentIndex % 2 === 0 ? -VINE_WAVE_AMPLITUDE : VINE_WAVE_AMPLITUDE;
    const controlY = VINE_BASELINE_Y + verticalOffset;
    points.push(`Q ${controlX} ${controlY}, ${targetX} ${VINE_BASELINE_Y}`);
  }

  return points.join(' ');
};

const VINE_PATH = buildVinePath();

/**
 * Returns the x-coordinate where thorn `index` (1-based) sits on the vine.
 */
const computeThornX = (index: number): number => {
  const usableWidth = VIEW_BOX_WIDTH - 2 * VINE_PADDING_X;
  const stepWidth = usableWidth / (TOTAL_THORNS - 1);
  return VINE_PADDING_X + (index - 1) * stepWidth;
};

/**
 * Returns the exact y-coordinate on the vine wave at a given x.
 *
 * Each quadratic Bézier segment has a symmetric control point, which
 * makes x linear in the curve parameter t.  That lets us solve for t
 * analytically and evaluate the true y without numerical iteration.
 *
 * Formula: y(t) = VINE_BASELINE_Y + 2·t·(1−t)·verticalOffset
 * where t = (x − segmentStartX) / VINE_SEGMENT_WIDTH
 */
const computeVineY = (x: number): number => {
  const relativeX = x - VINE_PADDING_X;
  const segmentIndex = Math.min(
    Math.floor(relativeX / VINE_SEGMENT_WIDTH),
    VINE_SEGMENT_COUNT - 1,
  );
  const segmentStartX = VINE_PADDING_X + segmentIndex * VINE_SEGMENT_WIDTH;
  const t = (x - segmentStartX) / VINE_SEGMENT_WIDTH;
  const verticalOffset =
    segmentIndex % 2 === 0 ? -VINE_WAVE_AMPLITUDE : VINE_WAVE_AMPLITUDE;
  return VINE_BASELINE_Y + 2 * t * (1 - t) * verticalOffset;
};

/**
 * Builds the SVG path of a single thorn anchored at anchorX on the vine.
 * All three base points are snapped to the vine curve so the thorn sits
 * flush even where the vine is not horizontal.
 * Thorns alternate their tip direction so the row reads as organic growth.
 */
const buildThornPath = (anchorX: number, index: number): string => {
  const baseLeftX  = anchorX - THORN_BASE_HALF_WIDTH;
  const baseRightX = anchorX + THORN_BASE_HALF_WIDTH;
  const baseLeftY  = computeVineY(baseLeftX);
  const baseRightY = computeVineY(baseRightX);
  const baseY      = computeVineY(anchorX);

  const leansLeft = index % 2 === 0;
  const tipX = anchorX + (leansLeft ? -THORN_TIP_OFFSET_X : THORN_TIP_OFFSET_X);
  const tipY = baseY - THORN_HEIGHT;

  return [
    `M ${baseLeftX} ${baseLeftY}`,
    `L ${tipX} ${tipY}`,
    `L ${baseRightX} ${baseRightY}`,
    'Z',
  ].join(' ');
};

const clampRating = (raw: number): number => {
  if (Number.isNaN(raw)) return RATING_MIN;
  return Math.max(RATING_MIN, Math.min(RATING_MAX, Math.round(raw)));
};

@Component({
  selector: 'app-rating-vine',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rating-vine">
      <header class="rating-vine__head">
        <span class="rating-vine__label">{{ label() }}</span>
        <span class="rating-vine__value">
          {{ clampedRating() }}<span class="rating-vine__denom">/{{ maxRating }}</span>
        </span>
      </header>

      <svg
        class="rating-vine__svg"
        [attr.viewBox]="viewBox"
        preserveAspectRatio="none"
        role="img"
        [attr.aria-label]="ariaLabel()"
      >
        <path class="rating-vine__stem-bg" [attr.d]="vinePath" />
        <path
          class="rating-vine__stem"
          [attr.d]="vinePath"
          [attr.stroke-dasharray]="stemDashArray()"
        />
        @for (thorn of thorns(); track $index) {
          <path
            [attr.d]="thorn.path"
            [ngClass]="{
              'rating-vine__thorn': true,
              'rating-vine__thorn--filled': thorn.filled,
              'rating-vine__thorn--empty': !thorn.filled
            }"
          />
        }
      </svg>

      <div class="rating-vine__scale" aria-hidden="true">
        <span>1</span><span>5</span><span>10</span>
      </div>
    </div>
  `,
  styles: [`
    .rating-vine {
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: var(--border-radius-md);
      padding: 18px 20px;
    }

    .rating-vine__head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    .rating-vine__label {
      font-family: var(--font-sans);
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-dim);
    }

    .rating-vine__value {
      font-family: var(--font-serif);
      font-size: 32px;
      font-weight: 500;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      line-height: 1;
    }

    .rating-vine__denom {
      color: var(--text-dim);
      font-size: 18px;
      font-weight: 400;
    }

    .rating-vine__svg {
      display: block;
      width: 100%;
      height: 40px;
    }

    .rating-vine__stem-bg {
      fill: none;
      stroke: var(--accent-dim);
      stroke-width: 0.75;
    }

    .rating-vine__stem {
      fill: none;
      stroke: var(--accent);
      stroke-width: 1.5;
      stroke-linecap: round;
    }

    .rating-vine__thorn--filled {
      fill: var(--accent);
      stroke: none;
    }

    .rating-vine__thorn--empty {
      fill: none;
      stroke: var(--accent-dim);
      stroke-width: 0.75;
    }

    .rating-vine__scale {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-sans);
      font-size: 11px;
      color: var(--text-dim);
      margin-top: 4px;
      padding: 0 4px;
    }
  `],
})
export class RatingVineComponent {
  /** Rating value on a 0-10 scale. Out-of-range values are clamped. */
  readonly rating = input<number>(0);

  /** Label rendered above the value. */
  readonly label = input<string>('Bewertung');

  protected readonly maxRating = RATING_MAX;
  protected readonly viewBox = `0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`;
  protected readonly vinePath = VINE_PATH;

  protected readonly clampedRating = computed(() => clampRating(this.rating()));

  protected readonly thorns = computed<readonly ThornGeometry[]>(() => {
    const filledCount = this.clampedRating();
    return Array.from({ length: TOTAL_THORNS }, (_, position) => {
      const index = position + 1;
      const anchorX = computeThornX(index);
      return {
        path: buildThornPath(anchorX, index),
        filled: index <= filledCount,
      };
    });
  });

  /**
   * Drives the highlighted stem segment to match the rating.
   * SVG renders the dasharray as visible/gap pairs; we visualise the
   * coloured stem only up to the proportion of the filled rating.
   * The number is approximate (the path length is not measured) but
   * good enough as a visual cue alongside the thorns.
   */
  protected readonly stemDashArray = computed(() => {
    const filledLength = (this.clampedRating() / RATING_MAX) * VIEW_BOX_WIDTH;
    const remainingLength = VIEW_BOX_WIDTH - filledLength;
    return `${filledLength} ${remainingLength}`;
  });

  protected readonly ariaLabel = computed(
    () => `${this.label()}: ${this.clampedRating()} von ${RATING_MAX}`,
  );
}
