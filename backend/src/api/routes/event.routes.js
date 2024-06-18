const express = require('express');
const { getAllEventsJson, eventSignUpJson,deleteEventJson,updateEventJson } = require('../controllers/event.controllers.js');
const router = express.Router();

module.exports = app => {
    app.use('/event', router);
    
    router.get('/', getAllEventsJson);

    router.post('/signup', eventSignUpJson);

    router.put('/:id', updateEventJson);

    router.delete('/:id', deleteEventJson);
}