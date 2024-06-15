const router = require('express').Router();

const equipamentosController = require('../controllers/equipamentos.controller');

module.exports = app => {
    app.use('/equipamentos', router);
    router.get('/', equipamentosController.getAllEquipments);
    router.get('/id/:id', equipamentosController.getEquipmentById);
    router.get('/patrimonio/:patrimonio', equipamentosController.getEquipmentByPatrimonio);
    router.get('/sn/:numero_serie', equipamentosController.getEquipmentBySN);
    router.post('/', equipamentosController.createSingleEquipment);
    router.post('/lote', equipamentosController.createMultipleEquipments);
    router.patch('/:id', equipamentosController.patchEquipment);
    router.delete('/:id', equipamentosController.deleteEquipment);
}
