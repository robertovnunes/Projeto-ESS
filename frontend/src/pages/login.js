import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CIn_logo.png'; // Importa a logo (ajuste o caminho conforme necessário)
import '../style/Login.css'; // Importe o CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro
  const [isLoginAttempted, setIsLoginAttempted] = useState(false); // Estado para controlar se a tentativa de login foi feita
  const [usernameError, setUsernameError] = useState(false); // Estado para erro de username
  const [passwordError, setPasswordError] = useState(false); // Estado para erro de senha
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar credenciais (exemplo: login = 'aaa', senha = '123')
    const usernameIsValid = username === 'aaa';
    const passwordIsValid = password === '123';

    setIsLoginAttempted(true); // Marca que a tentativa de login foi feita

    if (usernameIsValid && passwordIsValid) {
      // Credenciais corretas, redireciona para /mainpage
      navigate('/mainpage');
    } else {
      // Credenciais incorretas, define a mensagem de erro
      setErrorMessage('Login ou senha incorretos');
      setUsernameError(!usernameIsValid);
      setPasswordError(!passwordIsValid);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setUsername(value);
      if (isLoginAttempted) {
        setUsernameError(false); // Limpa o erro de username ao digitar
      }
    } else if (name === 'password') {
      setPassword(value);
      if (isLoginAttempted) {
        setPasswordError(false); // Limpa o erro de senha ao digitar
      }
    }

    // Limpa a mensagem de erro ao digitar
    if (isLoginAttempted) {
      setErrorMessage('');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo da Empresa" className="logo" />
      <div className="login-box">
        <h2>Entrar na sua conta</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Login</label>
            <div className="input-container">
              <input 
                type="text" 
                name="username"
                value={username} 
                onChange={handleInputChange}
                required 
                className={`form-input ${usernameError && isLoginAttempted ? 'error-input' : ''}`} // Adiciona classe se houver erro e a tentativa de login foi feita
              />
              {isLoginAttempted && <i className={`fas fa-exclamation-circle input-icon ${usernameError ? 'show' : 'hide'}`}></i>} {/* Exibe o ícone de erro se houver erro e a tentativa de login foi feita */}
            </div>
          </div>
          {isLoginAttempted && errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro somente se a tentativa de login foi feita */}
          <div className="form-group">
            <label>Senha</label>
            <div className="input-container">
              <input 
                type="password" 
                name="password"
                value={password} 
                onChange={handleInputChange}
                required 
                className={`form-input ${passwordError && isLoginAttempted ? 'error-input' : ''}`} // Adiciona classe se houver erro e a tentativa de login foi feita
              />
              {isLoginAttempted && <i className={`fas fa-exclamation-circle input-icon ${passwordError ? 'show' : 'hide'}`}></i>} {/* Exibe o ícone de erro se houver erro e a tentativa de login foi feita */}
            </div>
          </div>
          <button type="submit" className="submit-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
