import { Component } from '@angular/core';

// Unique ID per instance so SVG filter/gradient IDs don't collide.
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
        <!-- Deep background -->
        <linearGradient [attr.id]="id('bg')" x1="0.3" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#3a0c08"/>
          <stop offset="100%" stop-color="#040101"/>
        </linearGradient>
        <!-- Top specular – sharp narrow bright band -->
        <linearGradient [attr.id]="id('spec')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="rgba(255,255,255,0.52)"/>
          <stop offset="16%" stop-color="rgba(255,255,255,0.12)"/>
          <stop offset="28%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
        <!-- Diagonal streak – polished surface reflection -->
        <linearGradient [attr.id]="id('diag')" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="rgba(255,255,255,0)"/>
          <stop offset="27%" stop-color="rgba(255,255,255,0)"/>
          <stop offset="36%" stop-color="rgba(255,255,255,0.13)"/>
          <stop offset="44%" stop-color="rgba(255,255,255,0.05)"/>
          <stop offset="53%" stop-color="rgba(255,255,255,0)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
        <!-- Bottom vignette -->
        <linearGradient [attr.id]="id('vign')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="42%"  stop-color="rgba(0,0,0,0)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.60)"/>
        </linearGradient>
        <!-- Triangle aura -->
        <radialGradient [attr.id]="id('aura')" cx=".5" cy=".5" r=".5">
          <stop offset="0%"   stop-color="#e63946" stop-opacity="0.26"/>
          <stop offset="100%" stop-color="#e63946" stop-opacity="0"/>
        </radialGradient>
        <!-- Triangle gloss -->
        <linearGradient [attr.id]="id('tg')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="rgba(255,255,255,0.30)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>

      <!-- 1. Background -->
      <rect width="150" height="200" [attr.fill]="ref('bg')"/>
      <!-- 2. Top specular -->
      <rect width="150" height="200" [attr.fill]="ref('spec')"/>
      <!-- 3. Diagonal streak -->
      <rect width="150" height="200" [attr.fill]="ref('diag')"/>
      <!-- 4. Bottom vignette -->
      <rect width="150" height="200" [attr.fill]="ref('vign')"/>
      <!-- 5. Rim lines -->
      <line x1="0"     y1="0.5"   x2="150"   y2="0.5"   stroke="rgba(255,255,255,0.70)" stroke-width="1"/>
      <line x1="0.5"   y1="1"     x2="0.5"   y2="199"   stroke="rgba(255,255,255,0.24)" stroke-width="1"/>
      <line x1="149.5" y1="1"     x2="149.5" y2="199"   stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <line x1="1"     y1="199.5" x2="149"   y2="199.5" stroke="rgba(255,255,255,0.09)" stroke-width="1"/>
      <!-- 8. Triangle aura -->
      <ellipse cx="75" cy="95" rx="54" ry="38" [attr.fill]="ref('aura')"/>
      <!-- 9. Triangle – bounding-box centred at (75,95) -->
      <path d="M 0 0 L 71 25 L 0 50 Z" transform="translate(28.85, 62.5) scale(1.3)" fill="#e63946" opacity="0.96"/>
      <!-- 10. Triangle gloss -->
      <path d="M 0 0 L 71 25 L 0 50 Z" transform="translate(28.85, 62.5) scale(1.3)" [attr.fill]="ref('tg')"/>
      <!-- 12. Wordmark -->
      <text x="75" y="182" text-anchor="middle"
            font-family="'Space Grotesk', system-ui, sans-serif"
            font-size="10" font-weight="500" letter-spacing="0.20em"
            fill="rgba(240,236,228,0.30)">ROTERDORN</text>
    </svg>
  `,
  styles: [`
    :host { display: block; line-height: 0; }
    svg   { display: block; width: 100%; height: 100%; }
  `],
})
export class CoverPlaceholderComponent {
  protected readonly uid = `cph${++_uid}`;
  protected id(name: string): string { return `${this.uid}-${name}`; }
  protected ref(name: string): string { return `url(#${this.uid}-${name})`; }
}