import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandLogoComponent } from '../../shared/branding/brand-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandLogoComponent],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand-link" aria-label="Zur Startseite">
        <app-brand-logo variant="lockup" [height]="20" />
      </a>
      <nav class="primary-nav">
        <a routerLink="/buch" routerLinkActive="active">Bücher</a>
        <a routerLink="/film" routerLinkActive="active">Filme</a>
        <a routerLink="/musik" routerLinkActive="active">Musik</a>
        <a routerLink="/spiel" routerLinkActive="active">Spiele</a>
        <a routerLink="/redaktion" routerLinkActive="active">Redaktion</a>
        <a routerLink="/podcast" routerLinkActive="active">Podcast</a>
        <a routerLink="/suche" routerLinkActive="active">Suche</a>
      </nav>
    </header>
  `,
  styles: [`
    :host {
      position: sticky;
      top: 0;
      z-index: 100;
      display: block;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      background: rgba(13, 13, 13, 0.85);
      border-bottom: 0.5px solid rgba(255,255,255,0.06);
    }
    .site-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.5rem;
      max-width: 1280px;
      margin: 0 auto;
    }
    .brand-link { color: inherit; text-decoration: none; }
    .primary-nav {
      display: flex;
      gap: 1.5rem;
      font-size: 0.78rem;
      color: var(--brand-text-muted);
    }
    .primary-nav a {
      color: inherit;
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .primary-nav a:hover, .primary-nav a.active { color: var(--brand-accent); }
  `],
})
export class HeaderComponent {}
