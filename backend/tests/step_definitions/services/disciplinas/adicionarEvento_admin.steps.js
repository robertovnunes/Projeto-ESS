const supertest = require('supertest');
const server = require('../../../../app.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('../../databaseEdit.js');
//const { response } = require('express');
const request = supertest(server);

const feature = loadFeature('../../../features/admin/adicionarEvento_admin.feature');

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
    test('Cadastro de um Evento com sucesso pelo Usuário Administrador',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = newEventos[7];
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('secgrad');
            expect(userType).toBe('admin');
        });
        and(/^O evento "(.*)" com a data "(.*)" não está no sistema$/, async(eventName,eventDateAndTime)=> {
            expect(eventExists(eventos, eventName, eventDateAndTime)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('secgrad');
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
    test('Cadastro de um evento sem sucesso pelo Usuário Administrador (já está cadastrado no sistema)',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = newEventos[7];
    
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('secgrad');
            expect(userType).toBe('admin');
        });
        and(/^O evento "(.*)" com a data "(.*)" já está presente no sistema$/, async(eventName,eventDateAndTime)=> {
            expect(eventExists(newEventos, eventName, eventDateAndTime)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('secgrad');
            response2 = await request.post(url).send({eventName:newEvent.eventName, description:"", responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:newEvent.eventDateAndTime});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(newEvent.eventName).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(value).toBe(newEvent.description);
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
    test('Cadastro de um evento sem sucesso pelo Usuário Administrador(faltam informações obrigatórias - campo eventDateAndTime)',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = newEventos[7];
    
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('secgrad');
            expect(userType).toBe('admin');
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('secgrad');
            response2 = await request.post(url).send({eventName:newEvent.eventName, responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:""});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(newEvent.eventName).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(value).toBe(newEvent.description);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(newEvent.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(value).toBe("");
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response2.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
    });
    test('Cadastro de uma Disciplina sem sucesso pelo Usuário Administrador(input errado - campo horario)',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvent = newEventos[7];
        let wrongString = "segunda-feira 10:00-12:00";
    
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('secgrad');
            expect(userType).toBe('admin');
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('secgrad');
            response = await request.post(url).send({eventName:newEvent.eventName, responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:wrongString});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(newEvent.eventName).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(value).toBe(newEvent.description);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(newEvent.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(value).toBe(wrongString);
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

    

