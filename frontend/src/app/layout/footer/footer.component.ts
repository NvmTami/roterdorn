import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <a routerLink="/" class="site-footer__brand" aria-label="Zur Startseite">
          <span>roter</span>
          <svg width="14" height="10" viewBox="0 0 20 14" aria-hidden="true">
            <polygon points="0,0 20,7 0,14" fill="#e63946" />
          </svg>
          <span>dorn</span>
        </a>
        <p class="site-footer__copy">Alle Texte © roterdorn · Alle Rechte vorbehalten</p>
        <nav class="site-footer__links" aria-label="Footer-Navigation">
          <a routerLink="/datenschutz">Datenschutz</a>
          <a routerLink="/impressum">Impressum</a>
        </nav>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      border-top: 0.5px solid var(--border-subtle);
      padding: 28px;
      margin-top: 8px;
    }

    .site-footer__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .site-footer__brand {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-sans);
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
      text-decoration: none;
      letter-spacing: 0.01em;
    }

    .site-footer__copy {
      margin: 0;
      font-size: 12px;
      color: var(--text-dim);
      text-align: center;
      line-height: 1.4;
    }

    .site-footer__links {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .site-footer__links a {
      font-size: 12px;
      color: var(--text-muted);
      text-decoration: none;
    }

    .site-footer__links a:hover {
      color: var(--accent);
    }

    @media (max-width: 680px) {
      .site-footer {
        padding: 22px 16px;
      }
    }
  `]
})
export class FooterComponent {}
