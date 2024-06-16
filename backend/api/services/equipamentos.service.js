const fs = require('fs');
const path = require('path');
const shortid = require('shortid');


const filePath = path.join(__dirname, '../../db/equipamentos.json');

const loadDatabase = () => {

    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
};

const writeDatabase = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getAllEquipments  = () => {
    return loadDatabase();
};

const getEquipmentById = (id) => {
    const db = loadDatabase();
    return db.find(equipamento => equipamento.id === id);
};

const getEquipmentByField = (field, value) => {
    const db = loadDatabase();
    return db.find(equipamento => equipamento[field] === value);

}

const createEquipment = (equipamento) => {
    const db = loadDatabase();
    const lastId = db[db.length - 1].id;
    equipamento.id = lastId + 1;
    db.push(equipamento);
    writeDatabase(db);
    return equipamento;
};

const updateEquipment = (id, equipamento) => {

}