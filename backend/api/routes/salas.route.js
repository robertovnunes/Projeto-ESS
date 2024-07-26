const router = require('express').Router();
const di = require('../../di/salaInjector');

const SalaController = require('../controllers/salas.controller');
const SalaService = require('../services/salas.service');
const SalaRepository = require('../repositories/salas.repository');

let injector = new di();


injector.registerSalaRepository(SalaRepository, new SalaRepository());
const repository = injector.getSalaRepository(SalaRepository)
injector.registerSalaService(SalaService, new SalaService(repository));
const equipamentosController = new SalaController(injector.getSalaService(SalaService));

router.get('/', equipamentosController.getAllSalas);
router.get('/:id', equipamentosController.getSalaById);
router.post('/', equipamentosController.createSala);
router.patch('/:id', equipamentosController.patchSala);
router.delete('/:id', equipamentosController.deleteSala);

module.exports = app => {
    app.use('/salas', router);
}
