const equipamentosRepository = require('../../../api/repositories/equipamentos.repository');

const file = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './databasecopy/db.json');

class TestSetup {
    constructor(){
        this.equipamentosRepository = new equipamentosRepository();
    }
    
    async _clearDatabase(){
        const data = await this.equipamentosRepository.getAllEquipments();
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                await this.equipamentosRepository.deleteEquipment(data[i].id);
            }
        }
    }

    async getDatabaseCopy(){
        const data = await this.equipamentosRepository.getAllEquipments();
        if(data.length > 0){
            await file.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        }
    }

    async getDatabaseBackup(){
        const data = await this.equipamentosRepository.getAllEquipments();
        if(data.length > 0){
            await file.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        }
        await this._clearDatabase();
    }

    async restoreDatabase(){
        const json = await file.promises.readFile(filePath, 'utf-8');
        const data = JSON.parse(json);
        if(data.length > 0){
            await this._clearDatabase();
            for(let i = 0; i < data.length; i++){
                await this.equipamentosRepository.createEquipment(data[i]);
            }
            await file.promises.writeFile(filePath, JSON.stringify([], null, 2), 'utf-8');
        }
    }
}

module.exports = TestSetup;