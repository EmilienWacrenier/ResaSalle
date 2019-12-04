// Express router
var express = require('express');
var router = express.Router();

// Controller declaration
const SalleController = require('../controllers/salle.controller.js');

// GET
router.get('/rooms', SalleController.getSalles);
router.get('/roomById', SalleController.getSalle);
router.get('/availableRooms', SalleController.getSallesAvailable);

// POST
router.post('/createRoom', SalleController.createRoom);

// DELETE
router.delete('/deleteRoom', SalleController.deleteRoom);

// PUT
router.put('/modifyRoom', SalleController.modifyRoom);

// Export routes
module.exports = router;
