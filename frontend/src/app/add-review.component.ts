import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './component/add-review/add-review.component.html',
  styleUrl: './component/add-review/add-review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReviewComponent {
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [''],
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.reviewService.addReview(this.reviewForm.value).subscribe({
        next: () => {
          console.log('Rezension hinzugefügt');
          this.reviewForm.reset();
        },
        error: (err) => console.error('Fehler:', err),
      });
    }
  }
}