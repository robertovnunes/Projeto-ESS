const salaModel = require('../models/sala.model');

class salasController {

    constructor(SalasService){
        this.SalasService = SalasService;
        this.getAllSalas = this.getAllSalas.bind(this);
        this.getSalaById = this.getSalaById.bind(this);
        this.createSala = this.createSala.bind(this);
        this.patchSala = this.patchSala.bind(this);
        this.deleteSala = this.deleteSala.bind(this);
    }

     async getAllSalas(req, res) {
        try{
            const Salas = await this.SalasService.getAllSalas();
            if(Salas === undefined){
                console.log('GET /salas [404] NOT FOUND');
                return res.status(404).send({message: 'Nenhum Sala cadastrado'});
            }
            console.log('GET /salas [200] OK');
            return res.status(200).send(Salas);
        } catch (error) {
            console.log(`GET /salas [500] INTERNAL SERVER ERROR\n ${error}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

     async getSalaById(req, res) {
        try{
            const id = req.params.id;
            const Sala = await this.SalasService.getSalaById(id);
            if(Sala !== undefined){
                console.log(`GET /salas/:${id} by ID [200] OK`);
                return res.status(200).send(Sala);
            } else {
                console.log(`GET /salas/:${id} by ID [404] NOT FOUND`);
                return res.status(404).send({message: 'Sala nao encontrada'});
            }
        } catch (error) {
            console.log(`GET /salas/:${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async createSala(req, res) {
        try{
            const {numero, bloco, capacidade} = req.body;
            if (!numero || !bloco || !capacidade) {
                console.log(`POST /salas [400] BAD REQUEST`);
                if (!numero) {
                    return res.status(400).send({message: 'Numero da sala nao informado'});
                } else if (!bloco) {
                    return res.status(400).send({message: 'Bloco da sala nao informado'});
                } else if (!capacidade) {
                    return res.status(400).send({message: 'A capacidade da sala nao informada'});
                }
            } else {
                const newSala = new salaModel(numero, bloco, capacidade);
                let response = await this.SalasService.createSala(newSala);
                if(response.status !== 'ok') {
                    return res.status(400).send({message: response.message});
                } else {
                    console.log(`POST /salas [201] CREATED`);
                    return res.status(201).send(response.message);
                }
            }
        } catch (error) {
                console.log(`POST /salas [500] INTERNAL SERVER ERROR ${error.message}`);
                return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
            }
    };

    async patchSala(req, res) {
        try{
            let updated = await this.SalasService.patchSala(req.params.id, req.body);
            if(updated.status === 'not found') {
                console.log(`PATCH /salas/:${req.params.id} [404] NOT FOUND`);
                return res.status(404).send({message: 'Sala nao encontrada'});
            } else {
                if(updated === 'O patrimonio de um Sala não pode ser modificado' ||
                    updated === 'O numero de serie de um Sala não pode ser modificado'
                ) {
                    res.status(400).send({message: updated});
                    console.log(`PATCH /salas/:${req.params.id} [400] BAD REQUEST ${updated}`);
                 } else {
                    console.log(`PATCH /salas/:${req.params.id} [200] OK`);
                    return res.status(200).send(updated);
                }
            }
            return;
        } catch (error) {
            console.log(`PATCH /salas/:${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async deleteSala(req, res) {
        try{
            const deleted = await this.SalasService.deleteSala(req.params.id);
            if(deleted === undefined) {
                console.log(`DELETE /salas/${req.params.id} [404] NOT FOUND`);
                return res.status(404).send({message: 'Sala nao encontrada'});
            } else {
                console.log(`DELETE /salas/${req.params.id} [200] OK`);
                return res.status(200).send({message: `Sala ${deleted.nome} removido com sucesso`});
            }
        } catch (error) {
            console.log(`DELETE /salas/${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            return res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    }
}

module.exports = salasController;