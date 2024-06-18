const equipamentoSNModel = require('../models/equipamentoSNModel');
const equipamentoPatrimonioModel = require('../models/equipamentoPatrimonioModel');
const EquipamentosService = require('../services/equipamentosService');
const shortid = require('shortid');

class EquipamentosController {

    constructor(equipamentosService){
        this.equipamentosService = equipamentosService;
        this.getAllEquipments = this.getAllEquipments.bind(this);
        this.getEquipmentById = this.getEquipmentById.bind(this);
        this.getEquipmentByPatrimonio = this.getEquipmentByPatrimonio.bind(this);
        this.getEquipmentBySN = this.getEquipmentBySN.bind(this);
        this.createEquipment = this.createEquipment.bind(this);
        this.patchEquipment = this.patchEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
    }

     async getAllEquipments(req, res) {
        try{
            const equipments = await this.equipamentosService.getAllEquipments();
            console.log(equipments);
            if(equipments === 'Nenhum equipamento cadastrado'){
                console.log('GET /equipamentos [404] NOT FOUND');
                return res.status(404).send({message: 'Nenhum equipamento cadastrado'});
            }
            console.log('GET /equipamentos [200] OK');
            res.status(200).send(equipments);
        } catch (error) {
            console.log(`GET /equipamentos [500] INTERNAL SERVER ERROR\n ${error}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

     async getEquipmentById(req, res) {
        try{
            const id = req.params.id;
            const equipment = await this.equipamentosService.getEquipmentById(id);
            if(equipment !== 'Equipamento nao encontrado'){
                console.log(`GET /equipamentos/:${id} by ID [200] OK`);
                res.status(200).send(equipment);
            } else {
                console.log(`GET /equipamentos/:${id} by ID [404] NOT FOUND`);
                res.status(404).send({message: 'Equipamento nao encontrado'});
            }
        } catch (error) {
            console.log(`GET /equipamentos/:${id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async getEquipmentByPatrimonio(req, res) {
        try{
            const patrimonio = req.params.patrimonio;
            const equipment = await this.equipamentosService.getEquipmentByPatrimonio(patrimonio);
            if(equipment !== 'Equipamento nao encontrado'){
                console.log(`GET /equipamentos/patrimonio/:${patrimonio} [200] OK`);
                res.status(200).send(equipment);
            } else {
                console.log(`GET /equipamentos/patrimonio/:${patrimonio} [404] NOT FOUND`);
                res.status(404).send({message: 'Equipamento nao encontrado'});
            }
        } catch (error) {
            console.log(`GET /equipamentos/patrimonio/:${req.params.patrimonio} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async getEquipmentBySN(req, res) {
        try{
            const sn = req.params.numero_serie;
            const equipment = await this.equipamentosService.getEquipmentBySerie(sn);
            if(equipment !== 'Equipamento nao encontrado'){
                console.log(`GET /equipamentos/:${equipment.numero_serie} [200] OK`);
                res.status(200).send(equipment);
            } else {
                console.log(`GET /equipamentos/:${equipment.numero_serie} [404] NOT FOUND`);
                res.status(404).send({message: 'Equipamento nao encontrado'});
            }
        } catch (error) {
            console.log(`GET /equipamentos/:${equipment.numero_serie} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async createEquipment(req, res) {
        try{
            const {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, identificador} = req.body;
            if (!nome || !descricao || !estado_conservacao || !data_aquisicao || !valor_estimado || !identificador.type || !identificador.value) {
                console.log(`POST /equipamentos [400] BAD REQUEST`);
                if (!nome) {
                    res.status(400).send({message: 'Nome nao informado'});
                } else if (!descricao) {
                    res.status(400).send({message: 'Descriçao nao informada'});
                } else if (!estado_conservacao) {
                    res.status(400).send({message: 'Estado de conservaçao nao informado'});
                } else if (!data_aquisicao) {
                    res.status(400).send({message: 'Data de aquisiçao nao informada'});
                } else if (!valor_estimado ) {
                    res.status(400).send({message: 'Valor estimado nao informado'});
                } else if (!identificador.type) {
                    res.status(400).send({message: 'Tipo de identificador nao informado'});
                } else if (!identificador.value) {
                    if (identificador.type === 'patrimonio') {
                        res.status(400).send({message: 'Patrimônio nao informado'});
                    } else if (identificador.type === 'numero_serie') {
                        res.status(400).send({message: 'Número de série nao informado'});
                    }
                }
            } else {
                if(identificador.type === 'patrimonio') {
                    const equipmentExist = await this.equipamentosService.getEquipmentByPatrimonio(identificador.value);
                    if(equipmentExist !== 'Equipamento nao encontrado') {
                        console.log(`POST /equipamentos [400] BAD REQUEST`);
                        res.status(400).send({message: 'Já existe um equipamento com este patrimônio'});
                        return;
                    } else {
                        let newEquipment = new equipamentoPatrimonioModel(nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, identificador.value);
                        let equipmentCreated = await this.equipamentosService.createEquipmentPatrimonio(newEquipment);
                        console.log(`POST /equipamentos [201] CREATED`);
                        res.status(201).send(equipmentCreated);
                    }
                } else if(identificador.type === 'numero_serie') {
                    const equipmentExist = await this.equipamentosService.getEquipmentBySerie(identificador.value);
                    if(equipmentExist !== 'Equipamento nao encontrado') {
                        console.log(`POST /equipamentos [400] BAD REQUEST`);
                        res.status(400).send({message: 'Já existe um equipamento com este numero de série'});
                        return;
                    } else {
                        let newEquipment = new equipamentoSNModel(nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, identificador.value);
                        let equipmentCreated = await this.equipamentosService.createEquipmentSN(newEquipment);
                        console.log(`POST /equipamentos [201] CREATED`);
                        res.status(201).send(equipmentCreated);
                    }
                    }
                }
            } catch (error) {
                console.log(`POST /equipamentos [500] INTERNAL SERVER ERROR \n ${error.message}`);
                res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
            }
    };

    async patchEquipment(req, res) {
        try{
            let updated = await this.equipamentosService.patchEquipment(req.params.id, req.body);
            if(updated === 'Equipamento nao encontrado') {
                console.log(`PATCH /equipamentos/:${req.params.id} [404] NOT FOUND`);
                res.status(404).send({message: 'Equipamento nao encontrado'});
            } else {
                console.log(`PATCH /equipamentos/:${req.params.id} [200] OK`);
                res.status(200).send(updated);
            }
        } catch (error) {
            console.log(`PATCH /equipamentos/:${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async deleteEquipment(req, res) {
        try{
            const deleted = await this.equipamentosService.deleteEquipment(req.params.id);
            if(deleted === 'Equipamento nao encontrado') {
                console.log(`DELETE /equipamentos/${req.params.id} [404] NOT FOUND`);
                res.status(404).send({message: 'Equipamento nao encontrado'});
            } else {
                console.log(`DELETE /equipamentos/${req.params.id} [200] OK`);
                res.status(200).send(deleted);
            }
        } catch (error) {
            console.log(`DELETE /equipamentos/${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    }
}

module.exports = EquipamentosController;