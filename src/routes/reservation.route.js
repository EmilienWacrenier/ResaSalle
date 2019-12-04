// Express router
var express = require('express');
var router = express.Router();


// Controller declaration
const ReservationController = require('../controllers/reservation.controller.js');

//GET
router.get('/reservations', ReservationController.getReservations);
router.get('/reservationById', ReservationController.getReservationById);
router.get('/reservationsByDate', ReservationController.getSallesBookedBetween);
router.get('/reservationsByDay', ReservationController.getSallesBookedByDay);
router.get('/reservationsByRoomId', ReservationController.getReservationByRoomId);
router.get('/reservationsByUserId', ReservationController.getReservationsByUserId);
router.get('/participants', ReservationController.getParticipantsByIdReservation);

//POST
router.post('/createReservation', ReservationController.creerReservation);

// PUT

// DELETE
router.delete('/deleteReservation', ReservationController.deleteReservation);

// TEST workingDay
router.get('/isWorkingDay', ReservationController.isWorkingDay);
//TEST isWeekEnd
router.get('/isWeekEnd', ReservationController.isWeekEnd);
//TEST isFerie
router.get('/isFerie', ReservationController.isFerie);
// Export routes
module.exports = router;
