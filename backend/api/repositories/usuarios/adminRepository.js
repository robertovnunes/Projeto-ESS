const UsuariosRepository = require('./usuariosRepository');
const path = require('path');

class AdminRepository extends UsuariosRepository {
    constructor() {
        super(path.join(__dirname, '../../../db/admins.json'));
    }
}

module.exports = AdminRepository;
