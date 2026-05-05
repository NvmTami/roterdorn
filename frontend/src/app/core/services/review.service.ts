import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

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

export interface ReviewDetail extends Review {
  content: string;
  created_at: string;
  details?: Record<string, unknown>;
}

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

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/reviews`;

  getReviews(): Observable<Review[]> {
    return this.http.get<ReviewsResponse>(this.base).pipe(map((r) => r.data));
  }

  getReviewsByType(type: string, page = 1): Observable<Review[]> {
    return this.http
      .get<ReviewsResponse>(this.base, { params: { type, page: String(page) } })
      .pipe(map((r) => r.data));
  }

  getReviewById(id: number): Observable<ReviewDetail> {
    return this.http.get<ReviewDetail>(`${this.base}/${id}`);
  }

  search(q: string): Observable<Review[]> {
    return this.http
      .get<{ data: Review[] }>(`${environment.apiUrl}/search`, { params: { q } })
      .pipe(map((r) => r.data));
  }

  addReview(review: ReviewInput): Observable<{ message: string; id: number }> {
    return this.http.post<{ message: string; id: number }>(this.base, review);
  }
}
