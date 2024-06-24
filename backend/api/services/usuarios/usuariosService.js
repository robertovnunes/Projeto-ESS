class UsuariosService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        const usuarios = await this.repository.getAll();
        return usuarios.length === 0 ? 'Nenhum usuário cadastrado' : usuarios;
    }

    async getByLogin(login) {
        const usuario = await this.repository.getByLogin(login);
        return usuario ? usuario : 'Usuário não encontrado';
    }

    async create(novoUsuario) {
        const existe = await this.repository.getByLogin(novoUsuario.login);
        if (existe != "Usuário não encontrado") {
            return 'Usuário já existe';
        }
        //console.log(existe);
        return await this.repository.create(novoUsuario);
    }

    async delete(login) {
        const deletado = await this.repository.delete(login);
        //console.log(deletado);
        return deletado ? deletado : 'Usuário não encontrado';
    }
}

module.exports = UsuariosService;
