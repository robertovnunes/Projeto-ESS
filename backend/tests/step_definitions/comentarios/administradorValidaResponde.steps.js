const { loadFeature, defineFeature } = require('jest-cucumber');
const supertest = require('supertest');
const app = require('../../../apptest');
const ComentariosRepository = require('../../../api/repositories/comentariosRepository');

const feature = loadFeature('tests/features/comentarios/administradorValidaResponde.feature');

defineFeature(feature, test => {
    const server = app.listen(3001, () => {
        console.log('Testando...');
    });

    let request, response, mockComentariosRepository, comentarioId;
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
    const givenLoggedInAsAdmin = (given) => {
        given(/^que eu estou logado como "(.*)" com login "(.*)" e senha "(.*)"$/, (role, login, senha) => {
            
        });
    };

    const whenSendGetComentarios = (when) => {
        when(/^eu envio uma requisição GET para "(.*)"$/, async (url) => {
            response = await request.get(url);
        });
    };

    const thenReceiveComentariosList = (then) => {
        then(/^eu recebo uma lista de comentários, incluindo o comentário "(.*)" com o ID "(.*)"$/, (comentario, id) => {
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ id: id, texto: comentario })
                ])
            );
        });
    };

    const thenReceiveComentariosListValidated = (then) => {
        then(/^eu recebo uma lista de comentários, incluindo o comentário "(.*)" com o ID "(.*)" que está validado$/, (comentario, id) => {
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ id: id, texto: comentario, validado: true })
                ])
            );
        });
    };

    const whenSendPatchComentario = (when) => {
        when(/^eu envio uma requisição PATCH para "(.*)" com o corpo:$/, async (url, docString) => {
            const body = JSON.parse(docString);
            response = await request.patch(url).send(body);
        });
    };

    const thenReceiveResponseWithMessage = (then) => {
        then(/^eu recebo uma resposta com a mensagem "(.*)"$/, async (message) => {
            expect(response.status).toBe(200);
            expect(response.body.message).toBe(message);
        });
    };

    const andComentarioValidated = (and) => {
        and(/^o comentário com o ID "(.*)" é marcado como validado$/, async (id) => {
            const comentario = await mockComentariosRepository.getComentarioById(id);
            expect(comentario.validado).toBe(true);
        });
    };

    const whenSendPostResposta = (when) => {
        when(/^eu envio uma requisição POST para "(.*)" com o corpo:$/, async (url, docString) => {
            const body = JSON.parse(docString);
            console.log('Enviando requisição POST para', url, 'com o corpo', body);
            response = await request.post(url).send(body);
            console.log('Recebida resposta:', response.status, response.body);

            //Certifique-se de que o ID está presente na resposta
            if (response.body && response.body.id) {
                console.log('Mensagem da resposta:', response.body.message);
                console.log('ID da resposta:', response.body.id);
            } else {
                console.log('A resposta não contém body');
            }
            console.log('ENTRA AQUI ANTES DO FIM DE RESP. NAO-VALIDADO-///Comentário ID:', response.body.id);
        });
    };

    const andRespostaAssociated = (and) => {
        and(/^a resposta "(.*)" é associada ao comentário com o ID "(.*)"$/, async (resposta, id) => {
            const comentario = await mockComentariosRepository.getComentarioById(id);
            expect(comentario.resposta).toBe(resposta);
        });
    };

    const thenReceiveErrorMessage = (then) => {
        then(/^eu recebo uma resposta com a mensagem "(.*)"$/, async (message) => {
            expect(response.body.message).toBe(message);
        });
    };

    const andResponseStatusCode = (and) => {
        and(/^o status da resposta é (\d+)$/, async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    };

    const thenReceiveComentariosListNotValidated = (then) => {
        then(/^eu recebo uma lista de comentários, incluindo o comentário "(.*)" com o ID "(.*)" que não está validado$/, (comentario, id) => {
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ id: id, texto: comentario, validado: false })
                ])
            );
        });
    };
    

    // Scenarios tests
    test('Vê os comentários e valida eles', ({ given, when, then, and }) => {
        givenLoggedInAsAdmin(given);
        whenSendGetComentarios(when);
        thenReceiveComentariosList(then);
        whenSendPatchComentario(when);
        thenReceiveResponseWithMessage(then);
        andComentarioValidated(and);
    });

    test('Vê os comentários e responde', ({ given, when, then, and }) => {
        givenLoggedInAsAdmin(given);
        whenSendGetComentarios(when);
        thenReceiveComentariosListValidated(then);
        whenSendPostResposta(when);
        thenReceiveResponseWithMessage(then);
        andRespostaAssociated(and);
    });

    test('Tenta responder um comentário que não foi validado', ({ given, when, then, and }) => {
        givenLoggedInAsAdmin(given);
        whenSendGetComentarios(when);
        thenReceiveComentariosListNotValidated(then);
        whenSendPostResposta(when);
        thenReceiveErrorMessage(then);
        andResponseStatusCode(and);
    });

    test('Tenta responder um comentário que não existe', ({ given, when, then, and }) => {
        givenLoggedInAsAdmin(given);
        whenSendPostResposta(when);
        thenReceiveErrorMessage(then);
        andResponseStatusCode(and);
    });

    test('Tenta validar um comentário que não existe', ({ given, when, then, and }) => {
        givenLoggedInAsAdmin(given);
        whenSendPatchComentario(when);
        thenReceiveErrorMessage(then);
        andResponseStatusCode(and);
    });
});
