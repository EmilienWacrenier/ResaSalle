import { Booking } from './booking';

export class Room {
    roomId: number;
    name: string;
    area: string;
    capacity: number;
    reservations?: Booking[];

    /*constructor(_id, _name, _zone, _capacity,_bookings){
        this.roomId = _id;
        this.nanameme = _name;
        this.zone = _zone;
        this.capacity = _capacity;
        this.bookings = _bookings;
    }*/
}