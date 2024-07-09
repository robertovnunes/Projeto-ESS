const {loadFeature, defineFeature} = require('jest-cucumber');
const app = require('../../../apptest');
const supertest = require('supertest');
const EquipamentosRepository = require('../../../api/repositories/equipamentosRepository');

const feature = loadFeature('tests/features/equipamentos/listarEquipamentos.feature');

defineFeature(feature, async (test) => {

    const server = app.listen(3001, () => {
        console.log('Testando...');
    });
    let response, equipamentosRepository, equipamentos = [];
    let request = supertest(server);
    request.headers = {"username": "joao", "role": "admin"};
    let equipamentosID = [];

    beforeAll( async () => {
        equipamentosRepository = new EquipamentosRepository();
    });

    afterAll( async () => {
        for (let id of equipamentosID) {
           await equipamentosRepository.deleteEquipment(id);
        }
        server.close();
    });

//steps to reuse
//GIVEN
    const givenEquipmentsExist = async (given) => {
        given(/^que exitem os seguintes equipamentos cadastrados no sistema:$/, async (json) => {
            equipamentos = JSON.parse(json);
            for(let eq of equipamentos) {
                const created = await equipamentosRepository.createEquipment(eq);
                equipamentosID.push(created.id);
            }
        });     
    };   
    const givenEquipmentExist = async (given) => {
        given(/^que exite o equipamento com json cadastrado$/, async (json) => {
            let exist, created;
            const equipamento = JSON.parse(json);
            exist = await equipamentosRepository.getEquipmentById(equipamento.id);
            if(exist === undefined) {
                created = await equipamentosRepository.createEquipment(equipamento);
                equipamentosID.push(created.id);
            }
        });
    };
    const givenNotexistEquipment = async (given) => {
        given(/^que não existe o equipamento com (.*) (.*)$/, async (campo, identificador) => {
            let exist;
            if(campo === 'id'){
                exist = await equipamentosRepository.getEquipmentById(identificador);
                if(exist !== undefined){
                    equipamentosID = equipamentosID.filter(id => id !== exist.id);
                    await equipamentosRepository.deleteEquipment(exist.id);
                }
            } else {
                if(campo === 'patrimonio'){
                    exist = await equipamentosRepository.getEquipmentByPatrimonio(identificador);
                    if(exist !== undefined){
                        equipamentosID = equipamentosID.filter(id => id !== exist.id);
                        await equipamentosRepository.deleteEquipment(exist.id);
                    }
                } else {
                    exist = await equipamentosRepository.getEquipmentBySerie(identificador);
                    if(exist !== undefined){
                        equipamentosID = equipamentosID.filter(id => id !== exist.id);
                        await equipamentosRepository.deleteEquipment(exist.id);
                    }
                }
            }
        });
    };
//WHEN
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisição GET para "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (req, username, userRole) =>{
            response = await request.get(req);
        });
    };
    const whenRequestFail = async (when) => {
        when(/^eu recebo uma requisição GET para (.*) do usuario "(.*)" logado como "(.*)"$/, async (req, username, userRole) =>{
            response = await request.get(req);
        });
    };

//THEN
    const thenEquipmentsShow = async (then) => {
        then(/^eu retorno uma lista de equipamentos e json:$/, async (json) => {
            let equipamentos = await response.body;
            const equipamentosList = JSON.parse(json);
            equipamentosList.forEach(equipamento => {
                expect(equipamentos).toContainEqual(equipamento);
            })
        });
    };
    const thenEquipmentReturn = async (then) => {
        then(/^o json com os dados do equipamento com "(.*)" "(.*)" é retornado$/, async (campo, identificador, json) =>{
            const equipamento = JSON.parse(json);
            const equipment = response.body;
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
        whenRequestFail(when);
        thenResponseError(then);
    });
});