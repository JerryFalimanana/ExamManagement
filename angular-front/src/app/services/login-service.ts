import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../interfaces/Auth';
import { lastValueFrom } from 'rxjs';
import { Environment } from '../environments/Environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private httpClient: HttpClient,
    ) {}

    login(email: string, password: string): Promise<Auth> {
        return lastValueFrom(
            this.httpClient.post<Auth>(Environment.apiBack + '/api/login', {
                email,
                password,
            }),
        );
    }
}
