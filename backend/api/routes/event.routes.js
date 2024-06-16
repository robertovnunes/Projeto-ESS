const express = require('express');
const { getAllEventsJson, eventSignUpJson,deleteEventJson } = require('../controllers/event.controllers.js');
const router = express.Router();


router.get('/', getAllEventsJson);

router.post('/signup', eventSignUpJson);

// router.put('/:id', editEventJson);

router.delete('/:id', deleteEventJson);

module.exports = router;