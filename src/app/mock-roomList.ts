import { Room } from './classes/room';

export const ROOMS: Room[] = [
    {
        id: 1,
        name: "Carnot",
        bookings: [
            {
                id: 1,
                startDate: new Date("2019-11-06 8:01:00"),
                endDate: new Date("2019-11-06 9:02:00")
            },
            {
                id: 2,
                startDate: new Date("2019-11-06 9:10:00"),
                endDate: new Date("2019-11-06 9:30:00")
            },
            {
                id: 3,
                startDate: new Date("2019-11-06 11:00:00"),
                endDate: new Date("2019-11-06 13:00:00")
            }
        ]
    },
    {
        id: 2,
        name: "Philou",
        bookings: [{
            id: 1,
            startDate: new Date("2019-11-06 8:10:00"),
            endDate: new Date("2019-11-06 9:00:00")
        },
        {
            id: 2,
            startDate: new Date("2019-11-06 10:00:00"),
            endDate: new Date("2019-11-06 11:00:00")
        },
        {
            id: 3,
            startDate: new Date("2019-11-06 11:30:00"),
            endDate: new Date("2019-11-06 13:00:00")
        }]
    },
    {
        id: 3,
        name: "Janot",
        bookings: [{
            id: 1,
            startDate: new Date("2019-11-06 8:20:00"),
            endDate: new Date("2019-11-06 8:50:00")
        },
        {
            id: 2,
            startDate: new Date("2019-11-06 9:00:00"),
            endDate: new Date("2019-11-06 10:00:00")
        },
        {
            id: 3,
            startDate: new Date("2019-11-06 10:12:00"),
            endDate: new Date("2019-11-06 11:00:00")
        }]
    }
]