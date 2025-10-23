import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExamForm } from '../../../interfaces/exam-form';
import { RequiredFieldPipe } from '../../../required-field-pipe';
import { PostExamData } from '../../../interfaces/post-exam-data';
import { ExamService } from '../../../services/exam-service';
import { HttpClientModule } from '@angular/common/http';
import { Student } from '../../../interfaces/Student';
import { StudentService } from '../../../services/student-service';

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
      RequiredFieldPipe,
      HttpClientModule
    ],
    templateUrl: './create-modal.html',
    styleUrl: './create-modal.scss'
})
export class CreateModal implements OnInit {
    @Output() cancel = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<void>();
    today = new Date().toISOString().split('T')[0];

    examForm!: FormGroup<ExamForm>;
    students: Student[] = [];

    protected readonly FormFields = FormField;

    constructor(
        private formBuilder: FormBuilder,
        private examService: ExamService,
        private studentService: StudentService
    ) {}

    ngOnInit() {
        this.initForm();
        this.loadStudents();
    }

    initForm() {
        this.examForm = this.formBuilder.group<ExamForm>(
            {
                student: new FormControl<string | null>('', { nonNullable: false, validators: [Validators.required] }),
                status: new FormControl<string | null>('', { nonNullable: false, validators: [Validators.required] }),
                date: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] }),
                time: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] }),
                location: new FormControl<string | null>(null),
            }
        );
    }

    onSubmit() {
        if (this.examForm.invalid) return;
        const examen = this.getExamData();

        this.examService.createExam(examen)
            .subscribe({
              next: () => {
                  this.confirm.emit();
              }
          });
    }

    getExamData(): PostExamData {
        const student = this.examForm.get('student')?.value;
        const status = this.examForm.get('status')?.value;
        const date = this.examForm.get('date')?.value;
        const time = this.examForm.get('time')?.value;
        const location = this.examForm.get('location')?.value;

        const exam: PostExamData = {
            student: `/api/students/${student}`,
            status: status!,
            date: date!,
            time: time!,
            location: location!,
        };

        return exam;
    }

    loadStudents() {
        this.studentService.getStudents().subscribe({
            next: (data) => {
              this.students = data;
            },
            error: (error) => console.error(error)
        });
    }
}
