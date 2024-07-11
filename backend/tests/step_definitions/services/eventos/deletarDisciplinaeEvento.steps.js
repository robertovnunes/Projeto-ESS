const supertest = require('supertest');
const server = require('../../../../app.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('../../databaseEdit.js');
//const { response } = require('express');
const request = supertest(server);

const feature = loadFeature('../../../features/professor/deletarDisciplinaEvento.feature');

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
    test('Remoção de uma disciplina sem sucesso pelo Professor',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[4];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" não está no sistema$/, async(name,disciplineID)=> {
            expect(disciplineExists(disciplines, name, disciplineID)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição DELETE para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
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
        test('Remoção de um evento sem sucesso pelo Professor',({ given, when, then,and }) => {
            let eventos = database.readOldEvents();
            let newEventos = database.readNewEvents();

    
            given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
                expect(userName).toBe('bafm');
                expect(userType).toBe('professor');
            });
            and(/^O evento "(.*)" de id "(.*)" não está no sistema$/, async(name,eventID)=> {
                expect(eventExists(eventos, name, eventID)).toBe(false);
            });
            when(/^O usuário "(.*)" manda uma requisição DELETE para "(.*)"$/, async(userName, url) => {
                expect(userName).toBe('bafm');
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
     test('Remoção de uma disciplina com sucesso pelo Professor',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" está presente no sistema$/, async(name,disciplineID)=> {
            expect(disciplineExists(newDisciplines, name, disciplineID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição DELETE para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.delete(url).send();
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^A disciplina "(.*)" de id "(.*)" não está mais presente no sistema$/, async(name,disciplineID)=> {
            expect(disciplineExists(disciplines, name, disciplineID)).toBe(false);
        });
    });
    test('Remoção de um evento com sucesso pelo Professor',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();


        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^O evento "(.*)" de id "(.*)" está presente no sistema$/, async(name,eventID)=> {
            let eventIDConverted = Number(eventID)
            expect(eventExists(newEventos, name, eventIDConverted)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição DELETE para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.delete(url).send();
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^O evento "(.*)" de id "(.*)" não está mais presente no sistema$/, async(name,eventID)=> {
            expect(eventExists(eventos, name, eventID)).toBe(false);
        });
 });
});
    
