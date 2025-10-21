import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-modal',
    standalone: true,
    imports: [
      CommonModule
    ],
    templateUrl: './create-modal.html',
    styleUrl: './create-modal.scss'
})
export class CreateModal {
    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
}
