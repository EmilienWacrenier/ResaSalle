const CONFIG = require('../config/config');
const USER = require('../routes/user.route');
const SALLE = require('../routes/salle.route');
const RESERVATION = require('../routes/reservation.route');

module.exports = app => {
  console.log('ROUTER MODULE STARTED');

  // app.use(CONFIG.uri_prefix, testRouter);
  app.use('/user', USER);
  //Reservation
  app.use('/reservation', RESERVATION);
  //Salles
  app.use('/salle', SALLE);

};
