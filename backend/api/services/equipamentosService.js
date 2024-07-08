const EquipamentoRepository = require('../repositories/equipamentosRepository');

class EquipamentosService {
    constructor(equipamentoRepository){
        this.equipamentoRepository = equipamentoRepository;
    }

    async getAllEquipments() {
        let equipamentos = await this.equipamentoRepository.getAllEquipments();
        return equipamentos
    }

    async getEquipmentById(id) {
        let equipamento = await this.equipamentoRepository.getEquipmentById(id);
        return equipamento;
    }

    async getEquipmentByPatrimonio(value) {
        let equipamento = await this.equipamentoRepository.getEquipmentByPatrimonio(value);
        return equipamento;
    }

    async getEquipmentBySerie(value) {
        let equipamento = await this.equipamentoRepository.getEquipmentBySerie(value);
        return equipamento;
    }

    async createEquipment(newEquipamento) {
        return await this.equipamentoRepository.createEquipment(newEquipamento);
    }

    async patchEquipment(id, newEquipamento) {
        return await this.equipamentoRepository.updateEquipment(id, newEquipamento);
    }

    async deleteEquipment(id) {
        return await this.equipamentoRepository.deleteEquipment(id);
    }
}

module.exports = EquipamentosService;