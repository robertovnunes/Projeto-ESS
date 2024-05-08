import express from 'express';

const port = 3000;

const server = express();

server.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
    }
)

export default server;
