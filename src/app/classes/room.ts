import { Booking } from './booking';

export class Room {
    id: number;
    name: string;
    bookings: Booking[];

    constructor(_id, _name, _bookings){
        this.id = _id;
        this.name = _name;
        this.bookings = _bookings;
    }
}