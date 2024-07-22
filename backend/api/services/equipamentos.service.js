const EquipamentoRepository = require('../repositories/equipamentosRepository');

class EquipamentosService {
    constructor(equipamentoRepository){
        this.equipamentoRepository = equipamentoRepository;
    }

    getAllEquipments() {
        let equipamentos = this.equipamentoRepository.getAllEquipments();
        return equipamentos
    }

    getEquipmentById(id) {
        let equipamento = this.equipamentoRepository.getEquipmentById(id);
        return equipamento;
    }

    getEquipmentByPatrimonio(value) {
        let equipamento = this.equipamentoRepository.getEquipmentByPatrimonio(value);
        return equipamento;
    }

    getEquipmentBySerie(value) {
        let equipamento = this.equipamentoRepository.getEquipmentBySerie(value);
        return equipamento;
    }

    createEquipment(newEquipamento) {
        return this.equipamentoRepository.createEquipment(newEquipamento);
    }

    patchEquipment(id, newEquipamento) {
        return this.equipamentoRepository.updateEquipment(id, newEquipamento);
    }

    deleteEquipment(id) {
        return this.equipamentoRepository.deleteEquipment(id);
    }
}

module.exports = EquipamentosService;