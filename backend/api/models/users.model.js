const fs = require('fs').promises; // Importa fs.promises para usar readFile promisificado
const path = require('path');

const admins = path.resolve(__dirname, '../../db/admins.json');
const alunos = path.resolve(__dirname, '../../db/alunos.json');
const professores = path.resolve(__dirname, '../../db/professores.json');

async function readAdmins() {
    try {
        const data = await fs.readFile(admins, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao ler o arquivo admins:`, error);
        return [];
    }
}

async function readAlunos () {
    try {
        const data = await fs.readFile(alunos, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao ler o arquivo alunos:`, error);
        return [];
    }
}

async function readProfessores () {
    try {
        const data = await fs.readFile(professores, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao ler o arquivo professores:`, error);
        return [];
    }
}

// Função para escrever no arquivo admins.json
async function writeAdmins(data) {
    try {
        await fs.writeFile(admins, JSON.stringify(data, null, 2), 'utf-8');
        //console.log('Dados salvos com sucesso em admins.json');
    } catch (error) {
        console.error(`Erro ao escrever no arquivo admins:`, error);
    }
}

// Função para escrever no arquivo alunos.json
async function writeAlunos(data) {
    try {
        await fs.writeFile(alunos, JSON.stringify(data, null, 2), 'utf-8');
        //console.log('Dados salvos com sucesso em alunos.json');
    } catch (error) {
        console.error(`Erro ao escrever no arquivo alunos:`, error);
    }
}

// Função para escrever no arquivo professores.json
async function writeProfessores(data) {
    try {
        await fs.writeFile(professores, JSON.stringify(data, null, 2), 'utf-8');
        //console.log('Dados salvos com sucesso em professores.json');
    } catch (error) {
        console.error(`Erro ao escrever no arquivo professores:`, error);
    }
}

async function findUser(login) {
    let professores = await readProfessores();
    professores = Array.isArray(professores) ? professores : []; // Converte para array se necessário
    let user = professores.find(user => user.login === login);
    if (user) return { user, type: 'professores' };


    let alunos = await readAlunos();
    alunos = Array.isArray(alunos) ? alunos : []; // Converte para array se necessário
    user = alunos.find(user => user.login === login);
    if (user) return { user, type: 'alunos' };

    let admins = await readAdmins(); // Correção: esqueceu de chamar a função
    admins = Array.isArray(admins) ? admins : []; // Converte para array se necessário
    user = admins.find(user => user.login === login);
    if (user) return { user, type: 'admins' };

    return null;
}

function getFilePath(userType) {
    let filePath;

    if (userType === 'professores') {
        filePath = professores; // Deve apontar para o caminho de professores.json
    } else if (userType === 'alunos') {
        filePath = alunos; // Deve apontar para o caminho de alunos.json
    } else if (userType === 'admins') {
        filePath = admins; // Deve apontar para o caminho de admins.json
    } else {
        throw new Error('Tipo de usuário inválido.');
    }

    return filePath;
}

async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao ler o arquivo ${filePath}:`, error);
        return [];
    }
}

async function writeJsonFile(filePath, data) {
    try {
        if (!filePath || !data) {
            throw new Error('Parâmetros inválidos: filePath e data são obrigatórios.');
        }

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Dados escritos com sucesso no arquivo ${filePath}`);
    } catch (error) {
        console.error(`Erro ao escrever no arquivo ${filePath}:`, error.message);
        throw error; // Rejeita a promessa para propagar o erro para quem chamou essa função
    }
}


module.exports = {
    readAdmins,
    readAlunos,
    readProfessores,
    writeAdmins,
    writeAlunos,
    writeProfessores,
    findUser,
    getFilePath,
    readJsonFile,
    writeJsonFile
};
