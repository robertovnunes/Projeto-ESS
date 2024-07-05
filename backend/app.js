const app = require('./conf/server.js');
const consign = require('consign');
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger.js');
const cors = require('cors');
const port = 3001;

//app.use('/', swaggerUi.serve, swaggerUi.setup(specs)); 

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

consign({ cwd: 'api'})
    .include('routes')
    .into(app);

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});

module.exports = app;