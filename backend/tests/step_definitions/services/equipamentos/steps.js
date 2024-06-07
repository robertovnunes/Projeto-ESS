
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
//Steps to reuse
class steps  {
    //Given steps
    static givenNotEquipmentExist = (given, equipamentos) => {
        given(/^não existe o equipamento "(.*)" com "(.*)" "(.*)"$/, async (nome, campo, identificador) => {
            expect(equipmentExists(equipamentos, nome, campo, identificador)).not.toBe(true);
        });
    };
    static givenEquipmentExist = (given, equipamentos) => {
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
    static thenPatrimonioIsOnDatabase = (then, equipamentos) => {
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
    static thenSerialNumbersAreOnDatabase = (then, equipamentos) => {
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
    static andFieldMatch = (and, equipamento) => {
        and(/^(.*) "(.*)"$/, async (campo, valor) => {
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

module.exports = steps;