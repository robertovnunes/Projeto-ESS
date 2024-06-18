const fs = require('fs');
const path = require('path');

const oldEquipmentsPath = path.resolve(__dirname, '../../../mocks/oldEquipments.json');
const newEquipmentsPath =  path.resolve(__dirname, '../../../mocks/newEquipments.json');



const readOldEquipments = () => {
    try{
        const data = fs.readFileSync(oldEquipmentsPath, 'utf8');
        return JSON.parse(data).equipamentos;
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}
const readNewEquipments = () => {
    try{
        const data = fs.readFileSync(newEquipmentsPath, 'utf8');
        return JSON.parse(data).equipamentos;
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}
const writeEquipments = (data) => {
    try{
        fs.writeFileSync(newEquipmentsPath, data, "utf-8");
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}

const clearDatabase = () => {
    try{
        db = readEquipments();
        while(db.length > 0){
            db.forEach((item) => {
                db.pop();
            });
        }
        writeEquipments(db);
    } catch (e) {
        console.log('Erro ao limpar banco de dados')
    }
}
export default{readEquipments, writeEquipments, clearDatabase};