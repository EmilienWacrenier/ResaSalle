const salleBuilder = require('../builders/salle.builder');

module.exports.get_salles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const salles = await salleBuilder.findSalles();
            return resolve({ code: 200, result: salles });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports.get_salle = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salle = await salleBuilder.findSalle(req.query.roomId);
            return resolve({ code: 200, result: salle });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports.get_salles_available = (req) => {
    return new Promise(async (resolve, reject) => {
        // Vérification paramètres 
        if (req.query.capacity == null ||
            req.query.startDate == null ||
            req.query.endDate == null) {
            return resolve({ code: 400, result: 'Params null' });
        }
        if (isNaN(req.query.capacity)) {
            return resolve({ code: 400, result: 'Capacity n\'est pas un nombre' })
        }

        const salles = await salleBuilder.findSallesAvailable(req)
            .then(function (salles) {
                return resolve({ code: 200, result: salles });
            })
    });
}

module.exports.create_room = (req) => {
    return new Promise(async (resolve, reject) => {
        // Vérification des paramètres
        if (req.body.name == null || req.body.area == null, req.body.capacity == null) {
            return resolve({ code: 400, result: 'Un champs est null' })
        }

        const newRoom = await salleBuilder.createRoom(
            req.body.name,
            req.body.area,
            req.body.capacity
        ).then(function (newRoom) {
            if (newRoom != null) {
                return resolve({ code: 200, result: newRoom });
            }
        }).catch(function (err) {
            return reject(err)
        })
    })
}

module.exports.modify_room = (req) => {
    return new Promise(async (resolve, reject) => {
        // Vérification des paramètres
        if (req.body.name == null || req.body.area == null, req.body.capacity == null ||
            req.body.roomId == null) {
            return resolve({ code: 400, result: 'Un champs est null' })
        }

        const updatedRoom = await salleBuilder.modifyRoom(
            req.body.name,
            req.body.area,
            req.body.capacity,
            req.body.roomId
        ).then(function (updatedRoom) {
            if (updatedRoom != null) {
                return resolve({ code: 200, result: 'Mise à jour correcte' });
            }
        }).catch(function (err) {
            return reject(err);
        })
    })
}

module.exports.delete_room = (req) => {
    return new Promise(async (resolve, reject) => {
        // vérification des paramètres
        if (req.query.roomId == null) {
            return resolve({ code: 400, result: 'roomId null' });
        }

        const deleted = await salleBuilder.destroyRoom(req.query.roomId)
            .then(function (deleted) {
                // Vérification de la suppression
                if(deleted == 1){
                    return resolve({ code: 200, result: 'Suppression correctement effectue' });
                }                
                return resolve({code: 400, result:'Une erreur est survenue lors de la suppression'})
            }).catch(function (err) {
                return reject(err)
            })
    })
}
