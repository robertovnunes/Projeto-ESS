const router = require('express').Router();

const di = require('../../di/reservaEquipamentoInjector');
const ReservaEquipamentoController = require('../controllers/reservas/reservaEquipamentos.controller');
const ReservaEquipamentoService = require('../services/reservaEquipamentos.service');
const ReservaEquipamentoRepository = require('../repositories/reservaEquipamentos.repository');

let injector = new di();

injector.registerReservaRepository(ReservaEquipamentoRepository, new ReservaEquipamentoRepository());
const repository = injector.getReservaRepository(ReservaEquipamentoRepository);
injector.registerReservaService(ReservaEquipamentoService, new ReservaEquipamentoService(repository));
reservaEquipamentoController = new ReservaEquipamentoController(injector.getReservaService(ReservaEquipamentoService));

module.exports = app => {
    app.use('/reservas', router);
    router.get('/', reservaEquipamentoController.getReservas);
}


