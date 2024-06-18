const express = require('express');
const {getDisciplinebyID, disciplinesSignUpJson, deleteDisciplineJson, updateDisciplineJson } = require('../controllers/discipline.controllers');
const router = express.Router();


module.exports = (app) => {
    app.use('/discipline', router);

    router.get('/:id', getDisciplinebyID);

    router.post('/signup', disciplinesSignUpJson);

    router.delete('/:id', deleteDisciplineJson);

    router.put('/:id', updateDisciplineJson);
}