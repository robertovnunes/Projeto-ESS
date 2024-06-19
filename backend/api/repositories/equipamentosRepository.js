const fs = require('fs');
const path = require('path');

const shortid = require('shortid');
const equipamento = require('../models/equipamentoSNModel');

function isJsonEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

class EquipamentosRepository {
    constructor(dbPath){
        this.db = dbPath || this._readFile(path.join(__dirname, '../../db/equipamentos.json'));
    }
    async _readFile(filePath) {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async getAllEquipments() {
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
        await this._writeFile(db);
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
        await this._writeFile(db);
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
            await this._writeFile(db);
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
            await this._writeFile(db);
            return deleted;
        }
    }

}

module.exports = EquipamentosRepository;