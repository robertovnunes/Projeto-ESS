const e = require('express');
const fs = require('fs');
const path = require('path');


class EquipamentosRepository {
    constructor() {
        this.filePath = path.join(__dirname, '../../db/equipamentos.json');
        this.db = this._init();
    }

    async _init() {
        return await this._readFile(this.filePath);
    }

    async _readFile(filePath) {
        let data;
        data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async getAllEquipments() {
        //parei aqui
        return this.db.length === 0  ? null : this.db;
    }
    async getEquipmentById(id) {
        const db = await this.getAllEquipments();
        let equipamento;
        if (db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
        else {
            equipamento = db.find(equipamento => equipamento.id === id);
            return equipamento === undefined ? null : equipamento;
        }
    }
    async getEquipmentByPatrimonio(value) {
        const db = await this.getAllEquipments();
        let equipamento;
        if (db === 'Nenhum equipamento cadastrado') return null;
        else {
            equipamento = db.find(equipamento => equipamento.patrimonio === value)
            return equipamento === undefined ? null : equipamento;
        }
    }
    async getEquipmentBySerie(value) {
        const db = await this.getAllEquipments();
        let equipamento;
        if (db === null) return null;
        else {
            equipamento = db.find(equipamento => equipamento.numero_serie === value);
            return equipamento === undefined ? null : equipamento;
        }
    }
    async createEquipmentPatrimonio(newEquipamento) {
        let db = await this.getAllEquipments();
        if(db !== null){
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
        if(db !== null){
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
        let equipamento = await this.getEquipmentById(id);
        if(equipamento === null || db === null) return null;
        else {
            const index = db.findIndex(equipamento => equipamento.id === id);
            if(index === -1) return null;
            if(equipamento.hasOwnProperty('patrimonio')){
                if(data.patrimonio === equipamento.patrimonio){
                    db[index] = {...db[index], ...data};
                    await this._writeFile(db);
                    return db[index];
                } else {
                    return 'O patrimonio de um equipamento não pode ser modificado';
                }
            } else if(equipamento.hasOwnProperty('numero_serie')){
                if(data.numero_serie === equipamento.numero_serie){
                    db[index] = {...db[index], ...data};
                    await this._writeFile(db);
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
        if(equipamento === null || db === null) return null; 
        else {
            let index = db.findIndex(equipamento => equipamento.id === id);
            if(index === -1) return null;
            const deleted = db.splice(index, 1);
            await this._writeFile(db);
            return deleted;
        }
    }

}

module.exports = EquipamentosRepository;