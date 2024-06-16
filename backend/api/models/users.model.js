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
    if (user) return { user, type: 'professor' };


    let alunos = await readAlunos();
    alunos = Array.isArray(alunos) ? alunos : []; // Converte para array se necessário
    user = alunos.find(user => user.login === login);
    if (user) return { user, type: 'aluno' };

    let admins = await readAdmins(); // Correção: esqueceu de chamar a função
    admins = Array.isArray(admins) ? admins : []; // Converte para array se necessário
    user = admins.find(user => user.login === login);
    if (user) return { user, type: 'admin' };

    return null;
}

module.exports = {
    readAdmins,
    readAlunos,
    readProfessores,
    writeAdmins,
    writeAlunos,
    writeProfessores,
    findUser
};
