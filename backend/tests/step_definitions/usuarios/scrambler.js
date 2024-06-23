const fs = require('fs');
const path = require('path');

const oldProfessores = path.resolve(__dirname, '../../mocks/usuarios/oldProfessores.json');
const oldAlunos = path.resolve(__dirname, '../../mocks/usuarios/oldAlunos.json');
const oldAdmins = path.resolve(__dirname, '../../mocks/usuarios/oldAdmins.json');

const newProfessores = path.resolve(__dirname, '../../mocks/usuarios/newProfessores.json');
const newAlunos = path.resolve(__dirname, '../../mocks/usuarios/newAlunos.json');
const newAdmins = path.resolve(__dirname, '../../mocks/usuarios/newAdmins.json');

const professoresDB = path.resolve(__dirname, '../../../db/professores.json');
const alunosDB = path.resolve(__dirname, '../../../db/alunos.json');
const adminsDB = path.resolve(__dirname, '../../../db/admins.json');

// Função genérica para configurar o teste
const setupForTestUsers = (databasePath, mockPath) => {
    try {
        // Lê o conteúdo do banco de dados
        let data = fs.readFileSync(databasePath, 'utf8');

        // Escreve o conteúdo nos arquivos de mock
        fs.writeFileSync(mockPath, data);

        //console.log(`Dados copiados de ${databasePath} para ${mockPath}`);
    } catch (error) {
        console.error('Erro ao manipular o arquivo JSON', error);
    }
}

// Função genérica para ler dados antigos ou novos
const readUsers = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}

// Função genérica para obter o primeiro ou segundo usuário
const getUser = (filePath, index) => {
    try {
        const users = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(users)[index];
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return {};
    }
}

const readMockData = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const paths = {
    professores: {
        old: oldProfessores,
        new: newProfessores,
        database: professoresDB
    },
    alunos: {
        old: oldAlunos,
        new: newAlunos,
        database: alunosDB
    },
    admins: {
        old: oldAdmins,
        new: newAdmins,
        database: adminsDB
    }
};

module.exports = {
    readUsers, 
    getUser,
    setupForTestUsers,
    readMockData
};