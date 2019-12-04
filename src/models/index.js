const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const CONFIG = require('../config/config')

const sequelize = new Sequelize(
    CONFIG.db_name,
    CONFIG.db_user,
    CONFIG.db_password, {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    pool: {
        max: 30,
        min: 0,
        idle: 30000,
        acquire: 200000,
    }

});

const db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;