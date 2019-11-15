import { ExecFileOptionsWithStringEncoding } from 'child_process';

export class Booking {
    id: number;
    startDate: Date;
    endDate: Date;
    objet: string;
    user_id: number;
    salle_id: number;
}