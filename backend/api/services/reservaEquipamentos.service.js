class reservaService {
    constructor(reservaEquipamentosRepository){
        this.reservaEquipamentosRepository = reservaEquipamentosRepository;
    }

    async getReservas() {
        return await this.reservaEquipamentosRepository.getReservas();
    }
    async getReservaByID(id) {
        return await this.reservaEquipamentosRepository.getReservaByID(id);
    }
    async getReservasByEquipamentoID(id) {
        return await this.reservaEquipamentosRepository.getReservasByEquipamentoID(id);
    }
    async createReserva(reserva, equipamentoID) {
        return await this.reservaEquipamentosRepository.createReserva(reserva, equipamentoID);
    }
    async patchReserva(id, status) {
        return await this.reservaEquipamentosRepository.patchReserva(id, status);
    }
/*


    updateReserva(id, reserva) {
        const index = this.reservas.findIndex(reserva => reserva.id === id);
        this.reservas[index] = reserva;
    }

    deleteReserva(id) {
        this.reservas = this.reservas.filter(reserva => reserva.id !== id);
    }
 */

}

module.exports = reservaService;