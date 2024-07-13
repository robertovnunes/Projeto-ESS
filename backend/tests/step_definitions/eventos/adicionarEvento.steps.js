const supertest = require('supertest');
const server = require('../../../apptest.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('../databaseEdit.js');
//const { response } = require('express');
const request = supertest(server);

const feature = loadFeature('./tests/features/professor/adicionarEvento.feature');

const eventExists = (eventsList, name, dateAndTime) => {
    let found = false;
    eventsList.forEach(event => {
        if(event.eventName === name && event.eventDateAndTime === dateAndTime) {
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
   // database.setupForTestEvents();

    test('Cadastro de um Evento com sucesso pelo Usuário Professor com descrição vazia',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = database.getFirstEvent();
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^O evento "(.*)" na data "(.*)" não está no sistema$/, async(eventName,eventDateAndTime)=> {
            expect(eventExists(eventos, eventName, eventDateAndTime)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({eventName:newEvent.eventName, description:"", responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:newEvent.eventDateAndTime});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(response.body.eventName).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(value).toBe("");
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
        and(/^O evento "(.*)" na data "(.*)" está no banco de dados$/, async(eventName,eventDateAndTime) => {
            expect(eventExists(newEventos, eventName, eventDateAndTime)).toBe(true);
        });
    });
    test('Cadastro de um Evento com sucesso pelo Usuário Professor com descrição',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = database.getSecondEvent();
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^O evento "(.*)" com a data "(.*)" não está no sistema$/, async(eventName,eventDateAndTime)=> {
            expect(eventExists(eventos, eventName, eventDateAndTime)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({eventName:newEvent.eventName, description:newEvent.description, responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:newEvent.eventDateAndTime});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(response.body.eventName).toBe(value);
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
        and(/^O evento "(.*)" na data "(.*)" está no banco de dados$/, async(eventName,eventDateAndTime) => {
            expect(eventExists(newEventos, eventName, eventDateAndTime)).toBe(true);
        });
    });
    test('Cadastro de um evento sem sucesso pelo Usuário Professor (já está cadastrado no sistema)',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = database.getFirstEvent();
    
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(eventName,eventDateAndTime)=> {
            expect(eventExists(newEventos, eventName, eventDateAndTime)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response2 = await request.post(url).send({eventName:newEvent.eventName, description:"", responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:newEvent.eventDateAndTime});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(newEvent.eventName).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(value).toBe("");
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(newEvent.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(newEvent.eventDateAndTime).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response2.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
    });
    test('Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo eventName)',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = database.getFirstEvent();
    
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response2 = await request.post(url).send({eventName:"", responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:newEvent.eventDateAndTime});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect("").toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(newEvent.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(newEvent.eventDateAndTime).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response2.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
    });
    test('Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo responsibleTeacher)',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = database.getFirstEvent();
    
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response2 = await request.post(url).send({eventName:newEvent.eventName, responsibleTeacher:"", eventDateAndTime:newEvent.eventDateAndTime});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(newEvent.eventName).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect("").toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(newEvent.eventDateAndTime).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response2.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
    });
    test('Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo eventDateAndTime)',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = database.getFirstEvent();
    
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response2 = await request.post(url).send({eventName:newEvent.eventName, responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:""});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(newEvent.eventName).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(newEvent.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect("").toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response2.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
    });
    

});