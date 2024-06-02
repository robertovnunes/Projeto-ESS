const server = require('./conf/server');
const consign = require('consign');
app = server.server;


app.get('/', (req, res) => {
    app.locals.db = server.connect();
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .into(app);