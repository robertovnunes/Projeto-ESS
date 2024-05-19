const { defineFeature, loadFeature } = require('jest-cucumber');


const feature = loadFeature('./tests/adicionarRecurso.feature');


defineFeature(feature, test => {
    test('Adicionar recurso a uma sala', ({given, when, then, pending}) => {
        given("que estou na pagina de {string} da sala {string}", (nomePagina) => {
                pending();
            });
        given("eu vejo {string} na lista de recursos da sala", () => {
                pending();
            });
        given("eu não vejo {string} na lista de recursos da sala", () => {
            pending();
        });
        when("eu escolho {string}", () => {
                pending();
            });
        when("eu preencho o campo {string} com {string}", () => {
                pending();
            });
        when("eu escolho {string}", () => {
                pending();
            });
        then("eu vejo a mensagem {string}", () => {
                pending();
            });
        then("eu vejo o recurso {string} na lista de recursos da sala", () => {
                pending();
            });
        then("eu vejo o recurso {string} na lista de recursos da sala apenas uma vez", () => {
                pending();
            });
    });
});
