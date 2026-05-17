import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewInput, ReviewService } from '../../core/services/review.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReviewComponent {
  reviewForm: FormGroup;
  submitted = signal(false);

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [''],
    });
  }

  titleInvalid(): boolean {
    const c = this.reviewForm.get('title');
    return !!(c && c.invalid && c.touched);
  }

  categoryInvalid(): boolean {
    const c = this.reviewForm.get('category');
    return !!(c && c.invalid && c.touched);
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.reviewService.addReview(this.reviewForm.value as ReviewInput).subscribe({
        next: () => {
          this.reviewForm.reset();
          this.submitted.set(true);
        },
        error: (err) => console.error('Fehler beim Senden:', err),
      });
    }
  }
}