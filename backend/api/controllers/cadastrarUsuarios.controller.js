const e = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usersModel = require('../models/users.model');
const tokensModel = require('../models/token.model');


// Função para cadastrar um novo Professor
exports.cadastrarProfessor = async (req, res) => {
    try {
        const { nome, login, SIAPE, senha } = req.body;

        // Verifica se nome, login, SIAPE e senha estão presentes e não são vazios
        if (!nome || !login || !SIAPE || !senha) {
            return res.status(400).send('Nome, login, SIAPE e senha são obrigatórios.');
        }

        // Verifica se o usuário tem permissão de admin usando a função de autenticação
        const isAdmin = tokensModel.authenticateAdmin(req);
        if (!isAdmin) {
            return res.status(403).send('Apenas administradores têm permissão para esta operação.');
        }

        // Realiza o cadastro do professor
        let professores = await usersModel.readProfessores();
        professores = Array.isArray(professores) ? professores : [];

        // Verifica se o login já existe no arquivo
        const exists = professores.some(u => u.login === login);
        if (exists) {
            return res.status(409).send(`Professor com login ${login} já existe.`);
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria novo professor
        const newProfessor = {
            nome,
            login,
            SIAPE,
            senha: hashedPassword
        };

        // Adiciona o novo professor ao array de professores
        professores.push(newProfessor);

        // Escreve o arquivo atualizado
        await usersModel.writeProfessores(professores);

        res.status(201).send('Professor cadastrado com sucesso.');
    } catch (error) {
        console.error('Erro ao cadastrar professor:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
};

// Função para cadastrar um novo Aluno
exports.cadastrarAluno = async (req, res) => {
    try {
        const { nome, login, senha } = req.body;

        // Verifica se nome, login e senha estão presentes e não são vazios
        if (!nome || !login || !senha) {
            return res.status(400).send('Nome, login e senha são obrigatórios.');
        }

        // Verifica se o usuário tem permissão de admin usando a função de autenticação
        const isAdmin = tokensModel.authenticateAdmin(req);
        if (!isAdmin) {
            return res.status(403).send('Apenas administradores têm permissão para esta operação.');
        }

        // Realiza o cadastro do aluno
        let alunos = await usersModel.readAlunos();
        alunos = Array.isArray(alunos) ? alunos : [];

        // Verifica se o login já existe no arquivo
        const exists = alunos.some(u => u.login === login);
        if (exists) {
            return res.status(409).send(`Aluno com login ${login} já existe.`);
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria novo aluno
        const newAluno = {
            nome,
            login,
            senha: hashedPassword
        };

        // Adiciona o novo aluno ao array de alunos
        alunos.push(newAluno);

        // Escreve o arquivo atualizado
        await usersModel.writeAlunos(alunos);

        res.status(201).send('Aluno cadastrado com sucesso.');
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
};

// Função para cadastrar um novo Admin (similar à função de cadastrar professor)
exports.cadastrarAdmin = async (req, res) => {
    try {
        const { nome, login, senha } = req.body;

        // Verifica se nome, login e senha estão presentes e não são vazios
        if (!nome || !login || !senha) {
            return res.status(400).send('Nome, login e senha são obrigatórios.');
        }

        // Verifica se o usuário tem permissão de admin usando a função de autenticação
        const isAdmin = tokensModel.authenticateAdmin(req);
        if (!isAdmin) {
            return res.status(403).send('Apenas administradores têm permissão para esta operação.');
        }

        // Realiza o cadastro do admin
        let admins = await usersModel.readAdmins();
        admins = Array.isArray(admins) ? admins : [];

        // Verifica se o login já existe no arquivo
        const exists = admins.some(u => u.login === login);
        if (exists) {
            return res.status(409).send(`Admin com login ${login} já existe.`);
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria novo admin
        const newAdmin = {
            nome,
            login,
            senha: hashedPassword
        };

        // Adiciona o novo admin ao array de admins
        admins.push(newAdmin);

        // Escreve o arquivo atualizado
        await usersModel.writeAdmins(admins);

        res.status(201).send('Administrador cadastrado com sucesso.');
    } catch (error) {
        console.error('Erro ao cadastrar Administrador:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
};

// Função para remover um admin pelo login
exports.removerAdmin = async (req, res) => {
    try {
        const loginToRemove = req.params.login;

        // Verifica se o usuário tem permissão de admin usando a função de autenticação
        const isAdmin = tokensModel.authenticateAdmin(req);
        console.log(isAdmin);
        if (!isAdmin) {
            return res.status(403).send('Apenas administradores têm permissão para esta operação.');
        }

        // Remove o admin pelo login especificado
        let admins = await usersModel.readAdmins();
        admins = Array.isArray(admins) ? admins : [];

        // Verifica se o admin a ser removido existe
        const index = admins.findIndex(u => u.login === loginToRemove);
        if (index === -1) {
            return res.status(404).send(`Admin com login ${loginToRemove} não encontrado.`);
        }

        // Remove o admin do array
        admins.splice(index, 1);

        // Escreve o arquivo atualizado
        await usersModel.writeAdmins(admins);

        return res.status(204).send('Admin removido com sucesso.');
    } catch (error) {
        console.error('Erro ao remover Admin:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
};


// Função para remover um Aluno pelo login
exports.removerAluno = async (req, res) => {
    try {
        const loginToRemove = req.params.login;

        // Verifica se o usuário tem permissão de admin usando a função de autenticação
        const isAdmin = tokensModel.authenticateAdmin(req);
        console.log(isAdmin);
        if (!isAdmin) {
            return res.status(403).send('Apenas administradores têm permissão para esta operação.');
        }

        // Remove o Aluno pelo login especificado
        let alunos = await usersModel.readAlunos();
        alunos = Array.isArray(alunos) ? alunos : [];

        // Verifica se o aluno a ser removido existe
        const index = alunos.findIndex(u => u.login === loginToRemove);
        if (index === -1) {
            return res.status(404).send(`Aluno com login ${loginToRemove} não encontrado.`);
        }

        // Remove o aluno do array
        alunos.splice(index, 1);

        // Escreve o arquivo atualizado
        await usersModel.writeAlunos(alunos);

        return res.status(204).send('Aluno removido com sucesso.');
    } catch (error) {
        console.error('Erro ao remover Aluno:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
};

// Função para remover um Professor pelo login
exports.removerProfessor = async (req, res) => {
    try {
        const loginToRemove = req.params.login;

        // Verifica se o usuário tem permissão de admin usando a função de autenticação
        const isAdmin = tokensModel.authenticateAdmin(req);
        console.log(isAdmin);
        if (!isAdmin) {
            return res.status(403).send('Apenas administradores têm permissão para esta operação.');
        }

        // Remove o Professor pelo login especificado
        let professores = await usersModel.readProfessores();
        professores = Array.isArray(professores) ? professores : [];

        // Verifica se o professor a ser removido existe
        const index = professores.findIndex(u => u.login === loginToRemove);
        if (index === -1) {
            return res.status(404).send(`Professor com login ${loginToRemove} não encontrado.`);
        }

        // Remove o professor do array
        professores.splice(index, 1);

        // Escreve o arquivo atualizado
        await usersModel.writeProfessores(professores);

        return res.status(204).send('Professor removido com sucesso.');
    } catch (error) {
        console.error('Erro ao remover Professor:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
};