const router = require('express').Router();
const di = require('../../src/di/equipamentoInjector');
const reservas = require('./reservaEquipamentos.route');

const EquipamentosController = require('../controllers/equipamentos.controller');
const EquipamentosService = require('../services/equipamentos.service');
const EquipamentosRepository = require('../repositories/equipamentos.repository');

let injector = new di();


injector.registerEquipmentRepository(EquipamentosRepository, new EquipamentosRepository());
const repository = injector.getEquipmentRepository(EquipamentosRepository)
injector.registerEquipmentService(EquipamentosService, new EquipamentosService(repository));
equipamentosController = new EquipamentosController(injector.getEquipmentService(EquipamentosService));


module.exports = app => {
    app.use('/equipamentos', router);
    router.use('/reservas', reservas);
    router.get('/', equipamentosController.getAllEquipments);
    router.get('/:id', equipamentosController.getEquipmentById);
    router.get('/patrimonio/:patrimonio', equipamentosController.getEquipmentByPatrimonio);
    router.get('/numero_serie/:numero_serie', equipamentosController.getEquipmentBySN);
    router.post('/patrimonio/', equipamentosController.createEquipmentPatrimonio);
    router.post('/numero_serie/', equipamentosController.createEquipmentSN);
    router.patch('/:id', equipamentosController.patchEquipment);
    router.delete('/:id', equipamentosController.deleteEquipment);
}
