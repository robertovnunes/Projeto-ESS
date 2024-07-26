const SalaRepository = require('../../../api/repositories/equipamentos.repository');
const {defineFeature, loadFeature} = require('jest-cucumber');
const app = require('../../../apptest');
const supertest = require('supertest');
const setupTest = require('./testSetup');

const feature = loadFeature('./tests/features/salas/removerSala.feature');

defineFeature(feature, (test) => {
    let request, response, mockSalaRepository, server;
    server = app.listen(3001, () => {
        console.log('Testando...');
    });
    request = supertest(server);
    request.headers = {"username": "joao", "role": "admin"};
    request.method = '/DELETE';
    const setup = new setupTest();

    beforeAll( async () => {
        mockSalaRepository = new SalaRepository();
        await setup.getDatabaseCopy();
    });

    afterAll( async () => {
        await setup.restoreDatabase();
        server.close();
    });

//STEPS TO REUSE
//GIVEN
    const givenSalaExist = async (given) => {
        given(/^que eu tenho o equipamento com id "(.*)" e json:$/, async (identificador, json) => {
            let eq = JSON.parse(json);
            await mockSalaRepository.createSala(eq);
        });
    };
    const givenSalaNotExist = async (given) => {
        given(/^que eu nao tenho o equipamento com id "(.*)"$/, async (id) => {
            const exist = await mockSalaRepository.getSalaById(id);
            if(exist !== undefined){
                await mockSalaRepository.deleteSala(id);
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
    const thenSalaRemoved = async (then) =>{
        then(/^o equipamento com id (.*) deve ser removido do banco de dados$/, async (identificador) => {
            expect(response.status).toBe(200);
        });
    };
    const thenSalaNotRemoved = async (then) => {
        then(/^eu envio uma resposta de erro com codigo "(.*)" e mensagem de "(.*)" para o id "(.*)"$/, async (code, message, id) => {
            expect(response.status).toBe(parseInt(code));
            expect(response.body.message).toBe(message);
        });
    };

    test('Remover um equipamento com sucesso', ({given, when, then}) => {
        givenSalaExist(given);
        whenRequest(when);
        thenSalaRemoved(then);
    });
    test('Remover um equipamento inexistente', ({given, when, then}) => {
        givenSalaNotExist(given);
        whenRequest(when);
        thenSalaNotRemoved(then);
    });
});