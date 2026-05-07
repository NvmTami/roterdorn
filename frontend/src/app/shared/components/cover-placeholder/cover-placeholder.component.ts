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
        <linearGradient [attr.id]="id('bg')" x1="0" y1="0" x2=".4" y2="1">
          <stop offset="0%"   stop-color="#3d1009"/>
          <stop offset="100%" stop-color="#060202"/>
        </linearGradient>
        <linearGradient [attr.id]="id('glass')" x1="0.1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,210,190,0.10)"/>
          <stop offset="50%"  stop-color="rgba(180,50,30,0.04)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.20)"/>
        </linearGradient>
        <linearGradient [attr.id]="id('spec')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.38)"/>
          <stop offset="48%"  stop-color="rgba(255,255,255,0.05)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
        <radialGradient [attr.id]="id('blob')" cx="0.28" cy="0.16" r="0.52">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
        <linearGradient [attr.id]="id('vign')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(0,0,0,0)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.55)"/>
        </linearGradient>
        <radialGradient [attr.id]="id('aura')" cx=".5" cy=".5" r=".5">
          <stop offset="0%"   stop-color="#e63946" stop-opacity="0.38"/>
          <stop offset="100%" stop-color="#e63946" stop-opacity="0"/>
        </radialGradient>
        <linearGradient [attr.id]="id('tgloss')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="rgba(255,255,255,0.22)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
        <filter [attr.id]="id('scatter')" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="15"/>
        </filter>
        <filter [attr.id]="id('glow')" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="150" height="200" [attr.fill]="ref('bg')"/>
      <circle cx="75" cy="88" r="62" fill="#c03020" opacity="0.22" [attr.filter]="ref('scatter')"/>
      <rect width="150" height="200" [attr.fill]="ref('glass')"/>
      <rect width="150" height="108" [attr.fill]="ref('spec')"/>
      <rect width="150" height="200" [attr.fill]="ref('blob')"/>
      <rect y="70" width="150" height="130" [attr.fill]="ref('vign')"/>
      <line x1="4" y1="66" x2="146" y2="66" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" stroke-linecap="round"/>
      <ellipse cx="75" cy="95" rx="58" ry="42" [attr.fill]="ref('aura')"/>
      <path d="M 0 0 L 71 25 L 0 50 Z" transform="translate(28.85, 62.5) scale(1.3)"
            fill="#e63946" opacity="0.94" [attr.filter]="ref('glow')"/>
      <path d="M 0 0 L 71 25 L 0 50 Z" transform="translate(28.85, 62.5) scale(1.3)"
            [attr.fill]="ref('tgloss')"/>
      <line x1="0" y1="0.6" x2="150" y2="0.6" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>
      <line x1="0.5" y1="0" x2="0.5" y2="200" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
      <line x1="149.5" y1="0" x2="149.5" y2="200" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
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
