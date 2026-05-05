import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './review-detail.component.html',
  styleUrl: './review-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDetailComponent {
  readonly rating = signal(8);
  readonly maxRating = 10;
  readonly ratingMarkers = Array.from({ length: 10 }, (_, i) => i + 1);
}
