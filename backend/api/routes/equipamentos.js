const router = require('express').Router();

const equipamentosController = require('../controllers/equipamentos.controller');

module.exports = app => {
    app.use('/equipamentos', router);
    router.get('/', equipamentosController.getAllEquipments);
    router.get('/:patrimonio', equipamentosController.getEquipmentByPatrimonio);
    router.post('/', equipamentosController.createSingleEquipment);
    router.post('/lote', equipamentosController.createMultipleEquipments);
    router.patch('/:patrimonio', equipamentosController.patchEquipment);
    router.delete('/:patrimonio', equipamentosController.deleteEquipment);
}
