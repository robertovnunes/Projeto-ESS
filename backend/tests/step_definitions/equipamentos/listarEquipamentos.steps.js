const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../apptest');
const supertest = require('supertest');
const EquipamentosRepository = require('../../../api/repositories/equipamentosRepository');

const feature = loadFeature('./tests/features/equipamentos/listarEquipamentos.feature');

defineFeature(feature, async (test) => {

    const server = app.listen(3001, () => {
        console.log('Testando...');
    });
    let response, equipamentoslist = [], equipamentosRepository, equipamentos;
    let request = supertest(server);
    request.headers = {"username": "joao", "role": "admin"};
    equipamentos = [
        {
            "id": "04sk2GHcgYri",
            "nome": "Monitor philips",
            "descricao": "monitor full hd 24 polegadas OLED",
            "estado_conservacao": "reformado",
            "data_aquisicao": "15/03/2023",
            "valor_estimado": "R$ 1.200,00",
            "patrimonio": "5237418",
            "reservas": [],
            "manutencao": []
        },
        {
            "id": "04EGkIhCGohs",
            "nome": "Ar condicionado midea",
            "descricao": "Ar condicionado de 12.000 btus",
            "estado_conservacao": "novo",
            "data_aquisicao": "15/03/2023",
            "valor_estimado": "R$ 1.200,00",
            "numero_serie": "3642597",
            "reservas": [],
            "manutencao": []
        }];

    beforeAll(() => {
        equipamentosRepository = new EquipamentosRepository();
    });

    afterAll( async () => {
        equipamentos.forEach( async (eq) => {
            await equipamentosRepository.deleteEquipment(qe.id);
        });
        server.close();
    });

//steps to reuse
//GIVEN
    const givenEquipmentsExist = async (given) => {
        given(/^que exitem os seguintes equipamentos cadastrados no sistema:$/, async (obj) => {
            equipamentos.forEach( async (eq) => {
                if(eq.hasOwnProperty('patrimonio')){
                    await equipamentosRepository.createEquipmentPatrimonio(eq);
                } else {
                    await equipamentosRepository.createEquipmentSN(eq);
                }
            });
        });     
    };   
    const givenEquipmentExist = async (given) => {
        given(/^que exite o equipamento com (.*) (.*) cadastrado$/, async (campo, identificador) => {
            if(campo === 'id'){
                
            } else {
                response = await request.get(`/equipamentos/${campo}/${identificador}`);
            }
            expect(response.status).toBe(200);
        });
    };
    const givenNotexistEquipment = async (given) => {
        given(/^que não existe o equipamento com (.*) (.*)$/, async (campo, identificador) => {
            console.log(campo, identificador);
            if(campo === 'id'){
                response = await request.get(`/equipamentos/${identificador}`);
            } else {
                response = await request.get(`/equipamentos/${campo}/${identificador}`);
            }
            expect(response.status).toBe(404);
        });
    };
//WHEN
    const whenRequest = (when) => {
        when(/^eu recebo uma requisição (.*) do usuario "(.*)" logado como "(.*)"$/, (req, username, userRole) =>{
            expect(request.headers.username).toBe(username);
            expect(request.headers.role).toBe(userRole);
        });
    };

//THEN
    const thenEquipmentsShow = async (then) => {
        then(/^eu retorno uma lista com "(.*)" equipamentos e json:$/, async (qtd, json) => {
            response = await request.get('/equipamentos');
            let equipamentos = response.body;
            expect(equipamentos.length).toBe(parseInt(qtd));
            equipamentoslist.forEach(equipamento => {
                expect(equipamentos).toContainEqual(equipamento);
            })
        });
    };
    const thenEquipmentReturn = async (then) => {
        then(/^o json com os dados do equipamento com "(.*)" "(.*)" é retornado$/, async (campo, identificador, json) =>{
            let equipmentResponse;
            if(campo === 'id'){
                equipmentResponse = await request.get(`/equipamentos/${identificador}`);
            } else {
                equipmentResponse = await request.get(`/equipamentos/${campo}/${identificador}`);
            }
            const equipamento = JSON.parse(json);
            const equipment = equipmentResponse.body;
            expect(equipment).toEqual(equipamento);
        });
    };
    const thenResponseError = async (then) => {
        then(/^eu envio uma resposta de erro com codigo "(.*)" e mensagem "(.*)"$/, async (code, mensagem) => {
            expect(response.status).toBe(parseInt(code));
            expect(response.body.message).toBe(mensagem);
        });
    };
//AND

    test('Listar todos os equipamentos', ({ given, when, then }) => {
        givenEquipmentsExist(given);
        whenRequest(when);
        thenEquipmentsShow(then);
    });
    test('buscar equipamento específico por id', ({given, when, then}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentReturn(then);
    });
    test('buscar equipamento específico por patrimonio', ({given, when, then}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentReturn(then);
    });
    test('buscar equipamento específico por numero de serie', ({given, when, then}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentReturn(then);
    });
    test('Buscar equipamento por identificador inexistente', ({given, when, then}) => {
        givenNotexistEquipment(given);
        whenRequest(when);
        thenResponseError(then);
    });
});