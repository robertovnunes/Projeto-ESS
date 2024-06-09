import express from 'express';

const port = 3001;

const server = express();
server.use(express.json())

import eventRoutes from '../api/routes/event.routes.js';
server.use('/events', eventRoutes);


// server.use(cors());

// server.use(express.urlencoded({ extended: false }))

// import eventRoutes from './routes/event.routes.js';
// server.use('/events', eventRoutes);

server.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
    }
)

//module.exports = server;
