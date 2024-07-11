
class EquipamentosService {
    constructor(equipamentoRepository){
        this.equipamentoRepository = equipamentoRepository;
    }

    getAllEquipments() {
        return this.equipamentoRepository.getAllEquipments()
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