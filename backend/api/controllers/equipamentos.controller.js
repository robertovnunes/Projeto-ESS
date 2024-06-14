const e = require('express');
const equipamentosModel = require('../models/equipamento.model');

//Documentação da API
/**
 * @swagger
 *  /equipamentos:
 *   get:
 *    tags: [Equipamentos]
 *    description: Retorna todos os equipamentos
 *    responses:
 *     200:
 *      description: Retorna todos os equipamentos
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           nome:
 *            type: string
 *           descricao:
 *            type: string
 * 
 *          
 * 
*/


exports.getAllEquipments = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        console.log('GET /equipamentos [200] OK');
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
            console.log(`GET /equipamentos/:${equipment.patrimonio} [200] OK`);
            res.status(200).send(equipment);
        } else {
            console.log(`GET /equipamentos/:${equipment.patrimonio} [404] NOT FOUND`);
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        console.log(`GET /equipamentos/:${equipment.patrimonio} [500] INTERNAL SERVER ERROR`);
        res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
    }
};

exports.createSingleEquipment = (req, res) => {
    try{
        let equipments = equipamentosModel.loadDatabase();
        const {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, identificador} = req.body;
        if (!nome || !descricao || !estado_conservacao || !data_aquisicao || !valor_estimado || !identificador) {
            console.log(`POST /equipamentos [400] BAD REQUEST`);
            res.status(400).send({message: 'Campos obrigatórios não preenchidos'});
            return;
        } else {
             if(identificador.type === 'patrimonio') {
                newEquipment = {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, patrimonio: identificador.value};
                newEquipment.single = true;
                if (equipments.lenght === 0) {
                    equipments = newEquipment;
                } else {
                    if(equipments.find(equipment => equipment.patrimonio === identificador.value)) {
                        console.log(`POST /equipamentos [400] BAD REQUEST`);
                        res.status(400).send({message: 'Já existe um equipamento com este patrimônio'});
                        return;
                    } else {
                        equipments.push(newEquipment);
                    }
                }
            } else if(identificador.type === 'numero_serie') {
                newEquipments = {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, numero_serie: identificador.value};
                newEquipment.single = true;
                if (equipments.lenght === 0) {
                    equipments = newEquipments;
                } else {
                    if(equipments.find(equipment => equipment.numero_serie === identificador.value)) {
                        console.log(`POST /equipamentos [400] BAD REQUEST`);
                            res.status(400).send({message: 'Já existe um equipamento com este numero de série'});
                            return;
                    } else {
                        equipments.push(newEquipment);
                    }
                }
            }
        }
        equipamentosModel.writeDatabase(equipments);
        console.log(`POST /equipamentos [201] CREATED`);
        res.status(201).send(req.body);
    } catch (error) {
        console.log(`POST /equipamentos [500] INTERNAL SERVER ERROR \n ${error.message}`);
        res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
    }
};

exports.createMultipleEquipments = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, quantidade, identificador} = req.body;
        if (!nome || !descricao || !estado_conservacao || !data_aquisicao || !valor_estimado || !identificador) {
            console.log(`POST /equipamentos/lote [400] BAD REQUEST`);
            res.status(400).send({message: 'Campos obrigatórios não preenchidos'});
            return;
        } else {
            if(identificador.type === 'patrimonio') {
                let newEquipment = {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado};
                equipments.forEach(equipment => {
                    if(equipment.patrimonio.lenght > 1){
                        equipment.patrimonio.forEach(patrimonio => {
                            if(identificador.value.find(pat => patrimonio === pat)){
                                console.log(`POST /equipamentos/lote [400] BAD REQUEST`);
                                return res.status(400).send({message: 'Já existe um equipamento com este patrimônio'});
                            }
                        });
                    }
                });
                newEquipment.patrimonio = identificador.value;
                equipments.push(newEquipment);
            } else if(identificador.type === 'numero_serie') {
                newEquipment = {nome, descricao, estado_conservacao, data_aquisicao, quantidade, valor_estimado};
                newEquipment.single = false;
                equipments.forEach(equipment => {
                    if(equipment.single === false){
                        identificador.value.forEach(numero_serie => {
                            if(equipment.numero_serie.find(serie => numero_serie === serie)){
                                console.log(`POST /equipamentos/lote [400] BAD REQUEST`);
                                return res.status(400).send({message: 'Já existe um equipamento com este número de série'});
                            }
                        });
                    }
                });
                newEquipment.numero_serie = identificador.value;
                equipments.push(newEquipment);
            }
        }
        equipamentosModel.writeDatabase(equipments);
        console.log(`POST /equipamentos/lote [201] CREATED`);
        res.status(201).send(req.body);
    } catch (error) {
        console.log(`POST /equipamentos/lote [500] ${error.message}`);
        res.status(500).send({message: 'INTERNAL SERVER ERROR'});
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