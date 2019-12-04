const db = require('../config/db.config');
const Op = require('Sequelize').Op;

module.exports.findUsers = function () {
    return new Promise(async (resolve, reject) => {
        const user = await db.models.User.findAll();
        resolve(user);
    })
}

module.exports.findUserById = function (req) {
    return new Promise(async (resolve, reject) => {
        const user = await db.models.User.findOne({
            where: {
                userId: req.query.userId
            }
        });
        resolve(user);
    })
}

module.exports.findUserByEmail = function (req) {
    return new Promise(async (resolve, reject) => {
        const user = await db.models.User.findOne({
            where: {
                email: req.query.email
            }
        });
        resolve(user);
    })
}

module.exports.findUserByEmailOrByDas = function (req) {
    return new Promise(async (resolve, reject) => {
        try{
            const user = await db.models.User.findOne({
                where: {
                    [Op.or]: [
                        { das: req.body.das },
                        { email: req.body.email }
                    ]
                }
            });
            resolve(user);
        }
        catch(err){
            resolve(err);
        }
    })
}

module.exports.createUser = function (req, bcryptedPassword) {
    return new Promise(async (resolve, reject) => {
        try{
            var createdUser = await db.models.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                das: req.body.das,
                email: req.body.email,
                pwd: bcryptedPassword,
                role_id: 1
            }).then(function(createdUser){
                resolve(createdUser);
            })
        }
        catch(err){
            resolve(err);
        }
    })
}
