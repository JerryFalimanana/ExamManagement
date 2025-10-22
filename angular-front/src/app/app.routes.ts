import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Exam } from './components/exam/exam';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'exams',
        component: Exam,
        canActivate: [authGuard]
    }
];
