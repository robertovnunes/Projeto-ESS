const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

function isJsonEmpty(json){
    return json.length === 0;
}

class ComentariosRepository{
    constructor(dbPath){
        this.filePath = dbPath || path.join(__dirname, '../../db/comentarios.json');
        this._readFile(this.filePath).then(r => r);
    }
    async _readFile() {
        const data = await fs.promises.readFile(this.filePath);
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async getAllComentarios() {
        console.log('entrei 4')
        return this._readFile();
    }
    async getComentarioById(id) {
        const db = await this.getAllComentarios();
        return db.find(comentario => comentario.id === id);
    }
    async createComentario(newComentario) {
        console.log('entrei 3');
        let db = await this.getAllComentarios();
        let id = '04'+shortid.generate();
        if(!isJsonEmpty(db)){
            db.forEach(comentario => {
                if(comentario.id === id){
                    id = '04'+shortid.generate();
                }
            });
            newComentario.id = id;
            db.push(newComentario);
        } else {
            newComentario.id = id;
            db = [newComentario];
        }
        await this._writeFile(db);
        return newComentario;
    }
    async patchComentario(id, newComentario) {
        let db = await this.getAllComentarios();
        const index = db.findIndex(comentario => comentario.id === id);
        if(index === -1){
            return null;
        }
        db[index] = newComentario;
        await this._writeFile(db);
        return newComentario;
    }
    async deleteComentario(id) {
        let db = await this.getAllComentarios();
        const index = db.findIndex(comentario => comentario.id === id);
        if(index === -1){
            return null;
        }
        db.splice(index, 1);
        await this._writeFile(db);
        return id;
    }
}

module.exports = ComentariosRepository;