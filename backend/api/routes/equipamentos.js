const router = require('express').Router();

const equipamentosController = require('../controllers/equipamentos.controller');

module.exports = equipamentos => {
    equipamentos.use('/equipamentos', router);
    router.get('/equipamentos', equipamentosController.getAllEquipments);
    router.get('/equipamentos/:patrimonio', equipamentosController.getEquipmentByPatrimonio);
    router.post('/equipamentos', equipamentosController.createEquipment);
    router.patch('/equipamentos/:patrimonio', equipamentosController.patchEquipment);
    router.delete('/equipamentos/:patrimonio', equipamentosController.deleteEquipment);
}
