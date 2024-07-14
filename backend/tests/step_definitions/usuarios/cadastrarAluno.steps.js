const { loadFeature, defineFeature } = require('jest-cucumber');
const path = require('path');
const scrambler = require('./scrambler');
const {app, server} = require('../testApp');
const fs = require('fs').promises;

const feature = loadFeature('tests/features/usuarios/cadastrarAluno.feature');

const oldAlunos = path.resolve(__dirname, '../../mocks/usuarios/oldAlunos.json');
const newAlunos = path.resolve(__dirname, '../../mocks/usuarios/newAlunos.json');
const alunosDB = path.resolve(__dirname, '../../../db/alunos.json');

defineFeature(feature, (test) => {
    let cookies;
    let response;

    beforeAll(async () => {
        // Setup inicial, carregando a base de dados original
        await scrambler.setupForTestUsers(alunosDB, oldAlunos);

        // Fazendo login como administrador para obter os cookies de autenticação
        try {
            const loginResponse = await app.request.post('/usuarios/login').send({
                login: '9472',
                senha: '12345678'
            });
            // Extraindo os cookies da resposta de login
            cookies = loginResponse.headers['set-cookie'];
        } catch (error) {
            throw new Error(`Erro ao fazer login como administrador: ${error.message}`);
        }
    });

    afterAll(async () => {
        // Restaura a base de dados ao seu estado original após os testes
        await scrambler.setupForTestUsers(alunosDB, newAlunos);
        await app.request.delete('/usuarios/logout');
        await scrambler.setupForTestUsers(oldAlunos, alunosDB);
        server.close();
    });

    const checkUserDoesNotExist = (login, userType) => {
        const users = scrambler.readUsers(userType);
        const userExists = users.find(user => user.login === login);
        expect(userExists).toBeUndefined();
    };

    const sendRequest = async (endpoint, user) => {
        if (!cookies) {
            throw new Error('Cookies não foram definidos.');
        }
        try {
            const res = await app.request.post(endpoint)
                .set('Cookie', cookies)
                .send(user);
            response = res;
        } catch (error) {
            throw new Error(`Erro ao enviar requisição: ${error.message}`);
        }
    };

    const sendDelete = async (endpoint, user) => {
        if (!cookies) {
            throw new Error('Cookies não foram definidos.');
        }
        try {
            const res = await app.request.delete(endpoint)
                .set('Cookie', cookies)
                .send(user);
            response = res;
        } catch (error) {
            throw new Error(`Erro ao enviar requisição: ${error.message}`);
        }
    };

    const checkUserInDatabase = (login, shouldExist) => {
        const users = scrambler.readUsers(newAlunos);
        const user = users.find(u => u.login === login);
        if (shouldExist) {
            expect(user).toBeDefined();
            expect(user.login).toBe(login);
        } else {
            expect(user).toBeUndefined();
        }
    };

    const checkUserNotDuplicated = (login) => {
        const users = scrambler.readUsers(oldAlunos);
        const userOccurrences = users.filter(user => user.login === login);
        expect(userOccurrences.length).toBe(1); // Verifica se o usuário aparece apenas uma vez
    };

    test('Cadastrando um novo aluno com sucesso', ({ given, when, and, then }) => {
        given('não existe o usuário aluno com login "jc2"', () => {
            checkUserDoesNotExist('jc2', oldAlunos);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/alunos', {
                nome: 'Julio Cesar',
                login: 'jc2',
                senha: '12345678'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBe(nomeValue);
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBe(loginValue);
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body).toHaveProperty('senha');
        });

        then(/^o aluno de login "(.*)" está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(alunosDB, newAlunos)
            checkUserInDatabase(login, true);
        });
    });

    test('Cadastrando um novo aluno com o campo nome vazio', ({ given, when, and, then }) => {
        given('não existe o usuário aluno com login "mas2"', () => {
            checkUserDoesNotExist('mas2', oldAlunos);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/alunos', {
                nome: '',
                login: 'mas2',
                senha: 'sKBa87NO9@JE'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body.senha).toBeUndefined();
        });

        then(/^o aluno de login "(.*)" não está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(alunosDB, newAlunos)
            checkUserInDatabase(login, false);
        });

        and(/^a resposta "(.*)" foi enviada$/, (mensagem) => {
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um novo aluno com o campo login vazio', ({ given, when, and, then }) => {
        given('não existe o usuário aluno com login "mas2"', () => {
            checkUserDoesNotExist('mas2', oldAlunos);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/alunos', {
                nome: 'Amélia Maria Silva',
                login: '',
                senha: 'sKBa87NO9@JE'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body.senha).toBeUndefined();
        });

        then(/^o aluno de login "(.*)" não está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(alunosDB, newAlunos)
            checkUserInDatabase(login, false);
        });

        and(/^a resposta "(.*)" foi enviada$/, (mensagem) => {
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um novo aluno com o campo senha vazio', ({ given, when, and, then }) => {
        given('não existe o usuário aluno com login "mas2"', () => {
            checkUserDoesNotExist('mas2', oldAlunos);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/alunos', {
                nome: 'Amélia Maria Silva',
                login: 'mas2',
                senha: ''
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body.senha).toBeUndefined();
        });

        then(/^o aluno de login "(.*)" não está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(alunosDB, newAlunos)
            checkUserInDatabase(login, false);
        });

        and(/^a resposta "(.*)" foi enviada$/, (mensagem) => {
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um aluno duplicado', ({ given, when, and, then }) => {
        given(/^existe o usuário aluno com login "(.*)"$/, (login) => {
            scrambler.setupForTestUsers(alunosDB, newAlunos)
            checkUserInDatabase(login, oldAlunos);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/alunos', {
                nome: 'Juliana Silva',
                login: 'js3',
                senha: '12345678'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body.senha).toBeUndefined();
        });

        then(/^o usuário de login "(.*)" não foi adicionado novamente$/, (login) => {
            checkUserNotDuplicated(login);
        });

        and(/^a resposta "(.*)" foi enviada$/, (mensagem) => {
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Remover um aluno com sucesso', ({ given, when, then, and }) => {
        given(/^o usuário aluno com login "(.*)" está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(alunosDB, newAlunos)
            checkUserInDatabase(login, true);
        });

        when(/^eu recebo uma requisição DELETE para o endpoint "(.*)" do administrador de login "(.*)"$/, async (endpoint, adminLogin) => {
            const url = `/usuarios/${endpoint}`;
            await sendDelete(url, {});
        });

        then(/^o aluno de login "(.*)" foi removido do banco de dados$/, (login) => {
            scrambler.setupForTestUsers(alunosDB, newAlunos);

            checkUserInDatabase(login, false);
        });

        and(/^eu recebo com codigo "(.*)"$/, (codigo) => {
            expect(response.status).toBe(parseInt(codigo));
        });
    });
});
