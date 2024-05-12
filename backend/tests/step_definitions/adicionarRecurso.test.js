const { defineFeature, loadFeature } = require("jest-cucumber");
const {Then} = require("@cucumber/cucumber");

const feature = loadFeature('adicionarRecurso.feature');

defineFeature(feature, test => {
    test('Adicionar recurso a uma sala', ({Given, When, Then, pending}) => {
        Given("que estou na pagina de {string}", (nomePagina) => {
                pending();
            }
        )
        When("eu escolho {string}", () => {
                pending();
            }
        )
        When("eu preencho o campo {string} com {string}", () => {
                pending();
            }
        )
        When("eu escolho {string}", () => {
                pending();
            }
        )
        Then("eu vejo a mensagem {string}", () => {
                pending();
            }
        )
        Then("eu vejo o recurso {string} na lista de recursos da sala", () => {
                pending();
            }
        )

    });
});
