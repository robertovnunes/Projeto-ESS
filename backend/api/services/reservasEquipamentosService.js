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

    getReservaById(id) {
        let reserva = this.equipamentoRepository.getReservaById(id);
        return reserva;
    }

    getReservaManutencaoById(id) {
        let reserva = this.equipamentoRepository.getReservaManutencaoById(id);
        return reserva;
    }

    createReservaManutencao(newReserva) {
        return this.equipamentoRepository.createReservaManutencao(newReserva);
    }

    createReserva(newReserva) {
        return this.equipamentoRepository.createReserva(newReserva);
    }

    patchReserva(id, newReserva) {
        return this.equipamentoRepository.updateReserva(id, newReserva);
    }
}

module.exports = EquipamentosService;