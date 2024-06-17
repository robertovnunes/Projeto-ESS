/*
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
*/


const express = require('express');
const app = express();
const comentariosRoutes = require('./api/routes/comentarios.routes');

app.use(express.json());
app.use('/api', comentariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/*
const app = require('./conf/server');
const consign = require('consign');

//const docs = require('./docs/swagger');

//app.use('/', docs);

app.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .then('controllers')
    .into(app);

*/