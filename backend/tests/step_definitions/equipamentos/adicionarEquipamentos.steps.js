const {loadFeature, defineFeature} = require('jest-cucumber');
const supertest = require ('supertest');
const app = require('../../../apptest');
const modelSN = require('../../../api/models/equipamentoSNModel.js');
const modelPatrimonio = require('../../../api/models/equipamentoPatrimonioModel.js');
const EquipamentosRepository = require('../../../api/repositories/equipamentosRepository');

const feature = loadFeature('tests/features/equipamentos/adicionarEquipamento.feature');
defineFeature(feature, (test) => {
    
    const server = app.listen(3001, () =>{
        console.log('Testando...');
    });
    
    let request, equipmentsID, response, data, mockEquipamentosRepository;
    equipmentsID = [];
    request = supertest(server);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/POST';
    mockEquipamentosRepository = new EquipamentosRepository();
    

    afterAll(async () => {
        equipmentsID.forEach( async (id) => {
            await mockEquipamentosRepository.deleteEquipment(id);
        });
        server.close();
    });

//Steps to reuse
//Given steps
    const givenNotEquipmentExist = async (given) => {
        given(/^nao existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            const url = `/equipamentos/${campo}/${identificador}`;
            response = await request.get(url);
            expect(response.status).toBe(404);            
        });
    };
    const givenNotPatrimonioExist = async (given) => {
        given(/^nao existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            const url = `/equipamentos/${campo}/${identificador}`;
            const response = await request.get(url);
            expect(response.status).toBe(404);
        });
    };
    const givenRequest = (given) => {
        given(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, user, role, json) => {
            data = JSON.parse(json);
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
        when(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, user, role, json) => {
            data = JSON.parse(json);
            expect(request.method).toBe(req);
            expect(request.headers.username).toBe(user);
            expect(request.headers.role).toBe(role);
        });
    };
//Then steps
    const thenEquipmentIsOnDatabase = async (then) => {
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
    const thenResponseError = async (then) => {
        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)" e mensagem "(.*)"$/, async (type, code, message) => {
            const identificador = data.hasOwnProperty('patrimonio') ? 'patrimonio' : 'numero_serie';
            console.log(identificador);
            const response = await request.post(`/equipamentos/${identificador}`).send(data);
            expect(response.statusCode).toBe(parseInt(code));
            expect(response.body.message).toBe(message);
        });
    }
//And steps
    const andResponseSucesso = async (and) => {
        and(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (type, code) => {
            expect(type).toBe('sucesso');
            expect(code).toBe('201');
        });
    };

    //Scenarios tests
    test('Adicionando equipamento usando patrimonio com sucesso', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenEquipmentIsOnDatabase(and);
        andResponseSucesso(then);
    });
    test('Adicionando equipamento usando numero de serie com sucesso', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenEquipmentIsOnDatabase(then);
        andResponseSucesso(and);
    });
    test('Adicionando equipamento com nome vazio', ({given, when, then}) => {
        givenNotPatrimonioExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com patrimonio vazio', ({given, when, then, and}) => {
        givenRequest(given);
        thenResponseError(then);
    });
    test('Adicionando equipamento com numero de serie vazio', ({given, when, then, and}) => {
        givenRequest(given);
        thenResponseError(then);
    });
    test('Adicionando equipamento com patrimonio duplicado', ({given, when, then, and}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
        test('Adicionando equipamento com numero de serie duplicado', ({given, when, then, and}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com descricao vazia', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com estado de conservacao vazio', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com data de aquisicao vazia', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com valor estimado vazio', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com estado de conservação não funcional', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenEquipmentIsOnDatabase(then);
        andResponseSucesso(and); 
    });
});
