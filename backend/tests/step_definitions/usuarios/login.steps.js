const { loadFeature, defineFeature } = require('jest-cucumber');
const app = require('../../../apptest');
const supertest = require ('supertest');

const feature = loadFeature('tests/features/usuarios/loginLogout.feature');
defineFeature(feature, (test) => {
    //const request = supertest(app);
    let accessToken;
    let request, response, server, cookies;
    server = app.listen(3001, () => {
        console.log('Testando...');
    });
    request = supertest(server); 

    beforeEach(() => {
        // Limpa o token de acesso antes de cada teste
        accessToken = undefined;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        server.close();
    });

    // Função para extrair o token de acesso dos cookies
    const extractAccessToken = (response) => {
        const cookies = response.headers['set-cookie'];
        if (cookies) {
            const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));
            if (accessTokenCookie) {
                accessToken = accessTokenCookie.split('=')[1].split(';')[0];
            }
        }
    };

    // Given steps
    const givenUserExists = (given) => {
        given(/^existe um usuário com login "(.*)" e senha "(.*)"$/, (login, password) => {
            this.login = login;
            this.password = password;
        });
    };

    const givenUserDoesNotExist = (given) => {
        given(/^não existe um usuário com login "(.*)" e senha "(.*)"$/, (login, password) => {
            this.login = login;
            this.password = password;
        });
    };

    const givenUserIsLoggedIn = (given) => {
        given(/^eu estou logado na conta de login "(.*)" com um token de autenticação$/, async (login) => {
            const response = await request.post('/usuarios/login').send({
                login: login,
                senha: '12345678'
            });
            expect(response.status).toBe(200);
            extractAccessToken(response); // Extrai e armazena o token de acesso dos cookies
        });
    };

    // When steps
    const whenLoginRequestIsMade = (when) => {
        when(/^eu envio uma requisição "(.*)" para o endpoint "(.*)"$/, async (method, endpoint) => {
            const response = await request.post(endpoint).send({
                login: this.login,
                senha: this.password
            });
            this.response = response;
            extractAccessToken(response); // Extrai e armazena o token de acesso dos cookies
        });
    };

    const whenLogoutRequestIsMade = (when) => {
        when(/^eu envio uma requisição "(.*)" para o endpoint "(.*)"$/, async (method, endpoint) => {
            const response = await request.post(endpoint).set('Cookie', `accessToken=${accessToken}`);
            this.response = response;
        });
    };

    // And steps
    const andSetLoginCredentials = (and) => {
        and(/^"login" "(.*)"$/, (login) => {
            this.login = login;
        });

        and(/^"senha" "(.*)"$/, (password) => {
            this.password = password;
        });
    };

    // Then steps
    const thenResponseCodeIs = (then) => {
        then(/^eu recebo uma resposta de "(.*)" com codigo "(.*)"$/, (message, statusCode) => {
            expect(this.response.status).toBe(parseInt(statusCode, 10));
            expect(this.response.body.message).toBe(message);
        });
    };

    const thenUserHasAuthToken = (then) => {
        then(/^o usuário tem um token de autenticação$/, () => {
            expect(accessToken).toBeDefined();
        });
    };

    const thenUserHasNoAuthToken = (then) => {
        then(/^o usuário não tem um token de autenticação$/, () => {
            expect(accessToken).toBeUndefined();
        });
    };

    const thenTokenIsRemoved = (then) => {
        then(/^o token de autenticação foi removido$/, () => {
            const cookies = this.response.headers['set-cookie'];
            expect(cookies).toBeUndefined();
        });
    };    

        
    // Scenario tests
    test('Login com sucesso', ({ given, when, and, then }) => {
        givenUserExists(given);
        whenLoginRequestIsMade(when);
        andSetLoginCredentials(and);
        thenResponseCodeIs(then);
        thenUserHasAuthToken(then);
    });

    test('Login sem sucesso', ({ given, when, and, then }) => {
        givenUserDoesNotExist(given);
        whenLoginRequestIsMade(when);
        andSetLoginCredentials(and);
        thenResponseCodeIs(then);
        thenUserHasNoAuthToken(then);
    });

    test('Sair de uma conta', ({ given, when, then }) => {
        givenUserIsLoggedIn(given);
        whenLogoutRequestIsMade(when);
        thenTokenIsRemoved(then);
    }); 
});
