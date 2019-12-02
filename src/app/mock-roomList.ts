import { Room } from './classes/room';
import * as moment from 'moment';

export const ROOMS: Room[] = [
    {
        roomId: 1,
        name: "Carnot",
        area: "A",
        capacity: 4,
        reservations: [
            /*{
                
                startDate: '2019-11-06T08:01:00',
                endDate: '2019-11-06T09:02:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T09:10:00',
                endDate: '2019-11-06T09:30:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T14:00:00',
                endDate: '2019-11-06T15:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },*/
            {
                
                startDate: '2019-11-25T14:00:00',
                endDate: '2019-11-25T15:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-26T14:00:00',
                endDate: '2019-11-25T16:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-27T10:00:00',
                endDate: '2019-11-27T11:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-28T08:00:00',
                endDate: '2019-11-28T09:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            }
        ]
    },
    {
        roomId: 2,
        name: "Pythagore",
        area: "A",
        capacity: 4,
        reservations: [
            {
               
                startDate: '2019-11-06T8:10:00',
                endDate: '2019-11-06T9:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
               
                startDate: '2019-11-06T10:00:00',
                endDate: '2019-11-06T11:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T11:30:00',
                endDate: '2019-11-06T13:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T15:0:00',
                endDate: '2019-11-06T18:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            }
        ]
    },
    {
        roomId: 3,
        name: "Pascal",
        area: "A",
        capacity: 4,
        reservations: [{
            
            startDate: '2019-11-06T8:20:00',
            endDate: '2019-11-06T8:50:00',
            object: "reunion",
            user_id: 1,
            room_id:1
        },
        {
            
            startDate: '2019-11-06T9:00:00',
            endDate: '2019-11-06T10:00:00',
            object: "reunion",
            user_id: 1,
            room_id:1
        },
        {
            
            startDate: '2019-11-06T10:12:00',
            endDate: '2019-11-06T11:00:00',
            object: "reunion",
            user_id: 1,
            room_id:1
        }]
    },
    {
        roomId: 4,
        name: "Marne",
        area: "A",
        capacity: 4,
        reservations: [
            {
                
                startDate: '2019-11-06T8:01:00',
                endDate: '2019-11-06T8:20:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T9:10:00',
                endDate: '2019-11-06T9:30:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            }
        ]
    },
    {
        roomId: 5,
        name: "Pika",
        area: "A",
        capacity: 4,
        reservations: [
            {
                
                startDate: '2019-11-06T8:01:00',
                endDate: '2019-11-06T9:02:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T9:10:00',
                endDate: '2019-11-06T9:30:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                startDate: '2019-11-06T14:00:00',
                endDate: '2019-11-06T15:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T15:20:00',
                endDate: '2019-11-06T16:30:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            }
        ]
    },
    {
        roomId: 6,
        name: "Gym",
        area: "A",
        capacity: 4,
        reservations: [
            {
                
                startDate: '2019-11-06T8:01:00',
                endDate: '2019-11-06T9:02:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T9:10:00',
                endDate: '2019-11-06T9:30:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T14:00:00',
                endDate: '2019-11-06T15:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T15:10:00',
                endDate: '2019-11-06T17:45:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            }
        ]
    },
    {
        roomId: 7,
        name: "Andromède",
        area: "A",
        capacity: 4,
        reservations: [
            {
                
                startDate: '2019-11-06T8:01:00',
                endDate: '2019-11-06T9:02:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T9:10:00',
                endDate: '2019-11-06T9:30:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
               
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            },
            {
                
                startDate: '2019-11-06T14:00:00',
                endDate: '2019-11-06T15:00:00',
                object: "reunion",
                user_id: 1,
                room_id:1
            }
        ]
    }
]
