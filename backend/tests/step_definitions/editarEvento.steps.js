const supertest = require('supertest');
const index = require('/home/mariana/Documents/Projeto-ESS/backend/conf/index.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('./databaseScramble');
//const { response } = require('express');
const request = supertest(index);

const feature = loadFeature('/home/mariana/Documents/Projeto-ESS/backend/tests/features/eventos/editarEvento.feature');

const eventExists = (eventsList, name, eventDateAndTime) => {
    let found = false;
    eventsList.forEach(event => {
        if(event.eventName === name && event.eventDateAndTime === eventDateAndTime) {
            found = true;
        }
    });
    return found;
}
const infoSaved = (eventsList, name, time, newEvent) => {
    let equal = false;
    eventsList.forEach(event => {
        if(event.eventName === name && event.description === newEvent.description && event.responsibleTeacher === newEvent.responsibleTeacher && event.eventDateAndTime === time) {
            equal = true;
        }
    });
    return equal;
}
defineFeature(feature, test => {
    const consoleOutput = [];
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation((output) => {
        consoleOutput.push(output); // Armazena a saída em consoleOutput
    });
    //database.setupForTestDisciplines();
    test('Edição de todas as funcionalidades de um Evento com sucesso pelo Professor',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvento = newEventos[4];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(name,time)=> {
            expect(eventExists(eventos,name,time)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.put(url).send({eventName:newEvento.eventName,description:newEvento.description,responsibleTeacher:newEvento.responsibleTeacher,eventDateAndTime:newEvento.eventDateAndTime});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(response.body.eventName).toContain(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(value).toBe(response.body.description);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(response.body.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(response.body.eventDateAndTime).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^As informações sobre o evento "(.*)" de data "(.*)" foram salvas no banco de dados$/, async(name,time) => {
            expect(infoSaved(database.readNewEvents(),name,time,newEvento)).toBe(true);
        });
    });

    test('Edição de algumas funcionalidades de um Evento com sucesso pelo Professor - eventName e responsibleTeacher',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvento = newEventos[5];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(name,time)=> {
            expect(eventExists(eventos,name,time)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.put(url).send({eventName:newEvento.eventName,responsibleTeacher:newEvento.responsibleTeacher});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(response.body.eventName).toContain(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(response.body.responsibleTeacher).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
        expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^As informações sobre o evento "(.*)" de data "(.*)" foram salvas no banco de dados$/, async(name,time) => {
            expect(infoSaved(database.readNewEvents(),name,time,newEvento)).toBe(true);
        });
    });
});
  
  
    
