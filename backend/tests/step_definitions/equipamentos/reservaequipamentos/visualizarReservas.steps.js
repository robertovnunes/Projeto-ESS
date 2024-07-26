const {defineFeature, loadFeature} = require('jest-cucumber');
const app = require('../../../../apptest');
const supertest = require('supertest');
const reservaRepository = require('../../../../api/repositories/reservaEquipamentos.repository');
const testSetup = require('../testSetup');
const equipamentosRepository = require('../../../../api/repositories/equipamentos.repository');

const feature = loadFeature('./tests/features/equipamentos/controllers/reservaequipamentos/visualizarReservas.feature');

defineFeature(feature, test => {

    const server = app.listen(3001);
    let reservaMockRepository, response, request;
    request = supertest(server);
    let setup = new testSetup();
    let equipmentrepo = new equipamentosRepository();

    beforeAll(async() => {
        reservaMockRepository = new reservaRepository();
        await setup.getDatabaseCopy();
    });

    afterAll(async () => {
        server.close();
        await setup.restoreDatabase();
    });

    const givenExistemReservas = async (given) => {
        given(/^que existem os seguintes equipamentos com reservas:$/, async (json) => {
            const equipamentos = JSON.parse(json);
            for (let equipamento of equipamentos){
                await equipmentrepo.createEquipment(equipamento);
            }
        });
    };
    const givenReservaExiste = async (given) => {
        given(/^que a reserva de equipamento com id "(.*)" existe$/, async (id, json) => {
            const reserva = JSON.parse(json);
            const exist = await reservaMockRepository.getReservaByID(id);
            if (exist === undefined){
                await reservaMockRepository.createReserva(reserva);
            }
        });
    };
    const givenExistemReservasEquipamento = async (given) => {
        given(/^que o equipamento com id "(.*)" possui as seguintes reservas:$/, async (id, json) => {
            const data = JSON.parse(json);
            for(let reserva of data){
                const exist = await reservaMockRepository.getReservaByID(reserva['id']);
                if (exist === undefined){
                    await reservaMockRepository.createReserva(data);
                }
            }
        });
    };
        const givenReservaNaoExiste = async (given) => {
        given(/^que a reserva de equipamento com id "(.*)" nao existe$/, async (id) => {
            const exist = await reservaMockRepository.getReservaByID(id);
            if (exist !== undefined){
                await reservaMockRepository.deleteReserva(id);
            }
        });
    };
    const givenNotExistEquipment = async (given) => {
        given(/^que nao existe o equipamento com id "(.*)"$/, async (equipamentoID) => {
            const reservas = reservaMockRepository.getReservasByEquipamentoID(equipamentoID);
            if (reservas !== undefined){
                await reservaMockRepository.equipmentrepo.deleteEquipment(equipamentoID);
            }

        });
    }
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisicao GET "(.*)" do usuario "(.*)" logado como "(.*)"$/, async  (req) => {
            response = await request.get(req.toString());
        });
    }

    const thenReturnEquipments = async (then) => {
        then(/^eu retorno uma lista com as reservas de equipamentos e codigo "(.*)"$/, async (code, docString) => {
            const equipmentExpected = JSON.parse(docString);
            expect(response.statusCode).toBe(parseInt(code));
            expect(response.body).toEqual(equipmentExpected);
        });
    };
    const thenReturnEquipment = async (then) => {
        then(/^eu retorno a reserva de equipamento e codigo "(.*)"$/, async (code, docString) => {
            const equipmentExpected = JSON.parse(docString);
            expect(response.statusCode).toBe(parseInt(code));
            expect(response.body).toEqual(equipmentExpected);
        });
    };
    const thenReturnError = async (then) => {
        then(/^eu retorno uma mensagem "(.*)" e codigo "(.*)"$/, async (message, code) => {
            expect(response.statusCode).toBe(parseInt(code));
            expect(response.body.message).toBe(message);
        });
    };

    test('Visualizar reservas de equipamentos', ({given, when, then}) => {
        givenExistemReservas(given);
        whenRequest(when);
        thenReturnEquipments(then);
    });
    test('Visualizar reserva por id', ({ given, when, then }) => {
        givenReservaExiste(given);
        whenRequest(when);
        thenReturnEquipment(then);
    });
    test('Visualizar reserva por id inexistente', ({ given, when, then }) => {
        givenReservaNaoExiste(given);
        whenRequest(when);
        thenReturnError(then);
    });
    test('Visualizar reservas de um equipamento', ({ given, when, then }) => {
        givenExistemReservasEquipamento(given);
        whenRequest(when);
        thenReturnEquipments(then);
    });
    test('Visualizar reservas de um equipamento inexistente', ({ given, when, then }) => {
        givenNotExistEquipment(given);
        whenRequest(when);
        thenReturnError(then);
    });
});
