const Comentariosmodel = require('../models/comentarios.model');
const ComentariosService = require('../services/comentariosService');

class Comentarios {
    constructor(comentariosService){
        this.comentariosService = comentariosService;
        this.getAllComentarios = this.getAllComentarios.bind(this);
        this.getComentarioById = this.getComentarioById.bind(this);
        this.createComentario = this.createComentario.bind(this);
        this.patchComentario = this.patchComentario.bind(this);
        this.deleteComentario = this.deleteComentario.bind(this);
        this.validarComentario = this.validarComentario.bind(this);
        this.responderComentario = this.responderComentario.bind(this);
    }

    async getAllComentarios(req, res) {
        try{
            const comentarios = await this.comentariosService.getAllComentarios();
            if(comentarios.length === 0){
                console.log('GET /comentarios [404] NOT FOUND');
                return res.status(404).send({message: 'Nenhum comentario cadastrado'});
            }
            console.log('GET /comentarios [200] OK');
            res.status(200).send(comentarios);
        } catch (error) {
            console.log(`GET /comentarios [500] INTERNAL SERVER ERROR\n ${error}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async getComentarioById(req, res) {
        try{
            const id = req.params.id;
            const comentario = await this.comentariosService.getComentarioById(id);
            if(comentario){
                console.log(`GET /comentarios/:${id} by ID [200] OK`);
                res.status(200).send(comentario);
            } else {
                console.log(`GET /comentarios/:${id} by ID [404] NOT FOUND`);
                res.status(404).send({message: 'Comentario não encontrado'});
            }
        } catch (error) {
            console.log(`GET /comentarios/:${id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async createComentario(req, res) {
        try{
            console.log('entrei 1');
            const newComentario = req.body;
            const comentario = await this.comentariosService.createComentario(newComentario);
            console.log(`POST /comentarios [201] CREATED`);
            res.status(201).send(comentario);
        } catch (error) {
            console.log(`POST /comentarios [500] INTERNAL SERVER ERROR\n ${error}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async patchComentario(req, res) {
        try{
            const id = req.params.id;
            const newComentario = req.body;
            const comentario = await this.comentariosService.patchComentario(id, newComentario);
            if(comentario){
                console.log(`PATCH /comentarios/:${id} [200] OK`);
                res.status(200).send(comentario);
            } else {
                console.log(`PATCH /comentarios/:${id} [404] NOT FOUND`);
                res.status(404).send({message: 'Comentario não encontrado'});
            }
        } catch (error) {
            console.log(`PATCH /comentarios/:${id} [500] INTERNAL SERVER ERROR\n ${error}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };

    async deleteComentario(req, res) {
        try{
            const id = req.params.id;
            const comentario = await this.comentariosService.deleteComentario(id);
            if(comentario){
                console.log(`DELETE /comentarios/:${id} [200] OK`);
                res.status(200).send(comentario);
            } else {
                console.log(`DELETE /comentarios/:${id} [404] NOT FOUND`);
                res.status(404).send({message: 'Comentario não encontrado'});
            }
        } catch (error) {
            console.log(`DELETE /comentarios/:${id} [500] INTERNAL SERVER ERROR\n ${error}`);
            res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
        }
    };
    
    async validarComentario(req, res) {
        try {
            const id = req.params.id;
            //const validacao = { validado: true };
            const comentario = await this.comentariosService.getComentarioById(id);
            if (comentario) {
                //ALTERAÇÃO PRA VALIDAÇÃO FUNCIONAR
                const updatedComentario = await this.comentariosService.patchComentario(id, { validado: true });
                console.log(`PATCH-VALIDE /comentarios/:${id} [200] OK`);
                res.status(200).send(comentario);
            } else {
                console.log(`PATCH-VALIDE /comentarios/:${id} [404] NOT FOUND`);
                res.status(404).send({ message: 'Comentario não encontrado' });
            }
        } catch (error) {
            console.log(`PATCH-VALIDE /comentarios/:${id} [500] INTERNAL SERVER ERROR\n ${error}`);
            res.status(500).send({ message: '[500] INTERNAL SERVER ERROR' });
        }
    };

    async responderComentario(req, res) {
        try {
            const id = req.params.id;
            const { resposta } = req.body;
            const comentario = await this.comentariosService.getComentarioById(id);
            if (comentario && comentario.validado) {
                console.log(`PATCH-RESPONDE /comentarios/:${id} [200] OK`);
                const updatedComentario = await this.comentariosService.patchComentario(id, { resposta });
                res.status(200).send(updatedComentario);
            } else {
                console.log(`PATCH-RESPONDE /comentarios/:${id} [404] NOT FOUND`);
                res.status(400).send({ message: 'Comentario não validado ou não encontrado' });
            }
        } catch (error) {
            console.log(`PATCH-RESPONDE /comentarios/:${id} [500] INTERNAL SERVER ERROR\n ${error}`);
            res.status(500).send({ message: '[500] INTERNAL SERVER ERROR' });
        }
    };

}

module.exports = Comentarios;