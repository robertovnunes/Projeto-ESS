const fs = require('fs');
const path = require('path');

class SalasRepository {
    constructor() {
        this.filePath = path.join(__dirname, './../../db/salas.json');
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

    async getAllSalas() {
        this.db = await this._loadJson().then(data => data);
        return this.db;
    }

    async getSalaById(id) {
        let salas = await this.getAllSalas();
        if(salas.length > 0){
            for (let item of salas){
                if(item.hasOwnProperty('id') && item.id === id){
                    return item;
                }
            }
        }
        return undefined;
    }
    
    async createSala(newSala) {
        let salas = await this.getAllSalas();
        for (let sala of salas){
            if(sala.nome === newSala.nome){
                return {status: 'erro', message: 'Sala já cadastrada'};
            }
        }
        if(salas.length > 0) {
            salas.push(newSala);
        } else {
            salas = [newSala];
        }
        this.db = salas;
        await this._writeFile(this.db);
        return {status:'ok', message: 'Sala cadastrada com sucesso'};
    }

    async updateSala(id, data) {
        try{
            let sala = await this.getSalaById(id);
            if(sala === undefined) return {status: 'not found', message: 'Sala não encontrada'};
            else {
                const index = await this.db.findIndex(sala => sala.id === id);
                if(index === -1) return {status:'erro', message: ''};
                sala = {...sala, ...data};
                this.db[index] = sala;
                await this._writeFile(this.db);
                return {status: 'ok', message: 'Sala atualizada com sucesso'};
            }
        } catch (error) {
            return error;
        }
    }

    async deleteSala(id) {
        let sala = await this.getSalaById(id);
        let salas = await this.getAllSalas();
        if(sala !== undefined) {
            let deleted;
            if(salas.length > 1){
                const index = salas.findIndex(sala => sala.id === id);
                if(index === -1) return undefined;
                salas.splice(index, 1);
            } else {
                salas = [];
            }
            this.db = salas;
            await this._writeFile(this.db);
            return {status: 'ok', message: 'Sala removida'};
        }
        else {
            return {status: 'not found', message: 'Sala não encontrada'};
        }
    }

}

module.exports = SalasRepository;