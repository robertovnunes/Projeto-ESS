const {loadFeature, defineFeature} = require('jest-cucumber');
const supertest = require ('supertest');
const app = require('../../../../src/app.js');
const equipamentoService = require('../../../../src/api/services/equipamentosService');
const equipamentoController = require('../../../../src/api/controllers/equipamentosController');
const EquipamentoRepository = require('../../../../src/api/repositories/equipamentosRepository');
const modelSN = require('../../../../src/api/models/equipamentoSNModel');
const modelPatrimonio = require('../../../../src/api/models/equipamentoPatrimonioModel');

const feature = loadFeature('tests/features/equipamentos/adicionarEquipamento.feature');
defineFeature(feature, (test) => {
    const request = supertest(app);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/POST';
    let mockEquipamentos;
    let service;

    beforeEach(() => {
        const mockEquipamentosData = {
            getEquipamentos: jest.fn(),
            getEquipamentoById: jest.fn(),
            getEquipamentoByPatrimonio: jest.fn(),
            getEquipamentoBySN: jest.fn(),
            addEquipamento: jest.fn(),
            updateEquipment: jest.fn(),
            deleteEquipment: jest.fn()
        };
        mockEquipamentos = mockEquipamentosData;
        service = new equipamentoService(mockEquipamentos);
    });

    afterEach(() => {
        jest.clearAllMocks();

    });

    const sendSucessfullPostRequest = async (identificador) => {
        if (identificador === 'patrimonio') {
            await request.post('/equipamentos').send({
                nome: 'Ar condicionado midea',
                descricao: 'Ar condicionado split de 12.000 btus',
                estado_conservacao: 'Bom',
                data_aquisicao: '15/03/2023',
                valor_estimado: 'R$ 1.200,00',
                identificador: {
                    type: 'patrimonio',
                    value: '1098642'
                }
            });
        } else if (identificador === 'numero de serie') {
            await request.post('/equipamentos').send({
                nome: 'Ar condicionado philco',
                descricao: 'Ar condicionado split de 12.000 btus',
                estado_conservacao: 'Bom',
                data_aquisicao: '15/03/2023',
                valor_estimado: 'R$ 1.200,00',
                identificador: {
                    type: 'numero_serie',
                    value: '1098642'
                }
            });
        }
    };

//Steps to reuse
//Given steps
    const givenNotEquipmentExist = (given) => {
        given(/^nao existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            const url = `/equipamentos/${campo}/${identificador}`;
            const response = await request.get(url);
            expect(response.status).toBe(404);
            console.log(response.body.message);
            expect(response.body.message).toBe('Equipamento nao encontrado');
        });
    };

    const givenEquipmentExist = (given) => {
        given(/^existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            const response = await request.get(`/equipamentos/${campo}/${identificador}`);
            expect(response.status).toBe(200);
            expect(response.body[campo]).toBe(identificador);
        });
    };
    const givenRequest = (given) => {
        given(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (req, username, userRole) => {
            const response = sendSucessfullPostRequest();
            const responseMethod = response.req.method;
            expect(responseMethod).toBe(req);
            expect(request.headers.username).toBe(username);
            expect(request.headers.role).toBe(userRole);
            //testar se usuario está no banco e se é admin
        });
    };
//When steps
    const whenRequest = (when, identificador) => {
        when(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (req, user, role) => {
            const response = sendSucessfullPostRequest(identificador);
            expect(request.method).toBe(req);
            expect(request.headers.username).toBe(user);
            expect(request.headers.role).toBe(role);
        });
    };
    const whenverifyEquipment = (when, campo, valor) => {
        when(/^os dados sao verificados como "(.*)" "(.*)"$/, (nome, valor) => {
            expect(nome).toBe(valor);
        });
    };
//Then steps

    const thenSNIsOnDatabase = (then) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" está no banco de dados$/, async (nome, campo, snumber) => {
            const response = await request.get(`/equipamentos/${campo}/${snumber}`);
            expect(response.status).toBe(200);
            expect(response.body['nome']).toBe(nome);
            expect(response.body[campo]).toBe(snumber);

        });
    };
    const thenResponseError = (then) => {
        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/), async (type, code) => {
            expect(type).toBe('error');
            expect(code).toBe('404');
        }
    };
    const andMessageError = (and, message) => {
        and(/^mensagem "(.*)"$/, async (mensagem) => {
            expect(mensagem).toBe(message);
        });
    };
