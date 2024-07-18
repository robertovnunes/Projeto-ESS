const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../../apptest');
const supertest = require('supertest');
const reservaRepository = require('../../../../api/repositories/reservaEquipamentos.repository');
const equipamentosRepository = require('../../../../api/repositories/equipamentos.repository');
const testSetup = require('../testSetup');

const feature = loadFeature('./tests/features/reservaequipamentos/negarReserva.feature');

defineFeature(feature, test => {

    const server = app.listen(3001);
    let reservaMockRepository, response, request;
    request = supertest(server);
    let equipmentrepo = new equipamentosRepository();
    let setup = new testSetup();

    beforeAll(async () => {
        reservaMockRepository = new reservaRepository();
        await setup.getDatabaseCopy();
    });

    afterAll(async () => {
        server.close();
        await setup.restoreDatabase();
    });

    test('negar reserva de equipamento', ({ given, when, then , and}) => {
        given(/^existe a reserva com id "(.*)" para o equipamento com id "(.*)" pendente$/, async (idReserva, idEquipamento, json) => {
            const equipamento = JSON.parse(json);
            await equipmentrepo.createEquipment(equipamento);
        });
        when(/^eu recebo uma requisicao PATCH "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, username, role, json) => {
            const data = JSON.parse(json);
            response = await request.patch(req).send(data);
        });
        then(/^a reserva com id "(.*)" é negada no banco de dados para$/, async(id, json) => {
            const data = JSON.parse(json);
            const reserva = await reservaMockRepository.getReservaByID(id);
            expect(reserva).toEqual(data);
        });
        and(/^o codigo de resposta deve ser "(.*)"$/, (code) => {
            expect(response.status).toBe(parseInt(code));
        });
        and(/^mensagem "(.*)"$/, (message) => {
            expect(response.body.message).toBe(message);
        });
    });
});