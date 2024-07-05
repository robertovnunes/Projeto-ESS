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
        this.createEquipmentPatrimonio = this.createEquipmentPatrimonio.bind(this);
        this.createEquipmentSN = this.createEquipmentSN.bind(this);
        this.patchEquipment = this.patchEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
    }

     async getAllEquipments(req, res) {
        try{
            const equipments = await this.equipamentosService.getAllEquipments();
            if(equipments === null){
                console.log('GET /equipamentos [404] NOT FOUND');
                return res.status(404).send({message: 'Nenhum equipamento cadastrado'});
            }
            console.log('GET /equipamentos [200] OK');
            return res.status(200).send(equipments);
        } catch (error) {
            console.log(`GET /equipamentos [500] INTERNAL SERVER ERROR\n ${error}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async getAllEquipmentsByPatrimpnio(req, res) {
        try{
            const equipments = await this.equipamentosService.getAllEquipments();
            if(equipments === null){
                console.log('GET /equipamentos [404] NOT FOUND');
                return res.status(404).send({message: 'Nenhum equipamento cadastrado'});
            } else {
                const equipamentosPatrimonio = equipments.filter(equipamento => equipamento.patrimonio !== undefined);
                console.log('GET /equipamentos [200] OK');
                return res.status(200).send(equipamentosPatrimonio);
            }
        } catch (error) {
            console.log(`GET /equipamentos [500] INTERNAL SERVER ERROR\n ${error}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

        async getAllEquipmentsBySN(req, res) {
        try{
            const equipments = await this.equipamentosService.getAllEquipments();
            if(equipments === null){
                console.log('GET /equipamentos [404] NOT FOUND');
                return res.status(404).send({message: 'Nenhum equipamento cadastrado'});
            } else {
                const equipamentosPatrimonio = equipments.filter(equipamento => equipamento.numero_serie !== undefined);
                console.log('GET /equipamentos [200] OK');
                return res.status(200).send(equipamentosPatrimonio);
            }
        } catch (error) {
            console.log(`GET /equipamentos [500] INTERNAL SERVER ERROR\n ${error}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };


     async getEquipmentById(req, res) {
        try{
            const id = req.params.id;
            const equipment = await this.equipamentosService.getEquipmentById(id);
            if(equipment !== null){
                console.log(`GET /equipamentos/:${id} by ID [200] OK`);
                return res.status(200).send(equipment);
            } else {
                console.log(`GET /equipamentos/:${id} by ID [404] NOT FOUND`);
                return res.status(404).send({message: 'Equipamento nao encontrado'});
            }
        } catch (error) {
            console.log(`GET /equipamentos/:${id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async getEquipmentByPatrimonio(req, res) {
        try{
            const patrimonio = req.params.patrimonio;
            const equipment = await this.equipamentosService.getEquipmentByPatrimonio(patrimonio);
            if(equipment !== null){
                console.log(`GET /equipamentos/patrimonio/:${patrimonio} [200] OK`);
                return res.status(200).send(equipment);
            } else {
                console.log(`GET /equipamentos/patrimonio/:${patrimonio} [404] NOT FOUND`);
                return res.status(404).send({message: 'Equipamento nao encontrado'});
            }
        } catch (error) {
            console.log(`GET /equipamentos/patrimonio/:${req.params.patrimonio} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async getEquipmentBySN(req, res) {
        try{
            const sn = req.params.numero_serie;
            const equipment = await this.equipamentosService.getEquipmentBySerie(sn);
            if(equipment === null){
                console.log(`GET /equipamentos/patrimonio/:${sn} [404] NOT FOUND`);
                return res.status(404).send({message: 'Equipamento nao encontrado'});
            } else {
                console.log(`GET /equipamentos/numero_serie/:${sn} [200] OK`);
                return res.status(200).send(equipment);
            }
        } catch (error) {
            console.log(`GET /equipamentos/patrimonio/:${req.params.patrimonio} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async createEquipmentPatrimonio(req, res) {
        try{
            const {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, patrimonio} = req.body;
            if (!nome || !descricao || !estado_conservacao || !data_aquisicao || !valor_estimado || !patrimonio) {
                console.log(`POST /equipamentos [400] BAD REQUEST`);
                if (!nome) {
                    return res.status(400).send({message: 'Nome nao informado'});
                } else if (!descricao) {
                    return res.status(400).send({message: 'Descriçao nao informada'});
                } else if (!estado_conservacao) {
                    return res.status(400).send({message: 'Estado de conservaçao nao informado'});
                } else if (!data_aquisicao) {
                    return res.status(400).send({message: 'Data de aquisiçao nao informada'});
                } else if (!valor_estimado ) {
                    return res.status(400).send({message: 'Valor estimado nao informado'});
                } else if (!patrimonio) {
                    return res.status(400).send({message: 'Patrimonio nao informado'});
                }
            } else {
                const equipmentExist = await this.equipamentosService.getEquipmentByPatrimonio(patrimonio);
                if(equipmentExist === 'Patrimonio já existe') {
                    console.log(`POST /equipamentos [400] BAD REQUEST `);
                    return res.status(400).send({message: 'Já existe um equipamento com este patrimônio'});
                } else {
                    let newEquipment = new equipamentoPatrimonioModel(nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, patrimonio);
                    let equipmentCreated = await this.equipamentosService.createEquipmentPatrimonio(newEquipment);
                    console.log(`POST /equipamentos [201] CREATED`);
                    return res.status(201).send(equipmentCreated);
                }
            }
        } catch (error) {
                console.log(`POST /equipamentos [500] INTERNAL SERVER ERROR \n ${error.message}`);
                return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
            }
    };

    async createEquipmentSN(req, res) {
        try{
            const {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, numero_serie} = req.body;
            if (!nome || !descricao || !estado_conservacao || !data_aquisicao || !valor_estimado || !numero_serie) {
                console.log(`POST /equipamentos [400] BAD REQUEST`);
                if (!nome) {
                    return res.status(400).send({message: 'Nome nao informado'});
                } else if (!descricao) {
                    return res.status(400).send({message: 'Descricao nao informada'});
                } else if (!estado_conservacao) {
                    return res.status(400).send({message: 'Estado de conservacao nao informado'});
                } else if (!data_aquisicao) {
                    return res.status(400).send({message: 'Data de aquisiçao nao informada'});
                } else if (!valor_estimado ) {
                    return res.status(400).send({message: 'Valor estimado nao informado'});
                } else if (!numero_serie) {
                    return res.status(400).send({message: 'Numero de serie nao informado'});
                }
            } else {
                const equipmentExist = await this.equipamentosService.getEquipmentBySerie(numero_serie);
                if(equipmentExist !== null) {
                    console.log(`POST /equipamentos [400] BAD REQUEST`);
                    return res.status(400).send({message: 'Já existe um equipamento com este numero de serie'});
                    return;
                } else {
                    let newEquipment = new equipamentoSNModel(nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, numero_serie);
                    let equipmentCreated = await this.equipamentosService.createEquipmentSN(newEquipment);
                    console.log(`POST /equipamentos [201] CREATED`);
                    return res.status(201).send(equipmentCreated);
                }
            }
        } catch (error) {
                console.log(`POST /equipamentos [500] INTERNAL SERVER ERROR \n ${error.message}`);
                return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
            }
    };

    async patchEquipment(req, res) {
        try{
            let updated = await this.equipamentosService.patchEquipment(req.params.id, req.body);
            if(updated === null) {
                console.log(`PATCH /equipamentos/:${req.params.id} [404] NOT FOUND`);
                return res.status(404).send({message: 'Equipamento nao encontrado'});
            } else {
                if(updated === 'O patrimonio de um equipamento não pode ser modificado' ||
                    updated === 'O numero de serie de um equipamento não pode ser modificado'
                ) {
                    res.status(400).send({message: updated});
                    console.log(`PATCH /equipamentos/:${req.params.id} [400] BAD REQUEST ${updated}`);
                 } else {
                    console.log(`PATCH /equipamentos/:${req.params.id} [200] OK`);
                    return res.status(200).send(updated);
                }
            }
            return;
        } catch (error) {
            console.log(`PATCH /equipamentos/:${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async deleteEquipment(req, res) {
        try{
            const deleted = await this.equipamentosService.deleteEquipment(req.params.id);
            if(deleted === null) {
                console.log(`DELETE /equipamentos/${req.params.id} [404] NOT FOUND`);
                return res.status(404).send({message: 'Equipamento nao encontrado'});
            } else {
                console.log(`DELETE /equipamentos/${req.params.id} [200] OK`);
                return res.status(200).send({message: `Equipamento ${deleted.nome} removido com sucesso`});
            }
        } catch (error) {
            console.log(`DELETE /equipamentos/${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    }
}

module.exports = EquipamentosController;