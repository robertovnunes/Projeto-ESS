const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../conf/server');
const { loadFeature, defineFeature } = require('jest-cucumber');
const should = chai.should();

chai.use(chaiHttp);

const feature = loadFeature('tests/features/comentarios.feature');

defineFeature(feature, test => {
    let comentarioId;

    test('Criar um novo comentário', ({ given, when, then }) => {
        let comentario;

        given('eu tenho um novo comentário', () => {
            comentario = {
                id_post: '1234',
                id_usuario: 'prof123',
                texto: 'Este é um comentário de teste',
                data: new Date().toISOString(),
                tipo: 'sala',
                destinatario: 'ADM'
            };
        });

        when('eu envio o comentário para o servidor', (done) => {
            chai.request(server)
                .post('/comentarios')
                .send(comentario)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    comentarioId = res.body.id;
                    done();
                });
        });

        then('o servidor deve retornar o comentário criado com um id', () => {
            comentarioId.should.not.be.null;
        });
    });

    test('Validar um comentário existente', ({ given, when, then }) => {
        given('eu tenho um comentário existente', () => {
            comentarioId.should.not.be.null;
        });

        when('eu valido o comentário', (done) => {
            chai.request(server)
                .patch(`/comentarios/${comentarioId}/validar`)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('validado').eql(true);
                    done();
                });
        });

        then('o servidor deve retornar o comentário com status validado', () => {
            // Validation already checked in 'when' step
        });
    });

    test('Responder um comentário validado', ({ given, when, then }) => {
        let resposta;

        given('eu tenho um comentário validado', (done) => {
            chai.request(server)
                .patch(`/comentarios/${comentarioId}/validar`)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        when('eu respondo o comentário', (done) => {
            resposta = { resposta: 'Resposta do administrador.' };
            chai.request(server)
                .patch(`/comentarios/${comentarioId}/responder`)
                .send(resposta)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('resposta').eql(resposta.resposta);
                    done();
                });
        });

        then('o servidor deve retornar o comentário com a resposta', () => {
            // Response already checked in 'when' step
        });
    });
});
