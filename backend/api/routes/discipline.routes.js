const router = require('express').Router();

const disciplineRoutes = require('/home/mariana/Documents/Projeto-ESS/backend/api/controllers/discipline.controllers.js');

module.exports = app => {
    app.use('/disciplines', router);
    router.get('/disciplines/:id', disciplineRoutes.getDisciplinebyID);
    router.post('/disciplines/signup', disciplineRoutes.disciplinesSignUpJson);
    router.delete('/disciplines/:id', disciplineRoutes.deleteDisciplineJson);
    router.put('/disciplines/:id', disciplineRoutes.updateDisciplineJson);
}