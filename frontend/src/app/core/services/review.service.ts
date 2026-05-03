import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Entspricht dem GET-Response des Backends */
export interface Review {
  id: number;
  title: string;
  media_type: string;
  rating: number;
  excerpt: string;
  published_at: string;
  cover_url: string | null;
  author_name: string;
}

/** Entspricht dem POST-Body des Backends */
export interface ReviewInput {
  title: string;
  category: string;
  rating: number;
  comment: string;
}

interface ReviewsResponse {
  data: Review[];
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<ReviewsResponse>(this.apiUrl).pipe(
      map((response) => response.data)
    );
  }

  addReview(review: ReviewInput): Observable<{ message: string; id: number }> {
    return this.http.post<{ message: string; id: number }>(this.apiUrl, review);
  }
}