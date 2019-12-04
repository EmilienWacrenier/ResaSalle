const reservationBuilder = require('../builders/reservation.builder');
const recurrenceBuilder = require('../builders/recurrence.builder');
const mailService = require('./mail.service');
const userBuilder = require('../builders/user.builder');

const REGEX = require('../tools/validation/regex');

const moment = require('moment');
const momentTz = require('moment-timezone');
const timeZone = 'Europe/Paris'; //UTC+01:00

//Créer une réservation
module.exports.create_reservation = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Vérification des userId
            if (req.body.users != null) {
                for (const idUser of req.body.users) {
                    reqq = {
                        query: {
                            userId: idUser
                        }
                    }
                    var existingUser = await userBuilder.findUserById(reqq)
                    if (existingUser == null) {
                        return resolve({ code: 400, result: 'User non trouve' });
                    }
                }
            }

            // Vérification de la présence des infos sur la réservation
            if (req.body.startDate == null || req.body.endDate == null || req.body.object == null
                || req.body.object == ""
                || req.body.roomId == null || req.body.userId == null) {
                return resolve({ code: 400, result: 'Un champs de réservation est nul' });
            }

            // Vérification de la présence des infos sur la récurrence
            if (req.body.labelRecurrence != null && req.body.startDateRecurrence != null
                && req.body.endDateRecurrence != null) {

                // Vérification du labelRecurrence
                if (req.body.labelRecurrence == "quotidien" || req.body.labelRecurrence == "hebdomadaire"
                    || req.body.labelRecurrence == "mensuel" /*|| req.body.labelRecurrence == "annuel"*/) {

                    // Création de la récurrence
                    var createdRecurrence = await recurrenceBuilder.create_recurrence(req)

                    // Vérification de la création de la récurrence
                    if (createdRecurrence.recurrenceId != null) {
                        var currentstartDate = new Date(req.body.startDate);
                        currentstartDate.setHours(currentstartDate.getHours() + 1)
                        var currentendDate = new Date(req.body.endDate);
                        currentendDate.setHours(currentendDate.getHours() + 1)
                        var endDateRecurrence = new Date(req.body.endDateRecurrence);
                        var nbResa = 0;

                        // Création des réservations associées à la récurrence
                        while (currentendDate < endDateRecurrence) {
                            // Ignorer les week-ends
                            if (!(currentstartDate.getDay() == 6 || currentstartDate.getDay() == 0)) {
                                // AJOUTER CHECK RESERVATION


                                // resaRecurrence
                                var currentCreatedReservation = await reservationBuilder.createReservation(
                                    currentstartDate, currentendDate, req.body.object, 1, req.body.userId,
                                    createdRecurrence.recurrenceId, req.body.roomId, req
                                );
                                nbResa++;
                            }

                            // Test du type de récurrence + incrémentation de la date
                            switch (createdRecurrence.libelle) {
                                case "quotidien":
                                    currentstartDate.setDate(currentstartDate.getDate() + 1);
                                    currentendDate.setDate(currentendDate.getDate() + 1);
                                    break;

                                case "hebdomadaire":
                                    currentstartDate.setDate(currentstartDate.getDate() + 7);
                                    currentendDate.setDate(currentendDate.getDate() + 7);
                                    break;

                                case "mensuel":
                                    currentstartDate.setMonth(currentstartDate.getMonth() + 1);
                                    currentendDate.setMonth(currentendDate.getMonth() + 1);
                                    break;

                                default:
                                    currentstartDate.setDate(currentstartDate.getDate() + 1);
                                    currentendDate.setDate(currentendDate.getDate() + 1);
                                    break;
                            }
                        }
                        return resolve({ code: 200, result: nbResa });
                    }
                }
                else {
                    return resolve({ code: 400, result: 'Libelle récurrence incorrect' });
                }
            }
            else {
                // Résa simple
                try {
                    const dateDebut = momentTz.tz(req.body.startDate, 'YYYY-MM-DD HH:mm:ss');
                    const dateFin = momentTz.tz(req.body.endDate, 'YYYY-MM-DD HH:mm:ss');
                    // Présence de réservation entrant en conflit
                    const a = await reservationBuilder.findReservationByRoomByDate(
                        req.body.roomId, dateDebut, dateFin
                    )
                    if(a != null){
                        console.log("bonjour")
                        return resolve({ code: 400, result: 'Reservation déjà présente' });
                    }


                    var createdReservation = await reservationBuilder.createReservation(
                        dateDebut, dateFin, req.body.object, 1, req.body.userId,
                        null, req.body.roomId, req
                    )
                        .then(function (createdReservation) {
                            return resolve({ code: 200, result: createdReservation });
                        })
                }
                catch (error) {
                    return resolve({ code: 400, result: error })
                }
            }
        } catch (err) {
            return resolve({
                code: 500,
                result: err
            });
        };
    })
};
//get all reservations
module.exports.get_reservations = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const reservations = await reservationBuilder.findReservations();
            return resolve({ code: 200, result: reservations });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
//get reservation by id
module.exports.get_reservation_by_id = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reservation = await reservationBuilder.findReservationById(req.query.reservationId);
            return resolve({ code: 200, result: reservation });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
//get les salles occupées entre startDate et endDate
module.exports.get_salles_booked_between = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.query.startDate || !req.query.endDate) {
                return reject({ code: 400, result: "Il manque une startDate ou une endDate !" });
            }
            if (REGEX.date.test(req.query.startDate) && REGEX.date.test(req.query.endDate)) {
                const sallesBookedBetween = await reservationBuilder.findSallesBookedBetween(
                    req.query.startDate, req.query.endDate
                );
                return resolve({ code: 200, result: sallesBookedBetween });
            } else {
                return resolve({ code: 400, result: "Les dates ne sont pas au bon format ! Utiliser le format TIMESTAMP : YYYY-MM-DD HH:mm:ss" });
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
// get salles réservées par jour (body: date)
module.exports.get_salles_booked_by_day = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sallesBookedByDay = await reservationBuilder.findSallesBookedByDay(req.query.startDate);
            return resolve({ code: 200, result: sallesBookedByDay });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
//Get une réservation by salle_id between une startDate et une endDate
module.exports.get_salles_booked_by_id = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sallesBookedById = await reservationBuilder.findSallesBookedById(req);
            return resolve({ code: 200, result: sallesBookedById });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
module.exports.get_reservations_by_user_id = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.query.userId == null) {
                return resolve({ code: 400, result: 'userId null' });
            }
            let listReservationWithParticipants = [];
            const reservationsByUserId = await reservationBuilder.findReservationsByUserId(req);

            for (var reservation of reservationsByUserId) {
                const listParticipant = await reservationBuilder.findParticipantsByReservationId(
                    reservation.reservationId
                )
                currentReservation = reservation
                currentReservation.dataValues["participants"] = listParticipant;
                listReservationWithParticipants.push(currentReservation);
            }
            //console.log(listReservationWithParticipants)
            return resolve({ code: 200, result: listReservationWithParticipants });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports.get_participants_by_reservation_id = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const participants = await reservationBuilder.findParticipantsByReservationId(req.query.reservationId);
            return resolve({ code: 200, result: participants })
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}

module.exports.delete_reservation = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.query.reservationId == null) {
                return resolve({ code: 400, result: 'reservationId null' });
            }
            const deleteRes = await reservationBuilder.destroyReservation(req.query.reservationId);
            if (deleteRes) {
                return resolve({ code: 200, result: 'Suppression effectué' });
            }
            else {
                return resolve({ code: 400, result: 'Erreur lors de la suppression' });
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}
