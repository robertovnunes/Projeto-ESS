const router = require('express').Router();

// Importando os controladores
const LoginController = require('../controllers/usuarios/loginController');

// Instanciando os controladores
const loginController = new LoginController();

module.exports = app => {
    app.use('/usuarios', router);
    // Rotas para Alunos
    router.post('/login', loginController.login);
    router.delete('/logout', loginController.logout);
}

