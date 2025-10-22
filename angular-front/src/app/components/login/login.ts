import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { emailValidator } from '../../validators/EmailValidator';
import { TokenService } from '../../services/token-service';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login implements OnInit {
    formGroup: FormGroup;
    disable = false;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private tokenService: TokenService,
    ) {}

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                this.trimValidator,
                emailValidator,
            ]),
            password: new FormControl('', [
                Validators.required,
            ]),
        });
    }

    trimValidator(control: FormControl) {
        const value = control.value;
        if (typeof value === 'string') {
            const trimmedValue = value.trim();
            if (value !== trimmedValue) {
                control.setValue(trimmedValue);
            }

            return emailValidator(control);
        }

        return null;
    }

    onSubmit() {
        this.disable = true;

        setTimeout(() => {
            this.loginService
                .login(this.formGroup.get('email')?.value, this.formGroup.get('password')?.value)
                .then(async (response) => {
                    await this.tokenService.setToken(response);
                    this.router.navigate(['/exams']);
                })
                .finally(() => {
                    this.disable = false;
                });
        }, 250);
    }
}
