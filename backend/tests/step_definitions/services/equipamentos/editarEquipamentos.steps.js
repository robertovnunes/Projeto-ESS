const jc = require('jest-cucumber');
const fs = require("fs");
const loadFeature = jc.loadFeature;
const defineFeature = jc.defineFeature;
const steps = require('./steps');

const feature = loadFeature('backend/tests/features/equipamentos/editarEquipamentos.feature');

let equipamentos = [];
fs.readFile('./tests/mocks/equipamentos.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        equipamentos = JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
});

defineFeature(feature, test => {
    test('Editar estado de conservação de um equipamento', ({ given, when, then }) => {
        steps.givenEquipmentExist(given);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        when('eu editar o equipamento', () => {
            // TODO
        });

        then('o equipamento é editado com sucesso', () => {
            // TODO
        });
    });

    test('Editar equipamento com dados inválidos', ({ given, when, then }) => {
        given('que eu tenha um equipamento cadastrado', () => {
            // TODO
        });

        when('eu editar o equipamento com dados inválidos', () => {
            // TODO
        });

        then('o equipamento não é editado', () => {
            // TODO
        });
    });
});
