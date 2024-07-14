const supertest = require('supertest');
const server = require('../../../apptest.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('../databaseEdit.js');
//const { response } = require('express');
const request = supertest(server);

const feature = loadFeature('./tests/features/professor/editarEvento.feature');

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
            expect(response.body.eventName).toBe(value);
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
    test('Edição de apenas uma funcionalidade de um Evento com sucesso pelo Professor - eventDateAndTime',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvento = newEventos[6];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(name,time)=> {
            expect(eventExists(eventos,name,time)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.put(url).send({eventDateAndTime:newEvento.eventDateAndTime});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(response.body.eventDateAndTime).toContain(value);
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
    test('Edição de apenas uma funcionalidade de um Evento sem sucesso pelo Professor - eventDateAndTime',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvento = newEventos[6];
        let wrongString = "06-08-2024 17:00";

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(name,time)=> {
            expect(eventExists(eventos,name,time)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.put(url).send({eventDateAndTime:wrongString});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(wrongString).toContain(value);
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
  
  
    
