import { Room } from './classes/room';
import * as moment from 'moment';

export const ROOMS: Room[] = [
    {
        id: 1,
        name: "Carnot",
        zone: "A",
        capacity: 4,
        bookings: [
            /*{
                
                startDate: '2019-11-06T08:01:00',
                endDate: '2019-11-06T09:02:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T09:10:00',
                endDate: '2019-11-06T09:30:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T14:00:00',
                endDate: '2019-11-06T15:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },*/
            {
                
                startDate: '2019-11-25T14:00:00',
                endDate: '2019-11-25T15:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-26T14:00:00',
                endDate: '2019-11-25T16:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-27T10:00:00',
                endDate: '2019-11-27T11:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-28T08:00:00',
                endDate: '2019-11-28T09:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
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
               
                startDate: '2019-11-06T8:10:00',
                endDate: '2019-11-06T9:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
               
                startDate: '2019-11-06T10:00:00',
                endDate: '2019-11-06T11:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T11:30:00',
                endDate: '2019-11-06T13:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T15:0:00',
                endDate: '2019-11-06T18:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            }
        ]
    },
    {
        id: 3,
        name: "Pascal",
        zone: "A",
        capacity: 4,
        bookings: [{
            
            startDate: '2019-11-06T8:20:00',
            endDate: '2019-11-06T8:50:00',
            objet: "reunion",
            user_id: 1,
            salle_id:1
        },
        {
            
            startDate: '2019-11-06T9:00:00',
            endDate: '2019-11-06T10:00:00',
            objet: "reunion",
            user_id: 1,
            salle_id:1
        },
        {
            
            startDate: '2019-11-06T10:12:00',
            endDate: '2019-11-06T11:00:00',
            objet: "reunion",
            user_id: 1,
            salle_id:1
        }]
    },
    {
        id: 4,
        name: "Marne",
        zone: "A",
        capacity: 4,
        bookings: [
            {
                
                startDate: '2019-11-06T8:01:00',
                endDate: '2019-11-06T8:20:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T9:10:00',
                endDate: '2019-11-06T9:30:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
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
                
                startDate: '2019-11-06T8:01:00',
                endDate: '2019-11-06T9:02:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T9:10:00',
                endDate: '2019-11-06T9:30:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                startDate: '2019-11-06T14:00:00',
                endDate: '2019-11-06T15:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T15:20:00',
                endDate: '2019-11-06T16:30:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
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
                
                startDate: '2019-11-06T8:01:00',
                endDate: '2019-11-06T9:02:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T9:10:00',
                endDate: '2019-11-06T9:30:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T14:00:00',
                endDate: '2019-11-06T15:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T15:10:00',
                endDate: '2019-11-06T17:45:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
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
                
                startDate: '2019-11-06T8:01:00',
                endDate: '2019-11-06T9:02:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T9:10:00',
                endDate: '2019-11-06T9:30:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
               
                startDate: '2019-11-06T11:00:00',
                endDate: '2019-11-06T13:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            },
            {
                
                startDate: '2019-11-06T14:00:00',
                endDate: '2019-11-06T15:00:00',
                objet: "reunion",
                user_id: 1,
                salle_id:1
            }
        ]
    }
]
