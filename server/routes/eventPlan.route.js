const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventPlan.controller');


router.get('/by-user-and-date', eventController.getEventsByUserAndDate);
router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/user/:userId', eventController.getEventsByUser);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
