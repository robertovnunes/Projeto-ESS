const supertest = require('supertest');
const app = require('../../apptest');

const server = app.listen(3001, () => {
    console.log('Testando');
});

const request = supertest(server);

module.exports = {
    request, server
}