const supertest = require('supertest');
const server = require('../../../../app.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('../../databaseEdit.js');
//const { response } = require('express');
const request = supertest(server);

const feature = loadFeature('../../../features/professor/editarDisciplina.feature');

const disciplineExists = (disciplineList, name, disciplineID) => {
    let found = false;
    disciplineList.forEach(discipline => {
        if(discipline.nome === name && discipline.disciplineID === disciplineID) {
            found = true;
        }
    });
    return found;
}
const infoSaved = (disciplinesList, name, ID, newDiscipline) => {
    let equal = false;
    disciplinesList.forEach(disc => {
        if(disc.nome === newDiscipline.nome && disc.description == newDiscipline.description && disc.disciplineID === newDiscipline.disciplineID && disc.responsibleTeacher === newDiscipline.responsibleTeacher && disc.horario === newDiscipline.horario && disc.disciplineCurso === newDiscipline.disciplineCurso && disc.disciplinePeriodo === newDiscipline.disciplinePeriodo) {
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
    test('Edição de todas as funcionalidades de uma Disciplina com sucesso pelo Professor',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[6];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" já está presente no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(disciplines,name,disciplinesID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.put(url).send({nome:newDiscipline.nome,disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario:newDiscipline.horario,description:newDiscipline.description,disciplineCurso:newDiscipline.disciplineCurso,disciplinePeriodo:newDiscipline.disciplinePeriodo});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('nome');
            expect(response.body.nome).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplineID');
            expect(value).toBe(response.body.disciplineID);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(response.body.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('horario');
            expect(response.body.horario).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(response.body.description).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplineCurso');
            expect(response.body.disciplineCurso).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplinePeriodo');
            expect(response.body.disciplinePeriodo).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^As informações sobre a disciplina "(.*)" de id "(.*)" foram salvas no banco de dados$/, async(name,id) => {
            expect(infoSaved(database.readNewDisciplines(),name,id,newDiscipline)).toBe(true);
        });
    });
    test('Edição de algumas funcionalidades de uma Disciplina com sucesso pelo Professor -- campo description e disciplineCurso',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[7];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" já está presente no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(disciplines,name,disciplinesID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
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
            expect(infoSaved(database.readNewDisciplines(),name,id,newDiscipline)).toBe(true);
        });
    });
    test('Edição de uma funcionalidade de uma Disciplina com sucesso pelo Professor -- campo horario',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[8];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" já está presente no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(disciplines,name,disciplinesID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.put(url).send({horario:newDiscipline.horario});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('horario');
            expect(response.body.horario).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^As informações sobre a disciplina "(.*)" de id "(.*)" foram salvas no banco de dados$/, async(name,id) => {
            expect(infoSaved(database.readNewDisciplines(),name,id,newDiscipline)).toBe(true);
        });
    });
    test('Edição de uma funcionalidade de uma Disciplina sem sucesso pelo Professor -- campo horario',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[8];
        let wrongString = "23/05/2024 a 30/06/2024 22:00"
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" já está presente no sistema$/, async(name,disciplinesID)=> {
            expect(disciplineExists(disciplines,name,disciplinesID)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.put(url).send({horario:wrongString});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('horario');
            expect(wrongString).toBe(value);
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
  
  
    
