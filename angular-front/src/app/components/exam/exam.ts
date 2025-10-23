import { Component, OnInit, signal, computed } from '@angular/core';
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
    styleUrls: ['./exam.scss']
})
export class Exam implements OnInit {
    isModalOpen = false;
    examens = signal<Examen[]>([]);
    totals = computed(() => {
        const ex = this.examens();
        return {
            confirmed: ex.filter(e => e.status === 'Confirmé').length,
            toOrganize: ex.filter(e => e.status === 'À organiser').length,
            cancelled: ex.filter(e => e.status === 'Annulé').length,
            inSearch: ex.filter(e => e.status === 'En recherche de place').length
        };
    });
    
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

    onConfirm(newExam?: Examen) {
        if (newExam) {
            this.examens.update(examen => [...examen, newExam]); // ajouter un nouvel examen
        }
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
                this.examens.set(data);
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

        this.examens.update(exs => exs.map(e => e.id === exam.id ? { ...e, status: newStatus } : e));

        this.examService.updateExamStatus(exam.id, newStatus).subscribe({
            next: () => console.log('Statut mis à jour avec succès'),
            error: (err) => console.error(err)
        });
    }
}
