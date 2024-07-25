const express = require('express');
const router = express.Router();
const ComentariosController = require('../controllers/comentarios.controller');
const ComentariosRepository = require('../repositories/comentariosRepository');
const ComentariosService = require('../services/comentariosService');

const comentariosRepository = new ComentariosRepository();
const comentariosService = new ComentariosService(comentariosRepository);
const comentariosController = new ComentariosController(comentariosService);



module.exports = app => {
    app.use('/comentarios', router);
    router.get('/', comentariosController.getAllComentarios);
    router.get('/:id', comentariosController.getComentarioById);
    router.post('/', comentariosController.createComentario);
    router.patch('/:id', comentariosController.patchComentario);
    router.delete('/:id', comentariosController.deleteComentario);
    router.patch('/:id/validar', comentariosController.validarComentario);
    router.patch('/:id/responder', comentariosController.responderComentario);
};

//module.exports = router;
