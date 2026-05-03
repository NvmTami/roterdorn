import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReviewComponent {
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [''],
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      console.log('Neue Rezension:', this.reviewForm.value);
      // Hier später an Service senden
      this.reviewForm.reset();
    }
  }
}