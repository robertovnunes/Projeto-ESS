// src/components/Common/NavBar.js

import React from 'react';
import Cookie from 'js-cookie';
import '../../style/NavBar.css';
import logo from '../../assets/CIn_logo.png'; // Importe a imagem

const NavBar = ({ toggleUserBox, bgColor }) => {
  const initial = Cookie.get('nome')?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="navbar">
      <div className="left-icon">
        <img src={logo} alt="Ícone Esquerdo" /> {/* Use a imagem importada */}
      </div>
      <div className="user-icon" style={{ backgroundColor: bgColor }} onClick={toggleUserBox}>
        {initial}
      </div>
    </div>
  );
};

export default NavBar;
