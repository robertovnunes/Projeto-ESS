const equipamentoSNModel = require('../models/equipamentos/SN.model');
const equipamentoPatrimonioModel = require('../models/equipamentos/patrimonio.model');
const tokensModel = require('../models/token.model');


const verifyEmptyFields = (equipamento = {}) => {
    let emptyFields = [];
    if (!equipamento.nome || !equipamento.descricao
        || !equipamento.estado_conservacao || !equipamento.data_aquisicao
        || !equipamento.valor_estimado || (equipamento.numero_serie !== undefined && !equipamento.numero_serie)
        || (equipamento.patrimonio !== undefined && !equipamento.patrimonio)) {
        console.log(`POST /equipamentos [400] BAD REQUEST`);
        if (!equipamento.nome) {
            emptyFields.push('Nome');
        }
        if (!equipamento.descricao) {
            emptyFields.push('Descrição');
        }
        if (!equipamento.estado_conservacao) {
            emptyFields.push('Estado de conservação');
        }
        if (!equipamento.data_aquisicao) {
            emptyFields.push('Data de aquisição');
        }
        if (!equipamento.valor_estimado) {
            emptyFields.push('Valor estimado');
        }
        if (equipamento.numero_serie !== undefined && !equipamento.numero_serie) {
            emptyFields.push('Numero de série');
        }
        if (equipamento.patrimonio !== undefined && !equipamento.patrimonio) {
            emptyFields.push('Patrimônio');
        }
    }
    return emptyFields;
};

class EquipamentosController {

    constructor(equipamentosService){
        this.equipamentosService = equipamentosService;
        this._createEquipment = this._createEquipment.bind(this);
        this.getAllEquipments = this.getAllEquipments.bind(this);
        this.getEquipmentById = this.getEquipmentById.bind(this);
        this.getEquipmentByPatrimonio = this.getEquipmentByPatrimonio.bind(this);
        this.getEquipmentBySN = this.getEquipmentBySN.bind(this);
        this.createEquipment = this.createEquipment.bind(this);
        this.patchEquipment = this.patchEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
    }



    async _createEquipment (req, res) {
        console.log('Creating mock equipment');
        const response = await this.equipamentosService.createEquipment(req.body);
        if(response.status === 'error'){
            console.log(`Error creating mock equipment: ${response.message}`);
            res.status(400).send({message: response.message});
        } else {
            console.log('Mock equipment created');
            res.status(200).send({message: 'Mock equipment created'});
        }
    };

     async getAllEquipments(req, res) {
        try{
            const equipments = await this.equipamentosService.getAllEquipments();
            if(equipments === undefined){
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

     async getEquipmentById(req, res) {
        try{
            const id = req.params.id;
            const equipment = await this.equipamentosService.getEquipmentById(id);
            if(equipment !== undefined){
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
            if(equipment !== undefined){
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
            if(equipment === undefined){
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

    async createEquipment(req, res) {
        try{/*
            const isAdmin = tokensModel.authenticateAdmin(req);
            if (!isAdmin) {
                return res.status(403).send('Apenas administradores têm permissão para esta operação.');
            }*/
            let newEquipment;
            const emptyField = verifyEmptyFields(req.body);
            if(emptyField.length > 0) {
                const message = 'Campos vazios: '+ emptyField.join(', ');
                return res.status(400).send({message: message});
            } else {
                if(req.body.patrimonio !== undefined){
                    const {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, patrimonio} = req.body;
                    newEquipment = new equipamentoPatrimonioModel(nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, patrimonio);
                } else if (req.body.numero_serie !== undefined) {
                    const {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, numero_serie} = req.body;
                    newEquipment = new equipamentoSNModel(nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, numero_serie);
                }
            }
            let equipmentCreated = await this.equipamentosService.createEquipment(newEquipment);
            if(equipmentCreated.status === 'error') {
                return res.status(400).send({message: equipmentCreated.message});
            } else {
                console.log(`POST /equipamentos [201] CREATED`);
                return res.status(201).send({message: 'Equipamento criado com sucesso', id: equipmentCreated.equipmentID});
            }
        } catch (error) {
                console.log(`POST /equipamentos [500] INTERNAL SERVER ERROR ${error.message}`);
                return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async patchEquipment(req, res) {
        try{/*
            const isAdmin = tokensModel.authenticateAdmin(req);
            if (!isAdmin) {
                return res.status(403).send('Apenas administradores têm permissão para esta operação.');
            }*/
            let updated = await this.equipamentosService.patchEquipment(req.params.id, req.body);
            if(updated === undefined) {
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
        try{/*
            const isAdmin = tokensModel.authenticateAdmin(req);
            if (!isAdmin) {
                return res.status(403).send('Apenas administradores têm permissão para esta operação.');
            }
            */
            const deleted = await this.equipamentosService.deleteEquipment(req.params.id);
            if(deleted === undefined) {
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
    };

}

module.exports = EquipamentosController;