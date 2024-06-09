import express from 'express';
import {getAllEventsJson,eventSignUpJson} from '../controllers/event.controllers.js';
const router = express.Router();


router.get('/', getAllEventsJson);

router.post('/signup', eventSignUpJson);

// router.put('/:id', editEventJson);

// router.delete('/:id', deleteEventJson);

export default router