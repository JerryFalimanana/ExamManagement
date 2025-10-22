import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from './services/token-service';

export const authGuard: CanActivateFn = async () => {
    const tokenService = inject(TokenService);
    const router = inject(Router);
    const token = await tokenService.getToken();
    if (token === null) {
        router.navigate(['/login']);
        return false;
    }
    return true;
};
