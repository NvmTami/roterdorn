import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Review {
  title: string;
  category: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewListComponent {
  reviews = signal<Review[]>([
    { title: 'Buch XYZ', category: 'Bücher', rating: 4, comment: 'Toll!' },
    { title: 'Film ABC', category: 'Filme', rating: 5, comment: 'Super!' },
  ]);
}