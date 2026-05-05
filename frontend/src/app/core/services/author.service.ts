import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string;
}

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private http = inject(HttpClient);

  getAuthors(): Observable<Author[]> {
    return this.http
      .get<{ authors: Author[] }>(`${environment.apiUrl}/authors`)
      .pipe(map((r) => r.authors));
  }
}
