import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService, Review } from './review.service';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewListComponent implements OnInit {
  reviews = signal<Review[]>([]);
  private reviewService = inject(ReviewService);

  ngOnInit() {
    this.loadReviews();
  }

  private loadReviews() {
    this.reviewService.getReviews().subscribe({
      next: (data) => this.reviews.set(data),
      error: (err) => console.error('Fehler beim Laden:', err),
    });
  }
}