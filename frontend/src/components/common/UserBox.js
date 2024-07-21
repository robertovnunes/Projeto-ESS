// src/components/Common/UserBox.js

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import '../../style/UserBox.css';

const UserBox = ({ showUserBox, bgColor }) => {
  const navigate = useNavigate();
  const userName = Cookie.get('nome') || 'Usuário';
  const userType = Cookie.get('userType') || 'Desconhecido';
  const initial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    console.log("Tentando fazer logout...");
    try {
      const response = await axios.delete('/usuarios/logout', { withCredentials: true });
      console.log("Logout bem-sucedido:", response);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    showUserBox && (
      <div className="user-box">
        <div className="user-box-icon" style={{ backgroundColor: bgColor }}>
          {initial}
        </div>
        <p className="user-box-name">{userName}</p>
        <p className="user-box-type">{userType}</p>
        <button className="user-box-button">Gerenciar Conta</button>
        <button className="user-box-button" onClick={handleLogout}>Sair</button>
      </div>
    )
  );
};

export default UserBox;
