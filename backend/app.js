const server = require('./conf/server');
const consign = require('consign');

const docs = require('./docs/swagger');

const app = server.server;

app.locals.db = server.connect();

app.use('/', docs);

app.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .then('controllers')
    .into(app);