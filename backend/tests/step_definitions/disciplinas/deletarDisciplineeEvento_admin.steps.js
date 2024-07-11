const supertest = require('supertest');
const server = require('../../../app.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('../../databaseEdit.js');
//const { response } = require('express');
const request = supertest(server);

const feature = loadFeature('../../../features/admin/deletarDisciplinaeEvento_admin.feature');


const disciplineExists = (disciplineList, name, disciplineID) => {
    let found = false;
    disciplineList.forEach(discipline => {
        if(discipline.nome === name && discipline.disciplineID === disciplineID) {
            found = true;
        }
    });
    return found;
}
const eventExists = (eventsList, name, eventID) => {
    let found = false;
    eventsList.forEach(event => {
        if(event.eventName === name && event.id === eventID) {
            found = true;
        }
    });
    return found;
}
defineFeature(feature, test => {
    const consoleOutput = [];
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation((output) => {
        consoleOutput.push(output); // Armazena a saída em consoleOutput
    });
    //database.setupForTestDisciplines();
        test('Remoção de um evento sem sucesso pelo Administrador',({ given, when, then,and }) => {
            let eventos = database.readOldEvents();
            let newEventos = database.readNewEvents();

    
            given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
                expect(userName).toBe('secgrad');
                expect(userType).toBe('admin');
            });
            and(/^O evento "(.*)" de id "(.*)" não está no sistema$/, async(name,eventID)=> {
                expect(eventExists(eventos, name, eventID)).toBe(false);
            });
            when(/^O usuário "(.*)" manda uma requisição DELETE para "(.*)"$/, async(userName, url) => {
                expect(userName).toBe('secgrad');
                response = await request.delete(url).send();
            });
            then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
               expect(response.status).toBe(parseInt(statusCode,10));
            });
            and(/^A mensagem "(.*)" é exibida$/, async(message) => {
                const messageFound = consoleOutput.some(output => output.includes(message));
                expect(messageFound).toBe(true);
            });
     });
     test('Remoção de uma disciplina sem sucesso pelo Administrador',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('secgrad');
            expect(userType).toBe('admin');
        });
        when(/^O usuário "(.*)" manda uma requisição DELETE para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('secgrad');
            response = await request.delete(url).send();
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
    });

});
    
