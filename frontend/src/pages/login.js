// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa o axios
import { useColor } from '../context/userColorContext'; // Importe o contexto de cor
import logo from '../assets/CIn_logo.png'; // Importa a logo (ajuste o caminho conforme necessário)
import '../style/Login.css'; // Importe o CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginAttempted, setIsLoginAttempted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { updateColor } = useColor(); // Use o contexto para obter a função de atualizar a cor

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoginAttempted(true);

    try {
      // Enviando requisição para o backend
      const response = await axios.post('usuarios/login', {
        login: username,
        senha: password
      }, { withCredentials: true });

      if (response.status === 200) {
        updateColor(); // Atualiza a cor ao fazer login
        navigate('/mainpage');
      }
    } catch (error) {
      console.error('Detalhes do erro:', error);
      setErrorMessage(error.response?.data?.message || 'Erro ao fazer login');
      setUsernameError(true);
      setPasswordError(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setUsername(value);
      if (isLoginAttempted) {
        setUsernameError(false);
      }
    } else if (name === 'password') {
      setPassword(value);
      if (isLoginAttempted) {
        setPasswordError(false);
      }
    }

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
          <div className="login-form-group">
            <label htmlFor="username">Login</label>
            <div className="input-container">
              <input 
                type="text" 
                id="username"
                name="username"
                value={username} 
                onChange={handleInputChange}
                required 
                className={`form-input ${usernameError && isLoginAttempted ? 'error-input' : ''}`} 
              />
              {isLoginAttempted && <i className={`fas fa-exclamation-circle input-icon ${usernameError ? 'show' : 'hide'}`}></i>}
            </div>
          </div>
          {isLoginAttempted && errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="login-form-group">
            <label htmlFor="password">Senha</label>
            <div className="input-container">
              <input 
                type="password" 
                id="password"
                name="password"
                value={password} 
                onChange={handleInputChange}
                required 
                className={`form-input ${passwordError && isLoginAttempted ? 'error-input' : ''}`} 
              />
              {isLoginAttempted && <i className={`fas fa-exclamation-circle input-icon ${passwordError ? 'show' : 'hide'}`}></i>}
            </div>
          </div>
          <button type="submit" className="login-submit-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
