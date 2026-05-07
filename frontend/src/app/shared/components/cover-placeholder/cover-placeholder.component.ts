import { Component } from '@angular/core';

/**
 * Branded dummy cover for reviews without a cover image.
 * Shows the roterdorn thorn triangle on a dark editorial background.
 * Sized entirely by the host element – apply aspect-ratio / width on
 * the host or via a CSS class from the parent.
 */
@Component({
  selector: 'app-cover-placeholder',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 150 200"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <!-- background -->
      <rect width="150" height="200" fill="#1c0a08" />
      <rect width="150" height="200" fill="url(#cph-grad)" />

      <defs>
        <linearGradient id="cph-grad" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%"   stop-color="#4a1410" stop-opacity="1" />
          <stop offset="100%" stop-color="#0e0807" stop-opacity="1" />
        </linearGradient>
      </defs>

      <!-- subtle cross-hatch lines for texture -->
      <line x1="0"   y1="200" x2="150" y2="0"   stroke="rgba(230,57,70,0.06)" stroke-width="40" />
      <line x1="-30" y1="200" x2="120" y2="0"   stroke="rgba(230,57,70,0.04)" stroke-width="20" />

      <!-- brand thorn triangle, centred ~y=88 -->
      <!-- original path: M 0 0 L 71 25 L 0 50 Z  (viewBox 0 0 71 50) -->
      <!-- scale 1.35 → 95.85 × 67.5; centroid at (71/3,25)≈(23.7,25) → (32,33.75) after scale -->
      <!-- translate so centroid lands at (75, 90) → tx=75-32=43, ty=90-33.75=56.25 -->
      <path
        d="M 0 0 L 71 25 L 0 50 Z"
        transform="translate(43, 56) scale(1.35)"
        fill="#e63946"
        opacity="0.88"
      />

      <!-- faint vertical vine / stem -->
      <line
        x1="75" y1="145" x2="75" y2="168"
        stroke="rgba(230,57,70,0.25)"
        stroke-width="1.5"
        stroke-linecap="round"
      />

      <!-- wordmark -->
      <text
        x="75"
        y="183"
        text-anchor="middle"
        font-family="'Space Grotesk', system-ui, sans-serif"
        font-size="11"
        font-weight="500"
        letter-spacing="0.18em"
        fill="rgba(240,236,228,0.28)"
      >ROTERDORN</text>
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
        line-height: 0;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class CoverPlaceholderComponent {}
