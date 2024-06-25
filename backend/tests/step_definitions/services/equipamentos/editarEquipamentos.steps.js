const {loadFeature, defineFeature} = require('jest-cucumber');
const supertest = require ('supertest');
const app = require('../../../../app.js');
const equipamentoService = require('../../../../api/services/equipamentosService');
const equipamentoInjector = require('../../../..//di/equipamentoInjector');
const modelSN = require('../../../../api/models/equipamentoSNModel.js');
const modelPatrimonio = require('../../../../api/models/equipamentoPatrimonioModel.js');
const EquipamentosRepository = require('../../../../api/repositories/equipamentosRepository.js');

const feature = loadFeature('tests/features/equipamentos/adicionarEquipamento.feature');
defineFeature(feature, (test) => {
    let request, mockEquipamentos, service, injector;
    let response;
    let data;
    request = supertest(app);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/PATCH';

    beforeEach(() => {
        injector = new equipamentoInjector([]);
        const mockEquipamentosData = {
            getEquipamentos: jest.fn(),
            getEquipmentById: jest.fn(),
            getEquipmentByPatrimonio: jest.fn(),
            getEquipmentBySerie: jest.fn(),
            createEquipmentPatrimonio: jest.fn(),
            createEquipmentSN: jest.fn(),
            updateEquipment: jest.fn(),
            deleteEquipment: jest.fn()
        };
        mockEquipamentos = mockEquipamentosData;
        injector.registerEquipmentRepository(EquipamentosRepository, mockEquipamentos);
        service = new equipamentoService(mockEquipamentos);
    });

    afterAll( async () => {
        jest.clearAllMocks();
        response = await request.get('/equipamentos');
        if(response.status === 200) {
            response.body.forEach( async (equipamento) => {
                await request.delete(`/equipamentos/${equipamento.id}`);
            });
        }
        app.off();
    });

//Steps to reuse
//Given steps
    const givenNotEquipmentExist = async (given) => {
        given(/^nao existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            const url = `/equipamentos/${campo}/${identificador}`;
            response = await request.get(url);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Equipamento nao encontrado');
        });
    };
    const givenNotPatrimonioExist = async (given) => {
        given(/^nao existe o equipamento com "(.*)" "(.*)"$/, async (patrimonio) => {
            const url = `/equipamentos/patrimonio/${patrimonio}`;
            response = await request.get(url);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Equipamento nao encontrado');
        });
    };
    const givenRequest = (given) => {
        given(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (req, user, role) => {
            expect(request.method).toBe(req);
            expect(request.headers.username).toBe(user);
            expect(request.headers.role).toBe(role);
        });
    };
    const givenEquipmentExist = async (given) => {
        given(/^existe o equipamento com:"$/, async (json) => {
            data = JSON.parse(json);
            response = await request.post('/equipamentos/patrimonio').send(data);
            console.log(response.body);
            expect(response.status).toBe(201);
        });
    }
//When steps
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (req, user, role, json) => {
            data = JSON.parse(json);
            expect(request.method).toBe(req);
            expect(request.headers.username).toBe(user);
            expect(request.headers.role).toBe(role);
        });
    };
//Then steps
    const thenEquipmentIsUpdated = async (then) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" está no banco de dados$/, async (nome, campo, valor, json) => {
            //jest.spyOn(mockEquipamentos, 'addEquipamento').mockResolvedValue(data);
            let updated = await request.patch(`/equipamentos/${data.id}`).send(data);
            example = JSON.parse(json);
            response = await request.get(`/equipamentos/${campo}/${valor}`);
            expect(response.status).toBe(200);
            updated.body.forEach( async (field) => {
                expect(field).toBe(example[field]);
            });

        });
    };
    const thenResponseError = async (then, data, identificador) => {
        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)" e mensagem "(.*)"$/, async (type, code, message) => {
            expect(type).toBe('erro');
            expect(response.statusCode).toBe(parseInt(code));
            expect(response.body.message).toBe(message);
        });
    }
    const thenResponseSucesso = async (then) => {
        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (type, code) => {
            expect(response.status).toBe(code);
        });
    };
    const thenEquipmentisNotUpdated = async (then) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" nao esta no banco de dados$/, async (nome, campo, valor) => {
            response = await request.patch(`/equipamentos/${campo}`).send(data);
            expect(response.status).notToBe(200);
        });
    }

//And steps
    const andFieldMatch = async (and) => {
        and(/^"(.*)" "(.*)"$/, async (campo, valor) => {
            expect(data[campo]).toBe(valor);
        });
    };
    const andResponseSucesso = async (and) => {
        and(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (type, code) => {
            expect(type).toBe('sucesso');
            expect(code).toBe('201');
        });
    };

    test('Editar estado de conservação de um equipamento', ({ given, when, then }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentIsUpdated(then);
        thenResponseSucesso(then);
    });

    test('Editar um equipamento com nome vazio', ({ given, when, then }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentisNotUpdated(then);
        andResponseError(then);
    });
    test('Editar um equipamento com patrimonio vazio', ({ given, when, then }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentisNotUpdated(then);
        andResponseError(then);
    });
    test('Editar um equipamento com descricao vazio', ({ given, when, then }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentisNotUpdated(then);
        andResponseError(then);
    });
    test('Editar um equipamento com patrimonio vazio', ({ given, when, then }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentisNotUpdated(then);
        andResponseError(then);
    });
    test('Editar um equipamento com patrimonio vazio', ({ given, when, then }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentisNotUpdated(then);
        andResponseError(then);
    });
});