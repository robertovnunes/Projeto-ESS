const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 3001;

const server = express();

server.use(cors({
    origin: 'http://localhost:3000', // Substitua pelo URL do seu frontend
    credentials: true
}));
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

// Middleware cookie-parser
server.use(cookieParser());

///ATENCAO
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 

module.exports = server;
