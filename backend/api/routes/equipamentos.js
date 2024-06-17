const router = require('express').Router();

const EquipamentosController = require('../controllers/equipamentosController');
const EquipamentosService = require('../services/equipamentosService');
const EquipamentosRepository = require('../repositories/equipamentosRepository');

equipamentosRepository = new EquipamentosRepository();
equipamentosService = new EquipamentosService(equipamentosRepository);
equipamentosController = new EquipamentosController(equipamentosService);


module.exports = app => {
    app.use('/equipamentos', router);
    router.get('/', equipamentosController.getAllEquipments);
    router.get('/id/:id', equipamentosController.getEquipmentById);
    router.get('/patrimonio/:patrimonio', equipamentosController.getEquipmentByPatrimonio);
    router.get('/sn/:numero_serie', equipamentosController.getEquipmentBySN);
    router.post('/', equipamentosController.createEquipment);
    router.patch('/:id', equipamentosController.patchEquipment);
    router.delete('/:id', equipamentosController.deleteEquipment);
}
