const supertest = require('supertest');
const server = require('../../app');

const request = supertest(server);

module.exports = {
    request
}