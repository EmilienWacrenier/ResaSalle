const sequelize = require('../models').sequelize;
const Recurrence = require('../models').recurrence;
const Reservation = require('../models').reservation;
const Room = require('../models').room;
const Role = require('../models').role;
const User = require('../models').user;

const models = {
  Recurrence,
  Reservation,
  Room,
  Role,
  User
};

const db = {
  models,
  sequelize
};

module.exports = db;