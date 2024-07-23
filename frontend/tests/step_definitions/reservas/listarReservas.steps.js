const {defineFeature, loadFeature} = require('jest-cucumber');

const feature = loadFeature('frontend/tests/features/reservaEquipamento/listarReservas.feature');

defineFeature(feature, test => {
    test('Listar reservaEquipamento', ({given, when, then}) => {
        given('que eu estou na {string}', () => {
            // Write code here that turns the phrase above into concrete actions
        });
        given('eu tenho {int} {string}', () => {

        });
        when('eu seleciono {string}', () => {

        });
        then('eu vejo {int} reservaEquipamento listadas', () => {

        });
        then('eu vejo uma mensagem de {string}', () => {

        });
    });
});