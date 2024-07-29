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

    handleServiceError(error, res) {
        res.status(500).send({ message: '[500] INTERNAL SERVER ERROR' });
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
            this.handleServiceError(error, res);
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
                res.status(404).send({message: 'comentario não encontrado'});
            }
        } catch (error) {
            console.log(`GET /comentarios/:${id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
            this.handleServiceError(error, res);
        }
    };

    async createComentario(req, res) {
        try {
            console.log('entrei 1');
            const newComentario = req.body;
            const comentario = await this.comentariosService.createComentario(newComentario);
            console.log(`POST /comentarios [201] CREATED`);
            
            let mensagem = this.getMensagemEnvio(newComentario.destinatario);
            res.status(201).send({ message: mensagem, body: comentario });
        } catch (error) {
            console.log(`POST /comentarios [500] INTERNAL SERVER ERROR\n ${error}`);
            this.handleServiceError(error, res);
        }
    }


    getMensagemEnvio(destinatario) {
        switch (destinatario) {
            case 'ADM':
                return 'comentário enviado para ADM';
            case 'SEC':
                return 'comentário enviado para SEC';
            default:
                return 'comentário enviado';
        }
    }

    async patchComentario(req, res) {
        try {
            const id = req.params.id;
            const updates = req.body;
            const updatedComentario = await this.comentariosService.patchComentario(id, updates);
            if (updatedComentario) {
                let message = this.getMensagemPatch(updates);
                res.status(200).send({ message, body: updatedComentario });
            } else {
                res.status(404).send({ message: "comentário não encontrado" });
            }
        } catch (error) {
            this.handleServiceError(error, res);
        }
    }

    getMensagemPatch(updates) {
        if (updates.validado !== undefined) {
            return "comentário validado";
        } else if (updates.resposta !== undefined) {
            return "resposta enviada com sucesso";
        }
        return "comentário atualizado";
    }

    async deleteComentario(req, res) {
        try{
            const id = req.params.id;
            const comentario = await this.comentariosService.deleteComentario(id);
            if(comentario){
                console.log(`DELETE /comentarios/:${id} [200] OK`);
                res.status(200).send(comentario);
            } else {
                console.log(`DELETE /comentarios/:${id} [404] NOT FOUND`);
                res.status(404).send({message: 'comentario não encontrado'});
            }
        } catch (error) {
            console.log(`DELETE /comentarios/:${id} [500] INTERNAL SERVER ERROR\n ${error}`);
            this.handleServiceError(error, res);
        }
    };
    
    async validarComentario(req, res) {
        try {
            const id = req.params.id;
            const updatedComentario = await this.comentariosService.patchComentario(id, { validado: true });
            if (updatedComentario) {
                res.status(200).send({ message: 'comentário validado', body: updatedComentario });
            } else {
                res.status(404).send({ message: 'comentario não encontrado' });
            }
        } catch (error) {
            this.handleServiceError(error, res);
        }
    };
    
    
    async responderComentario(req, res) {
        try {
            const id = req.params.id;
            const { resposta } = req.body;
            const comentario = await this.comentariosService.getComentarioById(id);
            //if (comentario && comentario.validado) {
            console.log('Comentário encontrado:', comentario);
            if (comentario) {
                console.log('Comentário encontrado DE VERDADE:', comentario);
                if (comentario.validado) {
                console.log(`PATCH-RESPONDE /comentarios/:${id} [200] OK`);
                const updatedComentario = await this.comentariosService.patchComentario(id, { resposta });
                console.log('Comentario atualizado:', updatedComentario);
                //res.status(200).send(updatedComentario);
                res.status(200).send({ message: 'resposta enviada com sucesso', body: updatedComentario });
                } 
                else {
                    console.log('Comentário não validado');
                    console.log(`PATCH-RESPONDE /comentarios/:${id} [400] BAD REQUEST`);
                    res.status(400).send({ message: 'comentario não validado' });
                }
            } else {
                console.log('Comentário não encontrado');
                console.log(`PATCH-RESPONDE /comentarios/:${id} [404] NOT FOUND`);
                res.status(404).send({ message: 'comentario não encontrado' });
            }
        } catch (error) {
            console.error('Erro interno do servidor:', error);
            console.log(`PATCH-RESPONDE /comentarios/:${id} [500] INTERNAL SERVER ERROR\n ${error}`);
            this.handleServiceError(error, res);
        }
    };

}

module.exports = Comentarios;