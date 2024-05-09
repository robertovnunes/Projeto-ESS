const express = require('express');
const cors = require('cors');

const port = 3000;

const server = express();

server.use(cors());
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
    }
)

module.exports = server;