//And steps
    const andFieldMatch = (and, identificador) => {
        and(/^"(.*)" com "(.*)"$/, async (campo, valor) => {
            
        });
    };
    const andFieldEmpty = (and, field) => {
        and(/^"(.*)" com "(.*)"$/, async (campo, valor) => {
            expect(campo).toBe(field);
            expect(valor).toBe(' ');
        });
    };
    const andReqIsBatch = (and) => {
        and(/^a requisicao possui uma "(.*)"$/, async (campo) => {
            expect(campo).toBe('insercao em lote');
        });
    };
    const andReqIsNotBatch = (and) => {
        and(/^a requisicao possui uma "(.*)"$/, async (campo) => {
            expect(campo).toBe('insercao unica');
        });
    };
    const andVerifySerialNumbers = (and) => {
        and(/^os numeros de serie "(\d+)"$/, async (numeros) => {

        })
    };
    const thenEquipmentIsOnDatabase = (then, equipamentos) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" está no banco de dados$/, async (nome, campo, valor) => {
            expect(equipamentos).toContainEqual(equipamento);
        });
    };
    const thenResponseSucesso = async (and) => {
        and(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (type, code) => {
            expect(type).toBe('sucesso');
            expect(code).toBe('201');
        });
        
    };
       const andResponsesucesso = async (and) => {
        and(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (type, code) => {
            expect(type).toBe('sucesso');
            expect(code).toBe('201');
        });
        
    };
    const andPatrimonioIsOnDatabase = (and) => {
        and(/^o equipamento "(.*)" com "(.*)" "(.*)" está no banco de dados$/, async (nome, campo, patrimonio) => {
            const response = await request.get(`/equipamentos/${campo}/${patrimonio}`);
            expect(response.status).toBe(200);
            expect(response.body['nome']).toBe(nome);
            expect(response.body[campo]).toBe(patrimonio);
        });
    };
    //Scenarios tests
    test('Adicionando equipamento usando patrimonio com sucesso', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when, 'patrimonio');
        andFieldMatch(and, '');
        andFieldMatch(and, 'descricao', 'Ar condicionado split de 12.000 btus');
        andFieldMatch(and, 'estado de conservacao', 'Bom');
        andFieldMatch(and, 'data de aquisicao', '15/03/2023');
        andFieldMatch(and, 'valor estimado', 'R$ 1.200,00');
        andFieldMatch(and, 'patrimonio', '1098642');
        thenResponseSucesso(and);
        andPatrimonioIsOnDatabase(then);
    });
    test('Adicionando equipamento usando numero de serie com sucesso', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when, 'numero de serie');
        andFieldMatch(and, 'nome', 'Ar condicionado midea');
        andFieldMatch(and, 'descricao', 'Ar condicionado de 12.000 btus');
        andFieldMatch(and, 'estado de conservacao', 'Bom');
        andFieldMatch(and, 'data de aquisicao', '15/03/2023');
        andFieldMatch(and, 'valor estimado', 'R$ 1.200,00');
        andFieldMatch(and, 'numero de serie', '1098642');
        thenSNIsOnDatabase(then);
        andResponsesucesso(and);
    });
        /*
    test('Adicionando equipamento duplicado', ({given, when, then, and}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Equipamento já cadastrado');
    });
    test('Adicionando equipamento com nome vazio', ({given, when, then, and}) => {
        givenRequest(given)
        andFieldEmpty(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Nome nao pode ser vazio');
    });
    test('Adicionando equipamento com patrimonio vazio', ({given, when, then, and}) => {
        givenRequest(given);
        andFieldMatch(and);
        andFieldEmpty(and); //test to check if the field is empty
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Patrimonio nao pode ser vazio');
    });
    test('Adicionando equipamento com patrimonio duplicado', ({given, when, then, and}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Patrimonio já cadastrado');
    });
    test('Adicionando equipamento com descricao vazia', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and);
        andFieldEmpty(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Descricao nao pode ser vazia');
    });
    test('Adicionando equipamento com estado de conservacao vazio', ({given, when, then, and}) => {
        givenRequest(given);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldEmpty(and); //test to check if the field is empty
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Estado de conservacao nao pode ser vazio');
    });
    test('Adicionando equipamento com data de aquisicao vazia', ({given, when, then, and}) => {
        givenRequest(given);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldEmpty(and); //test to check if the field is empty
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Data de aquisicao nao pode ser vazia');
    });
    test('Adicionando equipamento com valor estimado vazio', ({given, when, then, and}) => {
        givenRequest(given);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldEmpty(and); //test to check if the field is empty
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Valor estimado nao pode ser vazio');
    });
    test('Adicionando equipamento com estado de conservacao nao funcional', ({given, when, then, and}) => {
        givenRequest(given);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and); //test to check if the field is empty
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
        andMessageError(and, 'Estado de conservacao inválido');

    });
*/
});