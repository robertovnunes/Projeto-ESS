const EquipamentoRepository = require('../repositories/equipamentosRepository');

class EquipamentosService {
    constructor(equipamentoRepository){
        this.equipamentoRepository = equipamentoRepository || new EquipamentoRepository();
    }

    getAllEquipments() {
        return this.equipamentoRepository.getAllEquipments();
    }

    getEquipmentById(id) {
        return this.equipamentoRepository.getEquipmentById(id);
    }

    getEquipmentByPatrimonio(value) {
        return this.equipamentoRepository.getEquipmentByPatrimonio(value);
    }

    getEquipmentBySerie(value) {
        return this.equipamentoRepository.getEquipmentBySerie(value);
    }

    createEquipmentPatrimonio(newEquipamento) {
        return this.equipamentoRepository.createEquipmentPatrimonio(newEquipamento);
    }

    createEquipmentSN(newEquipamento) {
        return this.equipamentoRepository.createEquipmentSN(newEquipamento);
    }

    patchEquipment(id, newEquipamento) {
        return this.equipamentoRepository.patchEquipment(id, newEquipamento);
    }

    deleteEquipment(id) {
        return this.equipamentoRepository.deleteEquipment(id);
    }
}

module.exports = EquipamentosService;