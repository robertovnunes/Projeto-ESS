const e = require('express');
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
        let data;
        data = await fs.promises.readFile(filePath, 'utf8');
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
        let equipamento = await this.getEquipmentById(id);
        if(equipamento === 'Equipamento nao encontrado' || db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
        else {
            const index = db.findIndex(equipamento => equipamento.id === id);
            if(index === -1) return 'Equipamento nao encontrado';
            if(equipamento.hasOwnProperty('patrimonio')){
                if(data.patrimonio === equipamento.patrimonio){
                    db[index] = {...db[index], ...data};
                    if (!this.isMock) await this._writeFile(db);
                    return db[index];
                } else {
                    return 'O patrimonio de um equipamento não pode ser modificado';
                }
            } else if(equipamento.hasOwnProperty('numero_serie')){
                if(data.numero_serie === equipamento.numero_serie){
                    db[index] = {...db[index], ...data};
                    if (!this.isMock) await this._writeFile(db);
                    return db[index];
                } else {
                    return 'O numero de serie de um equipamento não pode ser modificado';
                }
            }
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

}

module.exports = EquipamentosRepository;