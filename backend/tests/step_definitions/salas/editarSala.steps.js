const {loadFeature, defineFeature} = require('jest-cucumber');
const supertest = require ('supertest');
const app = require('../../../apptest');
const EquipamentosRepository = require('../../../api/repositories/equipamentos.repository');
const testSetup = require('./testSetup');


const feature = loadFeature('tests/features/equipamentos/controllers/editarEquipamento.feature');

defineFeature(feature, async (test) => {
    const server = app.listen(3001, () =>{
        console.log('Testando...');
    });
    
    let request, equipmentsID, response, equipamentosRepository;
    equipmentsID = [];
    let setup = new testSetup();
    request = supertest(server);
    request.headers = {username: 'joao', role: 'admin'};
    request.method = '/PATCH';
    
    beforeAll(async () => {
        equipamentosRepository = new EquipamentosRepository();
        await setup.getDatabaseCopy();
    }); 

    afterAll(async () => {
        await setup.restoreDatabase();
        server.close();
    });

//Steps to reuse
//Given steps
    const givenEquipmentExist = async (given) => {
        given(/^existe o equipamento:/, async (json) => {
            const equipamento = JSON.parse(json);
            const created = await equipamentosRepository.createEquipment(equipamento);
            equipmentsID.push(created.id);
        });
    }
//When steps
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisição "(.*)" e id "(.*)" do usuario "(.*)" logado como "(.*)" e json$/, async (req, id, user, role, json) => {
            data = JSON.parse(json);
            response = await request.patch(`/equipamentos/${id}`).send(data);
        });
    };
//Then steps
    const thenEquipmentIsUpdated = async (then) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" é modificado no banco de dados para$/, async (nome, campo, valor, json) => {
            const equipamento = await request.get(`/equipamentos/${campo}/${valor}`);
            expect(equipamento.status).toBe(200);
            response = await request.patch(`/equipamentos/${equipamento.body.id}`).send(data);
            expect(response.status).toBe(200);
        });
    };
    const thenEquipmentIsNotUpdated = async (then) => {
        then(/^o equipamento "(.*)" com "(.*)" "(.*)" não é modificado no banco de dados$/, async (nome, campo, valor) => {
            expect(response.status).toBe(400);
        });
    }
    //And steps
    const andResponseSucesso = (and) => {
        and(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (status, code) => {
            expect(response.status).toBe(parseInt(code));
        });
    };
    const andResponseError = (and) => {
        and(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (status, code) => {
            expect(response.status).toBe(parseInt(code));
        });
    }


    test('Editar estado de conservação de um equipamento', ({ given, when, then, and }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentIsUpdated(then);
        andResponseSucesso(and);
    });
    test('Editar o patrimonio de um equipamento', ({ given, when, then, and }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentIsNotUpdated(then);
        andResponseError(and);
    });
    test('Editar o numero de serie de um equipamento', ({ given, when, then, and }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentIsNotUpdated(then);
        andResponseError(and);
    });
});