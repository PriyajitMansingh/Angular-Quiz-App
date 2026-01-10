
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private API = 'http://localhost:5000/api/questions';

  constructor(private http: HttpClient) {}

  // Fetch questions by subject
  getQuestionsBySubject(subjectId: string) {
    return this.http.get<any[]>(
      `${this.API}/subject/${subjectId}`
    );
  }

  // Admin only
  deleteQuestion(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

  //Add question
  addQuestion(payload: any) {
  return this.http.post(
    'http://localhost:5000/api/questions',
    payload
  );
}

}

