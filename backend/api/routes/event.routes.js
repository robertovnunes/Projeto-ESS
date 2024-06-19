const router = require('express').Router();

const eventRoutes = require('/home/mariana/Documents/Projeto-ESS/backend/api/controllers/event.controllers.js');

module.exports = app => {
    app.use('/events', router);
    router.get('/events/:id', eventRoutes.getAllEventsJson);
    router.post('/events/signup', eventRoutes.eventSignUpJson);
    router.delete('/events/:id', eventRoutes.deleteEventJson);
    router.put('/events/:id', eventRoutes.updateEventJson);
}