import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam-service';
import { CreateModal } from './create-modal/create-modal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../../services/token-service';
import { Router } from '@angular/router';
import { Examen } from '../../interfaces/Examen';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-exam',
    standalone: true,
    imports: [
      CreateModal,
      CommonModule,
      HttpClientModule,
      FormsModule
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
      this.loadExams();
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
                this.examens = data;
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

    onStatusChange(exam: Examen, event: Event) {
        const select = event.target as HTMLSelectElement;
        const newStatus = select.value;

        exam.status = newStatus;

        this.examService.updateExamStatus(exam.id, newStatus).subscribe({
            next: () => console.log('Statut mis à jour avec succès'),
            error: (err) => console.error('Erreur de mise à jour du statut', err)
        });
    }
}
