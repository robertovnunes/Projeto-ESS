const fs = require('fs');
const path = require('path');

class EquipamentosRepository {
    constructor() {
        this.filePath = path.join(__dirname, './../../db/equipamentos.json');
        this._loadJson().then(data => this.db = data);
    }

    async _loadJson() {
        const json = await this._readFile();
        return JSON.parse(json);
    }

    async _readFile() {
        return await fs.promises.readFile(this.filePath, 'utf-8');
    }

    async _writeFile(data) {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 3), 'utf-8');
    }

    async getAllEquipments() {
        this.db = await this._loadJson().then(data => data);
        return this.db;
    }

    async getEquipmentById(id) {
        let equipamentos = await this.getAllEquipments();
        if(equipamentos.length > 0){
            for (let item of equipamentos){
                if(item.hasOwnProperty('id') && item.id === id){
                    return item;
                }
            }
        }
        return undefined;
    }
    async getEquipmentByPatrimonio(value) {
        let equipamentos = await this.getAllEquipments();
        if(equipamentos.length > 0){
            for (let item of equipamentos){
                if(item.hasOwnProperty('patrimonio') && item.patrimonio === value){
                    return item;
                }
            }
        }
        return undefined;
    }
    async getEquipmentBySerie(value) {
        let equipamentos = await this.getAllEquipments();
        if(equipamentos.length > 0) {
            for (let item of equipamentos){
                if(item.hasOwnProperty('numero_serie') && item.numero_serie === value){
                    return item;
                }
            }
        }
        return undefined;
    }
    
    async createEquipment(newEquipamento) {
        let exist;
        if(newEquipamento.hasOwnProperty('patrimonio')){
            exist = await this.getEquipmentByPatrimonio(newEquipamento.patrimonio);
            if(exist !== undefined) return {status: 'error', message: 'Erro ao criar equipamento: patrimônio já cadastrado'};
        } else if(newEquipamento.hasOwnProperty('numero_serie')){
            exist = await this.getEquipmentBySerie(newEquipamento.numero_serie);
            if(exist !== undefined) return {status: 'error', message: 'Erro ao criar equipamento: numero de série já cadastrado'};
        }
        if(exist === undefined){
            let equipamentos = await this.getAllEquipments();
            if(equipamentos.length > 0) {
                equipamentos.push(newEquipamento);
            } else {
                equipamentos = [newEquipamento];
            }
            this.db = equipamentos;
            await this._writeFile(this.db);
            return {status: 'ok', message: 'Equipamento criado com sucesso', equipmentID: newEquipamento.id};
        }
        return {status: 'error', message: 'Erro ao criar equipamento'};
    }

    async updateEquipment(id, data) {
        try{
            let equipamento = await this.getEquipmentById(id);
            if(equipamento === undefined) return undefined;
            else {
                const index = await this.db.findIndex(equipamento => equipamento.id === id);
                if(index === -1) return undefined;
                if(equipamento.hasOwnProperty('patrimonio')){
                    if(data.patrimonio === equipamento.patrimonio){
                        this.db[index] = {...this.db[index], ...data};
                        await this._writeFile(this.db);
                        return this.db[index];
                    } else {
                        return 'O patrimonio de um equipamento não pode ser modificado';
                    }
                } else if(equipamento.hasOwnProperty('numero_serie')){
                    if(data.numero_serie === equipamento.numero_serie){
                        this.db[index] = {...this.db[index], ...data};
                        await this._writeFile(this.db);
                        return this.db[index];
                    } else {
                        return 'O numero de serie de um equipamento não pode ser modificado';
                    }
                }
            }
        } catch (error) {
            return error;
        }
    }

    async deleteEquipment(id) {
        let equipamento = await this.getEquipmentById(id);
        let equipamentos = await this.getAllEquipments();
        if(equipamento !== undefined) {
            let deleted;
            if(equipamentos.length > 1){
                const index = equipamentos.findIndex(equipamento => equipamento.id === id);
                if(index === -1) return undefined;
                deleted = equipamentos.splice(index, 1);
            } else {
                deleted = equipamento;
                equipamentos = [];
            }
            this.db = equipamentos;
            await this._writeFile(this.db);
            return deleted;
        }
        else {
            return undefined;
        }
    }

}

module.exports = EquipamentosRepository;