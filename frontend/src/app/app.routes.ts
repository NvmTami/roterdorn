import { Routes } from '@angular/router';
import { ReviewListComponent } from './component/review-list/review-list.component';
import { AddReviewComponent } from './component/add-review/add-review.component';

export const routes: Routes = [
  { path: '', component: ReviewListComponent },
  { path: 'add', component: AddReviewComponent },
];
