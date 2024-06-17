const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentarios.controller');

router.post('/comentarios', comentariosController.createComentario);

module.exports = router;
