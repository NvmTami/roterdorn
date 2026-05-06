import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';
import { Review, ReviewService } from '../../core/services/review.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, MediaTypePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly route   = inject(ActivatedRoute);
  private readonly router  = inject(Router);
  private readonly service = inject(ReviewService);

  searchQuery   = signal('');
  results       = signal<Review[]>([]);
  loading       = signal(false);
  error         = signal(false);
  activeFilter  = signal('alle');

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q') ?? '';
      this.searchQuery.set(q);
      if (q.length >= 2) {
        this.doSearch(q);
      } else {
        this.results.set([]);
      }
    });
  }

  onInput(event: Event): void {
    const q = (event.target as HTMLInputElement).value.trim();
    this.router.navigate([], {
      queryParams: { q: q || null },
      queryParamsHandling: 'merge',
    });
  }

  setFilter(value: string): void {
    this.activeFilter.set(value);
  }

  filteredResults = () => {
    const f = this.activeFilter();
    const filterToType: Record<string, string> = {
      buecher: 'buch', filme: 'film', musik: 'musik', spiele: 'spiel',
    };
    if (f === 'alle') return this.results();
    return this.results().filter((r) => r.media_type === filterToType[f]);
  };

  topResult = () => this.filteredResults()[0] ?? null;
  restResults = () => this.filteredResults().slice(1);

  private doSearch(q: string): void {
    this.loading.set(true);
    this.error.set(false);
    this.service.search(q).subscribe({
      next: (data) => { this.results.set(data); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); },
    });
  }
}
