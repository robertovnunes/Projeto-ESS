const { loadFeature, defineFeature } = require('jest-cucumber');
const path = require('path');
const scrambler = require('./scrambler');
const app = require('../testApp');

const feature = loadFeature('tests/features/usuarios/cadastrarProfessor.feature');

const oldProfessores = path.resolve(__dirname, '../../mocks/usuarios/oldProfessores.json');
const newProfessores = path.resolve(__dirname, '../../mocks/usuarios/newProfessores.json');
const professoresDB = path.resolve(__dirname, '../../../db/professores.json');

defineFeature(feature, (test) => {
    let cookies;
    let response;

    beforeAll(async () => {
        // Setup inicial, carregando a base de dados original
        await scrambler.setupForTestUsers(professoresDB, oldProfessores);

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
        await scrambler.setupForTestUsers(professoresDB, newProfessores);
        await app.request.delete('/usuarios/logout');
        await scrambler.setupForTestUsers(oldProfessores, professoresDB);
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
        const users = scrambler.readUsers(newProfessores);
        const user = users.find(u => u.login === login);
        if (shouldExist) {
            expect(user).toBeDefined();
            expect(user.login).toBe(login);
        } else {
            expect(user).toBeUndefined();
        }
    };

    const checkUserNotDuplicated = (login) => {
        const users = scrambler.readUsers(newProfessores);
        const userOccurrences = users.filter(user => user.login === login);
        expect(userOccurrences.length).toBe(1); // Verifica se o usuário aparece apenas uma vez
    };

    test('Cadastrando um novo professor com sucesso', ({ given, when, and, then }) => {
        given(/^não existe o usuário professor com login "(.*)"$/, (login) => {
            checkUserDoesNotExist(login, oldProfessores);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/professores', {
                nome: 'Caio Santos',
                login: 'cs8',
                SIAPE: '8979462',
                senha: 'sKasw9NO95g4'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBe(nomeValue);
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBe(loginValue);
        });

        and(/^"SIAPE" "(.*)"$/, (siapeValue) => {
            expect(response.body.SIAPE).toBe(siapeValue);
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body).toHaveProperty('senha');
        });

        then(/^o professor de login "(.*)" está no banco de dados$/, (login) => {
            checkUserInDatabase(login, true);
        });
    });

    test('Cadastrando um novo professor com o campo nome vazio', ({ given, when, and, then }) => {
        given(/^não existe o usuário professor com login "(.*)"$/, (login) => {
            checkUserDoesNotExist(login, oldProfessores);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/professores', {
                nome: '',
                login: 'jml',
                SIAPE: '8979345',
                senha: 'sKBa87NO9@JE'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"SIAPE" "(.*)"$/, (siapeValue) => {
            expect(response.body.SIAPE).toBeUndefined();
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body.senha).toBeUndefined();
        });

        then(/^o professor de login "(.*)" não está no banco de dados$/, (login) => {
            checkUserInDatabase(login, false);
        });

        and(/^a resposta "(.*)" foi enviada$/, (mensagem) => {
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um novo professor com o campo login vazio', ({ given, when, and, then }) => {
        given(/^não existe o usuário professor com login "(.*)"$/, (login) => {
            checkUserDoesNotExist(login, oldProfessores);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/professores', {
                nome: 'Jorge Moisés Lima',
                login: '',
                SIAPE: '8979345',
                senha: 'sKBa87NO9@JE'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"SIAPE" "(.*)"$/, (siapeValue) => {
            expect(response.body.SIAPE).toBeUndefined();
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body.senha).toBeUndefined();
        });

        then(/^o professor de login "(.*)" não está no banco de dados$/, (login) => {
            checkUserInDatabase(login, false);
        });

        and(/^a resposta "(.*)" foi enviada$/, (mensagem) => {
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um novo professor com o campo SIAPE vazio', ({ given, when, and, then }) => {
        given(/^não existe o usuário professor com login "(.*)"$/, (login) => {
            checkUserDoesNotExist(login, oldProfessores);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/professores', {
                nome: 'Amélia Maria Silva',
                login: 'mas2',
                SIAPE: '',
                senha: '12345678'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"SIAPE" "(.*)"$/, (siapeValue) => {
            expect(response.body.SIAPE).toBeUndefined();
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body.senha).toBeUndefined();
        });

        then(/^o professor de login "(.*)" não está no banco de dados$/, (login) => {
            checkUserInDatabase(login, false);
        });

        and(/^a resposta "(.*)" foi enviada$/, (mensagem) => {
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um novo professor com o campo senha vazio', ({ given, when, and, then }) => {
        given(/^não existe o usuário professor com login "(.*)"$/, (login) => {
            checkUserDoesNotExist(login, oldProfessores);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/professores', {
                nome: 'Amélia Maria Silva',
                login: 'mas2',
                SIAPE: '8979345',
                senha: ''
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"SIAPE" "(.*)"$/, (siapeValue) => {
            expect(response.body.SIAPE).toBeUndefined();
        });

        and(/^"senha" "(.*)"$/, () => {
            expect(response.body.senha).toBeUndefined();
        });

        then(/^o professor de login "(.*)" não está no banco de dados$/, (login) => {
            checkUserInDatabase(login, false);
        });

        and(/^a resposta "(.*)" foi enviada$/, (mensagem) => {
            expect(response.body.message).toBe(mensagem);
        });
    });

    test('Cadastrando um professor duplicado', ({ given, when, and, then }) => {
        given(/^existe o usuário professor com login "(.*)"$/, (login) => {
            checkUserInDatabase(login, oldProfessores);
        });

        when('eu recebo uma requisição "/POST" do administrador de login "9472"', async () => {
            await sendRequest('/usuarios/professores', {
                nome: 'Charles Francis Xavier',
                login: 'cfx',
                SIAPE: '8888811',
                senha: '234wsdg456'
            });
        });

        and(/^"nome" "(.*)"$/, (nomeValue) => {
            expect(response.body.nome).toBeUndefined();
        });

        and(/^"login" "(.*)"$/, (loginValue) => {
            expect(response.body.login).toBeUndefined();
        });

        and(/^"SIAPE" "(.*)"$/, (siapeValue) => {
            expect(response.body.SIAPE).toBeUndefined();
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

    test('Remover um professor com sucesso', ({ given, when, then, and }) => {
        given(/^o usuário professor com login "(.*)" está no banco de dados$/, (login) => {
            scrambler.setupForTestUsers(professoresDB, newProfessores);
            checkUserInDatabase(login, true,);
        });

        when(/^eu recebo uma requisição DELETE para o endpoint "(.*)" do administrador de login "(.*)"$/, async (endpoint, adminLogin) => {
            const url = `/usuarios/${endpoint}`;
            await sendDelete(url, {});
        });

        then(/^o professor de login "(.*)" foi removido do banco de dados$/, (login) => {
            scrambler.setupForTestUsers(professoresDB, newProfessores);

            checkUserInDatabase(login, false);
        });

        and(/^eu recebo com codigo "(.*)"$/, (codigo) => {
            expect(response.status).toBe(parseInt(codigo));
        });
    });
});
