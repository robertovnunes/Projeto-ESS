const {loadFeature, defineFeature} = require('jest-cucumber');
const supertest = require ('supertest');
const app = require('../../../app.js');
const modelSN = require('../../../api/models/equipamentoSNModel.js');
const modelPatrimonio = require('../../../api/models/equipamentoPatrimonioModel.js');

const feature = loadFeature('tests/features/equipamentos/adicionarEquipamento.feature');
defineFeature(feature, (test) => {
    
    const server = app.listen(3001, () =>{
        console.log('Testes rodando na porta 3001');
    });
    
    let request, service, injector, equipmentsID, response;
    equipmentsID = [];
    request = supertest(app);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/POST';
    
    beforeEach(() => {
    });

    afterAll( async () => {
        jest.clearAllMocks();
        for (let i = 0; i < equipmentsID.length; i++){
            await request.delete(`/equipamentos/${equipmentsID[i]}`);
        }
        server.close();
    });

//Steps to reuse
//Given steps
    const givenNotEquipmentExist = async (given) => {
        given(/^nao existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            const url = `/equipamentos/${campo}/${identificador}`;
            let response;
            response = await request.get(url);
            if(response.status === 200){
                response = await request.delete(`/equipamentos/${response.body.id}`);
                expect(response.status).toBe(200);
            }
            else {
                expect(response.status).toBe(404);
                expect(response.body.message).toBe('Equipamento nao encontrado');
            }
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
            response = await request.get(`/equipamentos/${campo}/${identificador}`);
            if(response.status !== 200){
                if (campo === 'patrimonio'){
                    data = new modelPatrimonio('Monitor phillips', 'monitor full hd', 'Bom', '15/03/2023', 'R$ 1.200,00', patrimonio=identificador);
                } else {
                    data = new modelSN('Ar condicionado philco', 'Ar condicionado split de 12.000 btus', 'Bom', '15/03/2023', 'R$ 1.200,00', numero_serie=identificador);
                } 
                response = await request.post(`/equipamentos/${campo}`).send(data);
                response.status === 201 ? equipmentsID.push(response.body.id) : null;
            } else {
                expect(response.status).toBe(200);
            }
        });
    };
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
            response = await request.get(`/equipamentos/${campo}/${valor}`);
            if(response.status !== 200){
                response = await request.post(`/equipamentos/${campo}`).send(data);
                equipmentsID.push(response.body.id);

            } else {
                response = await request.delete(`/equipamentos/${response.body.id}`);
                expect(response.status).toBe(200);
                response = await request.post(`/equipamentos/${campo}`).send(data);
                equipmentsID.push(response.body.id);
                expect(response.status).toBe(201);
                expect(response.body['nome']).toBe(nome);
                expect(response.body[campo]).toBe(valor);
            }
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
        test('Adicionando equipamento com numero de serie duplicado', ({given, when, then, and}) => {
        const data = new modelSN('Projetor epson', 'projetor full hd', 'Bom', '15/03/2023', 'R$ 1.200,00', '1098643');
        givenEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'numero_serie');
    });
    test('Adicionando equipamento com descricao vazia', ({given, when, then, and}) => {
        const data = new modelPatrimonio('Monitor phillips', descricao='', 'Bom', '15/03/2023', 'R$ 1.200,00', '5583147');
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'patrimonio');
    });
    test('Adicionando equipamento com estado de conservacao vazio', ({given, when, then, and}) => {
        const data = new modelPatrimonio('Monitor phillips', 'Monitor de 19 polegadas', '', '15/03/2023', 'R$ 1.200,00', '5583147');
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'patrimonio');
    });
    test('Adicionando equipamento com data de aquisicao vazia', ({given, when, then, and}) => {
        const data = new modelPatrimonio('Monitor phillips', 'Monitor de 19 polegadas', 'Bom', '', 'R$ 1.200,00', '5583147');
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'patrimonio');
    });
    test('Adicionando equipamento com valor estimado vazio', ({given, when, then, and}) => {
        const data = new modelPatrimonio('Monitor phillips', 'Monitor de 19 polegadas', 'Bom', '15/03/2023', '', '5583147');
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenResponseError(then, data, 'patrimonio');
    });
    test('Adicionando equipamento com estado de conservação não funcional', ({given, when, then, and}) => {
        const data = new modelSN('Monitor phillips', 'Monitor de 19 polegadas', 'não funcional', '15/03/2023', 'R$ 1.200,00', '5583147');
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        andFieldMatch(and, data);
        thenEquipmentIsOnDatabase(then, data, 'numero_serie');
        andResponseSucesso(and);
    });
});
