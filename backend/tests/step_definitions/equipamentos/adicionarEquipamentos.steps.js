const jc = require('jest-cucumber');
const loadFeature = jc.loadFeature;
const defineFeature = jc.defineFeature;
const fs = require('fs');

const feature = loadFeature('tests/features/equipamentos/adicionarEquipamento.feature');
let equipamentos = []

function equipmentExists(equipamentos, nome, campo, identificador) {
    let found = false;
    equipamentos.forEach(equipamento => {
        switch (equipamento) {
            case campo === 'serial' && equipamento.hasOwnProperty('serial') && equipamento.serial === identificador:
                found = true;
                break;
            case campo === 'patrimonio' && equipamento.hasOwnProperty('patrimonio') && equipamento.patrimonio === identificador:
                found = true;
                break;
            default:
                found = false;
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
    const givenNotEquipmentExist = (given) => {
        given(/^não existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            expect(equipmentExists(equipamentos, nome, campo, identificador)).not.toBe(true);
        });
    };
    const givenEquipmentExist = (given) => {
        given(/^existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            expect(equipmentExists(equipamentos, nome, campo, identificador)).toBe(true);
        });
    };
    const givenRequest = (given) => {
        given(/^eu recebo uma requisição "(.*)"$/, async (nome, campo, valor) => {
            expect(nome).toBe('POST');
        });
    }
    const whenRequest = (when) => {
        when(/^eu recebo uma requisição "(.*)"$/, async (req) => {
            expect(req).toBe('/POST');
        });
    };
    const andFieldMatch = (and) => {
        and(/^(.*) "(.*)"$/, async (equipamento, campo, valor) => {
            expect(equipamento[campo]).toBe(valor);
        });
    };
    const andFieldEmpty = (and) => {
        and(/^(.*) "(.*)"$/, async (equipamento, campo) => {
            expect(equipamento[campo]).toBe('');
        });
    };
    const thenPatrimonioIsOnDatabase = (then) => {
        then(/^o equipamento (.*) com patrimonio (.*) está no banco de dados$/, async (nome, patrimonio) => {
            expect(equipamentos).toContainEqual({nome: nome, patrimonio: patrimonio});
        });
    }
    const thenResponseError = (then) => {
        then(/^$/), async (type, code) => {
            expect(type).toBe('error');
            expect(code).toBe(404);
        }
    }
    test('Adicionando equipamento usando patrimonio com sucesso', ({given, when, then, and}) => {
        givenNotEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenPatrimonioIsOnDatabase(then);
    });
    test('Adicionando equipamento duplicado', ({given, when, then, and}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (res, code) => {
            expect(res).toBe('erro');
            expect(code).toBe(404);
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Equipamento já cadastrado');
        });

    });
    test('Adicionando equipamento com nome vazio', ({given, when, then, and}) => {
        givenRequest(given)
        andFieldEmpty(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);

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

        givenRequest(given);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldEmpty(and);
        andFieldMatch(and);
        andFieldMatch(and);
        andFieldMatch(and);
        thenResponseError(then);
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