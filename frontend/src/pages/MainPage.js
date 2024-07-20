import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa o axios
import '../style/MainPage.css'; // Importe o arquivo CSS
import Cookie from 'js-cookie'; // Importe a biblioteca js-cookie

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MainPage = () => {
  const [bgColor, setBgColor] = useState('#000');
  const [showUserBox, setShowUserBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  const userName = Cookie.get('nome') || 'Usuário';
  const userType = Cookie.get('userType') || 'Desconhecido';

  const initial = userName.charAt(0).toUpperCase();

  const toggleUserBox = () => {
    setShowUserBox(!showUserBox);
  };

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
    <div className="main-container">
      <div className="navbar">
        <div className="left-icon">
          <img src="https://lh4.googleusercontent.com/UWBMt17Qkq10a7DcQ1lxWGriFmMY1ZHUiNDHoYcenrPcOFPdjbBwbM94TW_mF21UIqq3x_rbHm1SeSadxggm56w=w16383" alt="Ícone Esquerdo" />
        </div>
        <div className="user-icon" style={{ backgroundColor: bgColor }} onClick={toggleUserBox}>
          {initial}
        </div>
      </div>
      {showUserBox && (
        <div className="user-box">
          <div className="user-box-icon" style={{ backgroundColor: bgColor }}>
            {initial}
          </div>
          <p className="user-box-name">{userName}</p>
          <p className="user-box-type">{userType}</p>
          <button className="user-box-button">Gerenciar Conta</button>
          <button className="user-box-button" onClick={handleLogout}>Sair</button>
        </div>
      )}
      <div className="content">
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>Página Principal</h2>
          <p>Bem-vindo à página principal do site!</p>
          <p>Acho que deve aparecer as reservas do usuário.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;