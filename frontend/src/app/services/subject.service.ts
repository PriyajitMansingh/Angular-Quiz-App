import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private API = 'http://localhost:5000/api/subjects';

  constructor(private http: HttpClient) {}

  getSubjectsByCategory(categoryId: string) {
    return this.http.get<any[]>(
      `${this.API}/category/${categoryId}`
    );
  }
}
