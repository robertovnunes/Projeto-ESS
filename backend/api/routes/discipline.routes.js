const router = require('express').Router();

const disciplineRoutes = require('/home/mariana/Documents/Projeto-ESS/backend/api/controllers/discipline.controllers.js');

module.exports = app => {
    app.use('/disciplines', router);
    router.get('/:id', disciplineRoutes.getDisciplinebyID);
    router.post('/signup', disciplineRoutes.disciplinesSignUpJson);
    router.delete('/:id', disciplineRoutes.deleteDisciplineJson);
    router.put('/:id', disciplineRoutes.updateDisciplineJson);
}