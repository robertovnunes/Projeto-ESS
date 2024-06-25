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
        given(/^existe o equipamento com "(.*)" "(.*)"$/, async (campo, identificador) => {
            let response;
            let data;
            if(campo === 'patrimonio'){
                data = new modelPatrimonio('Monitor phillips', 'monitor full hd', 'Bom', '15/03/2023', 'R$ 1.200,00', patrimonio=identificador);
            } else if (campo === 'numero_serie'){
                data = new modelSN('Ar condicionado philco', 'Ar condicionado split de 12.000 btus', 'Bom', '15/03/2023', 'R$ 1.200,00', numero_serie=identificador);
            }
            response = await request.post(`/equipamentos/${campo}`).send(data);
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
        and(/^"(.*)" com "(.*)"$/, async (campo, valor) => {
            expect(data[campo]).toBe(valor);
        });
    };
    const andResponseSucesso = async (and) => {
        and(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (type, code) => {
            expect(type).toBe('sucesso');
            expect(code).toBe('201');
        });
    };

    //Scenarios tests
    test('Adicionando equipamento usando patrimonio com sucesso', ({given, when, then, and}) => {
        const data = new modelPatrimonio('Ar condicionado midea', 'Ar condicionado split de 12.000 btus', 'Bom', '15/03/2023', 'R$ 1.200,00', '1098642');
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenEquipmentIsOnDatabase(and, data);
        andResponseSucesso(then);
    });
    test('Adicionando equipamento usando numero de serie com sucesso', ({given, when, then, and}) => {
        const data = new modelSN('Ar condicionado philco', 'Ar condicionado split de 12.000 btus', 'Bom', '15/03/2023', 'R$ 1.200,00', '1098643');
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenEquipmentIsOnDatabase(then, data);
        andResponseSucesso(and);
    });
    test('Adicionando equipamento com nome vazio', ({given, when, then, and}) => {
        const data = new modelPatrimonio(nome='', 'Ar condicionado split de 12.000 btus', 'Bom', '15/03/2023', 'R$ 1.200,00', '1098642');
        givenNotPatrimonioExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'patrimonio');
    });
    test('Adicionando equipamento com patrimonio vazio', ({given, when, then, and}) => {
        const data = new modelPatrimonio('Ar condicionado midea', 'Ar condicionado de 12.000 btus', 'Bom', '15/03/2023', 'R$ 1.200,00', patrimonio='');
        givenRequest(given);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'patrimonio');
    });
    test('Adicionando equipamento com numero de serie vazio', ({given, when, then, and}) => {
        const data = new modelSN('Ar condicionado philco', 'Ar condicionado de 12.000 btus', 'Bom', '15/03/2023', 'R$ 1.200,00', '');
        givenRequest(given);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'numero_serie');
    });
    test('Adicionando equipamento com patrimonio duplicado', ({given, when, then, and}) => {
        const data = new modelPatrimonio('Projetor epson', 'projetor full hd', 'Bom', '15/03/2023', 'R$ 1.200,00', '1098643');
        givenEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'patrimonio');
    });
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