const router = require('express').Router();

const di = require('../../di/reservaEquipamentoInjector');
const ReservaEquipamentoController = require('../controllers/reservas/reservaEquipamentos.controller');
const ReservaEquipamentoService = require('../services/reservaEquipamentos.service');
const ReservaEquipamentoRepository = require('../repositories/reservaEquipamentos.repository');

let injector = new di();

injector.registerReservaRepository(ReservaEquipamentoRepository, new ReservaEquipamentoRepository());
const repository = injector.getReservaRepository(ReservaEquipamentoRepository);
injector.registerReservaService(ReservaEquipamentoService, new ReservaEquipamentoService(repository));
const service = injector.getReservaService(ReservaEquipamentoService);
const reservaEquipamentoController = new ReservaEquipamentoController(service);

router.get('/', reservaEquipamentoController.getReservas);
router.get('/:id', reservaEquipamentoController.getReservaByID);
router.get('/equipamento/:id', reservaEquipamentoController.getReservasByEquipamentoID);
router.post('/', reservaEquipamentoController.createReserva);
router.patch('/:id', reservaEquipamentoController.patchReserva);

module.exports = app => {
    app.use('/reservas/equipamentos', router);

};