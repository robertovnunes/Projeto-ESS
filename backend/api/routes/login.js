const router = require('express').Router();

const loginController = require('../controllers/login.controller.js');

module.exports = app => {
    app.use('/usuarios', router);
    router.post('/login', loginController.login);
    router.delete('/logout', loginController.logout);
}