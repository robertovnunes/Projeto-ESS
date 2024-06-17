const supertest = require('supertest');
const index = require('/home/mariana/Documents/Projeto-ESS/backend/conf/index.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('./databaseScramble');
const request = supertest(index);

const feature = loadFeature('/home/mariana/Documents/Projeto-ESS/backend/tests/features/eventos/adicionarDisciplina.feature');

const disciplineExists = (disciplineList, name, disciplineID) => {
    let found = false;
    disciplineList.forEach(discipline => {
        if(discipline.nome === name && discipline.disciplineID === disciplineID) {
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
    test('Cadastro de uma Disciplina com sucesso pelo Usuário Professor com descrição, curso e periódo vazios',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[0];

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" não está no sistema$/, async(name,disciplineID)=> {
            expect(disciplineExists(disciplines, name, disciplineID)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({nome:newDiscipline.nome, disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, description: newDiscipline.description, disciplineCurso:newDiscipline.disciplineCurso, disciplinePeriodo:newDiscipline.disciplinePeriodo});
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
            expect(response.body.description).toBe("");
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplineCurso');
            expect(response.body.disciplineCurso).toBe("");
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplinePeriodo');
            expect(response.body.disciplinePeriodo).toBe("");
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^A disciplina "(.*)" de id "(.*)" está no banco de dados$/,  async(nome,id) => {
            expect(disciplineExists(newDisciplines, nome, id)).toBe(true);
        });
     });
     test('Cadastro de uma Disciplina com sucesso pelo Usuário Professor com descrição e periódo vazios',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[1];

    
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" não está no sistema$/, async(name,disciplineID)=> {
            expect(disciplineExists(disciplines, name, disciplineID)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({nome:newDiscipline.nome, disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
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
            expect(response.body.description).toBe("");
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplineCurso');
            expect(response.body.disciplineCurso).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplinePeriodo');
            expect(response.body.disciplinePeriodo).toBe("");
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^A disciplina "(.*)" de id "(.*)" está no banco de dados$/,  async(nome,id) => {
            expect(disciplineExists(newDisciplines, nome, id)).toBe(true);
        });
     });
     test('Cadastro de uma Disciplina com sucesso pelo Usuário Professor com curso e periódo vazios',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[2];
            
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" não está no sistema$/, async(name,disciplineID)=> {
            expect(disciplineExists(disciplines, name, disciplineID)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({nome:newDiscipline.nome, disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
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
        and(/^A disciplina "(.*)" de id "(.*)" está no banco de dados$/,  async(nome,id) => {
            expect(disciplineExists(newDisciplines, nome, id)).toBe(true);
        });
     });
     test('Cadastro de uma Disciplina com sucesso pelo Usuário Professor com descrição e curso vazios',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[3];
            
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" não está no sistema$/, async(name,disciplineID)=> {
            expect(disciplineExists(disciplines, name, disciplineID)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({nome:newDiscipline.nome, disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
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
        and(/^A disciplina "(.*)" de id "(.*)" está no banco de dados$/,  async(nome,id) => {
            expect(disciplineExists(newDisciplines, nome, id)).toBe(true);
        });
     });
     test('Cadastro de uma Disciplina com sucesso pelo Usuário Professor',({ given, when, then,and }) => {
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
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({nome:newDiscipline.nome, disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
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
        and(/^A disciplina "(.*)" de id "(.*)" está no banco de dados$/,  async(nome,id) => {
            expect(disciplineExists(newDisciplines, nome, id)).toBe(true);
        });
     });
     test('Cadastro de uma Disciplina sem sucesso pelo Usuário Professor (já está cadastrado no sistema)',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[0];
            
        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" já está presente no sistema$/, async(name,id)=> {
            expect(disciplineExists(newDisciplines, name, id)).toBe(true);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response2 = await request.post(url).send({nome:newDiscipline.nome, disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('nome');
            expect(newDiscipline.nome).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('disciplineID');
            expect(value).toBe(newDiscipline.disciplineID);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(newDiscipline.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('horario');
            expect(newDiscipline.horario).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
            expect(response2.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
     });
     test('Cadastro de uma Disciplina sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo nome)',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = newDisciplines[0];
            
                given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
                    expect(userName).toBe('bafm');
                    expect(userType).toBe('professor');
                });
                when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
                    expect(userName).toBe('bafm');
                    response2 = await request.post(url).send({nome:"", disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
                });
                and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                    expect(field).toBe('nome');
                    expect("").toBe(value);
                });
                and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                    expect(field).toBe('disciplineID');
                    expect(value).toBe(newDiscipline.disciplineID);
                });
                and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                    expect(field).toBe('responsibleTeacher');
                    expect(newDiscipline.responsibleTeacher).toBe(value);
                });
                and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                    expect(field).toBe('horario');
                    expect(newDiscipline.horario).toBe(value);
                });
                then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
                   expect(response2.status).toBe(parseInt(statusCode,10));
                });
                and(/^A mensagem "(.*)" é exibida$/, async(message) => {
                    const messageFound = consoleOutput.some(output => output.includes(message));
                    expect(messageFound).toBe(true);
                });
            });
        test('Cadastro de uma Disciplina sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo disciplineID)',({ given, when, then,and }) => {
            let disciplines = database.readOldDisciplines();
            let newDisciplines = database.readNewDisciplines();
            let newDiscipline = newDisciplines[0];
                
                given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
                    expect(userName).toBe('bafm');
                    expect(userType).toBe('professor');
                });
                when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
                    expect(userName).toBe('bafm');
                    response2 = await request.post(url).send({nome:newDiscipline.nome, disciplineID:"",responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
                });
                and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                    expect(field).toBe('nome');
                    expect(newDiscipline.nome).toBe(value);
                });
                and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                    expect(field).toBe('disciplineID');
                    expect(value).toBe("");
                });
                and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                    expect(field).toBe('responsibleTeacher');
                    expect(newDiscipline.responsibleTeacher).toBe(value);
                });
                and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                    expect(field).toBe('horario');
                    expect(newDiscipline.horario).toBe(value);
                });
                then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
                    expect(response2.status).toBe(parseInt(statusCode,10));
                });
                and(/^A mensagem "(.*)" é exibida$/, async(message) => {
                    const messageFound = consoleOutput.some(output => output.includes(message));
                    expect(messageFound).toBe(true);
                });
            });
            test('Cadastro de uma Disciplina sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo horario)',({ given, when, then,and }) => {
                let disciplines = database.readOldDisciplines();
                let newDisciplines = database.readNewDisciplines();
                let newDiscipline = newDisciplines[0];
                    
                    given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
                        expect(userName).toBe('bafm');
                        expect(userType).toBe('professor');
                    });
                    when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
                        expect(userName).toBe('bafm');
                        response2 = await request.post(url).send({nome:newDiscipline.nome, disciplineID:newDiscipline.disciplineID,responsibleTeacher:newDiscipline.responsibleTeacher,horario: "", disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
                    });
                    and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                        expect(field).toBe('nome');
                        expect(newDiscipline.nome).toBe(value);
                    });
                    and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                        expect(field).toBe('disciplineID');
                        expect(value).toBe(newDiscipline.disciplineID);
                    });
                    and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                        expect(field).toBe('responsibleTeacher');
                        expect(newDiscipline.responsibleTeacher).toBe(value);
                    });
                    and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                        expect(field).toBe('horario');
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
                test('Cadastro de uma Disciplina sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo responsibleTeacher)',({ given, when, then,and }) => {
                    let disciplines = database.readOldDisciplines();
                    let newDisciplines = database.readNewDisciplines();
                    let newDiscipline = newDisciplines[0];
                        
                        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
                            expect(userName).toBe('bafm');
                            expect(userType).toBe('professor');
                        });
                        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
                            expect(userName).toBe('bafm');
                            response2 = await request.post(url).send({nome:newDiscipline.nome, disciplineID:newDiscipline.disciplineID,responsibleTeacher:"",horario: newDiscipline.horario, disciplineCurso: newDiscipline.disciplineCurso,description:newDiscipline.description,disciplinePeriodo:newDiscipline.disciplinePeriodo});
                        });
                        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                            expect(field).toBe('nome');
                            expect(newDiscipline.nome).toBe(value);
                        });
                        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                            expect(field).toBe('disciplineID');
                            expect(value).toBe(newDiscipline.disciplineID);
                        });
                        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                            expect(field).toBe('responsibleTeacher');
                            expect("").toBe(value);
                        });
                        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
                            expect(field).toBe('horario');
                            expect(newDiscipline.horario).toBe(value);
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