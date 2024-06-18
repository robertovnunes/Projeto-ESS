const fs = require('fs');
const path = require('path');

const shortid = require('shortid');
const equipamento = require('../models/equipamentoSNModel');

function isJsonEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

class EquipamentosRepository {
    constructor(dbPath){
        this.filePath = dbPath || path.join(__dirname, '../../db/equipamentos.json');
        this._readFile(this.filePath).then(r => r);
    }
    async _readFile() {
        const data = await fs.promises.readFile(this.filePath);
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async getAllEquipments() {
        const db = await this._readFile();
        console.log(db);
        return db === undefined ? 'Nenhum equipamento cadastrado' : db;
    }
    async getEquipmentById(id) {
        const db = await this.getAllEquipments();
        let equipamento = db.find(equipamento => equipamento.id === id);
        console.log(equipamento);
        return equipamento === undefined ? 'Equipamento nao encontrado' : equipamento;
    }
    async getEquipmentByPatrimonio(value) {
        const db = await this.getAllEquipments();
        let equipamento = db.find(equipamento => equipamento.patrimonio === value);
        console.log(equipamento);
        return equipamento === undefined ? 'Equipamento nao encontrado' : equipamento;
    }
    async getEquipmentBySerie(value) {
        const db = await this.getAllEquipments();
        let equipamento = db.find(equipamento => equipamento.numero_serie === value);
        console.log(equipamento);
        return equipamento === undefined ? 'Equipamento nao encontrado' : equipamento;
    }
    async createEquipmentPatrimonio(newEquipamento) {
        let db = await this.getAllEquipments();
        if(!isJsonEmpty(db)){
            if(db.find(equipamento => equipamento.patrimonio === newEquipamento.patrimonio)){
                return 'Patrimonio já existe';
            }

            db.push(newEquipamento);
        } else {
            db = [newEquipamento];

        }
        await this._writeFile(db);
        return newEquipamento;
    }

    async createEquipmentSN(newEquipamento){
        let db = await this.getAllEquipments();
        if(!isJsonEmpty(db)){
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
        let db = this.getAllEquipments();
        const index = db.findIndex(equipamento => equipamento.id === id);
        if(index === -1) return 'Equipamento nao encontrado';
        db[index] = {...db[index], ...data};
        await this._writeFile(db);
        return db[index];
    }

    async deleteEquipment(id) {
        let db = this.getAllEquipments();
        const index = db.findIndex(equipamento => equipamento.id === id);
        if(index === -1) return 'Equipamento nao encontrado';
        const deleted = db.splice(index, 1);
        await this._writeFile(db);
        return deleted;
    }

}

module.exports = EquipamentosRepository;