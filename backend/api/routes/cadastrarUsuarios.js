const router = require('express').Router();

const cadastrarUsuarioController = require('../controllers/cadastrarUsuarios.controller.js');

module.exports = app => {
    app.use('/usuarios', router);
    router.post('/alunos', cadastrarUsuarioController.cadastrarAluno);
    router.post('/professores', cadastrarUsuarioController.cadastrarProfessor);
    router.post('/admins', cadastrarUsuarioController.cadastrarAdmin);
    router.delete('/admins/:login', cadastrarUsuarioController.removerAdmin);
    router.delete('/alunos/:login', cadastrarUsuarioController.removerAluno);
    router.delete('/professores/:login', cadastrarUsuarioController.removerProfessor);
}