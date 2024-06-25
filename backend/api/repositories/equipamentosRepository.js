const fs = require('fs');
const path = require('path');


class EquipamentosRepository {
    constructor(db) {
        this.filePath = path.join(__dirname, '../../db/equipamentos.json');
        this.isMock = db !== undefined;
        this.db = db || [];
        this._init();
    }

    async _init() {
        if(!this.isMock) this.db = await this._readFile(this.filePath);
        else this.db = [];
    }

    async _readFile(filePath) {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }

    async _writeFile(data) {
        if (!this.isMock) await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async getAllEquipments() {
        //parei aqui
        return this.db.length === 0  ? 'Nenhum equipamento cadastrado' : this.db;
    }
    async getEquipmentById(id) {
        const db = await this.getAllEquipments();
        let equipamento;
        if (db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
        else {
            equipamento = db.find(equipamento => equipamento.id === id);
            return equipamento === undefined ? 'Equipamento nao encontrado' : equipamento;
        }
    }
    async getEquipmentByPatrimonio(value) {
        const db = await this.getAllEquipments();
        let equipamento;
        if (db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
        else {
            equipamento = db.find(equipamento => equipamento.patrimonio === value)
            return equipamento === undefined ? 'Equipamento nao encontrado' : equipamento;
        }
    }
    async getEquipmentBySerie(value) {
        const db = await this.getAllEquipments();
        let equipamento;
        if (db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
        else {
            equipamento = db.find(equipamento => equipamento.numero_serie === value);
            return equipamento === undefined ? 'Equipamento nao encontrado' : equipamento;
        }
    }
    async createEquipmentPatrimonio(newEquipamento) {
        let db = await this.getAllEquipments();
        if(db !== 'Nenhum equipamento cadastrado'){
           db.forEach(equipamento => {
                if(equipamento.patrimonio === newEquipamento.patrimonio){
                     return 'Patrimonio já existe';
                }
            });
            db.push(newEquipamento);
        } else {
            db = [newEquipamento];

        }
        if (!this.isMock) await this._writeFile(db);
        return newEquipamento;
    }

    async createEquipmentSN(newEquipamento){
        let db = await this.getAllEquipments();
        if(db !== 'Nenhum equipamento cadastrado'){
            db.forEach(equipamento => {
                if(equipamento.numero_serie === newEquipamento.numero_serie){
                    return 'Numero de serie já existe';
                }
            });
            db.push(newEquipamento);
        } else {
            db = [newEquipamento];
        }
        if (!this.isMock) await this._writeFile(db);
        return newEquipamento;
    }

    async updateEquipment(id, data) {
        let db = await this.getAllEquipments();
        let equipamento = this.getEquipmentById(id);
        console.log(equipamento);
        if(equipamento === 'Equipamento nao encontrado' || db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
        else {
            const index = db.findIndex(equipamento => equipamento.id === id);
            if(index === -1) return 'Equipamento nao encontrado';
            db[index] = {...db[index], ...data};
            if (!this.isMock) await this._writeFile(db);
            return db[index];
        }
    }

    async deleteEquipment(id) {
        let db;
        db = await this.getAllEquipments();
        let equipamento = await this.getEquipmentById(id);
        if(equipamento === 'Equipamento nao encontrado' || db === 'Nenum equipamento cadastrado') return 'Equipamento nao encontrado'; 
        else {
            let index = db.findIndex(equipamento => equipamento.id === id);
            if(index === -1) return 'Equipamento nao encontrado';
            const deleted = db.splice(index, 1);
            if (!this.isMock) await this._writeFile(db);
            return deleted;
        }
    }

    async getReservaById(id) {
        const db = await this.getAllEquipments();
        let reserva;
        if (db === 'Nenhum equipamento cadastrado') return 'Reserva nao encontrada';
        else {
            reserva = db.find(equipamento => equipamento.reservas.id === id);
            return reserva === undefined ? 'Reserva nao encontrada' : reserva;
        }
    }

    async getReservaManutencaoById(id) {
        const db = await this.getAllEquipments();
        let reserva;
        if (db === 'Nenhum equipamento cadastrado') return 'Reserva nao encontrada';
        else {
            reserva = db.find(equipamento => equipamento.manutencao.id === id);
            return reserva === undefined ? 'Reserva nao encontrada' : reserva;
        }
    }

    async createReservaManutencao(newReserva) {
        let db = await this.getAllEquipments();
        if(db !== 'Nenhum equipamento cadastrado'){
            db.forEach(equipamento => {
                if(equipamento.manutencao.id === newReserva.id){
                    return 'Reserva já existe';
                }
            });
            db.push(newReserva);
        } else {
            db = [newReserva];
        }
        if (!this.isMock) await this._writeFile(db);
        return newReserva;
    }

    async createReserva(newReserva) {
        let db = await this.getAllEquipments();
        if(db !== 'Nenhum equipamento cadastrado'){
            db.forEach(equipamento => {
                if(equipamento.reservas.id === newReserva.id){
                    return 'Reserva já existe';
                }
            });
            db.push(newReserva);
        } else {
            db = [newReserva];
        }
        if (!this.isMock) await this._writeFile(db);
        return newReserva;
    }

    async updateReserva(id, data) {
        let db = await this.getAllEquipments();
        let equipamento = this.getEquipmentById(id);
        if(equipamento === 'Equipamento nao encontrado' || db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
        else {
            const index = db.findIndex(equipamento => equipamento.id === id);
            if(index === -1) return 'Equipamento nao encontrado';
            db[index] = {...db[index], ...data};
            if (!this.isMock) await this._writeFile(db);
            return db[index];
        }
    }

}

module.exports = EquipamentosRepository;