const { v4: uuidv4 } = require('uuid');
const Comentarios = require('../models/comentarios.model');

const createComentario = (req, res) => {
    const { autor, sala, comentario } = req.body;
    if (!autor || !sala || !comentario) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const novoComentario = {
        id: uuidv4(),
        autor,
        sala,
        comentario,
        status: 'pendente',
        data: new Date().toISOString()
    };

    const savedComentario = Comentarios.addComentario(novoComentario);
    res.status(201).json(savedComentario);
};

module.exports = {
    createComentario
};
