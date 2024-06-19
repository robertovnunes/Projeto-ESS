const equipamentosRepository = require('../api/repositories/equipamentosRepository');
const equipamentosService = require('../api/services/equipamentosService');
const EquipamentoInjector = require('./equipamentoInjector');

const equipamentoInjector = new EquipamentoInjector();

equipamentoInjector.registerEquipmentRepository('equipamentosRepository', new equipamentosRepository());
equipamentoInjector.registerEquipmentRepository('equipamentosService',
    new equipamentosService(
        equipamentoInjector.getEquipmentRepository('equipamentosRepository')
    )
);

module.exports = equipamentoInjector;