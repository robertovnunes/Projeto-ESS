const {loadFeature, defineFeature} = require('jest-cucumber');
const jest = require('jest');
const fs = require('fs');
const {Given} = require("cucumber");

const feature = loadFeature('./tests/features/equipamentos/adicionarEquipamento.feature');
let equipamentos = []

function equipmentExists(equipamentos, nome, campo, identificador) {
    let found = false;
    equipamentos.forEach(equipamento => {
        switch (equipamento){
            case campo === 'serial' && equipamento.hasOwnProperty('serial') && equipamento.serial === identificador:
                found = true;
                break;
            case campo === 'patrimonio' && equipamento.hasOwnProperty('patrimonio') && equipamento.patrimonio === identificador:
                found = true;
                break;
            default: found = false;
        }
    });
    return found;
}

defineFeature(feature, (test) => {
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
    const givenEquipmentExist = (given) => {
        given(/^não existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            expect(equipmentExists(equipamentos, nome, campo, identificador)).not.toBe(true);
        });
    };
    const whenRequest = (when) => {
        when(/^eu recebo uma requisição "(.*)"$/, async (req) => {
            expect(req).toBe('POST');
        });
    };
    const andFieldMatch = (and) => {

    }

    test('Adicionando equipamento com sucesso', ({given, when, then, and}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        and(/^nome "(.*)"$/, async (nome, valor) => {
            expect(nome).toHaveValue(valor);
        });
        and(/^descricao "(.*|\d+)"$/, async (descricao, valor) => {
            expect(descricao).toHaveValue(valor);
        });
        and(/^estado de conservação "(.*)"$/, async (estado, valor) => {
            expect(estado).toHaveValue(valor);
        });
        and(/^data de aquisição "(.*)"$/, async (dataaquisicao, valor) => {
            expect(dataaquisicao).toHaveValue(valor);
        });
        and(/^valor estimado "(.*)"$/, async (valorestimado, valor) => {
            expect(valorestimado).toHaveValue(valor);
        });
        and(/^patrimonio (\d+)$/, async (patrimonio, valor) => {
            expect(patrimonio).toHaveValue(valor);
        });
        then(/^o equipamento "(.*)" com patrimonio (\d+) está no banco de dados$/, async (nome, patrimonio) => {
            expect(equipamentos).toContainEqual({nome: nome, patrimonio: patrimonio});
        });
    });
    test('Adicionando equipamento duplicado', ({given, when, then, and}) => {
        given(/^existe o equipamento "(.*)" com patrimonio (\d+)$/, async (nome, patrimonio) => {
            expect(equipmentExists(equipamentos, nome, patrimonio)).toBe(true);
        });
        when(/^eu recebo uma requisição "(.*)"$/, async (req) => {
            expect(req).toBe('POST');
        });
        and(/^nome "(.*)"$/, async (nome, valor) => {
            expect(nome).toHaveValue(valor);
        });
        and(/^descricao "(.*|\d+)"$/, async (descricao, valor) => {
            expect(descricao).toHaveValue(valor);
        });
        and(/^estado de conservação "(.*)"$/, async (estado, valor) => {
            expect(estado).toHaveValue(valor);
        });
        and(/^data de aquisição "(.*)"$/, async (dataaquisicao, valor) => {
            expect(dataaquisicao).toHaveValue(valor);
        });
        and(/^valor estimado "(.*)"$/, async (valorestimado, valor) => {
            expect(valorestimado).toHaveValue(valor);
        });
        and(/^patrimonio (\d+)$/, async (patrimonio, valor) => {
            expect(patrimonio).toHaveValue(valor);
        });
        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (res, code) => {
            expect(res).toBe('erro');
            expect(code).toBe(404);
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Equipamento já cadastrado');
        });

    });
    test('Adicionando equipamento com nome vazio', ({given, when, then, and}) => {
        given(/^eu recebo uma requisição "(.*)"$/, async (nome, campo, valor) => {
            expect(nome).toBe('POST');
        });
        and(/^nome "(.*)"$/, async (nome) => {
            expect(nome).toBe('');
        });
        and(/^descricao "(.*)"$/, async (valor) => {
            expect(valor).toBe('Ar condicionado de 12.000 btus');
        });
        and(/^estado de conservação "(.*)"$/, async (valor) => {
            expect(valor).toBe('Bom');
        });
        and(/^data de aquisição "(.*)"$/, async (dataaquisicao) => {
            expect(dataaquisicao).toBe('15/03/2023');
        });
        and(/^valor estimado "(.*)"$/, async (valorestimado) => {
            expect(valorestimado).toBe('R$ 1.200,00');
        });
        and(/^patrimonio (\d+)$/, async (patrimonio) => {
            expect(patrimonio).toBe(1098642);
        });

        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (res, code) => {
            expect(res).toBe('erro');
            expect(code).toBe(404);
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Nome não pode ser vazio');
        });
    });
    test('Adicionando equipamento com patrimonio vazio', ({given, when, then, and}) => {
        and(/^patrimonio (.*)/, async (valor) => {
            expect(valor).toBe('');
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Patrimonio não pode ser vazio');
        });
    });
    test('Adicionando equipamento com patrimonio duplicado', ({given, when, then, and}) => {
        given(/^existe o equipamento "(.*)" com patrimonio (\d+)$/, async (nome, patrimonio) => {
            expect(equipmentExists(equipamentos, nome, patrimonio)).toBe(true);
        });

        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Patrimonio já cadastrado');
        });
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
        and(/^estado de conservação (.*)/, async (valor) => {
            expect(valor).toBe('');
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Estado de conservação não pode ser vazio');
        });
    });
    test('Adicionando equipamento com data de aquisição vazia', ({given, when, then, and}) => {
        and(/^data de aquisição (.*)/, async (valor) => {
            expect(valor).toBe('');
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Data de aquisição não pode ser vazia');
        });
    });
    test('Adicionando equipamento com valor estimado vazio', ({given, when, then, and}) => {
        and(/^valor estimado (.*)/, async (valor) => {
            expect(valor).toBe('');
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Valor estimado não pode ser vazio');
        });
    });
    test('Adicionando equipamento com estado de conservação não funcional', ({given, when, then, and}) => {
        and(/^estado de conservação (.*)/, async (valor) => {
            expect(valor).toBe('Não Funcional');
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Estado de conservação inválido');
        });
    });
});
Given(/^não existe o equipamento "([^"]*)" com "([^"]*)" "([^"]*)"$/, function () {

});