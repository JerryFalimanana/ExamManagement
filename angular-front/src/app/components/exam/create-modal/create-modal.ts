import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExamForm } from '../../../interfaces/exam-form';
import { RequiredFieldPipe } from '../../../required-field-pipe';

enum FormField {
    student = 'student',
    status = 'status',
    date = 'date',
    time = 'time',
    location = 'location',
}
@Component({
    selector: 'app-create-modal',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RequiredFieldPipe
    ],
    templateUrl: './create-modal.html',
    styleUrl: './create-modal.scss'
})
export class CreateModal implements OnInit {
    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    today = new Date().toISOString().split('T')[0];

    examForm!: FormGroup<ExamForm>;

    protected readonly FormFields = FormField;

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.examForm = this.formBuilder.group<ExamForm>(
            {
                student: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] }),
                status: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] }),
                date: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] }),
                time: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] }),
                location: new FormControl<string | null>(null),
            }
        );
    }
}
