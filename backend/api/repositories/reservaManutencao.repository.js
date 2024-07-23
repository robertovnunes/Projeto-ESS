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
        return await filterItems(equipamentos, 'manutencao');
    }

    async getReservaByID(id){
        const reservas = await this.getReservas();
        const reserva = findItem(reservas, 'id', id);
        return reserva !== undefined ? reserva : undefined;
    }

    async getReservasByEquipamentoID(id){
        const equipamento = await this.equipmentrepo.getEquipmentById(id);
        if(equipamento !== undefined){
            return {status: 'ok', data: equipamento.manutencao};
        } else {
            return {status: 'not found', data: 'Equipamento não encontrado'};
        }
    }

    async createReserva(reserva, equipmentID){
        const equipamento = await this.equipmentrepo.getEquipmentById(equipmentID);
        if(equipamento['status'] !== undefined){
            if(equipamento.status === 'disponivel'){
                equipamento.status = 'em_manutencao';
                reserva.status = 'confirmada';
                for(let r of equipamento.reservas){
                    if(r.status === 'confirmada' && r.dataInicio < reserva.dataInicio && r.dataReserva > reserva.dataReserva){
                        r.status = 'pendente';
                    }
                }
            }
            else if (equipamento.status === 'reservado'){
                reserva.status = 'pendente';
            }
            equipamento.manutencao.push(reserva);
            await this.equipmentrepo.updateEquipment(equipmentID, equipamento);
            return {status: 'ok', message: 'Reserva criada com sucesso', id : reserva.id};
        }
        return {status:'erro', data:undefined};
    }

    async patchReserva (id, status) {
        const reserva = await this.getReservaByID(id);
        if(reserva !== undefined){
            if(status['justificativa'] === undefined){
                reserva.status = `${status}`;
            } else {
                reserva.status = `${status.status}/${status['justificativa']}`;
            }
            const equipamento = await this.equipmentrepo.getEquipmentById(reserva['equipamentoID']);
            if(equipamento !== undefined){
                const index = equipamento.manutencao.findIndex(r => r.id === id);
                equipamento.manutencao[index] = reserva;
                if(reserva.status === 'confirmada'){
                    const dataHoje = new Date();
                    for(let r of equipamento.reservas){
                        if(r.dataInicio > dataHoje){
                            if(r.status === 'pendente'){
                                r.status = 'cancelada';
                            } else if(r.status === 'confirmada'){
                                r.status = 'pendente';
                            }
                        }
                    }
                } else if(reserva.status === 'cancelada'){
                    equipamento.status = 'disponivel';
                }
                await this.equipmentrepo.updateEquipment(reserva['equipamentoID'], equipamento);
                return {status: 'ok', message: reserva.status};
            } else {
                return {status: 'not found', message: 'Equipamento não encontrado'};
            }
        } else {
            return {status: 'not found', message: 'Reserva não encontrada'};
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
        this.reservaEquipamento = this.reservaEquipamento.map(r => r.id === reserva.id ? reserva : r);
    }
     */
}

module.exports = reservaRepository;