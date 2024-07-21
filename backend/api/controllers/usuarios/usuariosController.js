const AuthService = require('../../services/usuarios/authService');
const bcrypt = require('bcryptjs');

class BaseController {
    constructor(service) {
        this.service = service;
        this.getAll = this.getAll.bind(this);
        this.getByLogin = this.getByLogin.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.AuthService = new AuthService();
    }

    async getAll(req, res) {
        console.log("Cheguei")
        try {
            console.log("Em getAll")
            // Verificar se o usuário está autenticado e recebe o tipo do usuário
            const existingToken = this.AuthService.isAuthenticatedAs(req);
            console.log(existingToken)

            if(!existingToken || ((await existingToken).userType != 'admin')){
                console.log("Não autorizado")
                return res.status(401).send({ message:'Acesso Restrito'});
            }
            

            const usuarios = await this.service.getAll();
            if (usuarios === 'Nenhum usuário cadastrado') {
                return res.status(404).send({ message:'Nenhum usuário cadastrado'});
            }
            res.status(200).send(usuarios);
        } catch (error) {
            res.status(500).send({ message:'INTERNAL SERVER ERROR'});
        }
    }

    async getByLogin(req, res) {
        try {
            const login = req.params.login;
            const usuario = await this.service.getByLogin(login);
            if (usuario === 'Usuário não encontrado') {
                return res.status(404).send({ message: 'Usuário não encontrado'});
            }
            res.status(200).send(usuario);
        } catch (error) {
            res.status(500).send({ message:'INTERNAL SERVER ERROR'});
        }
    }

    async create(req, res) {
        //console.log('ENTROU');
        try {
            // Verificar se o usuário está autenticado e recebe o tipo do usuário
            const existingToken = this.AuthService.isAuthenticatedAs(req);

            if(!existingToken || ((await existingToken).userType != 'admin')) {
                return res.status(401).send({ message: 'Acesso Restrito'});
            }

            const { nome, login, senha } = req.body;
    
            if (!nome || !login || !senha) {
                return res.status(400).send({ message: 'Campos nome, login e senha são obrigatórios' });
            }
    
            // Encriptar a senha
            const salt = await bcrypt.genSalt(10);
            const hashedSenha = await bcrypt.hash(senha, salt);

            // Criar o objeto novo Usuario com a senha encriptada
            const novoUsuario = { nome, login, senha: hashedSenha };
            const usuarioCriado = await this.service.create(novoUsuario);
            //console.log(usuarioCriado);
    
            if (usuarioCriado === 'Usuário já existe') {
                return res.status(409).send({ message: 'Usuário já existe'});
            }
            
            res.status(201).send(usuarioCriado);
        } catch (error) {
            res.status(500).send({ message: 'INTERNAL SERVER ERROR'});
        }
    }

    async delete(req, res) {
        try {
            // Verificar se o usuário está autenticado e recebe o tipo do usuário
            const existingToken = this.AuthService.isAuthenticatedAs(req);

            if(!existingToken || ((await existingToken).userType != 'admin')) 
                return res.status(401).send({ message:'Acesso Restrito'});
            
            const login = req.params.login;
            const deletado = await this.service.delete(login);
            if (deletado === 'Usuário não encontrado') {
                return res.status(404).send({ message:'Usuário não encontrado'});
            }
            return res.status(204).send({ message:'Usuário removido com sucesso'});
        } catch (error) {
            res.status(500).send({ message:'INTERNAL SERVER ERROR'});
        }
    }
}

module.exports = BaseController;
