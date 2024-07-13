const shortid = require('shortid');

class BaseModel {
    constructor(){
        this.id = '04'+shortid.generate();
    }
}

module.exports = BaseModel;