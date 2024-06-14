const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../conf/.env') });

const port = 3001;

const server = express();

server.use(cors());
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

const url = encodeURI(process.env.MONGO_URL);

function connect() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
        server.listen(port, (req, res) => {
            console.log(`Listening on port ${port}`);
            }
        )
    })
}


module.exports = {server, connect};
