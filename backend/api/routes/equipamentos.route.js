const router = require('express').Router();
const di = require('../../src/di/equipamentoInjector');
const reservasRouter = require('./reservaEquipamentos.route');
const consign = require('consign');

const EquipamentosController = require('../controllers/equipamentos.controller');
const EquipamentosService = require('../services/equipamentos.service');
const EquipamentosRepository = require('../repositories/equipamentos.repository');

let injector = new di();


injector.registerEquipmentRepository(EquipamentosRepository, new EquipamentosRepository());
const repository = injector.getEquipmentRepository(EquipamentosRepository)
injector.registerEquipmentService(EquipamentosService, new EquipamentosService(repository));
const equipamentosController = new EquipamentosController(injector.getEquipmentService(EquipamentosService));

router.get('/', equipamentosController.getAllEquipments);
router.get('/:id', equipamentosController.getEquipmentById);
router.get('/patrimonio/:patrimonio', equipamentosController.getEquipmentByPatrimonio);
router.get('/numero_serie/:numero_serie', equipamentosController.getEquipmentBySN);
router.post('/', equipamentosController.createEquipment);
router.patch('/:id', equipamentosController.patchEquipment);
router.delete('/:id', equipamentosController.deleteEquipment);

module.exports = app => {
    app.use('/equipamentos', router);
}
