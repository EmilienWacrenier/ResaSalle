import { Booking } from './booking';

export class Room {
    id: number;
    name: string;
    zone: string;
    capacity: number;
    bookings: Booking[];

    constructor(_id, _name, _zone, _capacity,_bookings){
        this.id = _id;
        this.name = _name;
        this.zone = _zone;
        this.capacity = _capacity;
        this.bookings = _bookings;
    }
}