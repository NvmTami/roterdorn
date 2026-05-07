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
        <!-- ── Background depth ─────────────────────── -->
        <linearGradient [attr.id]="id('bg')" x1="0" y1="0" x2=".4" y2="1">
          <stop offset="0%"   stop-color="#3d1009"/>
          <stop offset="100%" stop-color="#060202"/>
        </linearGradient>

        <!-- ── Glass surface tint ──────────────────── -->
        <linearGradient [attr.id]="id('glass')" x1="0.1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,210,190,0.10)"/>
          <stop offset="50%"  stop-color="rgba(180,50,30,0.04)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.20)"/>
        </linearGradient>

        <!-- ── Top specular band (dominant iOS element) -->
        <linearGradient [attr.id]="id('spec')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.38)"/>
          <stop offset="48%"  stop-color="rgba(255,255,255,0.05)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>

        <!-- ── Secondary caustic blob ──────────────── -->
        <radialGradient [attr.id]="id('blob')" cx="0.28" cy="0.16" r="0.52">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>

        <!-- ── Bottom vignette ─────────────────────── -->
        <linearGradient [attr.id]="id('vign')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(0,0,0,0)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.55)"/>
        </linearGradient>

        <!-- ── Triangle aura ───────────────────────── -->
        <radialGradient [attr.id]="id('aura')" cx=".5" cy=".5" r=".5">
          <stop offset="0%"   stop-color="#e63946" stop-opacity="0.38"/>
          <stop offset="100%" stop-color="#e63946" stop-opacity="0"/>
        </radialGradient>

        <!-- ── Triangle gloss overlay ──────────────── -->
        <linearGradient [attr.id]="id('tgloss')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.22)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>

        <!-- ── Frosted scatter (internal light diffuse) -->
        <filter [attr.id]="id('scatter')" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="15"/>
        </filter>

        <!-- ── Triangle glow ───────────────────────── -->
        <filter [attr.id]="id('glow')" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- 1. Background -->
      <rect width="150" height="200" [attr.fill]="ref('bg')"/>

      <!-- 2. Internal scatter – simulates frosted-glass light diffusion -->
      <circle cx="75" cy="88" r="62"
              fill="#c03020" opacity="0.22"
              [attr.filter]="ref('scatter')"/>

      <!-- 3. Glass surface tint -->
      <rect width="150" height="200" [attr.fill]="ref('glass')"/>

      <!-- 4. Top specular band -->
      <rect width="150" height="108" [attr.fill]="ref('spec')"/>

      <!-- 5. Caustic blob (secondary specular reflection) -->
      <rect width="150" height="200" [attr.fill]="ref('blob')"/>

      <!-- 6. Bottom vignette -->
      <rect y="70" width="150" height="130" [attr.fill]="ref('vign')"/>

      <!-- 7. Internal refraction line – horizontal bright seam in the glass -->
      <line x1="4" y1="66" x2="146" y2="66"
            stroke="rgba(255,255,255,0.15)" stroke-width="0.8"
            stroke-linecap="round"/>

      <!-- 8. Triangle aura – centred at bounding-box centre (75, 95) -->
      <ellipse cx="75" cy="95" rx="58" ry="42"
               [attr.fill]="ref('aura')"/>

      <!-- 9. Triangle
           Bounding-box of M0,0 L71,25 L0,50 at scale 1.3:
             width=92.3  height=65  → half=(46.15, 32.5)
           tx = 75 − 46.15 = 28.85   ty = 95 − 32.5 = 62.5
           → bounding-box centre lands exactly at (75, 95) -->
      <path d="M 0 0 L 71 25 L 0 50 Z"
            transform="translate(28.85, 62.5) scale(1.3)"
            fill="#e63946" opacity="0.94"
            [attr.filter]="ref('glow')"/>

      <!-- 10. Triangle gloss overlay -->
      <path d="M 0 0 L 71 25 L 0 50 Z"
            transform="translate(28.85, 62.5) scale(1.3)"
            [attr.fill]="ref('tgloss')"/>

      <!-- 11. Top rim line (glass edge catching light) -->
      <line x1="0" y1="0.6" x2="150" y2="0.6"
            stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>

      <!-- 12. Left edge glow (light source from top-left) -->
      <line x1="0.5" y1="0" x2="0.5" y2="200"
            stroke="rgba(255,255,255,0.14)" stroke-width="1"/>

      <!-- 13. Right edge (fainter – away from light) -->
      <line x1="149.5" y1="0" x2="149.5" y2="200"
            stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

      <!-- 14. Wordmark -->
      <text
        x="75" y="182"
        text-anchor="middle"
        font-family="'Space Grotesk', system-ui, sans-serif"
        font-size="10"
        font-weight="500"
        letter-spacing="0.20em"
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

  protected id(name: string): string {
    return `${this.uid}-${name}`;
  }

  protected ref(name: string): string {
    return `url(#${this.uid}-${name})`;
  }
}

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
