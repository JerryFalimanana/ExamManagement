import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/Student';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    constructor(
        private http: HttpClient
    ) {}

    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>('http://localhost:8000/api/students');
    }
}
