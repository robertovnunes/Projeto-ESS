const { loadFeature, defineFeature } = require('jest-cucumber');
const supertest = require('supertest');
//const app = require('../../../conf/server');
const app = require('../../../apptest');
//apptest
const ComentariosRepository = require('../../../api/repositories/comentariosRepository');

const feature = loadFeature('tests/features/fazerComentarios.feature');

defineFeature(feature, test => {
    const server = app.listen(3001, () => {
        console.log('Testando...');
    });

    let request, response, mockComentariosRepository, mockData, comentarioId;
    request = supertest(server);

    beforeAll(async () => {
        mockComentariosRepository = new ComentariosRepository();
    });

    afterAll(async () => {
        if (comentarioId) {
            await mockComentariosRepository.deleteComentario(comentarioId);
        }
        server.close();
    });

    // Steps to reuse
    // Given steps
    const givenNewComentario = async (given) => {
        given(/^que eu estou logado como "(.*)" com login "(.*)" e senha "(.*)"$/, (role, login, senha) => {
            mockData = {
                id_post: '1234',
                id_usuario: 'prof123',
                texto: 'Este é um comentário de teste',
                data: new Date().toISOString(),
                tipo: 'sala',
                destinatario: 'ADM'
            };
        });
 
    };

    // When steps
    const whenSendComentario = async (when) => {
        when(/^eu envio uma requisição POST para "(.*)" com o corpo:$/, async (url, docString) => {
            const body = JSON.parse(docString);
            response = await request.post(url).send(body);
            comentarioId = response.body.id;
        });
    };

    const whenValidateComentario = async (when) => {
        when('eu valido o comentário', async () => {
            response = await request.patch(`/comentarios/${comentarioId}/validar`).send();
        });
    };

    const whenRespondComentario = async (when) => {
        when('eu respondo o comentário', async () => {
            const resposta = { resposta: 'Resposta do administrador.' };
            response = await request.patch(`/comentarios/${comentarioId}/responder`).send(resposta);
        });
    };

    // Then steps
    const thenReceiveResponseWithMessage = async (then) => {
        then(/^eu recebo uma resposta com a mensagem "(.*)"$/, async (message) => {
            expect(response.status).toBe(201);
            expect(response.body.message).toBe(message);
        });
    };

    const andResponseSucesso = async (and) => {
        and(/^o comentário "(.*)" é enviado para a Administração$/, (arg0) => {
            expect(response.status).toBe(201);
            //teve sucesso
        });
    };

    const thenComentarioValidated = async (then) => {
        then('o servidor deve retornar o comentário com status validado', () => {
            expect(response.status).toBe(200);
            expect(response.body.validado).toBe(true);
        });
    };

    const thenComentarioResponded = async (then) => {
        then('o servidor deve retornar o comentário com a resposta', () => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('resposta', 'Resposta do administrador.');
        });
    };

    // Scenarios tests
    test('Cria um comentário e envia para a ADM', ({ given, when, then, and }) => {
        givenNewComentario(given);
        whenSendComentario(when);
        thenReceiveResponseWithMessage(then);
        andResponseSucesso(and);
    });
/* 
    test('Validar um comentário existente', ({ given, when, then }) => {
        givenExistingComentario(given);
        whenValidateComentario(when);
        thenComentarioValidated(then);
    });

    test('Responder um comentário validado', ({ given, when, then }) => {
        givenExistingComentario(given);
        whenValidateComentario(when);
        whenRespondComentario(when);
        thenComentarioResponded(then);
    });
    */
});
