const supertest = require('supertest');
const index = require('/home/mariana/Documents/Projeto-ESS/backend/conf/index.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('./databaseScramble');
//const { response } = require('express');
const request = supertest(index);

const feature = loadFeature('/home/mariana/Documents/Projeto-ESS/backend/tests/features/eventos/editarDisciplina.feature');

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
    // test('Edição de algumas funcionalidades de um Evento com sucesso pelo Professor - eventName e responsibleTeacher',({ given, when, then,and }) => {
    //     let eventos = database.readOldEvents();
    //     let newEventos = database.readNewEvents();
    //     let newEvento = newEventos[5];

    //     given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
    //         expect(userName).toBe('bafm');
    //         expect(userType).toBe('professor');
    //     });
    //     and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(name,time)=> {
    //         expect(eventExists(eventos,name,time)).toBe(true);
    //     });
    //     when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
    //         expect(userName).toBe('bafm');
    //         response = await request.put(url).send({eventName:newEvento.eventName,responsibleTeacher:newEvento.responsibleTeacher});
    //     });
    //     and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
    //         expect(field).toBe('eventName');
    //         expect(response.body.eventName).toBe(value);
    //     });
    //     and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
    //         expect(field).toBe('responsibleTeacher');
    //         expect(response.body.responsibleTeacher).toBe(value);
    //     });
    //     then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
    //     expect(response.status).toBe(parseInt(statusCode,10));
    //     });
    //     and(/^A mensagem "(.*)" é exibida$/, async(message) => {
    //         const messageFound = consoleOutput.some(output => output.includes(message));
    //         expect(messageFound).toBe(true);
    //     });
    //     and(/^As informações sobre o evento "(.*)" de data "(.*)" foram salvas no banco de dados$/, async(name,time) => {
    //         expect(infoSaved(database.readNewEvents(),name,time,newEvento)).toBe(true);
    //     });
    // });
    // test('Edição de apenas uma funcionalidade de um Evento com sucesso pelo Professor - eventDateAndTime',({ given, when, then,and }) => {
    //     let eventos = database.readOldEvents();
    //     let newEventos = database.readNewEvents();
    //     let newEvento = newEventos[6];

    //     given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
    //         expect(userName).toBe('bafm');
    //         expect(userType).toBe('professor');
    //     });
    //     and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(name,time)=> {
    //         expect(eventExists(eventos,name,time)).toBe(true);
    //     });
    //     when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
    //         expect(userName).toBe('bafm');
    //         response = await request.put(url).send({eventDateAndTime:newEvento.eventDateAndTime});
    //     });
    //     and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
    //         expect(field).toBe('eventDateAndTime');
    //         expect(response.body.eventDateAndTime).toContain(value);
    //     });
    //     then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
    //     expect(response.status).toBe(parseInt(statusCode,10));
    //     });
    //     and(/^A mensagem "(.*)" é exibida$/, async(message) => {
    //         const messageFound = consoleOutput.some(output => output.includes(message));
    //         expect(messageFound).toBe(true);
    //     });
    //     and(/^As informações sobre o evento "(.*)" de data "(.*)" foram salvas no banco de dados$/, async(name,time) => {
    //         expect(infoSaved(database.readNewEvents(),name,time,newEvento)).toBe(true);
    //     });
    // });
    // test('Edição de apenas uma funcionalidade de um Evento sem sucesso pelo Professor - eventDateAndTime',({ given, when, then,and }) => {
    //     let eventos = database.readOldEvents();
    //     let newEventos = database.readNewEvents();
    //     let newEvento = newEventos[6];
    //     let wrongString = "06-08-2024 17:00";

    //     given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
    //         expect(userName).toBe('bafm');
    //         expect(userType).toBe('professor');
    //     });
    //     and(/^O evento "(.*)" na data "(.*)" já está presente no sistema$/, async(name,time)=> {
    //         expect(eventExists(eventos,name,time)).toBe(true);
    //     });
    //     when(/^O usuário "(.*)" manda uma requisição PUT para "(.*)"$/, async(userName, url) => {
    //         expect(userName).toBe('bafm');
    //         response = await request.put(url).send({eventDateAndTime:wrongString});
    //     });
    //     and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
    //         expect(field).toBe('eventDateAndTime');
    //         expect(wrongString).toContain(value);
    //     });
    //     then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
    //     expect(response.status).toBe(parseInt(statusCode,10));
    //     });
    //     and(/^A mensagem "(.*)" é exibida$/, async(message) => {
    //         const messageFound = consoleOutput.some(output => output.includes(message));
    //         expect(messageFound).toBe(true);
    //     });
    // });
});
  
  
    
