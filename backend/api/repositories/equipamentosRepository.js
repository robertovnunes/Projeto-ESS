const fs = require('fs');
const path = require('path');

const shortid = require('shortid');

function isJsonEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

class EquipamentosRepository {
    constructor(dbPath){
        this.filePath = dbPath || path.join(__dirname, '../../db/equipamentos.json');
    }
    async _readFile() {
        const data = fs.readFileSync(this.filePath);
        return JSON.parse(data);
    }

    async _writeFile(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    async getAllEquipments() {
        return this._readFile();
    }
    async getEquipmentById(id) {
        const db = await this.getAllEquipments();
        return db.find(equipamento => equipamento.id === id);
    }
    async getEquipmentByPatrimonio(value) {
        const db = await this.getAllEquipments();
        return db.find(equipamento => equipamento['patrimonio'] === value);
    }
    async getEquipmentBySerie(value) {
        const db = await this.getAllEquipments();
        return db.find(equipamento => equipamento['numero_serie'] === value);
    }
    async createEquipmentPatrimonio(newEquipamento) {
        let db = await this.getAllEquipments();
        let id = '04'+shortid.generate();
        if(!isJsonEmpty(db)){
            db.forEach(equipamento => {
                if(equipamento.patrimonio === newEquipamento.patrimonio){
                    return 'Patrimonio já existe';
                }
            });
            db.forEach(equipamento => {
                if(equipamento.id === id){
                    id = '04'+shortid.generate();
                }
            });
            newEquipamento.id = id;
            db.push(newEquipamento);
        } else {
            newEquipamento.id = id;
            db = [newEquipamento];

        }
        await this._writeFile(db);
        return newEquipamento;
    }

    async createEquipmentSN(newEquipamento){
        let db = await this.getAllEquipments();
        let id = '04'+shortid.generate();
        console.log(isJsonEmpty(db));
        if(!isJsonEmpty(db)){
            db.forEach(equipamento => {
                if(equipamento.numero_serie === newEquipamento.numero_serie){
                    return 'Numero de serie já existe';
                }
            });
            db.forEach(equipamento => {
                if(equipamento.id === id){
                    id = '04'+shortid.generate();
                }
            });
            newEquipamento.id = id;
            db.push(newEquipamento);
        } else {
            newEquipamento.id = id;
            db = [newEquipamento];
        }
        await this._writeFile(db);
        return newEquipamento;
    }

    async updateEquipment(id, data) {
        let db = this.getAllEquipments();
        const index = db.findIndex(equipamento => equipamento.id === id);
        if(index === -1) return 'Equipamento não encontrado';
        db[index] = {...db[index], ...data};
        await this._writeFile(db);
        return db[index];
    }

    async deleteEquipment(id) {
        let db = this.getAllEquipments();
        const index = db.findIndex(equipamento => equipamento.id === id);
        if(index === -1) return 'Equipamento não encontrado';
        const deleted = db.splice(index, 1);
        await this._writeFile(db);
        return deleted;
    }

}

module.exports = EquipamentosRepository;