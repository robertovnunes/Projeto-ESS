const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../apptest');
const supertest = require('supertest');
const reservaRepository = require('../../../api/repositories/reservaEquipamentos.repository');
const equipamentosRepository = require('../../../api/repositories/equipamentos.repository');

const feature = loadFeature('./tests/features/reservaequipamentos/criarReserva.feature');

defineFeature(feature, test => {

        const server = app.listen(3001);
        let reservaMockRepository, response, request, reservasID = [];
        request = supertest(server);

        beforeAll(() => {
            reservaMockRepository = new reservaRepository();

        });

        afterAll(() => {
            server.close();
        });

        const givenEquipmentExistExiste = async (given) => {
            given(/^que existe o equipamento com id "(.*)"$/, async (id, json) => {
                const equipamento = JSON.parse(json);
                const equipmentrepo = new equipamentosRepository();
                const exist = await equipmentrepo.getEquipmentById(id);
                if (exist !== undefined){
                    await equipmentrepo.createEquipment(equipamento);
                }
            });
        };

        const whenRequest = async (when) => {
            when(/^eu recebo uma requisicao POST "(.*)" do usuario "(.*)" logado como "(.*)" e json:$/, async (req, user, role, json) => {
                const reserva = JSON.parse(json);
                response = await request.post(req.toString()).send(reserva);
                if(response.status === 201){
                    reservasID.push(reserva.id);
                }
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
});