const server = require('./conf/server');
const consign = require('consign');

server.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .into(server);