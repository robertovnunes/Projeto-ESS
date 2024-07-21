const router = require('express').Router();

const disciplineRoutes = require('../controllers/discipline.controllers.js');

module.exports = app => {
    app.use('/disciplines', router);
    router.get('/getAll', disciplineRoutes.getDiscipline);
    router.get('/:id', disciplineRoutes.getDisciplinebyID);
    router.post('/signup', disciplineRoutes.disciplinesSignUpJson);
    router.delete('/:id', disciplineRoutes.deleteDisciplineJson);
    router.put('/:id', disciplineRoutes.updateDisciplineJson);
}