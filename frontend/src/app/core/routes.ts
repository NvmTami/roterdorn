import { Routes } from '@angular/router';
import { ReviewListComponent } from '../components/review-list/review-list.component';
import { AddReviewComponent } from '../components/add-review/add-review.component';

export const routes: Routes = [
  { path: '', component: ReviewListComponent },
  { path: 'add', component: AddReviewComponent },
];
