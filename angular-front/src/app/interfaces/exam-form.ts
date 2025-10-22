
import { FormControl } from '@angular/forms';

export interface ExamForm {
    student: FormControl<string | null>;
    status: FormControl<string | null>;
    date: FormControl<string | null>;
    time: FormControl<string | null>;
    location: FormControl<string | null>;
}
