require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const e = require('express');
const usersModel = require('../models/users.model');
const tokensModel = require('../models/token.model');


// Endpoint de login para todos os tipos de usuário
exports.login = async (req, res) => {

    if (req.cookies.accessToken) {
        // Se o accessToken está presente nos cookies da requisição
        return res.status(400).send("Usuário já está logado");
    }

    try {
        const result = await usersModel.findUser(req.body.login);
        if (!result) {
            return res.status(401).send('Credenciais inválidas.');
        }
        const { user, type } = result;

        if (await bcrypt.compare(req.body.senha, user.senha)) {
            const userPayload = { login: user.login, type: type };
            const accessToken = generateAccessToken(userPayload);

            // Setando o token de acesso no cookie com o tipo de usuário
            res.cookie('accessToken', accessToken, { httpOnly: true });
            res.cookie('userType', type, { httpOnly: true });
            res.cookie('login', user.login, { httpOnly: true });

            console.log('Cookies definidos:');
            console.log('accessToken:', accessToken);
            console.log('userType:', type);
            console.log('login:', user.login);

            return res.status(200).send('Login realizado com sucesso');
        } else {
            return res.status(401).send('Credenciais inválidas.');
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        return res.status(500).send('Erro interno ao processar a requisição.');
    }
};

// Endpoint para remover o token
exports.logout = async (req, res) => {
    const loginToDelete = req.cookies.login;

    console.log('Cookies recebidos no logout:');
    console.log('accessToken:', req.cookies.accessToken);
    console.log('userType:', req.cookies.userType);
    console.log('login:', loginToDelete);

    if (!loginToDelete) {
        return res.status(400).send('Login não fornecido.');
    }

    try {
        // Limpa os cookies
        res.clearCookie('accessToken');
        res.clearCookie('userType');
        res.clearCookie('login');

        console.log(`Logout bem-sucedido para login: ${loginToDelete}`);
        return res.status(204).send('Logout bem-sucedido');
    } catch (error) {
        console.error('Erro ao processar a requisição de logout:', error);
        return res.status(500).send('Erro interno ao processar a requisição.');
    }
};

// Middleware para verificar autenticação
exports.authenticateToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        // Verifica se accessToken não está presente
        if (!accessToken) {
            // Realiza o logout automaticamente se o accessToken expirou
            return res.status(401).send('Token expirado. Efetue login novamente.');
        }

        // Verifica se o token é válido
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(403).send('Token inválido. Efetue login novamente.');
            }
            req.user = decodedToken;
            next();
        });
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        return res.status(500).send('Erro interno ao processar a requisição.');
    }
};


// Função para gerar o accessToken
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '18000s' });
}
