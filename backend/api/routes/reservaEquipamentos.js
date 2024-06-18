const router = require('express').Router();

const EquipamentosController = require('../controllers/equipamentosController');
const EquipamentosService = require('../services/equipamentosService');
const EquipamentosRepository = require('../repositories/equipamentosRepository');

equipamentosRepository = new EquipamentosRepository();
equipamentosService = new EquipamentosService(equipamentosRepository);
equipamentosController = new EquipamentosController(equipamentosService);


module.exports = app => {
    app.use('/equipamentos', router);
    router.get('/reservas', equipamentosController.getAllEquipments);
    router.get('/id/:id/reservas', equipamentosController.getEquipmentById);
    router.post('/reservas', equipamentosController.createEquipment);
    router.patch('/reservas/:id', equipamentosController.patchEquipment);
    router.delete('/reservas/:id', equipamentosController.deleteEquipment);
}
 