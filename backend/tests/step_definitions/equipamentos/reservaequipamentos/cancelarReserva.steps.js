const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../../apptest');
const supertest = require('supertest');
const reservaRepository = require('../../../../api/repositories/reservaEquipamentos.repository');
const manutencaoRepository = require('../../../../api/repositories/reservaManutencao.repository');
const equipamentosRepository = require('../../../../api/repositories/equipamentos.repository');
const testSetup = require('../testSetup');

const feature = loadFeature('./tests/features/equipamentos/controllers/reservaequipamentos/cancelarReserva.feature');

defineFeature(feature, test => {

    let server = app.listen(3001);
    let reservaMockRepository, manutencaoMockRepository, response, request, equipmentrepo, setup;
    request = supertest(server);
    setup = new testSetup();
    equipmentrepo = new equipamentosRepository();

    beforeAll(async () => {
        reservaMockRepository = new reservaRepository();
        manutencaoMockRepository = new manutencaoRepository();
        await setup.getDatabaseCopy();
    });

    afterAll(async () => {
        server.close();
        await setup.restoreDatabase();
    });

    const givenEquipmentReservaExist = async (given) => {
        given(/^que a reserva de "(.*)" com id "(.*)" para o equipamento com id "(.*)" existe$/, async (type, idReserva, idEquipamento, json) => {
            const equipamento = JSON.parse(json);
            await equipmentrepo.createEquipment(equipamento);
        });
    }
    const whenRequestCancelReserva = async (when) => {
        when(/^eu recebo uma requisicao PATCH "(.*)" do usuario "(.*)" logado como "(.*)" e json$/, async (req, username, role, json) => {
            const status = JSON.parse(json);
            response = await request.patch(req).send(status);
        });
    }
    const thenReservaIsCanceled = async (then) => {
        then(/^a reserva de "(.*)" com id "(.*)" deve ser cancelada$/, async (type, idReserva) => {
            let reserva;
            if(type === 'equipamento'){
                reserva = await reservaMockRepository.getReservaByID(idReserva);
            } else {
                reserva = await manutencaoMockRepository.getReservaByID(idReserva);
            }
            expect(reserva.status).toBe("cancelada");
        });
    }
    const andResponseIsOk = async (and) => {
        and(/^eu envio o codigo de resposta "(.*)"$/, async (status) => {
            expect(response.status).toBe(parseInt(status));
        });
    }
    const andMessageIs = async (and) => {
        and(/^mensagem "(.*)"$/, async (message) => {
            expect(response.body.message).toBe(message);
        });
    }
    test('Cancelar reserva de equipamento', ({ given, when, then, and }) => {
        givenEquipmentReservaExist(given);
        whenRequestCancelReserva(when);
        thenReservaIsCanceled(then);
        andResponseIsOk(and);
        andMessageIs(and);
    });

    test('cancelar reserva de manutencao', ({ given, when, then, and }) => {
        givenEquipmentReservaExist(given);
        whenRequestCancelReserva(when);
        thenReservaIsCanceled(then);
        andResponseIsOk(and);
        andMessageIs(and);
    });
});