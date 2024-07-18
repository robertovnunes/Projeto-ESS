const equipamentosRepository = require('../../api/repositories/equipamentos.repository');

const filterItems = async (array, field) => {
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
        let reservas = await filterItems(equipamentos, 'reservas');
        return reservas;
    }

    async getReservaByID(id){
        const reservas = await this.getReservas();
        const reserva = findItem(reservas, 'id', id);
        return reserva !== undefined ? reserva : undefined;
    }

    async getReservasByEquipamentoID(id){
        const equipamento = await this.equipmentrepo.getEquipmentById(id);
        if(equipamento !== undefined){
            return {status: 'ok', data: equipamento.reservas};
        } else {
            return {status: 'not found', data: 'Equipamento não encontrado'};
        }
    }

    async createReserva(reserva, equipmentID){
        const equipamento = await this.equipmentrepo.getEquipmentById(equipmentID);
        if(equipamento.status !== undefined){
            if(equipamento.status === 'em_manutencao'){
                return {status: 'negada', message: 'Este equipamento está em manutenção'};
            } else if (equipamento.estado_conservacao === 'nao_funcional'){
                return {status: 'negada', message: 'Este equipamento não está funcional'};
            }
            if(equipamento.status !== 'em_manutencao'){
                const last = equipamento.reservas.length-1;
                const data = new Date(equipamento.reservas[last].dataFim);
                const dataInicio = reserva.dataInicio;
                if(dataInicio >= data){
                    reserva.status = 'pendente';
                } else {
                    reserva.status = 'negada';
                    return {status: 'negada', message: 'Este equipamento não está disponível para reserva neste período'};
                }
            }
            equipamento.reservas.push(reserva);
            await this.equipmentrepo.updateEquipment(equipamento.id, equipamento);
            const newReserva = await this.getReservaByID(reserva.id);
            return {status:'ok', data: newReserva};
        }
    }

    async patchReserva (id, status) {
        const reserva = await this.getReservaByID(id);
        if(reserva !== undefined){
            console.log(status)
            if(status === 'confirmada'){
                reserva.status = `${status}`;
            } else {
                reserva.status = `${status.status}/${status.justificativa}`;
            }
            const equipamento = await this.equipmentrepo.getEquipmentById(reserva['equipamentoID']);
                if(equipamento !== undefined){
                    const index = equipamento.reservas.findIndex(r => r.id === id);
                    equipamento.reservas[index] = reserva;
                    console.log(equipamento.reservas[index]);
                    await this.equipmentrepo.updateEquipment(reserva['equipamentoID'], equipamento);
                    return {status: 'ok', message: reserva.status};
                } else {
                    throw new Error('Equipamento não encontrado');
                }
        } else {
            return {status: 'not found', data: undefined};
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
    async updateReserva(reserva){
        this.reservas = this.reservas.map(r => r.id === reserva.id ? reserva : r);
    }
     */
}

module.exports = reservaRepository;