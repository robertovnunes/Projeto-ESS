const equipamentosRepository = require('../api/repositories/equipamentosRepository');
const equipamentosService = require('../api/services/equipamentosService');
const EquipamentoInjector = require('./di/equipamentoInjector');

const equipamentoInjector = new EquipamentoInjector();

equipamentoInjector.registerRepository('equipamentosRepository', new equipamentosRepository());
equipamentoInjector.registerService('equipamentosService',
    new equipamentosService(
        equipamentoInjector.getRepository('equipamentosRepository')
    )
);

module.exports = equipamentoInjector;