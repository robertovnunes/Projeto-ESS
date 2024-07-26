const {loadFeature, defineFeature} = require('jest-cucumber');
const supertest = require ('supertest');
const app = require('../../../apptest');
const SalasRepository = require('../../../api/repositories/salas.repository');
const testSetup = require('./testSetup');

const feature = loadFeature('tests/features/salas/adicionarSala.feature');
defineFeature(feature, (test) => {
    
    const server = app.listen(3001);

    let request, response, mockSalasRepository, mockData, setup;
    request = supertest(server);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/POST';
    setup = new testSetup();

    beforeAll(async () => {
        mockSalasRepository = new SalasRepository();
        await setup.getDatabaseCopy();
    });

    afterAll(async () => {
        await setup.restoreDatabase();
        server.close();
    });

//Steps to reuse
//Given steps
    const givenNotSalaExist = async (given) => {
        given(/^nao existe a sala "(.*)"$/, async (nome) => {
            let exist, _exist;
            const salas = await mockSalasRepository.getAllSalas();
            for(let sala of salas){
                if(sala.nome === nome){
                    exist = true;
                    _exist = sala;
                }
            }
            if(exist === true){
                await mockSalasRepository.deleteSala(_exist.id);
            }
        });
    };
    const givenSalaExist = async (given) => {
        given(/^existe a sala "(.*)"$/, async (nome, json) => {
            const data = JSON.parse(json);
            await mockSalasRepository.createSala(data);
        });
    };
//When steps
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisicao "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, user, role, json) => {
            mockData = JSON.parse(json);
            response = await request.post('/salas').send(mockData);
        });
    };
    //Then steps
    const thenSalaIsOnDatabase = async (then) => {
        then(/^a sala "(.*)" está no banco de dados$/, async (nome) => {
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
    test('Adicionando sala', ({given, when, then, and}) => {
        givenNotSalaExist(given);
        whenRequest(when);
        thenSalaIsOnDatabase(and);
        andResponseSucesso(then);
    });

    test('Adicionando sala sem numero', ({given, when, then}) => {
        givenNotSalaExist(given);
        whenRequest(when);
        thenResponseError(then);
    });

    test('Adicionando sala sem bloco', ({ given, when, then}) => {
        givenNotSalaExist(given);
        whenRequest(when);
        thenResponseError(then);
    });

    test('Adicionando sala sem capacidade', ({given, when, then}) => {
        givenNotSalaExist(given);
        whenRequest(when);
        thenResponseError(then);
    });

    test('Adicionando sala com numero e bloco já existentes', ({given, when, then}) => {
        givenSalaExist(given);
        whenRequest(when);
        thenResponseError(then);
    });

});
