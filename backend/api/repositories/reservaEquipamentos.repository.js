const equipamentosRepository = require('../../api/repositories/equipamentos.repository');

const findItems = async (array, field) => {
    let itemlist = [];
    for (let item of array) {
        const fieldlist = item[field];
        if (fieldlist.length > 0) {
            itemlist = itemlist.concat(fieldlist);
        }
    }
    return itemlist.length > 0 ? itemlist : undefined;
}

function findItem(itemlist, key, value) {
    for(let item of itemlist){
        if(item[key] === value){
            return item;
        }
    }
    return undefined;
}

class reservaRepository{
    equipmentrepo = new equipamentosRepository();

    async getReservas(){
        const equipamentos = await this.equipmentrepo.getAllEquipments();
        let reservas = await findItems(equipamentos, 'reservas');
        return reservas;
    }

    async getReservaByID(id){
        const reservas = await this.getReservas();
        const reserva = findItem(reservas, 'id', id);
        return reserva;
    }

    async getReservasByEquipamentoID(id){
        const equipamento = await this.equipmentrepo.getEquipmentById(id);
        return equipamento.reservas;
    }

    async createReserva(reserva, equipmentID){
        const equipamento = await this.equipmentrepo.getEquipmentById(equipmentID);
        if(equipamento.hasOwnProperty('status')){
            if(equipamento.status !== 'Em manutenção'){
                if(equipamento.status === 'disponivel'){
                    equipamento.status = 'reservado';
                    reserva.status = 'pendente';
                } else if (equipamento.status === 'reservado'){
                    const data = new Date(equipamento.reservas[equipamento.reservas.length - 1].dataFim);
                    if(reserva.dataInicio >= data){
                        reserva.status = 'pendente';
                    } else {
                        reserva.status = 'negada';
                        return {status: 'negada', message: 'Este equipámento não está disponível para reserva neste período'};
                    }
                }
            } else {
                reserva.status = 'negada';
                return {status: 'negada', message: 'Equipamento em manutenção'};
            }
            equipamento.reservas.push(reserva);
            await this.equipmentrepo.updateEquipment(equipamento);
            return {status:'realizada', reserva};
        }
    }
    async deleteReserva(id){
        const reserva = await this.getReservaByID(id);
        if(reserva !== undefined){
            const equipamento = await this.equipmentrepo.getEquipmentById(reserva.equipamentoID);
            const index = equipamento.reservas.findIndex(r => r.id === id);
            equipamento.reservas.splice(index, 1);
            await this.equipmentrepo.updateEquipment(equipamento);
            return 'Reserva deletada';
        } else {
            return 'not found';
        }
    }
    /*
    async getReservaById(id, equipamentoID){
        return this.reservas.find(reserva => reserva.id === id);
    }
    async addReserva(reserva){
        this.reservas.push(reserva);
    }
    async updateReserva(reserva){
        this.reservas = this.reservas.map(r => r.id === reserva.id ? reserva : r);
    }
     */
}

module.exports = reservaRepository;