const express = require('express');
const {getDisciplinebyID, disciplinesSignUpJson } = require('/home/mariana/Documents/Projeto-ESS/backend/api/controllers/discipline.controllers.js');
const router = express.Router();

router.get('/:id', getDisciplinebyID);

router.post('/signup', disciplinesSignUpJson);



module.exports = router;