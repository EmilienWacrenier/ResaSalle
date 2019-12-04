const reservationService = require('../services/reservation.service');
const workingDaysService = require('../tools/workingDays.service');
const mailService = require('../services/mail.service');

exports.creerReservation = async (req, res) => {
    let data = await reservationService.create_reservation(req);
    if (data.code===200) {
        mailService.send_mail(req);
    }
    return res.status(data.code).json({ result: data.result });

};

exports.getReservations = async (req, res) => {
    let data = await reservationService.get_reservations();
    return res.status(data.code).json({ result: data.result });
}

exports.getReservationById = async (req, res) => {
    let data = await reservationService.get_reservation_by_id(req);
    return res.status(data.code).json({ result: data.result });
}

exports.getSallesBookedBetween = async (req, res) => {
        let data = await reservationService.get_salles_booked_between(req);
        return res.status(data.code).json({ result: data.result });
}
exports.getSallesBookedByDay = async (req, res) => {
        let data = await reservationService.get_salles_booked_by_day(req);
        return res.status(data.code).json({ result: data.result });
}

exports.getReservationByRoomId = async (req, res) => {
    let data = await reservationService.get_salles_booked_by_id(req);
    return res.status(data.code).json({ result: data.result });
}

exports.getReservationsByUserId = async (req, res) => {
    let data = await reservationService.get_reservations_by_user_id(req);
    return res.status(data.code).json({ result: data.result });
}
//test isWorkingDay
exports.isWorkingDay = (req, res) => {
    let data = workingDaysService.is_working_day(req);
    console.log(data);
    return res.status(data.code).json({ result: data.result });
}
//test isWeekEnd
exports.isWeekEnd = async (req, res) => {
    let data = await workingDaysService.is_week_end(req);
    return console.log(data);
    return data.toString();
}
//test isFerie
exports.isFerie = (req) => {
    let data = workingDaysService.is_ferie(req);
    return console.log(data);
    return data.toString();
}

exports.getParticipantsByIdReservation = async (req, res) => {
    let data = await reservationService.get_participants_by_reservation_id(req);
    return res.status(data.code).json({result: data.result});
}

exports.deleteReservation = async (req, res) => {
    let data = await reservationService.delete_reservation(req);
    return res.status(data.code).json({result: data.result});
}
