const comentarioRepository = require('../repositories/comentariosRepository');

class ComentariosService {
    constructor(comentarioRepository){
        this.comentarioRepository = comentarioRepository || new comentarioRepository();
    }

    getAllComentarios() {
        return this.comentarioRepository.getAllComentarios();
    }

    getComentarioById(id) {
        return this.comentarioRepository.getComentarioById(id);
    }

    createComentario(newComentario) {
        console.log('entrei 2');
        return this.comentarioRepository.createComentario(newComentario);
    }

    patchComentario(id, newComentario) {
        return this.comentarioRepository.patchComentario(id, newComentario);
    }

    deleteComentario(id) {
        return this.comentarioRepository.deleteComentario(id);
    }
}

module.exports = ComentariosService;