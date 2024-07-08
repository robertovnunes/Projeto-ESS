const EquipamentosRepository = require('../../../api/repositories/equipamentosRepository');
const {defineFeature, loadFeature} = require('jest-cucumber');
const app = require('../../../apptest');
const supertest = require('supertest');

const feature = loadFeature('./tests/features/equipamentos/removerEquipamentos.feature');

defineFeature(feature, (test) => {
    let request, response, mockEquipamentosRepository, server;
    server = app.listen(3001, () => {
        console.log('Testando...');
    });
    request = supertest(server);
    request.headers = {"username": "joao", "role": "admin"};
    request.method = '/DELETE';

    beforeAll(() => {
        mockEquipamentosRepository = new EquipamentosRepository();
    });

    afterAll(() => {
        server.close();
    });

//STEPS TO REUSE
//GIVEN
    const givenEquipmentExist = async (given) => {
        given(/^que eu tenho o equipamento com id "(.*)" e json:$/, async (identificador, json) => {
            let eq = JSON.parse(json);
            await mockEquipamentosRepository.createEquipment(eq);
        });
    };
    const givenEquipmentNotExist = async (given) => {
        given(/^que eu nao tenho o equipamento com id "(.*)"$/, async (id) => {
            const exist = await mockEquipamentosRepository.getEquipmentById(id);
            if(exist !== undefined){
                await mockEquipamentosRepository.deleteEquipment(id);
            }
        });
    }
//WHEN
    const whenRequest = async (when) => {
        when(/^eu recebo uma requisição "(.*)" para o id "(.*)" do usuario "(.*)" logado como "(.*)"$/, async (req, id, user, userRole) => {
            response = await request.delete(`/equipamentos/${id}`);
        });
    };
//THEN
    const thenEquipmentRemoved = async (then) =>{
        then(/^o equipamento com id (.*) deve ser removido do banco de dados$/, async (identificador) => {
            expect(response.status).toBe(200);
        });
    };
    const thenEquipmentNotRemoved = async (then) => {
        then(/^eu envio uma resposta de erro com codigo "(.*)" e mensagem de "(.*)" para o id "(.*)"$/, async (code, message, id) => {
            expect(response.status).toBe(parseInt(code));
            expect(response.body.message).toBe(message);
        });
    };

    test('Remover um equipamento com sucesso', ({given, when, then}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentRemoved(then);
    });
    test('Remover um equipamento inexistente', ({given, when, then}) => {
        givenEquipmentNotExist(given);
        whenRequest(when);
        thenEquipmentNotRemoved(then);
    });
});