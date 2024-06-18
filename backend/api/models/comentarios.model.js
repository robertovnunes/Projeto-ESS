class Comentario {
    constructor(id, id_post, id_usuario, texto, data) {
        this.id = id;
        this.id_post = id_post;
        this.id_usuario = id_usuario;
        this.texto = texto;
        this.data = data;
    }
}

module.exports = Comentario;