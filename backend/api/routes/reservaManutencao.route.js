const router = require('express').Router();

const di = require('../../di/reservaEquipamentoInjector');
const ReservaManutencaoController = require('../controllers/reservas/reservaManutencao.controller');
const ReservaManutencaoService = require('../services/reservaManutencao.service');
const ReservaManutencaoRepository = require('../repositories/reservaManutencao.repository');

let injector = new di();

injector.registerReservaRepository(ReservaManutencaoRepository, new ReservaManutencaoRepository());
const repository = injector.getReservaRepository(ReservaManutencaoRepository);
injector.registerReservaService(ReservaManutencaoService, new ReservaManutencaoService(repository));
const service = injector.getReservaService(ReservaManutencaoService);
const reservaManutencaoController = new ReservaManutencaoController(service);

router.get('/', reservaManutencaoController.getReservas);
router.get('/:id', reservaManutencaoController.getReservaByID);
router.get('/equipamento/:id', reservaManutencaoController.getReservasByEquipamentoID);
router.post('/', reservaManutencaoController.createReserva);
router.patch('/:id', reservaManutencaoController.patchReserva);

module.exports = app => {
    app.use('/reservaEquipamento/manutencao', router);
};