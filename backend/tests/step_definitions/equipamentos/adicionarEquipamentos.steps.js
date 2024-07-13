const {loadFeature, defineFeature} = require('jest-cucumber');
const supertest = require ('supertest');
const app = require('../../../apptest');
const EquipamentosRepository = require('../../../api/repositories/equipamentosRepository');

const feature = loadFeature('tests/features/equipamentos/adicionarEquipamento.feature');
defineFeature(feature, (test) => {
    
    const server = app.listen(3001, () =>{
        console.log('Testando...');
    });

    let request, response, mockEquipamentosRepository, mockData, equipamentosID = [];
    request = supertest(server);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/POST';

    beforeAll(async () => {
        mockEquipamentosRepository = new EquipamentosRepository();
    });

    afterAll(async () => {
        for(let id of equipamentosID){
            await mockEquipamentosRepository.deleteEquipment(id);
        }
        server.close();
    });

//Steps to reuse
//Given steps
    const givenNotEquipmentExist = async (given) => {
        given(/^nao existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            let exist;
            if(campo === 'patrimonio'){
                exist = await mockEquipamentosRepository.getEquipmentByPatrimonio(identificador);
            } else {
                exist = await mockEquipamentosRepository.getEquipmentBySerie(identificador);
            }
            if(exist !== undefined){
                await mockEquipamentosRepository.deleteEquipment(exist.id);
            }
        });
    };
    const givenEquipmentExist = async (given) => {
        given(/^existe o equipamento com "(.*)" "(.*)"$/, async (campo, identificador) => {
            const id = identificador+Math.floor(Math.random()*1000);
            const equipamento = {'id':id, 'nome':'Arduino', 'descricao':'Placa de prototipação', 'estado_conservacao':'novo', 'data_aquisicao':'10/04/2024', 'valor_estimado':'R$ 200,00', [campo]:identificador, 'reservas':[], 'manutencao':[]};
            await mockEquipamentosRepository.createEquipment(equipamento);
            equipamentosID.push(id);
        });
    };
//When steps
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, user, role, json) => {
            mockData = JSON.parse(json);
            if(mockData.hasOwnProperty('patrimonio')){
                response = await request.post('/equipamentos/patrimonio').send(mockData);
            } else if(mockData.hasOwnProperty('numero_serie')) {
                response = await request.post('/equipamentos/numero_serie').send(mockData);
            }
        });
    };
    //Then steps
    const thenEquipmentIsOnDatabase = async (then) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" está no banco de dados$/, async (nome, campo, valor) => {
            equipamentosID.push(response.body.id);
            expect(response.status).toBe(201);
        });
    };
    const thenResponseError = async (then) => {
        then(/^eu envio uma resposta de erro com codigo "(.*)" e mensagem "(.*)"$/, async (code, message) => {
            expect(response.status).toBe(parseInt(code));
            expect(response.body.message).toBe(message);
        });
    }
//And steps
    const andResponseSucesso = async (and) => {
        and(/^eu envio uma resposta de sucesso com codigo "(.*)"$/, async (code) => {
            expect(response.status).toBe(parseInt(code));
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
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com patrimonio vazio', ({ when, then}) => {
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com numero de serie vazio', ({when, then}) => {
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com patrimonio duplicado', ({given, when, then}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
        test('Adicionando equipamento com numero de serie duplicado', ({given, when, then}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com descricao vazia', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com estado de conservacao vazio', ({given, when, then}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com data de aquisicao vazia', ({given, when, then}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        thenResponseError(then);
    });
    test('Adicionando equipamento com valor estimado vazio', ({given, when, then}) => {
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
