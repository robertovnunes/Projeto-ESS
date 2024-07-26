const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../../apptest');
const supertest = require('supertest');
const testsetup = require('../testSetup');

const equipamentosRepository = require('../../../../api/repositories/equipamentos.repository');
const reservamanutencaoRepository = require('../../../../api/repositories/reservaManutencao.repository');

const feature = loadFeature('./tests/features/equipamentos/controllers/reservaequipamentos/criarReservaManutencao.feature');

defineFeature(feature, test => {

    const server = app.listen(3001);
    const request = supertest(server);

    let mockReservaRepository, testSetup;
    let mockEquipamentosRepository = new equipamentosRepository();
    testSetup = new testsetup();

    beforeAll(async () => {
        mockReservaRepository = new reservamanutencaoRepository();
        await testSetup.getDatabaseCopy();
    });

    afterAll(async () => {
        server.close();
        await testSetup.restoreDatabase();
    });

    const givenEquipmentExist = async ( given ) => {
        given(/^que existe o equipamento com id "(.*)"$/, async (id, json) => {
            const data = JSON.parse(json);
            await mockEquipamentosRepository.createEquipment(data);
        });
    };
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisicao POST "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, username, role, json) => {
            const data = JSON.parse(json);
            response = await request.post(req).send(data);
        });
    };

    const thenResponse = async (then) => {
        then(/^o codigo de resposta deve ser "(.*)"$/, async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    };
    const andStatusIs = async (and) => {
        and(/^o status da reserva é "(.*)"/, async (status) => {
            const id = response.body.id;
            const reserva = await mockReservaRepository.getReservaByID(id);
            expect(reserva.status).toBe(status);
        });
    };

    test('Criar reserva de manutencao de equipamento disponivel', ({ given, when, then, and }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenResponse(then);
        andStatusIs(and);
    });
    test('Criar reserva de manutencao de equipamento reservado', ({ given, when, then, and }) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenResponse(then);
        andStatusIs(and);
    });
});