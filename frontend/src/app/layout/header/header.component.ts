import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandLogoComponent } from '../../shared/branding/brand-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, BrandLogoComponent],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand-link" aria-label="Zur Startseite">
        <app-brand-logo variant="lockup" [height]="20" />
      </a>
      <nav class="primary-nav">
        <a routerLink="/buecher">Bücher</a>
        <a routerLink="/filme">Filme</a>
        <a routerLink="/musik">Musik</a>
        <a routerLink="/spiele">Spiele</a>
        <a routerLink="/redaktion">Redaktion</a>
      </nav>
    </header>
  `,
  styles: [
    `
      .site-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 0.5px solid #1f1f1f;
      }
      .brand-link {
        color: inherit;
        text-decoration: none;
      }
      .primary-nav {
        display: flex;
        gap: 1.5rem;
        font-size: 0.8rem;
        color: var(--brand-text-muted);
      }
      .primary-nav a {
        color: inherit;
        text-decoration: none;
      }
      .primary-nav a:hover {
        color: var(--brand-accent);
      }
    `,
  ],
})
export class HeaderComponent {}
