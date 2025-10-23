import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../interfaces/Student';
import { StudentApiResponse } from '../interfaces/StudentApiResponse';
import { Environment } from '../environments/Environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    constructor(
        private httpClient: HttpClient
    ) {}

    getStudents(): Observable<Student[]> {
        return this.httpClient.get<StudentApiResponse>(Environment.apiBack + '/api/students')
            .pipe(map(response => response.member));
    }
}
