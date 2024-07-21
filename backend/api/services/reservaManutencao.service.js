class reservaService {
    constructor(reservaManutencaoRepository){
        this.reservaManutencaoRepository = reservaManutencaoRepository;
    }

    async getReservas() {
        return await this.reservaManutencaoRepository.getReservas();
    }
    async getReservaByID(id) {
        return await this.reservaManutencaoRepository.getReservaByID(id);
    }
    async getReservasByEquipamentoID(id) {
        return await this.reservaManutencaoRepository.getReservasByEquipamentoID(id);
    }
    async createReserva(reserva, equipamentoID) {
        return await this.reservaManutencaoRepository.createReserva(reserva, equipamentoID);
    }
    async patchReserva(id, status) {
        return await this.reservaManutencaoRepository.patchReserva(id, status);
    }

}

module.exports = reservaService;