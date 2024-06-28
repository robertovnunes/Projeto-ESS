const app = require('./conf/server.js');
const consign = require('consign');
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger.js');

//app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .into(app);



module.exports = app;