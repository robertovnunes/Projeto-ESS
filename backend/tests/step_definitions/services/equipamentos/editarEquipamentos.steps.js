const {loadFeature, defineFeature} = require('jest-cucumber');
const supertest = require ('supertest');
const app = require('../../../../app.js');
const equipamentoService = require('../../../../src/api/services/equipamentosService');
const equipamentoInjector = require('../../../../src/di/equipamentoInjector');
const modelSN = require('../../../../api/models/equipamentoSNModel.js');
const modelPatrimonio = require('../../../../api/models/equipamentoPatrimonioModel.js');
const EquipamentosRepository = require('../../../../src/api/repositories/equipamentosRepository.js');

const feature = loadFeature('tests/features/equipamentos/adicionarEquipamento.feature');
defineFeature(feature, (test) => {
    let request, mockEquipamentos, service, injector;
    request = supertest(app);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/POST';

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
    });

//Steps to reuse
//Given steps
    const givenNotEquipmentExist = async (given) => {
        given(/^nao existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            const url = `/equipamentos/${campo}/${identificador}`;
            let response;
            response = await request.get(url);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Equipamento nao encontrado');
        });
    };
    const givenNotPatrimonioExist = async (given) => {
        given(/^nao existe o equipamento com "(.*)" "(.*)"$/, async (patrimonio) => {
            const url = `/equipamentos/patrimonio/${patrimonio}`;
            const response = await request.get(url);
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
            let response;
            let data;
            data = JSON.parse(json);
            response = await request.post('/equipamentos/patrimonio').send(data);
            console.log(response.body);
            expect(response.status).toBe(201);
        });
    }
//When steps
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (req, user, role) => {
            expect(request.method).toBe(req);
            expect(request.headers.username).toBe(user);
            expect(request.headers.role).toBe(role);
        });
    };
//Then steps
    const thenEquipmentIsOnDatabase = async (then, data) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" está no banco de dados$/, async (nome, campo, valor) => {
            //jest.spyOn(mockEquipamentos, 'addEquipamento').mockResolvedValue(data);
            const response = await request.post(`/equipamentos/${campo}`).send(data);
            expect(response.status).toBe(201);
            expect(response.body['nome']).toBe(nome);
            expect(response.body[campo]).toBe(valor);
        });
    };
    const thenResponseError = async (then, data, identificador) => {
        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)" e mensagem "(.*)"$/, async (type, code, message) => {
            const response = await request.post(`/equipamentos/${identificador}`).send(data);
            expect(type).toBe('erro');
            expect(response.statusCode).toBe(parseInt(code));
            expect(response.body.message).toBe(message);
        });
    }
//And steps
    const andFieldMatch = async (and, data) => {
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
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseSucesso(then);
    });

    test('Editar equipamento com dados inválidos', ({ given, when, then }) => {
        given('que eu tenha um equipamento cadastrado', () => {
            // TODO
        });

        when('eu editar o equipamento com dados inválidos', () => {
            // TODO
        });

        then('o equipamento não é editado', () => {
            // TODO
        });
    });
});