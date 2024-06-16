const fs = require('fs').promises; // Importa fs.promises para usar readFile promisificado
const path = require('path');

const token = path.resolve(__dirname, '../../db/token.json');

// Função para ler no arquivo token.json
async function readToken() {
    try {
        const data = await fs.readFile(token, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao ler o arquivo Token:`, error);
        return [];
    }
}    

// Função para escrever no arquivo token.json
async function writeToken(data) {
    try {
        await fs.writeFile(token, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        //console.error(`Erro ao escrever no arquivo token:`, error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
}

// Função para verificar se um login já existe no arquivo
async function isLoginPresent(login) {
    let tokenFileContent = await readToken();
    tokenFileContent = Array.isArray(tokenFileContent) ? tokenFileContent : []; // Converte para array se necessário
    return tokenFileContent.some(entry => entry.login === login);
}

// Função para escrever o token, usuário e tipo de usuário em um arquivo
async function writeTokenToFile(token, login, type) {
    try {
        const tokenData = { token, login, type };
        
        // Lê o conteúdo atual do arquivo token.json
        let tokenFileContent = await readToken();
        
        // Converte para array se não for um array (por exemplo, se o arquivo estiver vazio)
        tokenFileContent = Array.isArray(tokenFileContent) ? tokenFileContent : [];
        
        // Adiciona os novos dados ao array existente
        tokenFileContent.push(tokenData);
        
        // Escreve os dados atualizados de volta no arquivo token.json
        await writeToken(tokenFileContent);

        //console.log('Token, usuário e tipo de usuário salvos com sucesso em token.json');
    } catch (error) {
        //console.error('Erro ao escrever o token, usuário e tipo de usuário no arquivo:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
}

async function deleteTokenFromFile(loginToDelete) {
    try {
        let tokenFileContent = await readToken();

        // Converte para array se não for um array (por exemplo, se o arquivo estiver vazio)
        tokenFileContent = Array.isArray(tokenFileContent) ? tokenFileContent : [];

        // Verifica se o login a ser deletado existe no arquivo de tokens
        const index = tokenFileContent.findIndex(entry => entry.login === loginToDelete);

        if (index !== -1) {
            // Remove a entrada correspondente ao login
            tokenFileContent.splice(index, 1);

            // Escreve os dados atualizados de volta no arquivo token.json
            await writeToken(tokenFileContent);

            //console.log(`Token para login '${loginToDelete}' removido com sucesso.`);
        } else {
            //console.log(`Login '${loginToDelete}' não encontrado no arquivo de tokens.`);
        }
    } catch (error) {
        //console.error('Erro ao apagar o token do arquivo de token:', error);
        res.status(500).send('Erro interno ao processar a requisição.');
    }
}


module.exports = {
    readToken,
    writeToken,
    isLoginPresent,
    writeTokenToFile,
    deleteTokenFromFile
};