import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateModal } from '../components/exam/create-modal/create-modal';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
    constructor(
        private dialogService: DialogService,
    ) {}

    openCreationModal() {
        return this.dialogService.open(CreateModal, {
            styleClass: '',
            width: '60%',
            header: 'Organiser un examen',
            baseZIndex: 10000
        });
    }
}
