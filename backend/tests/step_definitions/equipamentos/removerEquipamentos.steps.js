const EquipamentosRepository = require('../../../api/repositories/equipamentosRepository');
const {defineFeature, loadFeature} = require('jest-cucumber');
const app = require('../../../apptest');
const supertest = require('supertest');

const feature = loadFeature('./tests/features/equipamentos/removerEquipamentos.feature');

defineFeature(feature, (test) => {
    let request, response, equipments, mockEquipamentosRepository, server, injector;
    equipments = [{
        id:"123456",
        nome: "Projetor epson",
        descricao: "Projetor laser ultra curta distancia",
        estado_conservacao: "novo",
        data_aquisicao: "10/04/2024",
        valor_estimado: "R$ 4.500,00",
        patrimonio: "5578945",
        reservas: [],
        manutencao: []
    }, {
        id:"7891234",
        nome: "FPGA",
        descricao: "placa de prototipação de circuitos",
        estado_conservacao: "novo",
        data_aquisicao: "10/04/2024",
        valor_estimado: "R$ 2.000,00",
        numero_serie: "5578945",
        reservas: [],
        manutencao: []
    }];
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
        given(/^que eu tenho o equipamento com id (.*)$/, async (identificador) => {
            equipments.forEach( async (eq) => {
                if(eq.id === identificador) {
                    if (eq.hasOwnProperty('patrimonio')) { 
                        await mockEquipamentosRepository.createEquipmentPatrimonio(eq) 
                    } else { 
                        await mockEquipamentosRepository.createEquipmentSN(eq);
                    }
                }
            });
        });
    };
    const givenEquipmentNotExist = (given) => {
        given(/^que eu nao tenho o equipamento com id "(.*)"$/, async (id) => {
            response = await request.get(`/equipamentos/${id}`);
            expect(response.status).toBe(404);
        });
    };
//WHEN
    const whenRequest = (when) => {
        when(/^eu recebo uma requisição "(.*)" do usuario "(.*)" logado como "(.*)"$/, (req, user, userRole) => {
            expect(request.headers.username).toBe(user);
            expect(request.headers.role).toBe(userRole);
        });
    };
//THEN
    const thenEquipmentRemoved = async (then) =>{
        then(/^o equipamento com id (.*) deve ser removido do banco de dados$/, async (identificador) => {
            response = await request.delete(`/equipamentos/${identificador}`);
        });
    };
    const thenEquipmentNotRemoved = async (then) => {
        then(/^eu envio uma resposta de erro com codigo "(.*)" e mensagem de "(.*)" para o id "(.*)"$/, async (code, message, id) => {
            response = await request.delete(`/equipamentos/${id}`);
            expect(response.code).toBe(code);
            expect(response.body.message).toBe(message);
        });
    };
//AND
    const andResponse = async (and) => {
        and(/^eu envio uma resposta de "(.*)" com codigo "(.*)"$/, async (message, code) => {
            expect(response.status).toBe(parseInt(code));
        });
    };

    test('Remover um equipamento com sucesso', ({given, when, then, and}) => {
        givenEquipmentExist(given);
        whenRequest(when);
        thenEquipmentRemoved(then);
        andResponse(and);
    });
});