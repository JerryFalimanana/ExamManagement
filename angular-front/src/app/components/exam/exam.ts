import { Component } from '@angular/core';
import { ExamService } from '../../services/exam-service';
import { CreateModal } from './create-modal/create-modal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../../services/token-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exam',
    standalone: true,
    imports: [
      CreateModal,
      CommonModule,
      HttpClientModule
    ],
    templateUrl: './exam.html',
    styleUrl: './exam.scss'
})
export class Exam {
    constructor(
        private examService: ExamService,
        private tokenService: TokenService,
        private router: Router,
    ) {}

    isModalOpen = false;

    openModal() {
      this.isModalOpen = true;
    }

    onConfirm() {
      this.isModalOpen = false;
    }

    onCancel() {
      this.isModalOpen = false;
    }

    async logout() {
        await this.tokenService.clearToken();
        this.router.navigate(['/login']);
    }
}
