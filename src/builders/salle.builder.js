const db = require('../config/db.config');
const Op = require('Sequelize').Op;

module.exports.findSalles = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const salles = await db.models.Room.findAll();
            resolve(salles);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports.findSalle = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const salle = await db.models.Room.findOne({
                where: {
                    roomId: id
                }
            });
            resolve(salle);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports.findSallesAvailable = function (req) {
    return new Promise(async (resolve, reject) => {
        try {
            const availableRoom = await db.sequelize.query(
                'select room.name, room.area, room.capacity \
                from room\
                where capacity >= (:capacity)\
                AND roomId NOT IN (\
                    select room_id from reservation\
                    where (startDate >= (:startDate) AND startDate <= (:endDate))\
                    OR (endDate >= (:startDate) AND endDate <= (:endDate))\
                )', {
                replacements: {
                    capacity: req.query.capacity,
                    startDate: req.query.startDate,
                    endDate: req.query.endDate
                },
                type: db.sequelize.QueryTypes.SELECT
            }
            )
            return resolve(availableRoom)
        } catch (error) {
            return reject(error)
        }

    })
}

module.exports.createRoom = function (name, area, capacity) {
    return new Promise(async (resolve, reject) => {
        const newRoom = await db.models.Room.create({
            name: name,
            area: area,
            capacity: capacity
        }).then(function (newRoom) {
            if (newRoom != null) {
                return resolve(newRoom);
            }
        }).catch(function (err) {
            return reject(err);
        })

    })
}

module.exports.modifyRoom = function (name, area, capacity, roomId) {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedRoom = await db.models.Room.update({
                name: name,
                area: area,
                capacity: capacity
            }, {
                where: {
                    roomId: roomId
                },
                returning: true,
                plain: true,
            }
            ).then(function (updatedRoom) {
                return resolve(updatedRoom);
            })
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports.destroyRoom = function(roomId){
    return new Promise(async (resolve, reject) => {
        try {
            const deleted = await db.models.Room.destroy({
                where: {
                    roomId: roomId
                }
            }).then(function(deleted){
                return resolve(deleted);
            })
        } catch (error) {
            return reject(error);
        }
    })
}