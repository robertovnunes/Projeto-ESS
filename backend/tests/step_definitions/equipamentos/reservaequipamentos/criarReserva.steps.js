const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../../apptest');
const supertest = require('supertest');
const testSetup = require('../testSetup');
const reservaRepository = require('../../../../api/repositories/reservaEquipamentos.repository');
const equipamentosRepository = require('../../../../api/repositories/equipamentos.repository');

const feature = loadFeature('./tests/features/reservaequipamentos/criarReserva.feature');

defineFeature(feature, test => {

        const server = app.listen(3001);
        let reservaMockRepository, response, request, reservasID = [];
        request = supertest(server);
        let setup = new testSetup();
        let equipmentrepo = new equipamentosRepository();
        beforeAll(async () => {
            reservaMockRepository = new reservaRepository();
            await setup.getDatabaseCopy();
        });

        afterAll(async () => {
            server.close();
            await setup.restoreDatabase();
        });

        const givenEquipmentExistExiste = async (given) => {
            given(/^que existe o equipamento com id "(.*)"$/, async (id, json) => {
                const equipamento = JSON.parse(json);
                await equipmentrepo.createEquipment(equipamento);
            });
        };

        const whenRequest = async (when) => {
            when(/^eu recebo uma requisicao POST "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, user, role, json) => {
                const reserva = JSON.parse(json);
                response = await request.post(req.toString()).send(reserva);
            });
        };

        const thenResponseCode = async (then) => {
            then(/^o codigo de resposta deve ser "(.*)"$/, async (code) => {
                expect(response.status).toBe(parseInt(code));
            });
        };

        const andResponseMessage = async (then) => {
            then(/^mensagem "(.*)"$/, async (message) => {
                expect(response.body.message).toBe(message);
            });
        }

        test('Criar reserva de equipamento', ({given, when, then}) => {
            givenEquipmentExistExiste(given);
            whenRequest(when);
            thenResponseCode(then);
            andResponseMessage(then);
        });
        test('Criar reserva de equipamento com estado de conservação não funcional', ({given, when, then}) => {
            givenEquipmentExistExiste(given);
            whenRequest(when);
            thenResponseCode(then);
            andResponseMessage(then);
        });
        test('Criar reserva de equipamento com status em manutenção', ({given, when, then}) => {
            givenEquipmentExistExiste(given);
            whenRequest(when);
            thenResponseCode(then);
            andResponseMessage(then);
        });
        test('Criar reserva de equipamento para data já com reserva confirmada', ({given, when, then}) => {
            givenEquipmentExistExiste(given);
            whenRequest(when);
            thenResponseCode(then);
            andResponseMessage(then);
        });
});