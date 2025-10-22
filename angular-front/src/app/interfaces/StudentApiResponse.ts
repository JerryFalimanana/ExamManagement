import { Student } from "./Student";

export interface StudentApiResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    totalItems: number;
    member: Student[];
}