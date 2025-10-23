import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostExamData } from '../interfaces/post-exam-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Examen } from '../interfaces/Examen';
import { ExamenApiResponse } from '../interfaces/ExamenApiResponse';
import { Environment } from '../environments/Environment';

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
            Environment.apiBack + '/api/exams',
            exam,
            {
                headers,
            },
        );
    }
    
    getExamens(): Observable<Examen[]> {
        return this.httpClient.get<ExamenApiResponse>(Environment.apiBack + '/api/exams')
            .pipe(map(response => response.member));
    }

    updateExamStatus(id: string, status: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.httpClient.patch(
            Environment.apiBack + `/api/exams/${id}`,
            { status },
            {
                headers,
            },
        );
    }
}
