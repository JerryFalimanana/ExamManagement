import { Component } from '@angular/core';
import { ExamService } from '../../services/exam-service';
import { CreateModal } from './create-modal/create-modal';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-exam',
    standalone: true,
    imports: [
      CreateModal,
      CommonModule
    ],
    templateUrl: './exam.html',
    styleUrl: './exam.scss'
})
export class Exam {
    constructor(
        private examService: ExamService,
    ) {}

    isModalOpen = false;

    openModal() {
      this.isModalOpen = true;
    }

    onConfirm() {
      console.log('Action confirmée !');
      this.isModalOpen = false;
    }

    onCancel() {
      console.log('Action annulée !');
      this.isModalOpen = false;
    }
}
