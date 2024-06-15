const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('./databaseScramble');
const { response } = require('express');

const feature = loadFeature('../features/eventos/adicionarEvento.feature');

const eventExists = (eventsList, name, dateAndTime) => {
    let found = false;
    eventsList.forEach(event => {
        if(event.eventName === name && event.eventDateAndTime === dateAndTime) {
            found = true;
        }
    }
    );
    return found;
}
defineFeature(feature, test => {
    let eventos = database.readOldEvents();
    let newEventos = database.readNewEvents();
    let newEvent = database.getFirstEvent();

    const givenEventDoestNotExist = (eventName, eventDateAndTime) => {
        given(/^não existe o evento "(.*)" na data e hora "(.*)"$/, async(eventName, eventDateAndTime) => {
            expect(eventExists(eventos, eventName, eventDateAndTime)).toBe(false);
        });
        given(/^existe o evento "(.*)" na data e hora "(.*)"$/, async(eventName, eventDateAndTime) => {
            expect(eventExists(eventos, eventName, eventDateAndTime)).toBe(true);
        });
    }

    test(/^Cadastro de um Evento com sucesso pelo Usuário Professor com descrição vazia$/, ({ given, when, then,and }) => {
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^ O evento "(.*)" não está no sistema $/, async(eventName)=> {
            expect(eventExists(eventos, eventName, eventDateAndTime)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({eventName:newEvent.eventName, description:'', responsibleTeacher:newEvent.responsibleTeacher, eventDateAndTime:newEvent.eventDateAndTime});
        });
        and(/^ preenche no corpo "(.*)": "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventName');
            expect(response.body.eventName).toBe(value);
        });
        and(/^ preenche no corpo "(.*)": "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(value).toBe('');
        });
        and(/^ preenche no corpo "(.*)": "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(response.body.responsibleTeacher).toBe(value);
        });
        and(/^ preenche no corpo "(.*)": "(.*)"$/, async(field,value)=> {
            expect(field).toBe('eventDateAndTime');
            expect(response.body.eventDateAndTime).toBe(value);
        });
        then(/^O sistema retorna "(.*)" $/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*) é exibida $/, async(message) => {
            expect(response.body.message).toBe(message);
        });
        and(/^O evento "(.*)" está no banco de dados$/, async(eventName) => {
            expect(eventExists(newEventos, eventName, eventDateAndTime)).toBe(true);
        });
    });

});