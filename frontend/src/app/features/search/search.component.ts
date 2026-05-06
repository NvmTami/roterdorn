import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { MediaTypePipe } from '../../shared/pipes/media-type.pipe';

interface SearchResult {
  media_type: string;
  title: string;
  author: string;
  rating: number;
  coverColor: string;
}

interface FilterTab {
  label: string;
  value: string;
  count: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HeaderComponent, MediaTypePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  readonly searchQuery = signal('pratchett');
  readonly activeFilter = signal('alle');

  readonly filters: FilterTab[] = [
    { label: 'Alle',    value: 'alle',    count: 12 },
    { label: 'Bücher',  value: 'buecher', count: 8  },
    { label: 'Filme',   value: 'filme',   count: 2  },
    { label: 'Musik',   value: 'musik',   count: 0  },
    { label: 'Spiele',  value: 'spiele',  count: 2  },
  ];

  readonly results: SearchResult[] = [
    { media_type: 'buch',  title: 'Going Postal',               author: 'Terry Pratchett',      rating: 10, coverColor: '#1a2845' },
    { media_type: 'film',  title: 'Hogfather',                  author: 'nach Terry Pratchett', rating: 7,  coverColor: '#2a1838' },
    { media_type: 'buch',  title: 'Mort',                       author: 'Terry Pratchett',      rating: 9,  coverColor: '#0e2a20' },
    { media_type: 'spiel', title: 'Discworld: Ankh-Morpork',    author: 'Martin Wallace',       rating: 8,  coverColor: '#3a1c0e' },
  ];

  setFilter(value: string): void {
    this.activeFilter.set(value);
  }
}
