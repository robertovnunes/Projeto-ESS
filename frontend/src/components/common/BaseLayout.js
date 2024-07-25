// src/components/layout/BaseLayout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useColor } from '../../context/userColorContext'; // Importe o contexto
import NavBar from './NavBar';
import UserBox from './UserBox';
import '../../style/NavBar.css'; // ou BaseLayout.css, se você preferir
import '../../style/UserBox.css'; // ou BaseLayout.css, se você preferir

const BaseLayout = ({ children }) => {
  const [showUserBox, setShowUserBox] = useState(false);
  const { bgColor } = useColor(); // Use o contexto para obter a cor aleatória
  const userType = Cookie.get('userType') || 'Desconhecido';
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === 'Desconhecido') {
      navigate('/login');
    }
  }, [userType, navigate]);

  const toggleUserBox = () => {
    setShowUserBox(!showUserBox);
  };

  return (
    <div className="base-container">
      <NavBar toggleUserBox={toggleUserBox} bgColor={bgColor} />
      <UserBox showUserBox={showUserBox} bgColor={bgColor} />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
