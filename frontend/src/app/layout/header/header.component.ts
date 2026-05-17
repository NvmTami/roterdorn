import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="site-header">
      <a routerLink="/" class="brand" aria-label="Zur Startseite">
        <span>roter</span>
        <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
          <polygon points="0,0 20,7 0,14" fill="#e63946" />
        </svg>
        <span>dorn</span>
      </a>
      <nav aria-label="Hauptnavigation">
        <ul class="primary-nav">
          <li><a routerLink="/search" routerLinkActive="primary-nav__item--active">Suche</a></li>
          <li><a routerLink="/add" routerLinkActive="primary-nav__item--active">Rezension einreichen</a></li>
          <li><a routerLink="/podcast" routerLinkActive="primary-nav__item--active">Podcast</a></li>
          <li class="primary-nav__item--dim"><a routerLink="/redaktion">Redaktion</a></li>
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    .site-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 18px 28px;
      border-bottom: 0.5px solid var(--border);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 22px;
      font-weight: 500;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      text-decoration: none;
      flex-shrink: 0;
    }

    .primary-nav {
      display: flex;
      gap: 24px;
      font-size: 14px;
      color: var(--text-faint);
      list-style: none;
      margin: 0;
      padding: 0;
      justify-content: flex-end;
      flex-wrap: wrap;
    }

    .primary-nav li a {
      color: var(--text-faint);
      text-decoration: none;
    }

    .primary-nav li a:hover,
    .primary-nav li a.primary-nav__item--active {
      color: var(--text-primary);
    }

    .primary-nav__item--dim a {
      color: var(--text-dim) !important;
    }

    @media (max-width: 900px) {
      .site-header {
        flex-direction: column;
        align-items: flex-start;
        padding: 16px 20px;
      }

      .primary-nav {
        gap: 14px;
        justify-content: flex-start;
        font-size: 13px;
      }
    }

    @media (max-width: 520px) {
      .brand {
        font-size: 20px;
      }

      .primary-nav {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        width: 100%;
        gap: 10px 14px;
      }
    }
  `],
})
export class HeaderComponent {}
