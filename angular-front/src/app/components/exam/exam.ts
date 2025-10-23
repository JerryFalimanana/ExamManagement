import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam-service';
import { CreateModal } from './create-modal/create-modal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../../services/token-service';
import { Router } from '@angular/router';
import { Examen } from '../../interfaces/Examen';

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
export class Exam implements OnInit {
    isModalOpen = false;
    examens: Examen[] = [];
    
    constructor(
        private examService: ExamService,
        private tokenService: TokenService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.loadExams();
    }

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

    loadExams() {
        this.examService.getExamens().subscribe({
            next: (data) => {
                this.examens = data;console.log(data);
            },
            error: (error) => console.error(error)
        });
    }

    getStatusIcon(status: string): string {
        switch (status) {
            case 'Confirmé':
                return 'check';
            case 'À organiser':
                return 'hardware';
            case 'Annulé':
                return 'close';
            default:
                return 'hourglass_top';
        }
    }
}
