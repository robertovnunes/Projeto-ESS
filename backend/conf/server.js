const express = require('express');
const cookieParser = require('cookie-parser');

const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: false }))

// Middleware cookie-parser
server.use(cookieParser());

///ATENCAO
/*
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 
*/

module.exports = server;
