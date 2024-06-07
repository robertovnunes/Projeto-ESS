const jc = require('jest-cucumber');
const loadFeature = jc.loadFeature;
const defineFeature = jc.defineFeature;
const fs = require('fs');
const request = require('supertest');
const app = require('../../../../app');
const steps = require('./steps');

const feature = loadFeature('tests/features/equipamentos/adicionarEquipamento.feature');
let equipamentos = [];

defineFeature(feature, (test) => {
    //Scenarios tests
    test('Adicionando equipamento usando patrimonio com sucesso', ({given, when, then, and}) => {
        steps.givenNotEquipmentExist(given);
        steps.whenRequest(when);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenPatrimonioIsOnDatabase(then);
    });
    test('Adicionando equipamento usando numero de serie com sucesso', ({given, when, then, and}) => {
        steps.givenNotEquipmentExist(given);
        steps.whenRequest(when);
        steps.andReqIsNotBatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenPatrimonioIsOnDatabase(then);
    });
    test('Adicionando equipamento duplicado', ({given, when, then, and}) => {
        steps.givenEquipmentExist(given);
        steps.whenRequest(when);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenResponseError(then);
        steps.andMessageError(and, 'Equipamento já cadastrado');
    });
    test('Adicionando equipamento com nome vazio', ({given, when, then, and}) => {
        steps.givenRequest(given)
        steps.andFieldEmpty(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenResponseError(then);
        steps.andMessageError(and, 'Nome não pode ser vazio');
    });
    test('Adicionando equipamento com patrimonio vazio', ({given, when, then, and}) => {
        steps.givenRequest(given);
        steps.andFieldMatch(and);
        steps.andFieldEmpty(and); //test to check if the field is empty
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenResponseError(then);
        steps.andMessageError(and, 'Patrimonio não pode ser vazio');
    });
    test('Adicionando equipamento com patrimonio duplicado', ({given, when, then, and}) => {
        
    });
    test('Adicionando equipamento com descrição vazia', ({given, when, then, and}) => {
        and(/^descricao (.*)/, async (valor) => {
            expect(valor).toBe('');
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Descrição não pode ser vazia');
        });
    });
    test('Adicionando equipamento com estado de conservação vazio', ({given, when, then, and}) => {
        steps.givenRequest(given);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldEmpty(and); //test to check if the field is empty
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenResponseError(then);
        steps.andMessageError(and, 'Estado de conservação não pode ser vazio');
    });
    test('Adicionando equipamento com data de aquisição vazia', ({given, when, then, and}) => {
        steps.givenRequest(given);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldEmpty(and); //test to check if the field is empty
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenResponseError(then);
        steps.andMessageError(and, 'Data de aquisição não pode ser vazia');
    });
    test('Adicionando equipamento com valor estimado vazio', ({given, when, then, and}) => {
        steps.givenRequest(given);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldEmpty(and); //test to check if the field is empty
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenResponseError(then);
        steps.andMessageError(and, 'Valor estimado não pode ser vazio');
    });
    test('Adicionando equipamento com estado de conservação não funcional', ({given, when, then, and}) => {
        steps.givenRequest(given);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and); //test to check if the field is empty
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.thenResponseError(then);
        steps.andMessageError(and, 'Estado de conservação inválido');

    });
    test('Adicionando equipamentos em lote por numero de serie', ({ given, and, when, then }) => {
        steps.givenRequest(given);
        steps.andReqIsBatch(and);
        steps.whenverifyEquipment(when);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andVerifySerialNumbers(and);
        steps.thenSerialNumbersAreOnDatabase(then);
    });
});