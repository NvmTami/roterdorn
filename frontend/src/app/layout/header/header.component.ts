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
    .site-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 0.5px solid #1f1f1f;
    }
    .brand-link { color: inherit; text-decoration: none; }
    .primary-nav {
      display: flex;
      gap: 1.5rem;
      font-size: 0.8rem;
      color: var(--brand-text-muted);
    }
    .primary-nav a { color: inherit; text-decoration: none; }
    .primary-nav a:hover, .primary-nav a.active { color: var(--brand-accent); }
  `],
})
export class HeaderComponent {}
