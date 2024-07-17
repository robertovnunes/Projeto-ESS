const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../../apptest');
const supertest = require('supertest');
const reservaRepository = require('../../../../api/repositories/reservaEquipamentos.repository');
const equipamentosRepository = require('../../../../api/repositories/equipamentos.repository');

const feature = loadFeature('./tests/features/reservaequipamentos/confirmarReserva.feature');

defineFeature(feature, test => {

    let response;
    let id;
    let equipamentoID;
    let reserva;
    let equipamento;
    let equipamentos;
    let reservas;
    let reservaID;
    let reservaCriada;

    beforeAll(() => {
        reserva = {
            dataInicio: '2022-12-12',
            dataFim: '2022-12-13',
            status: 'pendente'
        }
    });

    test('Confirmar reserva de equipamento', ({ given, when, then }) => {
        given(/^existe a reserva com id "(.*)" para o equipamento com id "(.*)" pendente$/, async (idReserva, idEquipamento) => {

        });

        when('eu recebo uma requisicao PATCH "(.*)" do usuario "(.*)" logado como "(.*)" e json:', async () => {

        });

        then('A reserva é confirmada', () => {

        });
}