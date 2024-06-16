require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const e = require('express');
const usersModel = require('../models/users.model');
const tokensModel = require('../models/token.model');


// Endpoint de login para todos os tipos de usuário
exports.login = async (req, res) => {
    try {
        const result = await usersModel.findUser(req.body.login);
        if (!result) {
            //console.log('Credenciais inválidas: usuário não encontrado');
            return res.status(401).send('Credenciais inválidas.');
        }

        const { user, type } = result;
        //console.log(`Tentando autenticar usuário: ${JSON.stringify(user)}, tipo: ${type}`);

        const loginExists = await tokensModel.isLoginPresent(user.login);
        if (await bcrypt.compare(req.body.senha, user.senha)) {
            if(!loginExists){
                const userPayload = { login: user.login, type: type };
                const accessToken = generateAccessToken(userPayload);

                // Escreve o token e o tipo de usuário no arquivo token.json
                await tokensModel.writeTokenToFile(accessToken, user.login, type);            

                //console.log(`Autenticação bem-sucedida para usuário: ${user.login}`);
                res.status(200).send('Login realizado com sucesso');
            } else {
                res.status(409).send('Usuário já está logado');
            }
        } else {

            //console.log('Senha incorreta');
            res.status(401).send('Credenciais inválidas.');
        }
    } catch (error) {

        //console.error('Erro durante a autenticação:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
};

// Endpoint para remover o token
exports.logout = async (req, res) => {
    const tokenToDelete = req.body.login;

    if (!tokenToDelete) {
        return res.status(400).send('Token não fornecido.');
    }

    try {
        // Verifica se o token está presente
        const isTokenPresent = await tokensModel.isLoginPresent(tokenToDelete);
        if (!isTokenPresent) {
            return res.status(404).send('Token não encontrado. Usuário não está logado.');
        }

        // Deleta o token
        await tokensModel.deleteTokenFromFile(tokenToDelete);
        
        return res.status(204).send('Logout bem-sucedido');
    } catch (error) {
       // console.error('Erro ao processar a requisição de logout:', error);
        return res.status(500).send('Erro interno ao processar a requisição.');
    }
};


// Função para gerar o accessToken
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
}
