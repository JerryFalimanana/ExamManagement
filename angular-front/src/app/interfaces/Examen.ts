import { Student } from "./Student";

export interface Examen {
    id: string;
    student: Student;
    status: string;
    date: string;
    time: string;
    location: string | null;
    timeString?: string | null;
}