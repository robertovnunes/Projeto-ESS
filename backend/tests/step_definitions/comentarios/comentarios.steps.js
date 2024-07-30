const request = require('supertest');
const express = require('express');
const comentariosRoutes = require('../../../api/routes/comentarios.routes');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use('/api', comentariosRoutes);

const filePath = path.join(__dirname, '../data/comentarios.json');

beforeEach(() => {
    fs.writeFileSync(filePath, '[]');
});

describe('POST /comentarios', () => {
    it('should create a new comentario', async () => {
        const newComentario = {
            autor: 'Professor A',
            sala: 'Sala 101',
            comentario: 'Ótima sala, mas precisa de mais ventilação.'
        };

        const res = await request(app)
            .post('/comentarios')
            .send(newComentario);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.autor).toBe(newComentario.autor);
        expect(res.body.sala).toBe(newComentario.sala);
        expect(res.body.comentario).toBe(newComentario.comentario);
        expect(res.body.status).toBe('pendente');
    });

    it('should return 400 if any field is missing', async () => {
        const newComentario = {
            autor: 'Professor B',
            sala: 'Sala 102'
        };

        const res = await request(app)
            .post('/comentarios')
            .send(newComentario);

        expect(res.statusCode).toEqual(400);
    });
});
