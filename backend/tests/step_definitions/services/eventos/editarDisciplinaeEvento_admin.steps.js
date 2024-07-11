const supertest = require('supertest');
const server = require('../../../../app.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('../../databaseEdit.js');
//const { response } = require('express');
const request = supertest(server);

const feature = loadFeature('../../../features/admin/editarDisciplinaeEvento_admin.feature');

const disciplineExists = (disciplineList, name, disciplineID) => {
    let found = false;
    disciplineList.forEach(discipline => {
        if(discipline.nome === name && discipline.disciplineID === disciplineID) {
            found = true;
        }
    });
    return found;
}
const eventExists = (eventsList, name, eventDateAndTime) => {
    let found = false;
    eventsList.forEach(event => {
        if(event.eventName === name && event.eventDateAndTime === eventDateAndTime) {
            found = true;
        }
    });
    return found;
}
const infoSavedDisciplines = (disciplinesList, name, ID, newDiscipline) => {
    let equal = false;
    disciplinesList.forEach(disc => {
        if(disc.nome === newDiscipline.nome && disc.description == newDiscipline.description && disc.disciplineID === newDiscipline.disciplineID && disc.responsibleTeacher === newDiscipline.responsibleTeacher && disc.horario === newDiscipline.horario && disc.disciplineCurso === newDiscipline.disciplineCurso && disc.disciplinePeriodo === newDiscipline.disciplinePeriodo) {
            equal = true;
        }
    });
    return equal;
}
const infoSavedEvents = (eventsList, name, time, newEvent) => {
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
    test('Edição de uma funcionalidade de uma Disciplina com sucesso pelo Administrador -- campo horario',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[10];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('secgrad');
            expect(userType).toBe('admin');
        });
        and(/^A disciplina "(.*)" de id "(.*)" já está presente no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(disciplines,name,disciplinesID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('secgrad');
            response = await request.put(url).send({horario:newDiscipline.horario});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('horario');
            expect(newDiscipline.horario).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
        expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^As informações sobre a disciplina "(.*)" de id "(.*)" foram salvas no banco de dados$/, async(name,id) => {
            expect(infoSavedDisciplines(database.readNewDisciplines(),name,id,newDiscipline)).toBe(true);
        });
    });
        test('Edição de apenas uma funcionalidade de um Evento sem sucesso pelo Administrador - eventDateAndTime',({ given, when, then,and }) => {
        let eventos = database.readOldEvents();
        let newEventos = database.readNewEvents();
        let newEvento = newEventos[8];
        let wrongString = "06-08-2024 17:00";

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('secgrad');
            expect(userType).toBe('admin');
        });
        and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(name,time)=> {
            expect(eventExists(newEventos,name,time)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('secgrad');
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
        test('Edição de algumas funcionalidades de uma Disciplina com sucesso pelo Administrador -- campo description e disciplineCurso',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[11];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('secgrad');
            expect(userType).toBe('admin');
        });
        and(/^A disciplina "(.*)" de id "(.*)" já está presente no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(disciplines,name,disciplinesID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('secgrad');
            response = await request.put(url).send({description:newDiscipline.description,disciplineCurso:newDiscipline.disciplineCurso});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(response.body.description).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplineCurso');
            expect(response.body.disciplineCurso).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^As informações sobre a disciplina "(.*)" de id "(.*)" foram salvas no banco de dados$/, async(name,id) => {
            expect(infoSavedDisciplines(database.readNewDisciplines(),name,id,newDiscipline)).toBe(true);
        });
    });
});
