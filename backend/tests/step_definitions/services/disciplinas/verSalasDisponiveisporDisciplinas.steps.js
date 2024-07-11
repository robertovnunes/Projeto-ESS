const supertest = require('supertest');
const server = require('../../../../app.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('../../databaseEdit.js');
//const { response } = require('express');
const request = supertest(server);

const feature = loadFeature('../../../features/aluno/verSalasDisponiveisporDisciplinas.feature');

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
    test('Verificar as salas reservadas por determinada Disciplina do usuário Aluno com sucesso',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[10];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('mgc3');
            expect(userType).toBe('aluno');
        });
        and(/^A disciplina "(.*)" de id "(.*)" existe no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(newDisciplines,name,disciplinesID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição GET para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('mgc3');
            response = await request.get(url).send();
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
        expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^O usuário "(.*)" recebe um JSON com as salas reservadas "(.*)" e "(.*)"$/, async(userName,room1,room2) => {
            expect(userName).toBe('mgc3');
            expect(response.text).toContain(room1);
            expect(response.text).toContain(room2);
        });
    });
    test('Verificar as salas reservadas por determinada Disciplina do usuário Aluno sem sucesso (Disciplina não existe)',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[10];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('mgc3');
            expect(userType).toBe('aluno');
        });
        and(/^A disciplina "(.*)" de id "(.*)" não existe no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(newDisciplines,name,disciplinesID)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição GET para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('mgc3');
            response = await request.get(url).send();
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
        expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
    });
    test('Verificar as salas reservadas por determinada Disciplina do usuário Aluno sem sucesso (Disciplina não tem salas reservadas)',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[10];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('mgc3');
            expect(userType).toBe('aluno');
        });
        and(/^A disciplina "(.*)" de id "(.*)" existe no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(newDisciplines,name,disciplinesID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição GET para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('mgc3');
            response = await request.get(url).send();
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
