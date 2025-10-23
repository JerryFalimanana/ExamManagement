import { Examen } from "./Examen";

export interface ExamenApiResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    totalItems: number;
    member: Examen[];
}