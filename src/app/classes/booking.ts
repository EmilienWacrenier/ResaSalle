import { ExecFileOptionsWithStringEncoding } from 'child_process';
import { User } from './user';

export class Booking {
    reservationId?: number;
    startDate: string;
    endDate: string;
    object: string;
    state?: boolean;
    userId: number;
    recurence_id?: number;
    roomId: number;
    users: User[];
}