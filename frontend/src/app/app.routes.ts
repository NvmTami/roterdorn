import { Routes } from '@angular/router';
import { ReviewListComponent } from './features/review-list/review-list.component';
import { AddReviewComponent } from './features/add-review/add-review.component';
import { ReviewDetailComponent } from './features/review-detail/review-detail.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
  { path: '',            component: ReviewListComponent },
  { path: 'add',         component: AddReviewComponent },
  { path: 'review/:id',  component: ReviewDetailComponent },
  { path: 'search',      component: SearchComponent },
];
