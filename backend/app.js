const app = require('./conf/server');
const consign = require('consign');

const docs = require('./docs/swagger');

app.use('/', docs);

app.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .then('controllers')
    .into(app);