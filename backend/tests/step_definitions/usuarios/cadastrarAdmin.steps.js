const { loadFeature, defineFeature } = require('jest-cucumber');
const path = require('path');
const scrambler = require('./scrambler');
const {app, server} = require('../testApp');

const feature = loadFeature('tests/features/usuarios/cadastrarAdmin.feature');

const oldAdmins = path.resolve(__dirname, '../../mocks/usuarios/oldAdmins.json');
const newAdmins = path.resolve(__dirname, '../../mocks/usuarios/newAdmins.json');
const adminsDB = path.resolve(__dirname, '../../../db/admins.json');

defineFeature(feature, (test) => {
    let cookies;
    let response;

    beforeAll(async () => {
        // Setup inicial, carregando a base de dados original
        await scrambler.setupForTestUsers(adminsDB, oldAdmins);

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
        await scrambler.setupForTestUsers(adminsDB, newAdmins);
        await app.request.delete('/usuarios/logout');
        await scrambler.setupForTestUsers(oldAdmins, adminsDB);
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

    const checkUserInDatabase = (login, shouldExist, base) => {
        const users = scrambler.readUsers(base);
        const user = users.find(u => u.login === login);
        if (shouldExist) {
            expect(user).toBeDefined();
            expect(user.login).toBe(login);
        } else {
            expect(user).toBeUndefined();
        }
    };

    const checkUserNotDuplicated = (login) => {
        const users = scrambler.readUsers(newAdmins);
        const userOccurrences = users.filter(user => user.login === login);
        expect(userOccurrences.length).toBe(1); // Verifica se o usuário aparece apenas uma vez
    };

    test('Cadastrando um novo administrador com sucesso', ({ given, when, and, then }) => {
        given('não existe o usuário administrador com login "9473"', () => {
            checkUserDoesNotExist('9473', oldAdmins);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/admins', {
                nome: 'Maria Santos',
                login: '9473',
                senha: 'sKBsu7NO9O27'
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

        then(/^o administrador de login "(.*)" está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(adminsDB, newAdmins)
            checkUserInDatabase(login, true, newAdmins);
        });
    });

    test('Cadastrando um novo administrador com o campo nome vazio', ({ given, when, and, then }) => {
        given('não existe o usuário administrador com login "9999"', () => {
            checkUserDoesNotExist('9999', oldAdmins);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/admins', {
                nome: '',
                login: '9999',
                senha: 'sKBsu7NO9O27'
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

        then(/^o administrador de login "(.*)" não está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(adminsDB, newAdmins)
            checkUserInDatabase(login, false, newAdmins);
        });

        and(/^eu recebo uma resposta de "(.*)" com codigo "(.*)"$/, (mensagem, codigo) => {
            expect(response.status).toBe(parseInt(codigo));
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um novo administrador com o campo login vazio', ({ given, when, and, then }) => {
        given('não existe o usuário administrador com login "9999"', () => {
            checkUserDoesNotExist('9999', oldAdmins);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/admins', {
                nome: 'Elena Santos',
                login: '',
                senha: 'sKBsu7NO9O27'
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

        then(/^o administrador de login "(.*)" não está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(adminsDB, newAdmins)
            checkUserInDatabase(login, false, newAdmins);
        });

        and(/^eu recebo uma resposta de "(.*)" com codigo "(.*)"$/, (mensagem, codigo) => {
            expect(response.status).toBe(parseInt(codigo));
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um novo administrador com o campo senha vazio', ({ given, when, and, then }) => {
        given('não existe o usuário administrador com login "9999"', () => {
            checkUserDoesNotExist('9999', oldAdmins);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/admins', {
                nome: 'Elena Santos',
                login: '9999',
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

        then(/^o administrador de login "(.*)" não está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(adminsDB, newAdmins)
            checkUserInDatabase(login, false, newAdmins);
        });

        and(/^eu recebo uma resposta de "(.*)" com codigo "(.*)"$/, (mensagem, codigo) => {
            expect(response.status).toBe(parseInt(codigo));
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um administrador duplicado', ({ given, when, and, then }) => {
        given(/^existe o usuário administrador com login "(.*)"$/, (login) => {
            checkUserInDatabase(login, true, adminsDB);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/admins', {
                nome: 'Amanda Gonçalves Santos',
                login: '8000',
                senha: 'sKBsu7NO9O27'
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
            scrambler.setupForTestUsers(adminsDB, newAdmins)
            checkUserNotDuplicated(login);
        });

        and(/^eu recebo uma resposta de "(.*)" com codigo "(.*)"$/, (mensagem, codigo) => {
            expect(response.status).toBe(parseInt(codigo));
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Remover um administrador com sucesso', ({ given, when, then, and }) => {
        given(/^o usuário administrador com login "(.*)" está no banco de dados$/, (login) => {
            checkUserInDatabase(login, true, adminsDB);
        });

        when(/^eu recebo uma requisição DELETE para o endpoint "(.*)" do administrador de login "(.*)"$/, async (endpoint, adminLogin) => {
            const url = `/usuarios/${endpoint}`;
            await sendDelete(url, {});
        });

        then(/^o administrador de login "(.*)" foi removido do banco de dados$/, (login) => {
            scrambler.setupForTestUsers(adminsDB, newAdmins);

            checkUserInDatabase(login, false, adminsDB);
        });

        and(/^eu recebo com codigo "(.*)"$/, (codigo) => {
            expect(response.status).toBe(parseInt(codigo));
        });
    });
});
