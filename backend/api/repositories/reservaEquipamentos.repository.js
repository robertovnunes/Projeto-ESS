const equipamentosRepository = require('../../api/repositories/equipamentos.repository');

class reservaRepository{
    constructor(){
        this.equipmentrepo = new equipamentosRepository();
    }
    async getReservas(){
        const equipamentos = await this.equipmentrepo.getAllEquipments();
        const reservas = equipamentos.filter(async (equipamento) => equipamento.reservas.length > 0);
        return reservas;
    }
    /*
    async getReservaById(id, equipamentoID){
        return this.reservas.find(reserva => reserva.id === id);
    }
    async addReserva(reserva){
        this.reservas.push(reserva);
    }
    async deleteReserva(id){
        this.reservas = this.reservas.filter(reserva => reserva.id !== id);
    }
    async updateReserva(reserva){
        this.reservas = this.reservas.map(r => r.id === reserva.id ? reserva : r);
    }
     */
}

module.exports = reservaRepository;