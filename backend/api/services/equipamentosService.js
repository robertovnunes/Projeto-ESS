const EquipamentoRepository = require('../repositories/equipamentosRepository');

class EquipamentosService {
    constructor(equipamentoRepository){
        this.equipamentoRepository = equipamentoRepository;
    }

    getAllEquipments() {
        let equipamentos = this.equipamentoRepository.getAllEquipments();
    }

    getEquipmentById(id) {
        let equipamento = this.equipamentoRepository.getEquipmentById(id);
        if(equipamento === undefined){
            return 'Equipamento nao encontrado';
        } else {
            return equipamento;
        }
    }

    getEquipmentByPatrimonio(value) {
        let equipamento = this.equipamentoRepository.getEquipmentByPatrimonio(value);
        if(equipamento === undefined){
            return 'Equipamento nao encontrado';
        } else{
            return equipamento;
        }
    }

    getEquipmentBySerie(value) {
        let equipamento = this.equipamentoRepository.getEquipmentBySerie(value);
        return equipamento;   
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