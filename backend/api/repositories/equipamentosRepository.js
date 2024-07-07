const e = require('express');
const fs = require('fs');
const path = require('path');

class EquipamentosRepository {
    constructor() {
        this.filePath = path.join(__dirname, './../../db/equipamentos.json');
        this._init().then(data => this.db = data);
    }

    async _init() {
        const data = await this._readFile();
        return data;
    }

    async _readFile() {
        let data = await fs.promises.readFile(this.filePath);
        return JSON.parse(data);
    }

    async _writeFile(data) {
        try{
            await fs.promises.writeFile(this.filePath, JSON.stringify(data));
        } catch (error) {
            return error;
        }
    }

    async getAllEquipments() {
        try{
            this.db = await this._readFile();
            return this.db;
        } catch (error) {
            return error;
        }
    }

    async getEquipmentById(id) {
        try{
            let equipamentos = await this.getAllEquipments();
            if(equipamentos.length > 0){
                for (let item of equipamentos){
                    if(item['id'] === id){
                        return item;
                    }
                }
            }
            return undefined;
        } catch (error) {
            return error;
        }
    }
    async getEquipmentByPatrimonio(value) {
        try{
            let equipamentos = await this.getAllEquipments();
            if(equipamentos.length > 0){
                for (let item of equipamentos){
                    if(item.hasOwnProperty('patrimonio')){
                        if(item.patrimonio === value){
                            return item;
                        }
                    }
                }
            }
            return undefined;
        }catch(error) {
            return error;
        }
    }
    async getEquipmentBySerie(value) {
        try{
            let equipamentos = await this.getAllEquipments();
        if(equipamentos.length > 0) {
            for (let item of equipamentos){
                if(item.hasOwnProperty('numero_serie')){
                    if(item.numero_serie === value){
                        return item;
                    }
                }
            }
        }
        return undefined;
        } catch (error) {
            return error;
        }
    }
    
    async createEquipmentPatrimonio(newEquipamento) {
        try{
            const exist = await this.getEquipmentByPatrimonio(newEquipamento.patrimonio);
            if(exist === undefined){
            if(this.db.length === 0){
                    this.db = [newEquipamento];
                } else {
                    this.db.push(newEquipamento);
                }
                await this._writeFile(this.db);
                return newEquipamento;
            } else {
                return 'Patrimonio já existe';
            }
        }catch(error){
            return error;
        }
    }

    async createEquipmentSN(newEquipamento){
        try{
            const exits = await this.getEquipmentBySerie(newEquipamento.numero_serie);
            if(exits === undefined){
                if(this.db.length === 0){
                    this.db = [newEquipamento];
                } else {
                    this.db.push(newEquipamento);
                }
                await this._writeFile(this.db);
                return newEquipamento;
            } else {
                return 'Numero de serie já existe';
            }
        }catch(error){
            return error;
        }
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
        try{
            let equipamento = await this.getEquipmentById(id);
            if(equipamento === undefined) {
                return undefined;
            } 
            else {
                if(this.db.length === 1){
                    this.db = [];
                } else {
                    const equipamentos = await this.getAllEquipments();
                    const index = equipamentos.findIndex(equipamento => equipamento.id === id);
                    if(index === -1) return undefined;
                    this.db.splice(index, 1);
                }
                await this._writeFile(this.db);
                return equipamento;
            }
        } catch(error) {
            return error;
        }
    }

}

module.exports = EquipamentosRepository;