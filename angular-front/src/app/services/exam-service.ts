import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostExamData } from '../interfaces/post-exam-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
    constructor(
        private httpClient: HttpClient
    ) {}

    createExam(exam: PostExamData): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.httpClient.post(
            'http://localhost:8000/api/exams',
            exam,
            {
                headers,
            },
        );
    }
}
