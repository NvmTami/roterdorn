import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

/** Entspricht dem GET /api/reviews/:id Response */
export interface ReviewDetail extends Review {
  content: string;
  details: Record<string, unknown> | null;
  created_at: string;
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

interface SearchResponse {
  data: Review[];
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getReviews(mediaType?: string): Observable<Review[]> {
    let params = new HttpParams();
    if (mediaType) {
      params = params.set('type', mediaType);
    }
    return this.http.get<ReviewsResponse>(this.apiUrl, { params }).pipe(
      map((response) => response.data)
    );
  }

  getReview(id: number): Observable<ReviewDetail> {
    return this.http.get<ReviewDetail>(`${this.apiUrl}/${id}`);
  }

  search(q: string): Observable<Review[]> {
    const params = new HttpParams().set('q', q);
    return this.http
      .get<SearchResponse>(`${environment.apiUrl}/search`, { params })
      .pipe(map((response) => response.data));
  }

  addReview(review: ReviewInput): Observable<{ message: string; id: number }> {
    return this.http.post<{ message: string; id: number }>(this.apiUrl, review);
  }
}