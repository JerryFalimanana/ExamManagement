import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';
import { Auth } from '../interfaces/Auth';

export const authInterceptor: HttpInterceptorFn = <T>(req: HttpRequest<T>, next: HttpHandlerFn): Observable<HttpEvent<T>> => {
    const tokenService = inject(TokenService);

    return from(tokenService.getToken()).pipe(
        mergeMap((auth: Auth | null) => {
            const headers: Record<string, string> = {};
            headers['Locale'] = 'fr';console.log(req.url);

            if (auth?.token && !req.url.includes('/api/login')) {
                headers['Authorization'] = `Bearer ${auth.token}`;
            }

            const clonedReq: HttpRequest<T> = req.clone({ 
                setHeaders: headers,
                withCredentials: req.url.includes('/api/login')
            });

            return next(clonedReq) as Observable<HttpEvent<T>>;
        })
    );
};
