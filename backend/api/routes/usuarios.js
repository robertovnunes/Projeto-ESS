const router = require('express').Router();

// Importando os controladores
const AlunoController = require('../controllers/usuarios/alunoController');
const ProfessorController = require('../controllers/usuarios/professorController');
const AdminController = require('../controllers/usuarios/adminController');

// Instanciando os controladores
const alunoController = new AlunoController();
const professorController = new ProfessorController();
const adminController = new AdminController();

module.exports = app => {
    app.use('/usuarios', router);
    // Rotas para Alunos
    router.get('/alunos', alunoController.getAll);
    router.get('/alunos/:login', alunoController.getByLogin);
    router.post('/alunos', alunoController.create);
    router.delete('/alunos/:login', alunoController.delete);

    // Rotas para Professores
    router.get('/professores', professorController.getAll);
    router.get('/professores/:login', professorController.getByLogin);
    router.post('/professores', professorController.create);
    router.delete('/professores/:login', professorController.delete);

    // Rotas para Admins
    router.get('/admins', adminController.getAll);
    router.get('/admins/:login', adminController.getByLogin);
    router.post('/admins', adminController.create);
    router.delete('/admins/:login', adminController.delete);
}

