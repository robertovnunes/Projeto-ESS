const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/comentarios.json');

const getComentarios = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const saveComentarios = (comentarios) => {
    fs.writeFileSync(filePath, JSON.stringify(comentarios, null, 2));
};

const addComentario = (comentario) => {
    const comentarios = getComentarios();
    comentarios.push(comentario);
    saveComentarios(comentarios);
    return comentario;
};

module.exports = {
    getComentarios,
    addComentario
};
