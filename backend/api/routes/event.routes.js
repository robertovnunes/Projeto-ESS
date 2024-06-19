const router = require('express').Router();

const eventRoutes = require('/home/mariana/Documents/Projeto-ESS/backend/api/controllers/event.controllers.js');

module.exports = app => {
    app.use('/events', router);
    router.get('/:id', eventRoutes.getAllEventsJson);
    router.post('/signup', eventRoutes.eventSignUpJson);
    router.delete('/:id', eventRoutes.deleteEventJson);
    router.put('/:id', eventRoutes.updateEventJson);
}