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

    beforeAll( async () => {
        equipamentosRepository = new EquipamentosRepository();
    });

    afterAll( async () => {
        for (let eq of equipamentos) {
            await equipamentosRepository.deleteEquipment(eq.id);
        }
        server.close();
    });

//steps to reuse
//GIVEN
    const givenEquipmentsExist = async (given) => {
        given(/^que exitem os seguintes equipamentos cadastrados no sistema:$/, async (obj) => {
            for (const eq of equipamentos) {
                let exist = await equipamentosRepository.getEquipment(eq.id);
                if(exist !== null){
                    await equipamentosRepository.deleteEquipment(eq.id);
                } else {
                    if(eq.hasOwnProperty('patrimonio')){
                        exist = await equipamentosRepository.getEquipmentByPatrimonio(eq.patrimonio);
                        if(exist !== null){
                            await equipamentosRepository.deleteEquipment(exist.id);
                        }
                        await equipamentosRepository.createEquipmentPatrimonio(eq);
                    equipmentsID.push(eq.id);
                    } else {
                        exist = await equipamentosRepository.getEquipmentBySN(eq.numero_serie);
                        if(exist !== null){
                            await equipamentosRepository.deleteEquipment(exist.id);
                        }
                        await equipamentosRepository.createEquipmentSN(eq);
                    }
                }
            }
        });     
    };   
    const givenEquipmentExist = async (given) => {
        given(/^que exite o equipamento com (.*) (.*) cadastrado$/, async (campo, identificador) => {
            let eq, exist;
            if(campo === 'id'){
                exist = await equipamentosRepository.getEquipmentByID(identificador);
                if(exist === null){
                    eq = equipamentos.find(eq => eq.id === identificador);
                }
            } else {
                if(campo === 'patrimonio'){
                    exist = await equipamentosRepository.getEquipmentByPatrimonio(identificador);
                    if(exist === null){
                        eq = equipamentos.find(eq => eq.patrimonio === identificador);
                    }
                } else {
                    exist = await equipamentosRepository.getEquipmentBySN(identificador);
                    if(exist === null){
                        eq = equipamentos.find(eq => eq.numero_serie === identificador);
                    }
                }
            }
            eq.hasOwnProperty('patrimonio') && (exist === null) ? await equipamentosRepository.createEquipmentPatrimonio(eq) : await equipamentosRepository.createEquipmentSN(eq);
        });
    };
    const givenNotexistEquipment = async (given) => {
        given(/^que não existe o equipamento com (.*) (.*)$/, async (campo, identificador) => {
            let exist;
            if(campo === 'id'){
                exist = await equipamentosRepository.getEquipmentByID(identificador);
            } else {
                if(campo === 'patrimonio'){
                    exist = await equipamentosRepository.getEquipmentByPatrimonio(identificador);
                } else {
                    exist = await equipamentosRepository.getEquipmentBySN(identificador);
                }
            }
            if(exist !== null){
                await equipamentosRepository.deleteEquipment(exist.id);
            }
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
            const equipamentosList = JSON.parse(json);
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