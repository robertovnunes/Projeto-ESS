const salaRepository = require('../../../api/repositories/salas.repository');

const file = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './databasecopy/db.json');

class TestSetup {
    constructor(){
        this.salaRepository = new salaRepository();
    }
    
    async clearDatabase(){
        const data = await this.salaRepository.getAllSalas();
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                await this.salaRepository.deleteSala(data[i].id);
            }
        }
    }
    
    async getDatabaseCopy(){
        const data = await this.salaRepository.getAllSalas();
        if(data.length > 0){
            await file.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        }
        await this.clearDatabase();
    }

    async restoreDatabase(){
        const json = await file.promises.readFile(filePath, 'utf-8');
        const data = JSON.parse(json);
        if(data.length > 0){
            await this.clearDatabase();
            for(let i = 0; i < data.length; i++){
                await this.salaRepository.createSala(data[i]);
            }
            await file.promises.writeFile(filePath, JSON.stringify([], null, 2), 'utf-8');
        }
    }
}

module.exports = TestSetup;