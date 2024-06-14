const fs = require('fs');
const path = require('path');

const oldEquipmentsPath = path.resolve(__dirname, '../../../mocks/oldEquipments.json');
const newEquipmentsPath = path.resolve(__dirname, '../../../mocks/newEquipments.json');

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
        const data = fs.readFileSync(newEquipmentsPath, 'utf8')
        return JSON.parse(data).equipamentos;
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}

module.exports = {readOldEquipments, readNewEquipments};