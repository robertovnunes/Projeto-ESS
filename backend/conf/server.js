const express = require('express');
const cors = require('cors');

const port = 4000;

const server = express();

server.use(cors());
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

const eventRoutes = require('../api/routes/event.routes.js');
const disciplineRoutes = require('../api/routes/discipline.routes.js');
server.use('/events', eventRoutes);
server.use('/disciplines', disciplineRoutes);

if (process.env.NODE_ENV !== 'test') {
    server.listen(port, (req, res) => {
        console.log(`Listening on port ${port}`)});
}

module.exports = server;
