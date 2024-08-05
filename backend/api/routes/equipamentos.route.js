const router = require('express').Router();
const di = require('../../src/di/equipamentoInjector');

const testSetup = require('../../tests/step_definitions/equipamentos/testSetup');

const EquipamentosController = require('../controllers/equipamentos.controller');
const EquipamentosService = require('../services/equipamentos.service');
const EquipamentosRepository = require('../repositories/equipamentos.repository');

let injector = new di();

injector.registerEquipmentRepository(EquipamentosRepository, new EquipamentosRepository());
const repository = injector.getEquipmentRepository(EquipamentosRepository)
injector.registerEquipmentService(EquipamentosService, new EquipamentosService(repository));
const equipamentosController = new EquipamentosController(injector.getEquipmentService(EquipamentosService));

const setup = new testSetup();

const _getDatabaseCopy = async (req, res) => {
    console.log('Getting database copy');
    await setup.getDatabaseCopy();
    return res.status(200).send({message: 'Database copied'});
};

const _restoreDatabase = async (req, res) => {
    console.log('Restoring database');
    await setup.restoreDatabase();
    return res.status(200).send({message: 'Database restored'});
};

const _createEquipment = async (req, res) => {
    console.log('Creating mock equipment');
    const equipment = req.body;
    await repository.createEquipment(equipment);
    return res.status(200).send({message: 'Equipment created'});
};

router.get('/', equipamentosController.getAllEquipments);
router.get('/:id', equipamentosController.getEquipmentById);
router.get('/patrimonio/:patrimonio', equipamentosController.getEquipmentByPatrimonio);
router.get('/numero_serie/:numero_serie', equipamentosController.getEquipmentBySN);
router.post('/', equipamentosController.createEquipment);
router.patch('/:id', equipamentosController.patchEquipment);
router.delete('/:id', equipamentosController.deleteEquipment);
router.post('/test/getBackup', _getDatabaseCopy);
router.post('/test/restoreBackup', _restoreDatabase);
router.post('/test/addmock', _createEquipment);


module.exports = app => {
    app.use('/equipamentos', router);
}
