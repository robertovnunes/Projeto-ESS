const jc = require('jest-cucumber');
const loadFeature = jc.loadFeature;
const defineFeature = jc.defineFeature;
const fs = require('fs');
const request = require('supertest');
const app = require('../../../../app');

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

    //Steps to reuse
    class steps  {
        //Given steps
        static givenNotEquipmentExist = (given) => {
            given(/^não existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
                expect(equipmentExists(equipamentos, nome, campo, identificador)).not.toBe(true);
            });
        };
        static givenEquipmentExist = (given) => {
            given(/^existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
                expect(equipmentExists(equipamentos, nome, campo, identificador)).toBe(true);
            });
        };
        static givenRequest = (given) => {
            given(/^eu recebo uma requisição "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (nome, campo, valor) => {
                expect(nome).toBe('POST');
            });
        };
        //When steps
        static whenRequest = (when) => {
            when(/^eu recebo uma requisição "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (req) => {
                expect(req).toBe('/POST');
            });
        };
        static whenverifyEquipment = (when) => {
            when(/^os dados são verificados como "(.*)" "(.*)"$/, (nome, valor) => {
                expect(nome).toBe(valor);
            });
        }
        //Then steps
        static thenPatrimonioIsOnDatabase = (then) => {
            then(/^o equipamento (.*) com patrimonio (.*) está no banco de dados$/, async (nome, patrimonio) => {
                expect(equipamentos).toContainEqual({nome: nome, patrimonio: patrimonio});
            });
        };
        static thenResponseError = (then) => {
            then(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/), async (type, code) => {
                expect(type).toBe('error');
                expect(code).toBe('404');
            }
        };
        static thenSerialNumbersAreOnDatabase = (then) => {
            then(/^os equipamentos (.*) com numeros de serie (\d+) estão no banco de dados$/, async (numeros) => {
                expect(equipamentos).toContainEqual({serial: numeros});
            });
        };
        static andMessageError = (and, message) => {
            and(/^mensagem "(.*)"$/, async (mensagem) => {
                expect(mensagem).toBe(message);
            });
        }
        //And steps
        static andFieldMatch = (and) => {
            and(/^(.*) "(.*)"$/, async (equipamento, campo, valor) => {
                expect(equipamento[campo]).toBe(valor);
            });
        };
        static andFieldEmpty = (and) => {
            and(/^(.*) "(.*)"$/, async (equipamento, campo) => {
                expect(equipamento[campo]).toBe('');
            });
        };
        static andReqIsBatch = (and) => {
            and(/^a requisição possui uma "(.*)"$/, async (campo) => {
                expect(campo).toBe('inserção em lote');
            });
        };
        static andReqIsNotBatch = (and) => {
            and(/^a requisição possui uma "(.*)"$/, async (campo) => {
                expect(campo).toBe('inserção unica');
            });
        };
        static andVerifySerialNumbers = (and) => {
            and(/^os numeros de serie (\d+)$/, async (numeros) => {

            })
        };

    };


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
        then(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (res, code) => {
            expect(res).toBe('erro');
            expect(code).toBe(404);
        });
        and(/^mensagem "(.*)"/, async (mensagem) => {
            expect(mensagem).toBe('Equipamento já cadastrado');
        });

    });
    test('Adicionando equipamento com nome vazio', ({given, when, then, and}) => {
        steps.givenRequest(given)
        steps.andFieldEmpty(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);
        steps.andFieldMatch(and);

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