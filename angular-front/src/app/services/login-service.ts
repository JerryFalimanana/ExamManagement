import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../interfaces/Auth';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private httpClient: HttpClient,
    ) {}

    login(email: string, password: string): Promise<Auth> {
        return lastValueFrom(
            this.httpClient.post<Auth>('http://localhost:8000/api/login', {
                email,
                password,
            }),
        );
    }
}
