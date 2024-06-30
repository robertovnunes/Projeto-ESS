const router = require('express').Router();
const reservaEquipamentoInjector = require('../../di/reservaEquipamentoInjector');

const reservaEquipamentoController = require('../controllers/reservas.controller');
const ReservaEquipamentoService = require('../services/reservasEquipamentosService.js');

const ReservaEquipamentoController = new reservaEquipamentoController(new ReservaEquipamentoService());

module.exports = app => {
    app.use('/reservaEquipamentos', router);
    router.get('/', ReservaEquipamentoController.getAllReservas);
    router.get('/id/:id', ReservaEquipamentoController.getReservaById);
    router.get('/manutencao/:id', ReservaEquipamentoController.getReservaManutencaoById);
    router.post('/manutencao/', ReservaEquipamentoController.createReservaManutencao);
    router.post('/', ReservaEquipamentoController.createReserva);
    router.patch('/:id', ReservaEquipamentoController.patchReserva);
}