import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../interfaces/Student';
import { StudentApiResponse } from '../interfaces/StudentApiResponse';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    constructor(
        private http: HttpClient
    ) {}

    getStudents(): Observable<Student[]> {
        return this.http.get<StudentApiResponse>('http://localhost:8000/api/students')
            .pipe(map(response => response.member));
    }
}
