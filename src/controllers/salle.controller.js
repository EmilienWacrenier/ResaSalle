const salleService = require('../services/salle.service');

exports.getSalles = async (req, res) => {
    let data = await salleService.get_salles();
    return res.status(data.code).json({ result: data.result });
};

exports.getSalle = async (req, res) => {
    let data = await salleService.get_salle(req);
    return res.status(data.code).json({ result: data.result });
};

exports.getSallesAvailable = async (req, res) => {
    let data = await salleService.get_salles_available(req);
    return res.status(data.code).json({ result: data.result });
}

exports.createRoom = async (req, res) => {
    let data = await salleService.create_room(req);
    return res.status(data.code).json({result: data.result});
}

exports.modifyRoom = async (req, res) => {
    let data = await salleService.modify_room(req);
    return res.status(data.code).json({result: data.result});
}

exports.deleteRoom = async (req, res) => {
    let data = await salleService.delete_room(req);
    return res.status(data.code).json({result: data.result});
}