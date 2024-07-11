const router = require('express').Router();

const eventRoutes = require('../controllers/event.controllers.js');

module.exports = app => {
    app.use('/events', router);
    router.get('/', eventRoutes.getAllEventsJson);
    router.post('/signup', eventRoutes.eventSignUpJson);
    router.delete('/:id', eventRoutes.deleteEventJson);
    router.put('/:id', eventRoutes.updateEventJson);
}