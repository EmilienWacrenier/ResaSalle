const userService = require('../services/user.service');
const recurrenceService = require('../services/recurrence.service');

const jwt = require('../interceptors/jwt');
const db = require('../config/db.config');
const Op = require('Sequelize').Op;
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    let data = await userService.get_users();
    return res.status(data.code).json({ result: data.result });
}

exports.getUserById = async (req, res) => {
    let data = await userService.get_user_by_id(req);
    return res.status(data.code).json({ result: data.result });
}

exports.inscription = async (req, res) => {
    let data = await userService.inscription(req);
    return res.status(data.code).json({ result: data.result });
}

exports.connexion = async (req, res) => {
    let data = await userService.connexion(req);
    return res.status(data.code).json({ result: data.result });
}
