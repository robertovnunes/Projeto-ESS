const express = require('express');

const port = 3001;

const server = express();
server.use(express.json())

const eventRoutes = require('../api/routes/event.routes.js');
const disciplineRoutes = require('../api/routes/discipline.routes.js');
server.use('/events', eventRoutes);
server.use('/disciplines', disciplineRoutes);

// server.use(cors());

// server.use(express.urlencoded({ extended: false }))

// import eventRoutes from './routes/event.routes.js';
// server.use('/events', eventRoutes);

server.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
    }
)

module.exports = server;
