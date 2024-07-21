const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../../../apptest');
const supertest = require('supertest');
const reservaRepository = require('../../../../../api/repositories/reservaEquipamentos.repository');
const manutencaoRepository = require('../../../../../api/repositories/reservaManutencao.repository');
const equipamentosRepository = require('../../../../../api/repositories/equipamentos.repository');
const testSetup = require('../../testSetup');

const feature = loadFeature('./tests/features/equipamentos/controllers/reservaequipamentos/confirmarReserva.feature');

defineFeature(feature, test => {

    const server = app.listen(3001);
    let reservaMockRepository, response, request, manutencaoMockRepository;
    request = supertest(server);
    let equipmentrepo = new equipamentosRepository();
    let setup = new testSetup();

    beforeAll(async () => {
        reservaMockRepository = new reservaRepository();
        manutencaoMockRepository = new manutencaoRepository();
        await setup.getDatabaseCopy();
    });

    afterAll(async () => {
        server.close();
        await setup.restoreDatabase();
    });

    const givenReservaExistente = async (given) => {
        given(/^existe a reserva de "(.*)" com id "(.*)" para o equipamento com id "(.*)" pendente$/, async (type, idReserva, idEquipamento, json) => {
            const equipamento = JSON.parse(json);
            await equipmentrepo.createEquipment(equipamento);
        });
    };

    const whenConfirmarReserva = async (when) => {
        when(/^eu recebo uma requisicao PATCH "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, username, role, json) => {
            const data = JSON.parse(json);
            response = await request.patch(req).send(data);
        });
    };

    const thenReservaConfirmada = async (then) => {
        then(/^a reserva de "(.*)" com id "(.*)" deve ser confirmada$/, async(type, id) => {
            let reserva;
            if(type === 'equipamento'){
                reserva = await reservaMockRepository.getReservaByID(id);
            } else {
                reserva = await manutencaoMockRepository.getReservaByID(id);
            }
            expect(reserva.status).toEqual('confirmada');
        });
    };

    const andResponseIsOk = async (and) => {
        and(/^o codigo de resposta deve ser "(.*)"$/, (code) => {
            expect(response.status).toBe(parseInt(code));
        });
    };
    const andMessage = async (and) => {
        and(/^mensagem "(.*)"$/, (message) => {
            expect(response.body.message).toBe(message);
        });
    };

    test('Confirmar reserva de equipamento', ({ given, when, then , and}) => {
        givenReservaExistente(given);
        whenConfirmarReserva(when);
        thenReservaConfirmada(then);
        andResponseIsOk(and);
        andMessage(and);
    });
    test('confirmar reserva de manutencao', ({ given, when, then, and }) => {
        givenReservaExistente(given);
        whenConfirmarReserva(when);
        thenReservaConfirmada(then);
        andResponseIsOk(and);
        andMessage(and);
    });
});