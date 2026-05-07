import { Component } from '@angular/core';

// Unique ID suffix per instance so SVG defs don't collide when
// multiple placeholders are rendered on the same page.
let _uid = 0;

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
      <defs>
        <!-- Background gradient -->
        <linearGradient [attr.id]="id('bg')" x1="0" y1="0" x2=".65" y2="1">
          <stop offset="0%"   stop-color="#4a1410"/>
          <stop offset="100%" stop-color="#0b0606"/>
        </linearGradient>

        <!-- Glass card fill -->
        <linearGradient [attr.id]="id('card')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(190,70,55,0.22)"/>
          <stop offset="55%"  stop-color="rgba(110,25,18,0.14)"/>
          <stop offset="100%" stop-color="rgba(8,2,2,0.30)"/>
        </linearGradient>

        <!-- Glass top specular -->
        <linearGradient [attr.id]="id('spec')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.24)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>

        <!-- Triangle gloss overlay -->
        <linearGradient [attr.id]="id('trig')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>

        <!-- Frosted blur for glass base layer -->
        <filter [attr.id]="id('blur')" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7"/>
        </filter>

        <!-- Soft glow behind triangle -->
        <filter [attr.id]="id('glow')" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="150" height="200" [attr.fill]="ref('bg')"/>

      <!-- Diagonal texture stripe -->
      <line x1="0" y1="200" x2="150" y2="0"
            stroke="rgba(230,57,70,0.05)" stroke-width="55"/>

      <!-- Glass card – frosted blur base -->
      <rect x="15" y="45" width="120" height="115" rx="16"
            fill="rgba(74,20,16,0.6)"
            [attr.filter]="ref('blur')"/>

      <!-- Glass card – tinted fill -->
      <rect x="15" y="45" width="120" height="115" rx="16"
            [attr.fill]="ref('card')"/>

      <!-- Glass card – top specular (upper half) -->
      <rect x="16" y="46" width="118" height="57" rx="14"
            [attr.fill]="ref('spec')"/>

      <!-- Glass card – outer border -->
      <rect x="15" y="45" width="120" height="115" rx="16"
            fill="none"
            stroke="rgba(255,255,255,0.13)"
            stroke-width="0.8"/>

      <!-- Glass card – top edge bright line -->
      <path d="M 31 45.4 Q 75 44.4 119 45.4"
            fill="none"
            stroke="rgba(255,255,255,0.42)"
            stroke-width="0.8"
            stroke-linecap="round"/>

      <!-- Triangle – glow layer -->
      <!-- centroid of M0,0 L71,25 L0,50 at scale 1.2 → (28.4, 30)     -->
      <!-- translate(47,73) places centroid at (75.4, 103) ≈ card centre -->
      <path d="M 0 0 L 71 25 L 0 50 Z"
            transform="translate(47, 73) scale(1.2)"
            fill="#e63946" opacity="0.30"
            [attr.filter]="ref('glow')"/>

      <!-- Triangle – main fill -->
      <path d="M 0 0 L 71 25 L 0 50 Z"
            transform="translate(47, 73) scale(1.2)"
            fill="#e63946" opacity="0.93"/>

      <!-- Triangle – gloss overlay -->
      <path d="M 0 0 L 71 25 L 0 50 Z"
            transform="translate(47, 73) scale(1.2)"
            [attr.fill]="ref('trig')"/>

      <!-- Wordmark -->
      <text
        x="75" y="178"
        text-anchor="middle"
        font-family="'Space Grotesk', system-ui, sans-serif"
        font-size="10"
        font-weight="500"
        letter-spacing="0.2em"
        fill="rgba(240,236,228,0.30)"
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
export class CoverPlaceholderComponent {
  protected readonly uid = `cph${++_uid}`;

  /** Returns a namespaced ID string for SVG defs. */
  protected id(name: string): string {
    return `${this.uid}-${name}`;
  }

  /** Returns a CSS url() reference for a SVG def. */
  protected ref(name: string): string {
    return `url(#${this.uid}-${name})`;
  }
}
