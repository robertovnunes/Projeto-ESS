const { defineFeature, loadFeature } = require("jest-cucumber");

const feature = loadFeature('adicionarRecurso.feature');

defineFeature(feature, test => {
    test('Adicionar recurso a uma sala', ({Given, When, Then, pending}) => {
        Given("que estou na pagina de {string}", (nomePagina) => {
                pending();
            });
        Given("eu vejo {string} na lista de recursos da sala", () => {
                pending();
            });
        Given("eu não vejo {string} na lista de recursos da sala", () => {
            pending();
        });
        When("eu escolho {string}", () => {
                pending();
            });
        When("eu preencho o campo {string} com {string}", () => {
                pending();
            });
        When("eu escolho {string}", () => {
                pending();
            });
        Then("eu vejo a mensagem {string}", () => {
                pending();
            });
        Then("eu vejo o recurso {string} na lista de recursos da sala", () => {
                pending();
            });
        Then("eu vejo o recurso {string} na lista de recursos da sala apenas uma vez", () => {
                pending();
            });
    });
});
