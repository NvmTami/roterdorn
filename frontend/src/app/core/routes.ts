import { Routes } from '@angular/router';
import { ReviewListComponent } from '../components/review-list/review-list.component';
import { AddReviewComponent } from '../components/add-review/add-review.component';
import { CategoryListComponent } from '../components/category-list/category-list.component';
import { ReviewDetailComponent } from '../components/review-detail/review-detail.component';
import { SearchComponent } from '../components/search/search.component';
import { PodcastComponent } from '../components/podcast/podcast.component';
import { RedaktionComponent } from '../components/redaktion/redaktion.component';

export const routes: Routes = [
  { path: '', component: ReviewListComponent },
  { path: 'buch',  component: CategoryListComponent, data: { type: 'buch' } },
  { path: 'film',  component: CategoryListComponent, data: { type: 'film' } },
  { path: 'musik', component: CategoryListComponent, data: { type: 'musik' } },
  { path: 'spiel', component: CategoryListComponent, data: { type: 'spiel' } },
  { path: 'buch/:id',  component: ReviewDetailComponent, data: { type: 'buch' } },
  { path: 'film/:id',  component: ReviewDetailComponent, data: { type: 'film' } },
  { path: 'musik/:id', component: ReviewDetailComponent, data: { type: 'musik' } },
  { path: 'spiel/:id', component: ReviewDetailComponent, data: { type: 'spiel' } },
  { path: 'suche',     component: SearchComponent },
  { path: 'podcast',   component: PodcastComponent },
  { path: 'redaktion', component: RedaktionComponent },
  { path: 'add',       component: AddReviewComponent },
  { path: '**', redirectTo: '' },
];
