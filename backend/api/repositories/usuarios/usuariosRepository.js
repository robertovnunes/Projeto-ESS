const fs = require('fs');
const path = require('path');

function isJsonEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

class UsuariosRepository {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async _readFile() {
        const data = await fs.promises.readFile(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async getAll() {
        const db = await this._readFile();
        return db.length === 0 ? 'Nenhum usuário cadastrado' : db;
    }

    async getByLogin(login) {
        const db = await this.getAll();
        const user = db.find(user => user.login === login);
        return user === undefined ? 'Usuário não encontrado' : user;
    }

    async create(newUser) {
        let db = await this.getAll();
        if (db !== 'Nenhum usuário cadastrado' && !isJsonEmpty(db)) {
            if (db.find(user => user.login === newUser.login)) {
                return 'Usuário já existe';
            }
            db.push(newUser);
        } else {
            db = [newUser];
        }
        await this._writeFile(db);
        return newUser;
    }

    async delete(login) {
        let db = await this.getAll();
    
        // Verifica se db é um array vazio
        if (!Array.isArray(db) || db.length === 0) {
            return 'Nenhum usuário cadastrado';
        }
    
        // Procura pelo índice usuário usando o login
        const index = db.findIndex(user => user.login === login);
    
        if (index === -1) {
            return 'Usuário não encontrado';
        }
    
        // Remove o usuário do array
        const deleted = db.splice(index, 1);
    
        // Atualiza o arquivo com o novo array de usuários
        await this._writeFile(db);
    
        return 'Usuário removido com sucesso';
    }
}

module.exports = UsuariosRepository;
