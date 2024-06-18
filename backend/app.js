const server = require('./conf/server');
const consign = require('consign');
const swaggerUi = require('swagger-ui-express');

const specs = require('./docs/swagger');


//server.use('/', swaggerUi.serve, swaggerUi.setup(specs));

server.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .into(server);
