const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const AuthService = require('../../services/usuarios/authService');
const authService = new AuthService();

class LoginController {
    constructor() {
        this.authService = new AuthService();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async login(req, res) {
        try {
            const { login, senha } = req.body;
    
            // Verificar se login e senha foram fornecidos
            if (!login || !senha) {
                return res.status(400).send({message: 'Login e senha são obrigatórios'});
            }

            // Verificar se o usuário já está autenticado (verificando se há um token válido)
            //const existingToken = req.cookies.accessToken;
            //if (existingToken) {
            //return res.status(401).send({message: 'Usuário já está autenticado'});
            //}
    
            // Verificar se o usuário existe no banco de dados
            const usuario = await this.authService.getUserByLogin(login);
            if (!usuario.senha) {
                return res.status(401).send({message: 'Credenciais inválidas'});
            }

            // Comparar a senha fornecida com a senha armazenada no banco de dados
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            //console.log(senhaCorreta)
            if (!senhaCorreta) {
                return res.status(401).send({message: 'Credenciais Inválidas'});
            }
    
            // Gerar token JWT
            const token = this.authService.generateToken(usuario.login, usuario.tipo);

            // Armazenar o token JWT e outras informações em cookies
            res.cookie('accessToken', token, { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
            res.cookie('userType', usuario.tipo, { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
            res.cookie('login', usuario.login, { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
            res.cookie('nome', usuario.nome, { httpOnly: false, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
            
    
            // Retornar sucesso
            return res.status(200).send({message: 'Login realizado com sucesso'});
    
        } catch (error) {
            res.status(500).send({message: 'Erro interno do servidor'});
        }
    }
    

    async logout(req, res) {
        try {
            // Verificar se o usuário está autenticado (possui token de acesso válido)
            const decoded = this.authService.verifyAccessToken(req);
            /*if (!decoded) {
                console.log("usuário não atent")
                return res.status(400).send('Usuário não autenticado');
            }*/

            // Limpar todos os cookies relacionados ao login
            res.clearCookie('accessToken');
            res.clearCookie('userType');
            res.clearCookie('login');
            res.clearCookie('nome');

            
            res.status(200).send({message: 'Logout bem sucedido'});

            //console.log(res.cookie)
        } catch (error) {
            //console.error('Erro ao fazer logout:', error);
            res.status(500).send({message: 'Erro interno do servidor'});
        }
    }
}

module.exports = LoginController;
