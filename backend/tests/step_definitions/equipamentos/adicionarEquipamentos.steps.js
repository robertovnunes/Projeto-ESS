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
    
    let request, response, mockEquipamentosRepository, mockData;
    request = supertest(server);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/POST';
    let equipmentsID = [];

    beforeAll(async () => {
        mockEquipamentosRepository = new EquipamentosRepository();
    });

    afterAll(async () => {
        for(let id of equipmentsID){
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
            if(exist !== null){
                await mockEquipamentosRepository.deleteEquipment(exist.id);
            }
        });
    };
    const givenEquipmentExist = async (given) => {
        given(/^existe o equipamento com "(.*)" "(.*)"$/, async (campo, identificador) => {
            let exist;
            if(campo === 'patrimonio'){
                exist = await mockEquipamentosRepository.getEquipmentByPatrimonio(identificador);
            } else{
                exist = await mockEquipamentosRepository.getEquipmentBySerie(identificador);
            }
            if(exist !== null){
                await mockEquipamentosRepository.deleteEquipment(exist.id);
            } else {
                let data;
                if(campo === 'patrimonio'){
                    data = new modelPatrimonio('Projetor epson', 'Projetor laser ultra curta distancia', 'novo', '10/04/2024', 'R$ 4.500,00', identificador);
                    await mockEquipamentosRepository.createEquipmentPatrimonio(data);
                } else if (campo === 'numero_serie'){
                    data = new modelSN('FPGA', 'placa de prototipação de circuitos', 'novo', '10/04/2024', 'R$ 2.000,00', identificador);
                    await mockEquipamentosRepository.createEquipmentSN(data);
                }
                equipmentsID.push(data.id);
            }
        });
    };
//When steps
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, user, role, json) => {
            mockData = JSON.parse(json);
            expect(request.method).toBe(req);
            expect(request.headers.username).toBe(user);
            expect(request.headers.role).toBe(role);
        });
    };
//Then steps
    const thenEquipmentIsOnDatabase = async (then) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" está no banco de dados$/, async (nome, campo, valor) => {
            //jest.spyOn(mockEquipamentos, 'addEquipamento').mockResolvedValue(data);
            response = await request.post(`/equipamentos/${campo}`).send(mockData);
            expect(response.status).toBe(201);
            equipmentsID.push(response.body.id);
        });
    };
    const thenResponseError = async (then) => {
        then(/^eu envio uma resposta de erro com codigo "(.*)" e mensagem "(.*)"$/, async (code, message) => {
            if(mockData.hasOwnProperty('patrimonio')){
                response = await request.post('/equipamentos/patrimonio').send(mockData);
            } else if(mockData.hasOwnProperty('numero_serie')) {
                response = await request.post('/equipamentos/numero_serie').send(mockData);
            }
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
