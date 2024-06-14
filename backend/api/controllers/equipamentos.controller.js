const e = require('express');
const equipamentosModel = require('../models/equipamento.model');

exports.getAllEquipments = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        res.status(200).send(equipments);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

exports.getEquipmentByPatrimonio = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const equipment = equipments.find(equipment => equipment.patrimonio === req.params.patrimonio);
        if(equipment){
            res.status(200).send(equipment);
        } else {
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

exports.createEquipment = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        equipments.push(req.body);
        writeDatabase(equipments);
        res.status(201).send(req.body);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

exports.patchEquipment = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const index = equipments.findIndex(equipment => equipment.patrimonio === req.params.patrimonio);
        if(index !== -1){
            equipments[index] = req.body;
            writeDatabase(equipments);
            res.status(200).send(req.body);
        } else {
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

exports.deleteEquipment = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const index = equipments.findIndex(equipment => equipment.patrimonio === req.params.patrimonio);
        if(index !== -1){
            equipments.splice(index, 1);
            writeDatabase(equipments);
            res.status(204).send();
        } else {
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};