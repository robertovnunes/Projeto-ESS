const server = require('./conf/server.js');
const consign = require('consign');
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger.js');

//server.use('/', swaggerUi.serve, swaggerUi.setup(specs));

server.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .into(server);

server.listen(3001, () => {
    console.log('Server running on port 3001');
});



module.exports = server;