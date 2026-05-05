import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';

interface Episode {
  number: number;
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <div class="podcast-shell">
      <app-header />
      <main class="podcast-content">
        <h1 class="page-title">Per Anhalter durch die Phantastik</h1>
        <p class="page-desc">Der Podcast der roterdorn-Redaktion über Bücher, Spiele, Filme und Musik aus der phantastischen Welt.</p>

        <div class="episode-list">
          @for (ep of episodes; track ep.number) {
            <article class="episode-card">
              <div class="ep-number">Folge {{ ep.number }}</div>
              <h2 class="ep-title">{{ ep.title }}</h2>
              <p class="ep-date">{{ ep.date }}</p>
              <p class="ep-desc">{{ ep.description }}</p>
            </article>
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    .podcast-shell { padding: 1.4rem; }
    .podcast-content { padding-top: 1.2rem; max-width: 720px; }
    .page-title { font-size: 1.5rem; margin: 0 0 0.4rem; letter-spacing: -0.02em; }
    .page-desc { color: #888; margin: 0 0 1.8rem; font-size: 0.9rem; }
    .episode-list { display: flex; flex-direction: column; gap: 1rem; }
    .episode-card {
      border: 1px solid #1f1f1f;
      border-radius: 8px;
      padding: 1rem 1.2rem;
    }
    .ep-number { color: #e24b4a; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.3rem; }
    .ep-title { margin: 0 0 0.25rem; font-size: 1rem; }
    .ep-date { margin: 0 0 0.5rem; color: #666; font-size: 0.75rem; }
    .ep-desc { margin: 0; color: #aaa; font-size: 0.85rem; line-height: 1.5; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastComponent {
  readonly episodes: Episode[] = [
    { number: 11, title: 'Pile of Shame', date: '09.10.2020', description: 'Welche Bücher, Spiele und Filme liegen bei euch unberührt auf dem Stapel? Die Redaktion gesteht.' },
    { number: 10, title: 'Jubiläumsepisode – Der Lockdown und wie wir damit umgehen', date: '2020', description: 'Eine besondere Episode in besonderen Zeiten: Wie verändert der Lockdown unsere Mediengewohnheiten?' },
    { number: 9, title: 'Kommunikation am Spieltisch', date: '2020', description: 'Wie redet man beim Spielen miteinander? Über Regelerklärungen, Konflikte und gute Spielkultur.' },
    { number: 8, title: 'Immersion im Rollenspiel', date: '2019', description: 'Wie taucht man tief in eine Rollenspielsitzung ein und was reißt einen heraus?' },
    { number: 7, title: 'Der erste Con-Besuch', date: '2019', description: 'Tipps, Erfahrungen und Anekdoten für alle, die zum ersten Mal auf eine Spieleconvention gehen.' },
    { number: 1, title: 'Pilot', date: '2018', description: 'Die erste Folge des roterdorn-Podcasts: Wer sind wir, was machen wir hier und warum?' },
  ];
}
