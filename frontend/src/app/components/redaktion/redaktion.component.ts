import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthorService, Author } from '../../core/services/author.service';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-redaktion',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <div class="redaktion-shell">
      <app-header />
      <main class="redaktion-content">
        <h1 class="page-title">Die Redaktion</h1>
        <p class="page-desc">roterdorn.de wird von einem kleinen Team aus Enthusiasten betrieben. Wir schreiben über das, was uns bewegt.</p>

        @if (error()) {
          <p class="state-msg">Autoren konnten nicht geladen werden.</p>
        } @else {
          <div class="author-grid">
            @for (author of authors(); track author.id) {
              <article class="author-card">
                <div class="author-avatar" [attr.aria-label]="author.name">
                  {{ initial(author.name) }}
                </div>
                <h2 class="author-name">{{ author.name }}</h2>
                @if (author.bio) {
                  <p class="author-bio">{{ author.bio }}</p>
                }
                @if (author.email) {
                  <a class="author-email" [href]="'mailto:' + author.email">{{ author.email }}</a>
                }
              </article>
            }
            @empty {
              <p class="state-msg">Keine Autoren gefunden.</p>
            }
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .redaktion-shell { padding: 1.4rem; }
    .redaktion-content { padding-top: 1.2rem; }
    .page-title { font-size: 1.5rem; margin: 0 0 0.4rem; letter-spacing: -0.02em; }
    .page-desc { color: #888; margin: 0 0 1.8rem; font-size: 0.9rem; max-width: 560px; }
    .author-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .author-card {
      border: 1px solid #1f1f1f;
      border-radius: 8px;
      padding: 1.2rem;
    }
    .author-avatar {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: #e24b4a;
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; font-weight: 700;
      margin-bottom: 0.8rem;
    }
    .author-name { margin: 0 0 0.5rem; font-size: 1rem; }
    .author-bio { color: #aaa; font-size: 0.82rem; line-height: 1.5; margin: 0 0 0.6rem; }
    .author-email { color: #e24b4a; font-size: 0.78rem; text-decoration: none; }
    .author-email:hover { text-decoration: underline; }
    .state-msg { color: #888; }
    @media (max-width: 600px) { .author-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedaktionComponent {
  private authorService = inject(AuthorService);

  authors = signal<Author[]>([]);
  error = signal(false);

  constructor() {
    this.authorService.getAuthors().subscribe({
      next: (authors) => this.authors.set(authors),
      error: () => this.error.set(true),
    });
  }

  initial(name: string): string {
    return name.charAt(0).toUpperCase();
  }
}
