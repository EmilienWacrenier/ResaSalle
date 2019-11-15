import { Room } from './classes/room';

export const ROOMS: Room[] = [
    {
        id: 1,
        name: "Carnot",
        zone: "A",
        capacity: 4,
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
            },
            {
                id: 4,
                startDate: new Date("2019-11-06 14:00:00"),
                endDate: new Date("2019-11-06 15:00:13")
            }
        ]
    },
    {
        id: 2,
        name: "Pythagore",
        zone: "A",
        capacity: 4,
        bookings: [
            {
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
            },
            {
                id: 4,
                startDate: new Date("2019-11-06 15:0:00"),
                endDate: new Date("2019-11-06 18:00:00")
            }
        ]
    },
    {
        id: 3,
        name: "Pascal",
        zone: "A",
        capacity: 4,
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
    },
    {
        id: 4,
        name: "Marne",
        zone: "A",
        capacity: 4,
        bookings: [
            {
                id: 1,
                startDate: new Date("2019-11-06 8:01:00"),
                endDate: new Date("2019-11-06 8:20:00")
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
            },
            {
                id: 4,
                startDate: new Date("2019-11-06 14:00:00"),
                endDate: new Date("2019-11-06 15:00:13")
            },
            {
                id: 5,
                startDate: new Date("2019-11-06 15:10:00"),
                endDate: new Date("2019-11-06 16:30:00")
            }
        ]
    },
    {
        id: 5,
        name: "Pika",
        zone: "A",
        capacity: 4,
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
            },
            {
                id: 4,
                startDate: new Date("2019-11-06 14:00:00"),
                endDate: new Date("2019-11-06 15:00:13")
            },
            {
                id: 5,
                startDate: new Date("2019-11-06 15:20:00"),
                endDate: new Date("2019-11-06 16:30:00")
            }
        ]
    },
    {
        id: 6,
        name: "Gym",
        zone: "A",
        capacity: 4,
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
            },
            {
                id: 4,
                startDate: new Date("2019-11-06 14:00:00"),
                endDate: new Date("2019-11-06 15:00:13")
            },
            {
                id: 5,
                startDate: new Date("2019-11-06 15:10:00"),
                endDate: new Date("2019-11-06 17:45:00")
            }
        ]
    },
    {
        id: 7,
        name: "Andromède",
        zone: "A",
        capacity: 4,
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
            },
            {
                id: 4,
                startDate: new Date("2019-11-06 14:00:00"),
                endDate: new Date("2019-11-06 15:00:13")
            }
        ]
    }
]
