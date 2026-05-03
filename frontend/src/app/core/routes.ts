import { Routes } from '@angular/router';
import { ReviewListComponent } from '../features/review-list/review-list.component';
import { AddReviewComponent } from '../features/add-review/add-review.component';

export const routes: Routes = [
  { path: '', component: ReviewListComponent },
  { path: 'add', component: AddReviewComponent },
];
