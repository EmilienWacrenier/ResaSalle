import { ExecFileOptionsWithStringEncoding } from 'child_process';

export class Booking {
    reservationId?: number;
    startDate: string;
    endDate: string;
    object: string;
    state?: boolean;
    user_id?: number;
    recurence_id?: number;
    room_id?: number;
}