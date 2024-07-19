const { loadFeature, defineFeature } = require('jest-cucumber');
const supertest = require('supertest');
const app = require('../../../apptest');
const ComentariosRepository = require('../../../api/repositories/comentariosRepository');

const feature = loadFeature('tests/features/comentarios/fazerComentarioEquipamento.feature');

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
                id_usuario: 'aluno123',
                texto: 'Este é um comentário de teste sobre equipamento',
                data: new Date().toISOString(),
                tipo: 'equipamento',
                destinatario: 'SEC',
                sec_responsavel: 'secretaria de pos-grad'
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

    // Then steps
    const thenReceiveResponseWithMessage = async (then) => {
        then(/^eu recebo uma resposta com a mensagem "(.*)"$/, async (message) => {
            expect(response.status).toBe(201);
            expect(response.body.message).toBe(message);
        });
    };

    const andResponseSucesso = async (and) => {
        and(/^o comentário "(.*)" é enviado para a SEC responsável "(.*)"$/, (comentario, sec_responsavel) => {
            expect(response.status).toBe(201);
            expect(response.body.body.comentario).toBe(comentario);
            expect(response.body.body.sec_responsavel).toBe(sec_responsavel);
        });
    };

    // Scenarios tests
    test('Envia comentário sobre o equipamento para a SEC responsável', ({ given, when, then, and }) => {
        givenNewComentario(given);
        whenSendComentario(when);
        thenReceiveResponseWithMessage(then);
        andResponseSucesso(and);
    });
});
