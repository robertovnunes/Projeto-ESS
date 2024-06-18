const server = require('./conf/server.js');
const consign = require('consign');
const swaggerUi = require('swagger-ui-express');
const specs = require('../docs/swagger.js');

//server.use('/', swaggerUi.serve, swaggerUi.setup(specs));

server.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .into(server);

module.exports = server;