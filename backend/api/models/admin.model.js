const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'admins.json');

const loadDatabase = () => {

    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
};

const writeDatabase = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { loadDatabase, writeDatabase };