const server = require('./conf/server');
const consign = require('consign');

const docs = require('./docs/swagger');

server.use('/', docs);

server.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .then('controllers')
    .into(server);
