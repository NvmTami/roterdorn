import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReviewService, ReviewDetail } from '../../core/services/review.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [HeaderComponent, MediaTypePipe, DatePipe],
  template: `
    <div class="detail-shell">
      <app-header />

      @if (notFound()) {
        <main class="detail-content">
          <p class="state-msg">Rezension nicht gefunden.</p>
        </main>
      } @else if (loading()) {
        <main class="detail-content">
          <p class="state-msg">Lädt…</p>
        </main>
      } @else if (review(); as r) {
        <main class="detail-content">
          <span class="detail-tag">{{ r.media_type | mediaType }}</span>
          <h1 class="detail-title">{{ r.title }}</h1>
          <p class="detail-meta">
            {{ r.author_name }} · {{ r.published_at | date:'dd.MM.yyyy' }}
            · Bewertung: <strong>{{ r.rating }}/5</strong>
          </p>

          <div class="detail-body">
            @if (r.cover_url) {
              <img class="detail-cover" [src]="r.cover_url" [alt]="'Cover von ' + r.title" />
            }
            <div class="detail-text" [innerHTML]="r.content"></div>
          </div>

          @if (r.details) {
            <aside class="detail-facts">
              <h2 class="facts-title">Details</h2>
              <dl class="facts-list">
                @for (entry of detailEntries(r.details); track entry.key) {
                  <div class="fact-row">
                    <dt>{{ entry.label }}</dt>
                    <dd>{{ entry.value }}</dd>
                  </div>
                }
              </dl>
            </aside>
          }
        </main>
      }
    </div>
  `,
  styles: [`
    .detail-shell { padding: 1.4rem; }
    .detail-content { padding-top: 1.2rem; max-width: 720px; }
    .detail-tag {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      background: #e24b4a;
      color: #2a0808;
      font-size: 0.72rem;
      font-weight: 600;
      margin-bottom: 0.6rem;
    }
    .detail-title { margin: 0.4rem 0 0.3rem; font-size: clamp(1.4rem, 3vw, 2rem); line-height: 1.15; letter-spacing: -0.02em; }
    .detail-meta { color: #888; font-size: 0.8rem; margin-bottom: 1.2rem; }
    .detail-meta strong { color: #ccc; }
    .detail-body { display: grid; grid-template-columns: 160px 1fr; gap: 1.4rem; align-items: start; }
    .detail-cover { width: 160px; border-radius: 4px; aspect-ratio: 2/3; object-fit: cover; }
    .detail-text { color: #c4c4c4; line-height: 1.7; }
    .detail-text :is(h2, h3) { color: #fff; font-size: 1rem; margin-top: 1.2rem; }
    .detail-facts { margin-top: 2rem; border-top: 1px solid #1f1f1f; padding-top: 1rem; }
    .facts-title { font-size: 0.85rem; color: #b4b4b4; margin: 0 0 0.8rem; }
    .facts-list { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem 1.2rem; }
    .fact-row { display: contents; }
    dt { color: #888; font-size: 0.78rem; }
    dd { margin: 0; font-size: 0.78rem; color: #ccc; }
    .state-msg { color: #888; }
    @media (max-width: 600px) {
      .detail-body { grid-template-columns: 1fr; }
      .detail-cover { width: 140px; }
      .facts-list { grid-template-columns: 1fr; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDetailComponent {
  private route = inject(ActivatedRoute);
  private reviewService = inject(ReviewService);

  review = signal<ReviewDetail | null>(null);
  loading = signal(true);
  notFound = signal(false);

  private readonly FIELD_LABELS: Record<string, Record<string, string>> = {
    buch:  { isbn: 'ISBN', page_count: 'Seiten', publisher: 'Verlag', release_date: 'Erschienen', language: 'Sprache', format: 'Format', price: 'Preis' },
    film:  { director: 'Regie', studio: 'Studio', release_year: 'Jahr', runtime_minutes: 'Laufzeit (min)', fsk: 'FSK', language: 'Sprache' },
    musik: { artist: 'Künstler', label: 'Label', release_date: 'Erschienen', runtime_minutes: 'Laufzeit (min)' },
    spiel: { developer: 'Entwickler', publisher: 'Verlag', release_date: 'Erschienen', platform: 'Plattform', genre: 'Genre', min_players: 'Min. Spieler', max_players: 'Max. Spieler' },
  };

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getReviewById(id).pipe(takeUntilDestroyed()).subscribe({
      next: (r) => { this.review.set(r); this.loading.set(false); },
      error: (e) => { this.notFound.set(e.status === 404); this.loading.set(false); },
    });
  }

  detailEntries(details: Record<string, unknown>): { key: string; label: string; value: string }[] {
    const type = this.review()?.media_type ?? '';
    const labels = this.FIELD_LABELS[type] ?? {};
    return Object.entries(details)
      .filter(([k, v]) => k !== 'review_id' && v !== null && v !== undefined && v !== '')
      .map(([k, v]) => ({ key: k, label: labels[k] ?? k, value: String(v) }));
  }
}
